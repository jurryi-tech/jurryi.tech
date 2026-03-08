"use client";

import { HiOutlineCpuChip, HiOutlineChatBubbleLeftRight, HiOutlinePencilSquare, HiOutlineBeaker, HiOutlineDocumentText, HiOutlineClock } from "react-icons/hi2";
import PageTemplate from "@/components/ui/PageTemplate";

export default function OfficeActionResponsePage() {
  return (
    <PageTemplate
      category="Platform"
      title="Office Action Response"
      subtitle="AI-Generated Responses in Minutes, Not Days"
      description="Jurryi's Office Action Response engine analyzes examiner rejections with surgical precision and generates comprehensive, persuasive response strategies in minutes. By understanding rejection patterns, examiner tendencies, and successful prosecution histories, the platform produces arguments and amendments that dramatically increase allowance rates while reducing response preparation time by up to 80%."
      features={[
        {
          title: "Examiner Pattern Analysis",
          description: "Analyzes the specific examiner's historical rejection patterns, preferred argument styles, and allowance tendencies to tailor response strategies that align with what has proven most effective for each individual examiner.",
          icon: <HiOutlineCpuChip size={20} />,
        },
        {
          title: "Argument Generation",
          description: "Automatically crafts persuasive legal arguments addressing each ground of rejection, drawing from successful prosecution histories and case law to build compelling responses that distinguish over cited prior art.",
          icon: <HiOutlineChatBubbleLeftRight size={20} />,
        },
        {
          title: "Claim Amendment Suggestions",
          description: "Proposes strategic claim amendments that overcome rejections while preserving maximum claim scope, offering multiple amendment pathways ranked by their likelihood of success and impact on patent coverage.",
          icon: <HiOutlinePencilSquare size={20} />,
        },
        {
          title: "Rejection Analysis",
          description: "Breaks down complex office actions into structured, element-level analyses identifying every ground of rejection, cited reference, and specific claim limitation at issue — providing a clear roadmap for comprehensive response preparation.",
          icon: <HiOutlineBeaker size={20} />,
        },
        {
          title: "Response Templates",
          description: "Provides professionally structured response frameworks for every rejection type — from 101 eligibility to 103 obviousness — pre-populated with relevant legal standards, MPEP citations, and customizable argument blocks.",
          icon: <HiOutlineDocumentText size={20} />,
        },
        {
          title: "Deadline Tracking",
          description: "Automatically tracks response deadlines across your entire portfolio, prioritizes urgent actions, calculates extension fees, and sends proactive alerts to ensure no office action response window is ever missed.",
          icon: <HiOutlineClock size={20} />,
        },
      ]}
      howItHelps={{
        attorneys:
          "Accelerates response turnaround from days to hours, enabling attorneys to handle higher case volumes without sacrificing quality. Provides data-driven argument strategies that increase first-response allowance rates and reduce overall prosecution costs.",
        drafters:
          "Delivers pre-built response frameworks with structured arguments and amendment language, allowing drafters to focus on technical refinement rather than starting from scratch — cutting preparation time while maintaining consistency across the portfolio.",
        engineers:
          "Generates technically grounded rebuttals that clearly articulate the inventive distinctions over cited prior art, translating complex engineering differentiators into the precise technical language examiners need to understand novelty and non-obviousness.",
      }}
      accentColor="#C54E8B"
    />
  );
}
