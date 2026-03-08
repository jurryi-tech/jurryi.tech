"use client";

import PageTemplate from "@/components/ui/PageTemplate";

export default function SecurityPage() {
  return (
    <PageTemplate
      category="Company"
      title="Security"
      subtitle="Enterprise-Grade Security for Sensitive Patent Data"
      description="Patent prosecution involves some of the most confidential information in any organization — unpublished inventions, trade secrets, and strategic IP portfolios. Jurryi's security infrastructure is purpose-built to meet the stringent requirements of law firms, corporate IP departments, and government agencies. We maintain the highest industry standards for data protection, access control, and regulatory compliance so that you can leverage AI with complete confidence."
      features={[
        {
          title: "SOC 2 Type II Certified",
          description:
            "Jurryi maintains SOC 2 Type II certification, independently audited on an annual basis. This certification validates that our security controls, availability safeguards, processing integrity, confidentiality measures, and privacy practices meet rigorous industry standards.",
          icon: "🛡",
        },
        {
          title: "End-to-End Encryption",
          description:
            "All data is encrypted both in transit using TLS 1.3 and at rest using AES-256 encryption. Encryption keys are managed through dedicated hardware security modules with strict rotation policies, ensuring your patent data remains unreadable to unauthorized parties at every stage.",
          icon: "🔐",
        },
        {
          title: "Zero-Knowledge Architecture",
          description:
            "Our platform is designed so that Jurryi personnel cannot access your patent documents or invention disclosures. Data processing occurs in isolated, ephemeral environments, and no customer content is used for model training without explicit, documented consent.",
          icon: "👁",
        },
        {
          title: "Data Residency Controls",
          description:
            "Choose where your data is stored and processed. We offer regional data residency options across North America, Europe, and Asia-Pacific to help you comply with local data sovereignty requirements and organizational policies.",
          icon: "🌍",
        },
        {
          title: "Granular Access Controls",
          description:
            "Implement role-based access control with fine-grained permissions at the matter, portfolio, and document level. Support for SSO via SAML 2.0 and OIDC, multi-factor authentication, and session management ensures only authorized personnel access sensitive materials.",
          icon: "🔑",
        },
        {
          title: "Comprehensive Audit Logging",
          description:
            "Every action on the platform is recorded in immutable audit logs with full traceability. Logs capture user activity, document access, AI interactions, and administrative changes — supporting internal compliance reviews, client audits, and regulatory inquiries.",
          icon: "📋",
        },
      ]}
      howItHelps={{
        attorneys:
          "Maintain the highest standards of client confidentiality with infrastructure that meets or exceeds the security expectations of Fortune 500 companies, AmLaw 100 firms, and government patent offices worldwide.",
        drafters:
          "Work within secure, isolated environments where your drafts, invention disclosures, and prosecution strategies are protected by multiple layers of encryption and access control throughout every stage of the workflow.",
        engineers:
          "Integrate with confidence knowing our APIs enforce OAuth 2.0 authentication, rate limiting, and request signing. Our security architecture satisfies the compliance requirements of even the most demanding enterprise IT environments.",
      }}
      accentColor="#8B5E3C"
    />
  );
}
