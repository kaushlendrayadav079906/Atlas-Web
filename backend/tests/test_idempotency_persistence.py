import os
import tempfile
import pytest
from app.utils.idempotency import IdempotencyManager
from app.utils.exceptions import DuplicateSubmissionError


def test_idempotency_basic_workflow():
    manager = IdempotencyManager(window_seconds=10, db_path=":memory:")

    email = "test@company.com"
    phone = "+91 93723 29599"
    service = "SAP Business One"
    message = "Need implementation quote."
    enquiry_type = "Contact"

    # First check: brand new
    key, cached = manager.check_or_start(email, phone, service, message, enquiry_type)
    assert key is not None
    assert cached is None

    # While in-progress, second call should raise DuplicateSubmissionError
    with pytest.raises(DuplicateSubmissionError):
        manager.check_or_start(email, phone, service, message, enquiry_type)

    # Complete the request
    fake_result = {"success": True, "sapCardCode": "L-12345", "referenceId": "ATPL-ENQ-1"}
    manager.complete(key, fake_result)

    # Subsequent call within window returns cached result
    key2, cached2 = manager.check_or_start(email, phone, service, message, enquiry_type)
    assert key2 == key
    assert cached2 == fake_result


def test_idempotency_sqlite_file_persistence():
    with tempfile.NamedTemporaryFile(suffix=".db", delete=False) as tf:
        db_path = tf.name

    try:
        # Instance 1 saves a completed record
        manager1 = IdempotencyManager(window_seconds=60, db_path=db_path)
        key, _ = manager1.check_or_start("ceo@acme.com", "+91 98200 11111", "UiPath", "Robotics demo", "Consultation")
        result_payload = {"success": True, "sapCardCode": "L-99999", "referenceId": "ATPL-CON-99"}
        manager1.complete(key, result_payload)

        # Instance 2 (simulating server restart or parallel worker) loads from same database file
        manager2 = IdempotencyManager(window_seconds=60, db_path=db_path)
        key2, cached = manager2.check_or_start("ceo@acme.com", "+91 98200 11111", "UiPath", "Robotics demo", "Consultation")
        
        assert key2 == key
        assert cached is not None
        assert cached["sapCardCode"] == "L-99999"
        assert cached["referenceId"] == "ATPL-CON-99"

    finally:
        if os.path.exists(db_path):
            try:
                os.remove(db_path)
            except Exception:
                pass


def test_idempotency_fail_releases_lock():
    manager = IdempotencyManager(window_seconds=10, db_path=":memory:")

    email = "retry@company.com"
    phone = "+91 93723 29599"
    service = "Boyum IT"
    message = "Request that fails initial attempt."
    enquiry_type = "Contact"

    key, cached = manager.check_or_start(email, phone, service, message, enquiry_type)
    assert cached is None

    # SAP failed, release lock
    manager.fail(key)

    # User retries immediately -> should not raise DuplicateSubmissionError
    key_retry, cached_retry = manager.check_or_start(email, phone, service, message, enquiry_type)
    assert key_retry == key
    assert cached_retry is None

