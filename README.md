# ATLAS Technosoft Pvt. Ltd. — Enterprise Website

> **Where SAP Business One Meets Intelligent Automation**  
> Mumbai's Trusted SAP Business One, Boyum IT & UiPath Partner for High-Growth SMEs

---

## Overview

This repository contains the enterprise frontend for **ATLAS Technosoft Pvt. Ltd.**, engineered with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**. The website is structured following enterprise Jamstack design patterns with high fidelity to the official `ATPL WEB Site_Content.pdf` documentation.

---

## Technology Stack

- **Frontend:** React 18, TypeScript 5.5, Vite 5.4, React Router 6.26, Tailwind CSS, Lucide Icons
- **Backend:** Python 3.12, FastAPI, Pydantic v2, Uvicorn, httpx, Starlette, slowapi
- **Integration:** SAP Business One Service Layer (OData REST API / HTTPS)
- **Testing:** Pytest, pytest-asyncio, Puppeteer headless verification

---

## Backend & SAP Business One Integration

The FastAPI backend lives in `/backend` and manages:
- **Lead Creation & Reconciliation**: Automatically checks existing Business Partners by email address before creating new Leads (`CardType='cLead'`), preventing duplicate customer records in SAP.
- **Activity Generation**: Logs an interaction in SAP Business One (`Activities`) linked to the Lead (`cn_Task` for inquiries, `cn_Meeting` for consultations with scheduled time slots).
- **Session Management**: Authenticates against `POST /b1s/v1/Login`, captures and reuses `B1SESSION` + `ROUTEID` cookies, and automatically re-authenticates upon token expiration.
- **Deduplication & Rate Limiting**: In-memory idempotency manager guards against rapid repeat submissions and concurrent requests.

### Backend Setup & Execution
```bash
# Start backend API (port 8000)
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

- **Interactive API Docs (Swagger UI)**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **API Health**: [http://localhost:8000/api/v1/health](http://localhost:8000/api/v1/health)
- **SAP Connectivity Status**: [http://localhost:8000/api/v1/health/sap](http://localhost:8000/api/v1/health/sap)
- **Run Backend Tests**: `cd backend && python -m pytest tests -v` (25/25 passing)

For detailed documentation, refer to:
- [`docs/SAP_INTEGRATION.md`](docs/SAP_INTEGRATION.md)
- [`docs/SAP_FIELD_MAPPING.md`](docs/SAP_FIELD_MAPPING.md)
- [`docs/API_DOCUMENTATION.md`](docs/API_DOCUMENTATION.md)

---

## Phase Roadmap

- [x] **Phase 1: Frontend Foundation & Complete Homepage**
- [x] **Phase 2: Dedicated Multi-Page Expansion (About, Services, Solutions, Industries, Case Studies, Partners, Contact)**
- [x] **Phase 3: Production-Ready FastAPI Backend with SAP Business One Service Layer Integration**
- [ ] **Phase 4: Technical SEO, Accessibility Audit (WCAG AA), and Lighthouse 95+ Optimization**
- [ ] **Phase 5: Production Deployment & Cloud Infrastructure Configuration**
npm install
```

### 2. Development Mode
```bash
npm run dev
```
Starts the local dev server at `http://localhost:3000`.

### 3. Production Build & Typecheck
```bash
npm run build
```
Executes `tsc` and Vite bundler producing optimized static assets in `/dist`.

### 4. Automated Verification Suite
```bash
node verify_site.cjs
```
Runs headless browser checks across 1440px desktop, 768px tablet, 375px mobile, verifies mobile menu toggles, tests form validation, and takes snapshot artifacts in `/verification_artifacts`.

---

## Phase Roadmap

- [x] **Phase 1: Frontend Foundation & Complete Homepage**
- [ ] **Phase 2: Dedicated Multi-Page Expansion (About, Services, Solutions, Industries, Case Studies, Partners, Contact)**
- [ ] **Phase 3: Backend Enquiry API, Transactional Mailer & Spam Protection**
- [ ] **Phase 4: Technical SEO, Accessibility Audit (WCAG AA), and Lighthouse 95+ Optimization**
- [ ] **Phase 5: Production Deployment & Cloud Infrastructure Configuration**

