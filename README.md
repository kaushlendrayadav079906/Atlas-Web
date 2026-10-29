# ATLAS Technosoft Pvt. Ltd. — Enterprise Website

> **Where SAP Business One Meets Intelligent Automation**  
> Mumbai's Trusted SAP Business One, Boyum IT & UiPath Partner for High-Growth SMEs

---

## Overview

This repository contains the enterprise frontend for **ATLAS Technosoft Pvt. Ltd.**, engineered with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**. The website is structured following enterprise Jamstack design patterns with high fidelity to the official `ATPL WEB Site_Content.pdf` documentation.

---

## Technology Stack

- **Framework:** React 18
- **Language:** TypeScript 5.5
- **Build Tool:** Vite 5.4
- **Routing:** React Router DOM 6.26 (configured for seamless anchor navigation and future multi-page expansion)
- **Styling:** Tailwind CSS with custom enterprise navy theme (`#070D1E`, `#0B1530`, `#22D3EE`, `#2563EB`)
- **Icons:** Lucide React
- **Testing & Verification:** Puppeteer (multi-viewport responsive validation, interactive form testing, and zero broken links audit)

---

## Phase 1 Implementation Scope

- **System Architecture & Design System:**
  - Complete 5-tier architecture definition (Presentation, Component, Page, Data, Future Integration).
  - Component hierarchy and routing strategy.
  - Strict enterprise color system, typography scale, responsive breakpoints, and reduced-motion support.
- **Complete Homepage:**
  - **Sticky Header & Mobile Drawer:** Responsive navigation bar with official logo, partner statement ribbon, desktop links, and slide-out mobile drawer.
  - **Hero Section:** Official PDF headline *"Where SAP Business One Meets Intelligent Automation"*, supporting SME value messaging, dual CTAs (*"Get a Free Hyperautomation Health Check"* & *"View Our Solutions"*), partner badges (*Authorized SAP Channel Partner*, *Boyum IT Silver Partner*, *UiPath Silver Partner*), and connected systems visual.
  - **Trust & Impact Metrics:** 4 metric cards (*80+ Live Clients*, *98.7% Retention*, *1.2M+ Annual Transactions*, *32 Certified Consultants*) flagged with source claim verification badges.
  - **Solutions Section (6 Cards):** SAP B1 Implementation, Boyum IT Add-ons, UiPath RPA & AI, Freight & Trading Module, Gate Entry & Weighment, and ATLAS AI-Ready Add-ons.
  - **Expertise & Business Outcomes:** 4 convergence pillars explaining how SAP B1, Boyum, UiPath, and AI integrate into a unified autonomous engine.
  - **Industry Solutions (4 Sectors):** Manufacturing, Warehouse & Logistics, Finance & Administration, and Trading & Shipping.
  - **Implementation Approach:** 3-step structured discovery-to-delivery framework (*Understand Business*, *Map Opportunities*, *Clear Roadmap & Costing*).
  - **Customer Outcomes & Social Proof:** Client quotes, real client KPIs (*OEE +28%, Scrap -42%, 58-Day Go-Live*), and Clutch 5.0 rating.
  - **Conversion Section:** Prominent consultation CTA with 48-hour readiness score and complimentary 3-year AI roadmap.
  - **Interactive Contact Form & Direct Reach:** Comprehensive client-side validated form, placeholder confirmation modal with pre-formatted email draft and direct WhatsApp launcher (`+91-9372329599`).
  - **Footer & Mobile Quick CTA:** Full corporate footer with disclaimers and a sticky mobile consultation action bar for viewports `< 768px`.

---

## Quick Start & Verification

### 1. Install Dependencies
```bash
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
