"use client";

import { HiOutlineBanknotes, HiOutlineBuildingOffice, HiOutlineArrowPath, HiOutlineHandRaised, HiOutlineReceiptPercent, HiOutlineTrophy } from "react-icons/hi2";
import PageTemplate from "@/components/ui/PageTemplate";

export default function CaseStudiesPage() {
  return (
    <PageTemplate
      category="Resources"
      title="Case Studies"
      subtitle="Real-world success stories from patent professionals"
      description="Discover how organizations of every size — from boutique patent firms to Fortune 500 corporate IP departments — have transformed their patent prosecution operations with Jurryi. Each case study provides detailed, data-driven accounts of implementation journeys, measurable outcomes, and the strategic decisions that led to breakthrough improvements in efficiency, quality, and cost management."
      features={[
        {
          title: "ROI Metrics",
          description:
            "Transparent, quantified return-on-investment data showing time savings, cost reductions, and revenue impact that organizations have achieved after integrating Jurryi into their prosecution workflows.",
          icon: <HiOutlineBanknotes size={20} />,
        },
        {
          title: "Implementation Stories",
          description:
            "Detailed narratives of how teams planned, executed, and refined their Jurryi deployments — including change management strategies, training approaches, and lessons learned along the way.",
          icon: <HiOutlineBuildingOffice size={20} />,
        },
        {
          title: "Workflow Transformations",
          description:
            "Before-and-after comparisons of patent prosecution workflows, illustrating how AI-powered analysis and automation eliminated bottlenecks and created more streamlined, repeatable processes.",
          icon: <HiOutlineArrowPath size={20} />,
        },
        {
          title: "Team Productivity",
          description:
            "Measured improvements in team output, including applications drafted per month, office action response turnaround times, and the ability to handle growing portfolios without proportional headcount increases.",
          icon: <HiOutlineHandRaised size={20} />,
        },
        {
          title: "Cost Reduction",
          description:
            "Documented savings across prosecution budgets, covering reduced outside counsel spend, lower prior art search costs, fewer office action rounds, and decreased time-to-grant across patent portfolios.",
          icon: <HiOutlineReceiptPercent size={20} />,
        },
        {
          title: "Quality Improvements",
          description:
            "Evidence of higher allowance rates, stronger claim sets, fewer rejections, and improved consistency across applications — demonstrating that efficiency gains do not come at the expense of quality.",
          icon: <HiOutlineTrophy size={20} />,
        },
      ]}
      howItHelps={{
        attorneys:
          "Review proven results from peer organizations to build a compelling business case for AI-assisted prosecution and set realistic expectations for performance improvements and return on investment.",
        drafters:
          "Explore real-world workflow examples that demonstrate how other drafting teams have restructured their processes around Jurryi to achieve faster turnaround without sacrificing application quality.",
        engineers:
          "Evaluate technical validation data from production deployments, including integration architectures, performance benchmarks, and scalability outcomes that inform implementation planning.",
      }}
      accentColor="#2D7D46"
    />
  );
}
