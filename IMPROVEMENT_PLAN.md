# Project Improvement Plan

This plan outlines proposed improvements for the Useful Online Tools React application, based on a review of the codebase and user priorities.

## Priority Areas

1.  **UI/UX & Mobile Friendliness Audit & Enhancement (High Priority):**

    - Systematically test each tool page on various screen sizes.
    - Identify and fix layout issues.
    - Refine responsive styles.
    - Review and improve UX aspects (clarity, feedback, etc.).

2.  **SEO Optimization (High Priority):**

    - Add `og-image.png` to `public`.
    - Implement dynamic sitemap generation.
    - Review `robots.txt` rule `Disallow: /*?*`.
    - Enhance structured data (Schema.org).
    - Run performance audits (Lighthouse) and address major bottlenecks.

3.  **Review & Enhance Existing Tools (Medium Priority):**

    - **Priority:** Enhance the existing `HashGenerator` component to support MD5, SHA1, SHA256, SHA512 algorithms.
    - Identify and implement other specific improvements for existing tools (e.g., add character count to Word Counter, add options to JSON Formatter, etc.).

4.  **New Advanced Hash Tool Development (Medium Priority):**

    - Implement **Keccak / SHA3** hash tool (various output sizes).
    - Implement **HMAC** tool (supporting various underlying hash functions like SHA256, SHA512).

5.  **Refactor Tool Logic (Low Priority):** Extract complex logic for maintainability as needed during other tasks.
6.  **Enhance Accessibility (A11y) (Low Priority):** Address basic accessibility issues found during UI/UX review.
7.  **Dependency Review & Update (Low Priority):** Check and update dependencies periodically.
8.  **Documentation Improvement (Low Priority):** Update README, add TSDoc comments as code is modified.

## Plan Overview Diagram

```mermaid
graph TD
    A[Project Review Complete] --> B{Final Plan Approved};
    B --> C[1. UI/UX & Mobile (High)];
    B --> D[2. SEO Optimization (High)];
    B --> E[3. Enhance Existing Tools (Medium)];
    B --> F[4. New Advanced Hash Tools (Medium)];
    B --> G[5. Refactor Logic (Low)];
    B --> H[6. Accessibility (Low)];
    B --> I[7. Dependencies (Low)];
    B --> J[8. Documentation (Low)];

    C --> C1[Responsive Audit & Fixes];
    C --> C2[UX Review & Enhancements];

    D --> D1[Add og-image.png];
    D --> D2[Dynamic Sitemap Generation];
    D --> D3[Review robots.txt Rule];
    D --> D4[Enhance Structured Data];
    D --> D5[Performance Audit (Lighthouse)];

    E --> E1[Enhance HashGenerator (MD5, SHA1/256/512)];
    E --> E2[Implement Other Tool Enhancements];

    F --> F1[Implement Keccak/SHA3 Tool];
    F --> F2[Implement HMAC Tool];

    style C fill:#f9f,stroke:#333,stroke-width:2px
    style D fill:#f9f,stroke:#333,stroke-width:2px
    style E fill:#ffc,stroke:#333,stroke-width:2px
    style F fill:#ffc,stroke:#333,stroke-width:2px
```
