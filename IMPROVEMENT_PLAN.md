# Project Improvement Plan

This plan outlines proposed improvements for the Useful Online Tools React application, based on a review of the codebase, user priorities, and Lighthouse performance audit.

## Priority Areas

1.  **Performance Optimization (High Priority - Based on Lighthouse Score: 51):**

    - **Address Core Web Vitals:**
      - Optimize Largest Contentful Paint (LCP > 4.3s): Investigate and optimize the loading of the largest element.
      - Reduce Total Blocking Time (TBT > 470ms): Minimize main-thread work (3.1s), reduce JS execution time (2.0s), and optimize long tasks (7 found).
      - Minimize Cumulative Layout Shift (CLS > 0.409): Identify and fix elements causing layout shifts (6 shifts found).
    - **JavaScript Optimization:**
      - Reduce unused JavaScript (Potential: 461 KiB).
      - Minify JavaScript (Potential: 885 KiB).
      - Remove duplicate modules in JS bundles (Potential: 504 KiB).
      - Avoid serving legacy JavaScript to modern browsers (Potential: 1 KiB).
    - **Resource Loading & Network:**
      - Eliminate render-blocking resources (Potential: 40ms).
      - Serve static assets with an efficient cache policy (55 resources found).
      - Avoid enormous network payloads (Total: 2,936 KiB).
      - Avoid chaining critical requests (2 chains found).
    - **Other Performance Issues:**
      - Enable back/forward cache restoration (3 failure reasons).
      - Reduce the impact of third-party code (Blocked main thread for 350ms).
        - Specifically investigate and optimize the loading strategy for Google Ads scripts (e.g., lazy loading, asynchronous loading).

2.  **UI/UX & Mobile Friendliness Audit & Enhancement (High Priority):**

    - Systematically test each tool page on various screen sizes.
    - Identify and fix layout issues (relates to CLS).
    - Refine responsive styles.
    - Review and improve UX aspects (clarity, feedback, etc.).

3.  **SEO Optimization (High Priority - Lighthouse Score: 100, but includes performance):**

    - Add `og-image.png` to `public`.
    - Implement dynamic sitemap generation.
    - Review `robots.txt` rule `Disallow: /*?*`.
    - Enhance structured data (Schema.org).
    - _Note: Performance optimization (Section 1) is crucial for SEO._

4.  **Best Practices Enhancement (Medium Priority - Based on Lighthouse Score: 79):**

    - Review third-party cookie usage (36 cookies found).
    - Ensure Content Security Policy (CSP) is effective against XSS attacks.
    - Implement a strong HTTP Strict Transport Security (HSTS) policy.
    - Ensure proper origin isolation with Cross-Origin Opener Policy (COOP).
    - Investigate and resolve issues logged in the DevTools Issues panel.

5.  **Review & Enhance Existing Tools (Medium Priority):**

    - **Priority:** Enhance the existing `HashGenerator` component to support MD5, SHA1, SHA256, SHA512 algorithms.
    - Identify and implement other specific improvements for existing tools (e.g., add character count to Word Counter, add options to JSON Formatter, etc.).

6.  **New Advanced Hash Tool Development (Medium Priority):**

    - Implement **Keccak / SHA3** hash tool (various output sizes).
    - Implement **HMAC** tool (supporting various underlying hash functions like SHA256, SHA512).

7.  **Refactor Tool Logic (Low Priority):** Extract complex logic for maintainability as needed during other tasks.
8.  **Enhance Accessibility (A11y) (Low Priority - Lighthouse Score: 100, but manual checks needed):** Address basic accessibility issues found during UI/UX review and perform manual checks suggested by Lighthouse.
9.  **Dependency Review & Update (Low Priority):** Check and update dependencies periodically.
10. **Documentation Improvement (Low Priority):** Update README, add TSDoc comments as code is modified.

## Plan Overview Diagram

```mermaid
graph TD
    A[Project Review & Lighthouse Audit Complete] --> B{Final Plan Approved};

    subgraph "High Priority"
        direction LR
        C[1. Performance Optimization];
        D[2. UI/UX & Mobile];
        E[3. SEO Optimization];
    end

    subgraph "Medium Priority"
        direction LR
        F[4. Best Practices Enhancement];
        G[5. Enhance Existing Tools];
        H[6. New Advanced Hash Tools];
    end

    subgraph "Low Priority"
        direction LR
        I[7. Refactor Logic];
        J[8. Accessibility (A11y)];
        K[9. Dependencies];
        L[10. Documentation];
    end

    B --> C;
    B --> D;
    B --> E;
    B --> F;
    B --> G;
    B --> H;
    B --> I;
    B --> J;
    B --> K;
    B --> L;

    C --> C1[Optimize LCP];
    C --> C2[Reduce TBT];
    C --> C3[Minimize CLS];
    C --> C4[JS Optimization (Unused, Minify, Duplicates)];
    C --> C5[Resource Loading (Render-blocking, Cache, Payload)];
    C --> C6[Enable B/F Cache];
    C --> C7[Optimize 3rd Party Code];

    D --> D1[Responsive Audit & Fixes];
    D --> D2[UX Review & Enhancements];

    E --> E1[Add og-image.png];
    E --> E2[Dynamic Sitemap];
    E --> E3[Review robots.txt];
    E --> E4[Enhance Structured Data];

    F --> F1[Review 3rd Party Cookies];
    F --> F2[Strengthen CSP];
    F --> F3[Implement HSTS];
    F --> F4[Implement COOP];
    F --> F5[Resolve DevTools Issues];

    G --> G1[Enhance HashGenerator (MD5, SHA1/256/512)];
    G --> G2[Implement Other Tool Enhancements];

    H --> H1[Implement Keccak/SHA3 Tool];
    H --> H2[Implement HMAC Tool];

    J --> J1[Address Auto-Detected Issues];
    J --> J2[Perform Manual A11y Checks];


    style C fill:#f88,stroke:#333,stroke-width:2px
    style D fill:#f88,stroke:#333,stroke-width:2px
    style E fill:#f88,stroke:#333,stroke-width:2px
    style F fill:#ffc,stroke:#333,stroke-width:2px
    style G fill:#ffc,stroke:#333,stroke-width:2px
    style H fill:#ffc,stroke:#333,stroke-width:2px
    style I fill:#ccf,stroke:#333,stroke-width:2px
    style J fill:#ccf,stroke:#333,stroke-width:2px
    style K fill:#ccf,stroke:#333,stroke-width:2px
    style L fill:#ccf,stroke:#333,stroke-width:2px
```
