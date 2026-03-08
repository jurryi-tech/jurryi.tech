"use client";

import PageTemplate from "@/components/ui/PageTemplate";

export default function ContactPage() {
  return (
    <PageTemplate
      category="Company"
      title="Contact"
      subtitle="Get in Touch with the Jurryi Team"
      description="Whether you are exploring how AI can enhance your patent prosecution practice, need technical assistance with an existing integration, or want to discuss a strategic partnership, the Jurryi team is here to help. We pride ourselves on responsive, knowledgeable support delivered by people who understand both the technology and the patent profession. Reach out through any of the channels below, and we will connect you with the right team member promptly."
      features={[
        {
          title: "Sales Inquiries",
          description:
            "Connect with our sales team to discuss how Jurryi can be tailored to your firm's specific prosecution workflow. We offer customized pricing for solo practitioners, mid-size firms, and enterprise IP departments, with flexible licensing models designed to scale with your practice.",
          icon: "💼",
        },
        {
          title: "Technical Support",
          description:
            "Our dedicated support engineers are available to help you resolve any technical issues, from initial setup and configuration to advanced troubleshooting. Enterprise customers receive priority support with guaranteed response times and a dedicated account engineer.",
          icon: "🔧",
        },
        {
          title: "Partnership Opportunities",
          description:
            "We actively partner with patent management platforms, docketing systems, law firm technology providers, and IP analytics companies. If you see an opportunity for integration or co-development, our partnerships team would welcome the conversation.",
          icon: "🤝",
        },
        {
          title: "Enterprise Plans",
          description:
            "Large organizations with complex requirements benefit from our enterprise tier, which includes dedicated infrastructure, custom model fine-tuning, advanced security configurations, and white-glove onboarding managed by our professional services team.",
          icon: "🏢",
        },
        {
          title: "Demo Requests",
          description:
            "See Jurryi in action with a personalized demonstration tailored to your practice area and workflow. Our product specialists walk you through real-world scenarios — from claim drafting to office action responses — using examples relevant to your technical domain.",
          icon: "🎬",
        },
        {
          title: "Feedback & Suggestions",
          description:
            "Your input directly shapes our product roadmap. We maintain an open feedback channel where customers and prospective users can suggest features, report issues, and vote on upcoming capabilities. Every submission is reviewed by our product team.",
          icon: "💬",
        },
      ]}
      howItHelps={{
        attorneys:
          "Schedule a personalized demo with a team member who speaks your language — literally a fellow patent professional who can show you exactly how Jurryi fits into your prosecution practice and addresses your specific pain points.",
        drafters:
          "Get dedicated implementation support to ensure Jurryi integrates seamlessly into your existing drafting environment, with hands-on training sessions and workflow configuration assistance tailored to your document preparation process.",
        engineers:
          "Access direct technical consultation with our engineering team for API integration planning, custom deployment architectures, and advanced configuration scenarios that align with your organization's infrastructure requirements.",
      }}
      accentColor="#8B5E3C"
    />
  );
}
