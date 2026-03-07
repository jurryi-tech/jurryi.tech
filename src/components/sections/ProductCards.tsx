"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Product card data ── */
const products = [
  {
    title: "AI Patent Drafter",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <rect x="8" y="4" width="26" height="36" rx="3" stroke="#1A1A1A" strokeWidth="2" fill="none" />
        <line x1="14" y1="14" x2="28" y2="14" stroke="#1A1A1A" strokeWidth="1.5" />
        <line x1="14" y1="20" x2="28" y2="20" stroke="#1A1A1A" strokeWidth="1.5" />
        <line x1="14" y1="26" x2="22" y2="26" stroke="#1A1A1A" strokeWidth="1.5" />
        <path d="M32 28l4-4 4 4-4 4z" fill="#C8A951" opacity="0.6" />
        <path d="M36 20l2-2 2 2-2 2z" fill="#C8A951" opacity="0.4" />
        <path d="M40 30l1.5-1.5 1.5 1.5-1.5 1.5z" fill="#C8A951" opacity="0.3" />
      </svg>
    ),
    description:
      "Generate complete patent specifications from invention disclosures. Multi-jurisdiction formatting. Claims, descriptions, abstracts \u2014 all in one pass.",
    features: "One-click drafting | Multi-jurisdiction | Claims optimization",
    badges: ["USPTO", "IPO", "EPO"],
  },
  {
    title: "Prior Art Search Engine",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <circle cx="20" cy="20" r="12" stroke="#1A1A1A" strokeWidth="2" fill="none" />
        <line x1="29" y1="29" x2="40" y2="40" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="16" cy="17" r="2" fill="#C8A951" opacity="0.5" />
        <circle cx="23" cy="15" r="1.5" fill="#C8A951" opacity="0.5" />
        <circle cx="20" cy="23" r="1.5" fill="#C8A951" opacity="0.5" />
        <line x1="16" y1="17" x2="23" y2="15" stroke="#C8A951" strokeWidth="0.8" opacity="0.4" />
        <line x1="23" y1="15" x2="20" y2="23" stroke="#C8A951" strokeWidth="0.8" opacity="0.4" />
        <line x1="20" y1="23" x2="16" y2="17" stroke="#C8A951" strokeWidth="0.8" opacity="0.4" />
      </svg>
    ),
    description:
      "Search 147 million+ documents in under 90 seconds. Semantic search, not just keyword matching. Cross-language coverage across 12 languages.",
    features: "147M+ documents | Semantic search | 12 languages",
    badges: [],
  },
  {
    title: "Office Action Response Generator",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <path d="M24 4L4 16v16l20 12 20-12V16L24 4z" stroke="#1A1A1A" strokeWidth="2" fill="none" />
        <polyline points="16,22 22,28 34,16" stroke="#C8A951" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
    description:
      "Analyze office actions, identify weaknesses in examiner's arguments, and generate strategic responses with predicted success rates.",
    features: "AI analysis | Strategy selection | Success prediction",
    badges: [],
  },
  {
    title: "Claim Amendment Engine",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <rect x="4" y="8" width="40" height="32" rx="3" stroke="#1A1A1A" strokeWidth="2" fill="none" />
        <line x1="24" y1="8" x2="24" y2="40" stroke="#1A1A1A" strokeWidth="1" opacity="0.3" />
        <line x1="10" y1="16" x2="20" y2="16" stroke="#C85050" strokeWidth="1.5" />
        <line x1="10" y1="22" x2="18" y2="22" stroke="#C85050" strokeWidth="1.5" />
        <line x1="28" y1="16" x2="38" y2="16" stroke="#50A050" strokeWidth="1.5" />
        <line x1="28" y1="22" x2="36" y2="22" stroke="#50A050" strokeWidth="1.5" />
        <line x1="28" y1="28" x2="40" y2="28" stroke="#50A050" strokeWidth="1.5" />
        <text x="7" y="34" fontSize="8" fill="#C85050" fontFamily="monospace">-</text>
        <text x="26" y="34" fontSize="8" fill="#50A050" fontFamily="monospace">+</text>
      </svg>
    ),
    description:
      "Intelligent claim narrowing and broadening suggestions based on prosecution history analytics. Art Unit-specific optimization.",
    features: "Prosecution analytics | Art Unit data | Claim optimization",
    badges: [],
  },
  {
    title: "Portfolio Analytics Dashboard",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <circle cx="24" cy="28" r="14" stroke="#1A1A1A" strokeWidth="1.5" fill="none" />
        <ellipse cx="24" cy="28" rx="14" ry="5" stroke="#1A1A1A" strokeWidth="1" opacity="0.3" fill="none" />
        <rect x="8" y="6" width="6" height="16" rx="1" stroke="#C8A951" strokeWidth="1.5" fill="#C8A951" opacity="0.2" />
        <rect x="16" y="2" width="6" height="20" rx="1" stroke="#C8A951" strokeWidth="1.5" fill="#C8A951" opacity="0.3" />
        <rect x="24" y="8" width="6" height="14" rx="1" stroke="#C8A951" strokeWidth="1.5" fill="#C8A951" opacity="0.2" />
        <rect x="32" y="4" width="6" height="18" rx="1" stroke="#C8A951" strokeWidth="1.5" fill="#C8A951" opacity="0.25" />
      </svg>
    ),
    description:
      "Track your entire patent portfolio across jurisdictions. Deadline management, prosecution status, grant predictions, and competitive intelligence.",
    features: "Multi-jurisdiction | Deadline tracking | Competitive intel",
    badges: [],
  },
  {
    title: "Examiner Intelligence",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <circle cx="24" cy="14" r="8" stroke="#1A1A1A" strokeWidth="2" fill="none" />
        <path d="M10 42c0-8 6-14 14-14s14 6 14 14" stroke="#1A1A1A" strokeWidth="2" fill="none" />
        <rect x="32" y="8" width="10" height="7" rx="1" stroke="#C8A951" strokeWidth="1" fill="none" />
        <line x1="34" y1="10.5" x2="40" y2="10.5" stroke="#C8A951" strokeWidth="0.8" />
        <line x1="34" y1="13" x2="38" y2="13" stroke="#C8A951" strokeWidth="0.8" />
      </svg>
    ),
    description:
      "Deep profiles on 8,400+ patent examiners. Allowance rates, favorite rejections, response patterns, interview success rates.",
    features: "8,400+ examiners | Allowance patterns | Interview data",
    badges: [],
  },
];

/* ── Product Card component ── */
function ProductCard({
  product,
}: {
  product: (typeof products)[number];
}) {
  return (
    <motion.div
      className="flex-shrink-0 w-[400px] bg-white rounded-xl shadow-md border-l-4 border-[#C8A951] p-8 flex flex-col gap-5"
      whileHover={{
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
        borderColor: "#E0C260",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-lg bg-[#FDFBF7] flex items-center justify-center">
        {product.icon}
      </div>

      {/* Title */}
      <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
        {product.title}
      </h3>

      {/* Description */}
      <p className="text-[#4A4A4A] text-sm leading-relaxed flex-1">
        {product.description}
      </p>

      {/* Key features */}
      <p className="text-xs font-mono tracking-wide text-[#C8A951] font-medium">
        {product.features}
      </p>

      {/* Jurisdiction badges */}
      {product.badges.length > 0 && (
        <div className="flex gap-2 pt-2">
          {product.badges.map((badge) => (
            <span
              key={badge}
              className="px-3 py-1 rounded-full text-xs font-mono font-semibold border border-[#C8A951]/40 text-[#C8A951] bg-[#C8A951]/5"
            >
              {badge}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ── Main Section ── */
export default function ProductCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const totalScroll = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top 80px",
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="product-cards"
      className={`bg-[#FDFBF7] overflow-hidden`}
    >
      {/* Section header */}
      <div className="pt-24 pb-12 px-8 md:px-16">
        <motion.p
          className="font-mono text-xs tracking-[0.3em] text-[#C8A951] uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The Platform
        </motion.p>
        <motion.h2
          className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Every Tool a Patent Team Needs
        </motion.h2>
      </div>

      {/* Cards — horizontal scroll on desktop, vertical stack on mobile */}
      {isMobile ? (
        <div className="flex flex-col gap-8 px-6 pb-24">
          {products.map((product) => (
            <div key={product.title} className="w-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="h-screen flex items-center">
          <div
            ref={trackRef}
            className="flex gap-8 pl-16 pr-[calc(100vw-400px)]"
          >
            {products.map((product) => (
              <ProductCard key={product.title} product={product} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
