# ATLAS Technosoft – FastAPI Backend with SAP Business One Integration

Production-ready enterprise backend for the ATLAS Technosoft website, validating customer inquiries, scheduling strategic consultations, and registering Leads and Activities directly into **SAP Business One** via its Service Layer REST API.

---

## 1. Quick Start

### Prerequisites
- Python 3.10+ (Recommended: Python 3.12)
- Node.js 18+ (for frontend)

### Installation
```bash
# 1. Navigate to backend directory
cd backend

# 2. (Optional) Create and activate virtual environment
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Copy environment template
cp .env.example .env
```

### Running the API Server
```bash
# Start server with live reload on http://127.0.0.1:8000
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

- **Interactive API Documentation (Swagger UI)**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc Documentation**: [http://localhost:8000/redoc](http://localhost:8000/redoc)
- **Health Check**: [http://localhost:8000/api/v1/health](http://localhost:8000/api/v1/health)
- **SAP Connectivity Check**: [http://localhost:8000/api/v1/health/sap](http://localhost:8000/api/v1/health/sap)

---

## 2. SAP Diagnostics & Verification Utility

A standalone CLI tool is provided to test network connectivity, verify SSL, negotiate session cookies, and validate Lead/Activity synchronization against your configured SAP Business One Service Layer:

```bash
# 1. Non-destructive connectivity and login test
python verify_sap_connection.py --check-only

# 2. Full diagnostics with single non-production test Lead creation
python verify_sap_connection.py --create-test-record

# 3. Force live connection (strictly disables mock fallback)
python verify_sap_connection.py --force-live
```

---

## 3. Running Automated Tests

Run the full pytest suite with verbose output:
```bash
cd backend
python -m pytest tests -v
```

All **40 automated tests** cover:
- **Pydantic schema validation**: email format, phone numbers (7–16 digits), name length, message context, XSS sanitization.
- **Contact enquiry endpoint**: `POST /api/v1/contact`.
- **Consultation scheduling endpoint**: `POST /api/v1/consultations`.
- **Duplicate submission & idempotency protection**: SQLite persistent storage and in-flight request locks.
- **Rate limiting**: token bucket algorithm enforcing max 20 requests/min per IP with HTTP 429 and `Retry-After`.
- **Email notifications**: HTML/plaintext template formatting, mock SMTP dispatch, and disabled mode safety.
- **Security & Error sanitization**: production mock mode enforcement, credentials non-leakage, CORS origins.
- **SAP Service Layer lifecycle**: session login, cookie caching (`B1SESSION`), automatic 401 re-authentication, and clean logout.

---

## 4. Key Architecture & Features

### A. Security Hardening
- **Never expose SAP credentials**: Password and session tokens (`B1SESSION`, `ROUTEID`) are isolated in the backend and never passed to the frontend.
- **Production Mock Enforcement**: When `APP_ENV=production`, development mock mode is **strictly disabled and rejected** automatically.
- **CORS Protection**: In production, CORS is restricted to exact whitelisted domains.
- **Input Sanitization**: HTML escaping, control-character stripping, and length checks prevent injection attacks.
- **Rate Limiting**: Sliding window rate limiter prevents DOS and spam abuse.

### B. Reliability & Idempotency
- **Persistent SQLite Deduplication**: In-flight request locking and cached completed results persist across server restarts and multi-worker clusters.
- **Safe SAP Failures**: If SAP is unreachable, the API returns HTTP 502/503 with a user-friendly message; it **never** reports false success.

### C. Automated Email Notifications
- Form submissions dispatch automated responsive HTML and plain-text email alerts to the consulting team.
- Runs via FastAPI `BackgroundTasks` so SMTP delays never slow down the API response or interfere with SAP synchronization.

---

## 5. Documentation References
- [SAP Service Layer Integration Guide](../docs/SAP_INTEGRATION.md)
- [SAP Field Mapping Specification](../docs/SAP_FIELD_MAPPING.md)
- [REST API Reference](../docs/API_DOCUMENTATION.md)
