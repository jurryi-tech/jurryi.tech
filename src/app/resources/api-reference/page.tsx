"use client";

import PageTemplate from "@/components/ui/PageTemplate";

export default function ApiReferencePage() {
  return (
    <PageTemplate
      category="Resources"
      title="API Reference"
      subtitle="Powerful REST and SDK APIs for seamless integration"
      description="Integrate Jurryi's patent prosecution intelligence directly into your existing tools and workflows with our robust API platform. Whether you need to automate prior art searches, programmatically generate claim analyses, or build custom dashboards, our well-documented APIs and multi-language SDKs provide the flexibility and reliability your engineering teams demand."
      features={[
        {
          title: "RESTful Endpoints",
          description:
            "A comprehensive suite of REST API endpoints covering patent analysis, claim evaluation, prior art search, and prosecution management — all following industry-standard conventions with predictable resource-oriented URLs.",
          icon: "\u{1F310}",
        },
        {
          title: "SDK Libraries",
          description:
            "Official client libraries for Python, JavaScript, Java, and C# that abstract away HTTP complexity and provide type-safe interfaces, helper utilities, and built-in error handling for rapid development.",
          icon: "\u{1F4E6}",
        },
        {
          title: "Webhooks",
          description:
            "Real-time event notifications delivered to your systems when analyses complete, deadlines approach, or prosecution statuses change — keeping your team informed without constant polling.",
          icon: "\u{1F514}",
        },
        {
          title: "Batch Processing",
          description:
            "Submit large volumes of patent applications, prior art queries, or claim analyses in bulk through our batch API, with automatic queuing, progress tracking, and consolidated result delivery.",
          icon: "\u{1F4CA}",
        },
        {
          title: "Authentication",
          description:
            "Enterprise-grade OAuth 2.0 and API key authentication with granular permission scopes, token rotation, and audit logging to meet the security requirements of any organization.",
          icon: "\u{1F512}",
        },
        {
          title: "Rate Limiting",
          description:
            "Transparent, tiered rate limiting with clear headers, automatic retry guidance, and dedicated throughput allocations for enterprise clients to ensure predictable performance at scale.",
          icon: "\u26A1",
        },
      ]}
      howItHelps={{
        attorneys:
          "Automate repetitive prosecution workflows such as deadline tracking, status updates, and report generation, freeing up time to focus on substantive legal analysis and client strategy.",
        drafters:
          "Execute bulk operations across patent portfolios — run batch prior art searches, generate comparative claim analyses, and produce consistency reports across large application sets.",
        engineers:
          "Build custom integrations that connect Jurryi with your firm's docketing systems, document management platforms, and internal tools using well-documented, reliable API endpoints.",
      }}
      accentColor="#2D7D46"
    />
  );
}
