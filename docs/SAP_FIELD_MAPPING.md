# ATLAS Technosoft – SAP Business One Service Layer Field Mapping

This document specifies the exact mapping between the ATLAS Technosoft website forms, the FastAPI backend schemas, and SAP Business One Service Layer entities.

---

## 1. CRM Lead / Business Partner Entity (`/b1s/v1/BusinessPartners`)

In SAP Business One, prospective clients submitting website inquiries are captured as **Leads** in the `BusinessPartners` table where `CardType = 'cLead'`.

| Website Form Field | Pydantic Schema Field | SAP B1 Service Layer Field | Data Type | Mandatory | Description & Transformation |
|---|---|---|---|---|---|
| **Company Name** | `companyName` | `CardName` | String(100) | **Yes** | If individual, maps `fullName` if company is empty. |
| **System Generated** | `sapCardCode` | `CardCode` | String(15) | **Yes** | Standardized prefix: `L-YYYYMMDD-XXXX` (e.g. `L-20261102-8A2F`). Verified unique. |
| — | — | `CardType` | String(1) | **Yes** | Fixed enum: `"cLead"` (SAP CRM Lead). |
| **Business Email** | `email` | `EmailAddress` | String(100) | **Yes** | Normalized to lowercase. Used as primary key for deduplication search. |
| **Phone Number** | `phone` | `Phone1` | String(20) | **Yes** | Sanitized telephone string (E.164 / standard formatted). |
| **Full Name** | `fullName` | `ContactEmployees[0].Name` | String(50) | **Yes** | Created under the Lead's Contact Persons collection. |
| **Business Email** | `email` | `ContactEmployees[0].E_Mail` | String(100) | **Yes** | Contact Person email address. |
| **Phone Number** | `phone` | `ContactEmployees[0].Phone` | String(20) | **Yes** | Contact Person telephone. |
| **Enquiry Type** | `enquiryType` | `ContactEmployees[0].Remarks` | String(100) | No | Note: `"Registered via ATLAS Website (Contact/Consultation)"`. |
| **Message / Requirements** | `message` | `FreeText` | String(Max) | No | Combined source note: `Source: ATLAS Website\nService: {service}\nRequirements: {message}` |
| *(Optional UDF)* | `service` | `U_ServiceInterested` | String(50) | No | Optional custom user-defined field if provisioned in SAP database. |
| *(Optional UDF)* | `enquiryType` | `U_LeadSource` | String(50) | No | Defaults to `"ATLAS_WEBSITE"`. |

### Lead Deduplication Logic
Before creating a new `BusinessPartners` record, the backend executes an OData query:
```http
GET /b1s/v1/BusinessPartners?$filter=EmailAddress eq '{email}' and CardType eq 'cLead'&$select=CardCode,CardName,EmailAddress
```
- If an existing Lead record is found, its `CardCode` is reused.
- If no record exists, a new Lead is created with a generated `CardCode`.

---

## 2. Activity / Interaction Entity (`/b1s/v1/Activities`)

Every submission creates a linked **Activity** in SAP Business One, tracking the interaction timeline and task assignment.

| Website Form Field | Schema Field | SAP B1 Field | Enum / Type | Description |
|---|---|---|---|---|
| **SAP Lead Code** | `sapCardCode` | `CardCode` | String(15) | Foreign key pointing to the created/reused Lead. |
| **Enquiry Type** | — | `Activity` | Enum (`cn_Task` / `cn_Meeting`) | `"cn_Task"` for Contact Us; `"cn_Meeting"` for Book a Consultation. |
| **Activity Type ID** | — | `ActivityType` | Integer | System default `-1` (General) or administrator-defined CRM type. |
| **Service of Interest** | `service` | `Details` | String(50) | Summary title: `ATLAS Website: {enquiry_type} - {service}`. |
| **Message & Slot** | `message` | `Notes` | String(Max) | Full text of user message + preferred consultation slot details. |
| **Preferred Date** | `preferredDate` | `StartDate` / `EndDate` | Date (`YYYY-MM-DD`) | Target consultation date or current UTC date if unspecified. |
| **Preferred Time** | `preferredTime` | `StartTime` / `EndTime` | Time (`HH:MM:SS`) | Target consultation slot or current UTC time. |
| **Priority** | — | `Priority` | Enum | `"pr_Normal"`. |

---

## 3. Sample Payloads

### A. Lead Creation (`POST /b1s/v1/BusinessPartners`)
```json
{
  "CardCode": "L-20261102-9B41",
  "CardName": "Apex Precision Engineering Ltd",
  "CardType": "cLead",
  "EmailAddress": "contact@apexprecision.in",
  "Phone1": "+91 93723 29599",
  "FreeText": "Source: ATLAS Technosoft Website\nEnquiry Type: Website Contact Enquiry\nService: SAP Business One\nRequirements: Looking for Cloud SAP B1 migration with Beas Manufacturing.",
  "ContactEmployees": [
    {
      "Name": "Vikram Desai",
      "E_Mail": "contact@apexprecision.in",
      "Phone": "+91 93723 29599",
      "Remarks": "Registered via ATLAS Website (Contact Enquiry)"
    }
  ]
}
```

### B. Consultation Activity Creation (`POST /b1s/v1/Activities`)
```json
{
  "CardCode": "L-20261102-9B41",
  "Activity": "cn_Meeting",
  "ActivityType": -1,
  "Details": "ATLAS Website: Strategic Consultation - SAP Business One",
  "Notes": "Contact: Vikram Desai\nEnquiry Type: Strategic Consultation\nService of Interest: SAP Business One\nPreferred Slot: 2026-11-15 at 15:00 - 16:00 IST\n\nClient Message:\nLooking for Cloud SAP B1 migration with Beas Manufacturing.",
  "StartDate": "2026-11-15",
  "StartTime": "10:00:00",
  "EndDate": "2026-11-15",
  "EndTime": "11:00:00",
  "Priority": "pr_Normal"
}
```

