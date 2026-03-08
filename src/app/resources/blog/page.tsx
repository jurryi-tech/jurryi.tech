"use client";

import { HiOutlineArrowTrendingUp, HiOutlineSparkles, HiOutlinePencilSquare, HiOutlineMicrophone, HiOutlineNewspaper, HiOutlineEye } from "react-icons/hi2";
import PageTemplate from "@/components/ui/PageTemplate";

export default function BlogPage() {
  return (
    <PageTemplate
      category="Resources"
      title="Blog"
      subtitle="Patent prosecution insights, industry analysis, and platform updates"
      description="Stay at the forefront of patent prosecution innovation with the Jurryi blog. Our editorial team and guest contributors deliver timely analysis of industry trends, practical prosecution techniques, product announcements, and thought leadership that helps patent professionals work smarter and stay ahead of evolving legal and technological landscapes."
      features={[
        {
          title: "Industry Analysis",
          description:
            "Deep-dive articles exploring trends in patent prosecution, AI-assisted drafting, examiner behavior patterns, and the evolving landscape of intellectual property strategy across technology sectors.",
          icon: <HiOutlineArrowTrendingUp size={20} />,
        },
        {
          title: "Product Updates",
          description:
            "Detailed announcements of new Jurryi features, platform improvements, and capability releases, with practical guidance on how to leverage each update in your daily prosecution workflows.",
          icon: <HiOutlineSparkles size={20} />,
        },
        {
          title: "Case Studies",
          description:
            "Narrative accounts of how law firms, corporate IP departments, and solo practitioners have used Jurryi to solve specific prosecution challenges and achieve measurable improvements in outcomes.",
          icon: <HiOutlinePencilSquare size={20} />,
        },
        {
          title: "Expert Interviews",
          description:
            "Conversations with leading patent attorneys, former examiners, IP strategists, and technology innovators sharing their perspectives on the future of patent prosecution and intellectual property.",
          icon: <HiOutlineMicrophone size={20} />,
        },
        {
          title: "Patent Law Changes",
          description:
            "Timely coverage and practical analysis of legislative updates, USPTO rule changes, and judicial decisions that affect patent prosecution practice and portfolio management strategy.",
          icon: <HiOutlineNewspaper size={20} />,
        },
        {
          title: "Technology Trends",
          description:
            "Forward-looking articles examining how emerging technologies — from generative AI to quantum computing — are reshaping patent landscapes and creating new opportunities for innovators.",
          icon: <HiOutlineEye size={20} />,
        },
      ]}
      howItHelps={{
        attorneys:
          "Stay current on patent law developments, prosecution best practices, and industry trends that directly impact your ability to provide strategic counsel and secure strong patent protection.",
        drafters:
          "Learn new drafting techniques, discover workflow optimizations, and gain insights from experienced practitioners that help you produce higher-quality applications more efficiently.",
        engineers:
          "Gain valuable insights into IP strategy, understand how patent portfolios create competitive advantages, and learn how to better articulate inventive contributions in disclosure processes.",
      }}
      accentColor="#2D7D46"
    />
  );
}
