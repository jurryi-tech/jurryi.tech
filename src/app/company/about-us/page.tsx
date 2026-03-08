"use client";

import PageTemplate from "@/components/ui/PageTemplate";

export default function AboutUsPage() {
  return (
    <PageTemplate
      category="Company"
      title="About Us"
      subtitle="Transforming Patent Prosecution with Purpose-Built AI"
      description="Jurryi was founded on a singular conviction: patent prosecution deserves intelligent tooling built by people who truly understand the craft. Our platform combines deep domain expertise in intellectual property law with state-of-the-art artificial intelligence to deliver prosecution workflows that are faster, more precise, and more strategically informed. We partner with patent professionals worldwide to reshape how inventions are protected — making the entire prosecution lifecycle more efficient without compromising the rigor and nuance the discipline demands."
      features={[
        {
          title: "Founded by Patent Attorneys",
          description:
            "Jurryi was built from the ground up by registered patent attorneys and agents who have spent years navigating the complexities of prosecution before the USPTO and international offices. Every product decision is informed by real-world IP practice.",
          icon: "⚖",
        },
        {
          title: "AI-First Approach",
          description:
            "Rather than retrofitting legacy tools with superficial automation, we designed our platform with artificial intelligence at its core. Our models are purpose-built for patent language, claim construction, and office action analysis from day one.",
          icon: "🧠",
        },
        {
          title: "Global Team",
          description:
            "Our multidisciplinary team spans continents, bringing together expertise in patent law, machine learning, natural language processing, and enterprise software engineering to serve a global client base across every major jurisdiction.",
          icon: "🌐",
        },
        {
          title: "Prosecution-Trained Models",
          description:
            "Our AI models are fine-tuned on millions of patent documents, office actions, and prosecution histories. They understand the subtleties of claim language, prior art relevance, and examiner tendencies in ways generic language models cannot.",
          icon: "🎯",
        },
        {
          title: "Privacy-First Architecture",
          description:
            "Client confidentiality is non-negotiable in patent practice. Our infrastructure is engineered with zero-knowledge principles, end-to-end encryption, and strict data isolation to ensure that sensitive invention disclosures remain protected at every layer.",
          icon: "🔒",
        },
        {
          title: "Continuous Innovation",
          description:
            "The patent landscape evolves constantly — and so do we. Our research team continuously advances our models, integrates new data sources, and refines our tools based on feedback from the practitioners who rely on them every day.",
          icon: "🚀",
        },
      ]}
      howItHelps={{
        attorneys:
          "Built by your peers who understand the pressures of prosecution deadlines, the intricacies of claim strategy, and the high stakes of protecting client innovations. Jurryi is the partner you have been looking for.",
        drafters:
          "Designed specifically for your daily workflow — from initial disclosure review through claim drafting and office action responses — so you can focus on substantive work rather than repetitive formatting and research tasks.",
        engineers:
          "Powered by cutting-edge transformer architectures, retrieval-augmented generation, and domain-specific embeddings that push the boundaries of what AI can accomplish in the intellectual property domain.",
      }}
      accentColor="#8B5E3C"
    />
  );
}
