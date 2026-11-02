# ATLAS Technosoft – REST API Documentation

Base URL: `http://localhost:8000/api/v1`  
Interactive OpenAPI Docs: `http://localhost:8000/docs`  
ReDoc Documentation: `http://localhost:8000/redoc`

---

## 1. Health Endpoints

### A. General Backend Health
- **Endpoint**: `GET /api/v1/health`
- **Description**: Verifies backend uptime and environment.

#### Response (`200 OK`)
```json
{
  "status": "healthy",
  "service": "ATLAS Technosoft API",
  "environment": "development",
  "timestamp": "2026-11-02T10:15:30.123456+00:00"
}
```

---

### B. SAP Business One Connectivity
- **Endpoint**: `GET /api/v1/health/sap`
- **Description**: Verifies connection to the SAP Service Layer without leaking credentials or tokens.

#### Response (`200 OK` - Connected)
```json
{
  "status": "connected",
  "mode": "live_sap_hana",
  "server": "https://hana-b1-server.atlastechnosoft.com:50000/b1s/v1",
  "company_db": "SBODEMOIN",
  "authenticated": true,
  "timestamp": "2026-11-02T10:15:30.123456+00:00"
}
```

---

## 2. Contact Enquiry API

### Submit Contact Us Form
- **Endpoint**: `POST /api/v1/contact`
- **Content-Type**: `application/json`

#### Request Payload
```json
{
  "fullName": "Rahul Sharma",
  "email": "rahul.sharma@acme.com",
  "phone": "+91 93723 29599",
  "companyName": "Acme Industries Ltd",
  "service": "SAP Business One",
  "message": "We need an architectural review for migrating from SQL to SAP HANA."
}
```

#### Field Specifications
| Field | Type | Required | Rules |
|---|---|---|---|
| `fullName` | string | **Yes** | 2-100 characters. Sanitized. |
| `email` | string | **Yes** | Valid RFC email address. Lowercased. |
| `phone` | string | **Yes** | 7-16 digits. Valid telephone format. |
| `companyName` | string | **Yes** | 2-120 characters. Sanitized. |
| `service` | string | **Yes** | Selected service from website dropdown. |
| `message` | string | **Yes** | 10-3000 characters. Outlines requirements. |

#### Successful Response (`201 Created`)
```json
{
  "success": true,
  "status": "success",
  "message": "Thank you for reaching out. Your enquiry has been registered with ATLAS Technosoft experts.",
  "sapCardCode": "L-20261102-8A2F",
  "sapActivityId": 1042,
  "referenceId": "ATPL-ENQ-9D4E21",
  "submittedAt": "2026-11-02T10:18:22.451920+00:00"
}
```

---

## 3. Book a Consultation API

### Schedule Strategic Consultation
- **Endpoint**: `POST /api/v1/consultations`
- **Content-Type**: `application/json`

#### Request Payload
```json
{
  "fullName": "Vikram Malhotra",
  "email": "vikram@innovatech.com",
  "phone": "+91 98200 12345",
  "companyName": "InnovaTech Solutions Pvt Ltd",
  "service": "Boyum IT Solutions",
  "message": "We are seeking a detailed consultation on Beas Manufacturing and Produmex WMS for discrete shop floors.",
  "preferredDate": "2026-11-15",
  "preferredTime": "15:00 - 16:00 IST"
}
```

#### Field Specifications
| Field | Type | Required | Rules |
|---|---|---|---|
| `fullName` | string | **Yes** | 2-100 characters. |
| `email` | string | **Yes** | Valid business email. |
| `phone` | string | **Yes** | 7-16 digits telephone. |
| `companyName` | string | **Yes** | 2-120 characters. |
| `service` | string | **Yes** | Service of interest. |
| `message` | string | **Yes** | Minimum 10 characters. |
| `preferredDate` | string | *Optional* | Target consultation date (`YYYY-MM-DD`). |
| `preferredTime` | string | *Optional* | Preferred time slot or time zone. |

#### Successful Response (`201 Created`)
```json
{
  "success": true,
  "status": "success",
  "message": "Thank you. Your strategic consultation request has been scheduled with ATLAS Technosoft experts.",
  "sapCardCode": "L-20261102-7C1B",
  "sapActivityId": 2088,
  "referenceId": "ATPL-CON-4A8E02",
  "preferredDate": "2026-11-15",
  "preferredTime": "15:00 - 16:00 IST",
  "submittedAt": "2026-11-02T10:20:11.109283+00:00"
}
```

---

## 4. Error Responses

### A. Validation Error (`422 Unprocessable Content`)
```json
{
  "success": false,
  "status": "validation_error",
  "message": "Please correct the highlighted errors before submitting.",
  "errors": [
    {
      "field": "email",
      "message": "Invalid business email format. Please provide a valid address (e.g. name@company.com)."
    },
    {
      "field": "message",
      "message": "Message must be at least 10 characters long to provide sufficient context."
    }
  ]
}
```

### B. Duplicate Submission Protection (`409 Conflict`)
```json
{
  "detail": {
    "message": "Your enquiry is currently being processed by SAP Business One. Please wait a moment.",
    "error_type": "duplicate_submission"
  }
}
```

### C. SAP Service Unavailable (`502 Bad Gateway`)
```json
{
  "detail": {
    "message": "Unable to save enquiry in SAP Business One at this moment. Our team has been notified.",
    "error_type": "sap_service_error"
  }
}
```

