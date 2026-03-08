"use client";

import { HiOutlineRocketLaunch, HiOutlineBookOpen, HiOutlineMapPin, HiOutlineLink, HiOutlineStar, HiOutlineFilm } from "react-icons/hi2";
import PageTemplate from "@/components/ui/PageTemplate";

export default function DocumentationPage() {
  return (
    <PageTemplate
      category="Resources"
      title="Documentation"
      subtitle="Comprehensive guides and references for the Jurryi platform"
      description="Access detailed documentation covering every aspect of the Jurryi patent prosecution platform. From initial setup and configuration to advanced workflow automation, our documentation library provides the guidance you need to maximize productivity and deliver higher-quality patent applications with confidence."
      features={[
        {
          title: "Getting Started Guides",
          description:
            "Step-by-step onboarding guides that walk you through account setup, workspace configuration, and your first patent analysis — designed to get you productive within minutes of signing up.",
          icon: <HiOutlineRocketLaunch size={20} />,
        },
        {
          title: "API Documentation",
          description:
            "Complete API reference with interactive examples, request and response schemas, and authentication details for seamless programmatic integration with your existing patent management systems.",
          icon: <HiOutlineBookOpen size={20} />,
        },
        {
          title: "Workflow Tutorials",
          description:
            "In-depth tutorials covering end-to-end patent prosecution workflows, including prior art analysis, claim drafting, office action responses, and multi-jurisdictional filing strategies.",
          icon: <HiOutlineMapPin size={20} />,
        },
        {
          title: "Integration Guides",
          description:
            "Detailed guides for connecting Jurryi with popular patent management tools, document management systems, and enterprise platforms to create a unified prosecution workflow.",
          icon: <HiOutlineLink size={20} />,
        },
        {
          title: "Best Practices",
          description:
            "Curated recommendations from patent prosecution experts on how to leverage Jurryi's AI capabilities for optimal claim construction, prior art coverage, and prosecution efficiency.",
          icon: <HiOutlineStar size={20} />,
        },
        {
          title: "Video Walkthroughs",
          description:
            "Visual, narrated walkthroughs of key platform features and workflows, making it easy to learn complex processes and share training materials across your team.",
          icon: <HiOutlineFilm size={20} />,
        },
      ]}
      howItHelps={{
        attorneys:
          "Rapidly onboard to the platform and discover advanced features that streamline case management, enabling you to focus on high-value legal strategy rather than operational overhead.",
        drafters:
          "Follow step-by-step workflow guides tailored to patent drafting, ensuring consistent quality and adherence to firm standards across every application you prepare.",
        engineers:
          "Leverage comprehensive API documentation and integration guides to build custom automations and connect Jurryi with your organization's existing technical infrastructure.",
      }}
      accentColor="#2D7D46"
    />
  );
}
