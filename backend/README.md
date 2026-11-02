# ATLAS Technosoft – FastAPI Backend with SAP Business One Integration

Production-ready backend for the ATLAS Technosoft enterprise website, validating customer inquiries and registering Leads and Activities directly into **SAP Business One** via its Service Layer REST API.

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

## 2. Running Automated Tests

Run the full pytest suite with verbose output:
```bash
cd backend
python -m pytest tests -v
```

All 25 automated tests cover:
- Pydantic schema validation (email, phone, name, length limits, XSS sanitization)
- Contact enquiry endpoint (`POST /api/v1/contact`)
- Consultation scheduling endpoint (`POST /api/v1/consultations`)
- Duplicate submission & idempotency protection
- SAP session authentication, cookie caching, and automatic re-authentication
- SAP connection error and record rejection handling
- Health and diagnostics endpoints

---

## 3. SAP Business One Configuration

To connect to a live SAP Business One HANA or SQL instance, update `backend/.env`:

```env
SAP_BASE_URL="https://your-hana-server:50000/b1s/v1"
SAP_COMPANY_DB="YOUR_COMPANY_DB"
SAP_USERNAME="service_layer_user"
SAP_PASSWORD="your_password"
SAP_VERIFY_SSL=true
MOCK_SAP_IN_DEV=false
```

When `MOCK_SAP_IN_DEV=true` is enabled, the backend runs in a simulated mode that reproduces SAP Service Layer behavior without requiring an active SAP HANA server.

---

## 4. Documentation References
- [SAP Service Layer Integration Guide](../docs/SAP_INTEGRATION.md)
- [SAP Field Mapping Specification](../docs/SAP_FIELD_MAPPING.md)
- [REST API Reference](../docs/API_DOCUMENTATION.md)

