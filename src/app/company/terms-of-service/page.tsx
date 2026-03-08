"use client";

import PageTemplate from "@/components/ui/PageTemplate";

export default function TermsOfServicePage() {
  return (
    <PageTemplate
      category="Company"
      title="Terms of Service"
      subtitle="Legal Terms Governing Use of the Jurryi Platform"
      description="These Terms of Service establish the legal framework governing your access to and use of the Jurryi platform, including all associated tools, APIs, and services. We have drafted these terms to be clear, balanced, and fair — reflecting our belief that strong partnerships are built on mutual understanding. By using Jurryi, you agree to abide by these terms, which are designed to protect both your interests and ours while enabling you to leverage our AI-powered patent prosecution tools with confidence."
      features={[
        {
          title: "Service Scope & Definitions",
          description:
            "A clear delineation of what the Jurryi platform encompasses, including AI-assisted drafting tools, prior art search capabilities, office action analysis, docketing integrations, and all ancillary features. Every service component is defined precisely so there is no ambiguity about what is covered.",
          icon: "📄",
        },
        {
          title: "Acceptable Usage Policies",
          description:
            "Our usage policies outline permitted and prohibited activities on the platform, including guidelines for AI-generated content review, responsible use of automated features, rate limits, and restrictions designed to maintain platform integrity and service quality for all users.",
          icon: "✅",
        },
        {
          title: "Intellectual Property Ownership",
          description:
            "You retain full ownership of all content you create, upload, or generate using Jurryi. Our terms explicitly confirm that no intellectual property rights in your patent drafts, claims, disclosures, or other work product transfer to Jurryi through your use of the platform.",
          icon: "©",
        },
        {
          title: "SLA & Uptime Guarantees",
          description:
            "We commit to 99.9% platform availability backed by financially-supported service level agreements. Our SLA details scheduled maintenance windows, incident response timelines, communication protocols, and the credits or remedies available in the event of service disruptions.",
          icon: "⚡",
        },
        {
          title: "Liability Framework",
          description:
            "A balanced liability framework that clearly allocates risk between Jurryi and our users. We stand behind our platform with meaningful warranties while establishing reasonable limitations that reflect the advisory nature of AI-assisted patent prosecution tools.",
          icon: "⚖",
        },
        {
          title: "Dispute Resolution",
          description:
            "In the event of a disagreement, our terms provide for structured dispute resolution beginning with good-faith negotiation, followed by mediation, and binding arbitration as a final recourse. We prioritize efficient, cost-effective resolution over protracted litigation.",
          icon: "🤝",
        },
      ]}
      howItHelps={{
        attorneys:
          "Review clear, professionally drafted legal terms that respect the ethical obligations of patent practice and provide unambiguous confirmation that your client work product remains entirely your own.",
        drafters:
          "Understand exactly what you can and cannot do on the platform with straightforward usage guidelines that support productive workflows while maintaining the quality standards expected in professional patent prosecution.",
        engineers:
          "Access detailed API usage terms including rate limits, authentication requirements, data format specifications, and integration guidelines that enable you to build robust, compliant connections with the Jurryi platform.",
      }}
      accentColor="#8B5E3C"
    />
  );
}
