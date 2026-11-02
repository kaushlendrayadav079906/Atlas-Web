# ATLAS Technosoft – SAP Business One Service Layer Integration Guide

This guide explains the integration architecture between the FastAPI backend and the **SAP Business One Service Layer (HANA / Microsoft SQL Server)**.

---

## 1. Overview & Architecture

SAP Business One Service Layer is an OData-based REST service built on top of high-performance C++ and Apache/Nginx web engines, exposing SAP Business One business objects over HTTPS (port 50000 by default).

```text
[ Browser / Frontend ]
          │  HTTPS / JSON
          ▼
[ FastAPI Backend ]
    │  - Pydantic Validation & Sanitization
    │  - Idempotency & Deduplication Engine
    │  - Session Manager & Cookie Cache
          │  HTTPS / OData JSON (Port 50000)
          ▼
[ SAP B1 Service Layer ]
          │  Native DB API
          ▼
[ SAP HANA / SQL Company Database ]
```

---

## 2. Authentication Lifecycle

### A. Login (`POST /b1s/v1/Login`)
To establish an active session, the backend sends:
```http
POST /b1s/v1/Login HTTP/1.1
Host: hana-b1-server.atlastechnosoft.com:50000
Content-Type: application/json

{
  "CompanyDB": "SBODEMOIN",
  "UserName": "manager",
  "Password": "******",
  "Language": 25
}
```

### B. Session Cookies
Upon successful authentication, SAP returns HTTP `200 OK` and sets two critical session cookies:
1. `B1SESSION`: The unique authentication token.
2. `ROUTEID`: Node identifier for SAP HANA High Availability (HA) load balancing.

The backend captures and caches these cookies in-memory along with a timestamp.

### C. Session Reuse & Idle Timeout
- The default SAP Service Layer session timeout is **30 minutes of inactivity**.
- The backend configures `SAP_SESSION_TIMEOUT_MINUTES=25` (5 minutes before SAP expires it).
- All API requests share the valid cached session, eliminating login latency on each form submission.

### D. Automatic Re-authentication
If an API request encounters HTTP `401 Unauthorized` (e.g., if the SAP service restarted), the backend:
1. Logs the session expiration safely without leaking tokens.
2. Automatically calls `login(force_refresh=True)` to obtain fresh session cookies.
3. Transparently retries the pending request once.

### E. Clean Logout (`POST /b1s/v1/Logout`)
During application shutdown or lifecycle teardown, the backend sends a logout request to release the license seat in SAP.

---

## 3. Configuration & Environment Variables

Configure the following variables in `backend/.env`:

```env
# SAP Service Layer Base Endpoint (Must include /b1s/v1)
SAP_BASE_URL="https://hana-b1-server.atlastechnosoft.com:50000/b1s/v1"

# Company Database
SAP_COMPANY_DB="SBODEMOIN"

# Credentials
SAP_USERNAME="manager"
SAP_PASSWORD="YourSecurePasswordHere"

# Enforce SSL Certificate Validation in Production
SAP_VERIFY_SSL=true

# Timeouts
SAP_TIMEOUT_SECONDS=20.0
SAP_SESSION_TIMEOUT_MINUTES=25

# Offline / Local Development Mock Switch
MOCK_SAP_IN_DEV=true
```

> [!IMPORTANT]
> **Production Safety Rule**: Never set `SAP_VERIFY_SSL=false` in production environments. Self-signed SSL bypass should strictly be limited to isolated local development.

---

## 4. Error Codes & Troubleshooting

| SAP HTTP Status | SAP Error Code | Meaning | Backend Action |
|---|---|---|---|
| **401 Unauthorized** | `-301` | Session timed out or invalid credentials. | Re-authenticates and retries. Raises `SAPAuthenticationError` if login fails. |
| **400 Bad Request** | `-1004` | Database connection error or missing mandatory SAP field. | Extracts SAP error message from `error.message.value` and returns clean 422/502. |
| **400 Bad Request** | `100000048` | Primary key conflict (CardCode already exists). | Handled by unique UUID suffixing and prior `find_existing_lead` lookup. |
| **504 / Timeout** | — | SAP server unreachable or HANA service down. | Raises `SAPConnectionError`. Frontend displays polite notification without leaking internals. |

---

## 5. Development Mock Layer & Production Safety

When `MOCK_SAP_IN_DEV=true` and real SAP credentials are not yet configured:
- The backend seamlessly activates an internal simulation layer.
- Accurately mimics `/b1s/v1/Login`, `BusinessPartners` queries, Lead creation, and `Activities` creation.
- Stores mock records in memory during the process lifecycle.
- Lets frontend engineers and automated CI test the entire flow end-to-end without needing a live SAP HANA server.

> [!CAUTION]
> **Production Enforcement**: When `APP_ENV=production`, mock mode is **strictly disabled and rejected** automatically by the configuration manager. The API will refuse to boot in simulated mode in production.

---

## 6. Standalone Diagnostics Tool

Use the CLI diagnostic script to verify your live SAP Service Layer before deploying to production:

```bash
# Non-destructive ping and session login test
python backend/verify_sap_connection.py --check-only

# Comprehensive verification with diagnostic Lead + Activity creation
python backend/verify_sap_connection.py --create-test-record

# Enforce live connection (fails if host is unreachable)
python backend/verify_sap_connection.py --force-live
```

---

## 7. Production Readiness Checklist

- [x] Service Layer credentials isolated in `.env` (never exposed to client).
- [x] SSL certificate verification enabled (`SAP_VERIFY_SSL=true`).
- [x] Session token caching (`B1SESSION`, `ROUTEID`) with 25-minute timeout.
- [x] Automatic re-authentication on 401 Unauthorized.
- [x] Lead reconciliation matching existing customers by email address.
- [x] Persistent SQLite idempotency preventing duplicate submissions.
- [x] Sliding-window rate limiting protecting against spam & denial-of-service.
- [x] Automated responsive email alerts via background SMTP.
- [x] Error messages sanitized to prevent internal SAP URL/credential leakage.


