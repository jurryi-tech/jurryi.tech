"use client";

import PageTemplate from "@/components/ui/PageTemplate";

export default function ClaimAmendmentEnginePage() {
  return (
    <PageTemplate
      category="Platform"
      title="Claim Amendment Engine"
      subtitle="Intelligent Amendments That Maximize Patent Value"
      description="Jurryi's Claim Amendment Engine delivers precise, strategically optimized claim amendments that navigate the delicate balance between overcoming rejections and preserving maximum protection scope. Powered by deep analysis of claim dependencies, prosecution histories, and prior art boundaries, the engine suggests amendments that strengthen your patent position while maintaining alignment with your broader portfolio strategy."
      features={[
        {
          title: "Claim Dependency Analysis",
          description: "Maps the complete dependency structure across all claims, identifying critical support chains, potential antecedent basis issues, and orphaned limitations to ensure every amendment maintains structural integrity throughout the claim hierarchy.",
          icon: "🔀",
        },
        {
          title: "Broadening & Narrowing",
          description: "Provides calibrated broadening and narrowing recommendations for each claim, quantifying the scope impact of proposed amendments against the prior art landscape and identifying the optimal balance between coverage and allowability.",
          icon: "↔",
        },
        {
          title: "112 Compliance",
          description: "Continuously validates all amendments against Section 112 requirements including written description support, enablement, definiteness, and means-plus-function limitations — flagging potential issues before they become examiner rejections.",
          icon: "✅",
        },
        {
          title: "Continuation Strategy",
          description: "Recommends strategic continuation, divisional, and CIP filing opportunities based on amendment trajectories, suggesting how to preserve broader claim scope in child applications while securing allowance in the parent case.",
          icon: "🔄",
        },
        {
          title: "Claim Tree Visualization",
          description: "Renders interactive visual claim trees showing dependency relationships, amendment history, and scope changes over time — providing instant clarity on how each amendment affects the overall claim architecture and protection boundaries.",
          icon: "🌳",
        },
        {
          title: "Amendment History",
          description: "Maintains a complete audit trail of every amendment made throughout prosecution, tracking scope evolution, prosecution history estoppel implications, and the rationale behind each change for future enforcement and licensing analysis.",
          icon: "📜",
        },
      ]}
      howItHelps={{
        attorneys:
          "Enables strategic claim positioning with data-driven amendment recommendations that account for prior art boundaries, examiner tendencies, and portfolio-wide claim coordination — ensuring each amendment advances both immediate allowance goals and long-term enforcement strategy.",
        drafters:
          "Automates the mechanical aspects of claim amendment drafting including dependency restructuring, antecedent basis correction, and format compliance — freeing drafters to focus on the substantive technical distinctions that drive allowance.",
        engineers:
          "Optimizes the technical scope of patent claims by identifying which technical features provide the strongest basis for distinguishing over prior art, ensuring amendments preserve protection for the most commercially valuable aspects of the invention.",
      }}
      accentColor="#8B4EC5"
    />
  );
}
