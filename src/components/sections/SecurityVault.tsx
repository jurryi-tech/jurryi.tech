"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const securityCards = [
  {
    icon: "lock",
    title: "Zero-Knowledge Architecture",
    description:
      "Your patent disclosures are processed in encrypted memory and never stored. The system retains no copies of your invention data \u2014 not in logs, not in training data, not anywhere.",
  },
  {
    icon: "shield",
    title: "SOC 2 Type II — In Progress",
    description:
      "SOC 2 Type II certification is currently under process. Our security infrastructure is being independently audited to verify controls for data protection, availability, and confidentiality.",
  },
  {
    icon: "key",
    title: "AES-256 Encryption",
    description:
      "All data in transit and at rest is encrypted using AES-256, the same standard used by intelligence agencies and financial institutions.",
  },
  {
    icon: "cloud",
    title: "Private Cloud Deployment",
    description:
      "Deploy Jurryi entirely within your own cloud infrastructure. Your data never leaves your environment. Full air-gap capability.",
  },
  {
    icon: "users",
    title: "Role-Based Access Control",
    description:
      "Granular permissions ensure only authorized team members can access specific patent applications, with complete audit trails.",
  },
  {
    icon: "gavel",
    title: "Attorney-Client Privilege Preserved",
    description:
      "Jurryi is designed as a tool under attorney direction \u2014 all outputs are work product under the supervision of a licensed practitioner.",
  },
];

function CardIcon({ type }: { type: string }) {
  const cls = "w-6 h-6";
  switch (type) {
    case "lock":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          <circle cx="12" cy="16" r="1" />
        </svg>
      );
    case "shield":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "key":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="15" r="5" />
          <path d="M11.5 11.5L17 6" />
          <path d="M17 6h4v4" />
          <path d="M14 9l3-3" />
        </svg>
      );
    case "cloud":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          <path d="M12 12v6M8 16l4-4 4 4" />
        </svg>
      );
    case "users":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "gavel":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2.5l5 5-1.5 1.5-5-5z" />
          <path d="M8.5 8.5l5 5-1.5 1.5-5-5z" />
          <path d="M3 20l3-3M2 22h8M18 6l2-2" />
        </svg>
      );
    default:
      return null;
  }
}

function VaultDoorSVG() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="w-[280px] h-[280px] md:w-[360px] md:h-[360px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer bezel — thick ring */}
      <circle cx="200" cy="200" r="195" stroke="#3A3A3A" strokeWidth="4" />
      <circle cx="200" cy="200" r="190" stroke="#C5A44E" strokeWidth="1" opacity="0.5" />
      <circle cx="200" cy="200" r="185" stroke="#5A5A5A" strokeWidth="2" />

      {/* Machined grooves on bezel */}
      {Array.from({ length: 72 }).map((_, i) => {
        const angle = (i * 5 * Math.PI) / 180;
        const x1 = 200 + Math.cos(angle) * 186;
        const y1 = 200 + Math.sin(angle) * 186;
        const x2 = 200 + Math.cos(angle) * 193;
        const y2 = 200 + Math.sin(angle) * 193;
        return (
          <line
            key={`tick-${i}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={i % 6 === 0 ? "#C5A44E" : "#4A4A4A"}
            strokeWidth={i % 6 === 0 ? "1.5" : "0.5"}
            opacity={i % 6 === 0 ? "0.8" : "0.4"}
          />
        );
      })}

      {/* Door face — main circle */}
      <circle cx="200" cy="200" r="170" fill="url(#vaultGradient)" stroke="#4A4A4A" strokeWidth="2" />

      {/* Concentric decorative rings */}
      <circle cx="200" cy="200" r="155" stroke="#3A3A3A" strokeWidth="1" opacity="0.5" />
      <circle cx="200" cy="200" r="140" stroke="#C5A44E" strokeWidth="0.5" opacity="0.3" />
      <circle cx="200" cy="200" r="120" stroke="#3A3A3A" strokeWidth="1" opacity="0.4" />

      {/* Bolt holes — 8 around the perimeter */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const cx = 200 + Math.cos(angle) * 158;
        const cy = 200 + Math.sin(angle) * 158;
        return (
          <g key={`bolt-${i}`}>
            <circle cx={cx} cy={cy} r="8" fill="#2A2A2A" stroke="#4A4A4A" strokeWidth="1" />
            <circle cx={cx} cy={cy} r="3" fill="#3A3A3A" />
            <line
              x1={cx - 2} y1={cy} x2={cx + 2} y2={cy}
              stroke="#555" strokeWidth="1"
            />
          </g>
        );
      })}

      {/* Handle / wheel — three spokes */}
      <circle cx="200" cy="200" r="70" stroke="#C5A44E" strokeWidth="3" fill="none" />
      <circle cx="200" cy="200" r="65" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.5" />

      {/* Spoke 1 */}
      <line x1="200" y1="130" x2="200" y2="200" stroke="#C5A44E" strokeWidth="4" strokeLinecap="round" />
      {/* Spoke 2 */}
      <line x1="139.4" y1="235" x2="200" y2="200" stroke="#C5A44E" strokeWidth="4" strokeLinecap="round" />
      {/* Spoke 3 */}
      <line x1="260.6" y1="235" x2="200" y2="200" stroke="#C5A44E" strokeWidth="4" strokeLinecap="round" />

      {/* Spoke handle balls */}
      <circle cx="200" cy="130" r="6" fill="#C5A44E" />
      <circle cx="139.4" cy="235" r="6" fill="#C5A44E" />
      <circle cx="260.6" cy="235" r="6" fill="#C5A44E" />

      {/* Center hub */}
      <circle cx="200" cy="200" r="25" fill="url(#hubGradient)" stroke="#C5A44E" strokeWidth="2" />
      <circle cx="200" cy="200" r="15" fill="#1A1A1A" stroke="#8B7355" strokeWidth="1" />

      {/* Keyhole */}
      <circle cx="200" cy="196" r="4" fill="#C5A44E" opacity="0.8" />
      <rect x="198" y="198" width="4" height="10" rx="1" fill="#C5A44E" opacity="0.8" />

      {/* Locking bars (visible at edges) */}
      {[0, 90, 180, 270].map((deg) => {
        const angle = (deg * Math.PI) / 180;
        const x = 200 + Math.cos(angle) * 175;
        const y = 200 + Math.sin(angle) * 175;
        const w = deg % 180 === 0 ? 20 : 6;
        const h = deg % 180 === 0 ? 6 : 20;
        return (
          <rect
            key={`bar-${deg}`}
            x={x - w / 2} y={y - h / 2}
            width={w} height={h} rx="2"
            fill="#C5A44E" opacity="0.6"
          />
        );
      })}

      {/* Gradients */}
      <defs>
        <radialGradient id="vaultGradient" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#2E2E2E" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </radialGradient>
        <radialGradient id="hubGradient" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#3A3A3A" />
          <stop offset="100%" stopColor="#222222" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default function SecurityVault() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const vaultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const vault = vaultRef.current;
    if (!section || !vault) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        vault,
        { rotation: 0 },
        {
          rotation: 120,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "50% center",
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32"
      style={{ background: "linear-gradient(180deg, #141414 0%, #1A1A1A 50%, #141414 100%)" }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#C5A44E 1px, transparent 1px), linear-gradient(90deg, #C5A44E 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10">
        {/* Title */}
        <div className="text-center mb-16 px-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs tracking-[0.3em] text-[#C5A44E] mb-4 uppercase"
          >
            Security Infrastructure
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-serif text-4xl md:text-6xl font-bold text-white tracking-wide mb-4"
          >
            THE VAULT
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[#8B7355] text-base md:text-lg tracking-wider uppercase font-mono text-sm"
          >
            Enterprise-Grade Security Architecture
          </motion.p>
        </div>

        {/* Vault Door */}
        <div className="flex justify-center mb-20">
          <div ref={vaultRef} style={{ transformOrigin: "center center" }}>
            <VaultDoorSVG />
          </div>
        </div>

        {/* Security Cards Grid */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {securityCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-xl p-6 md:p-8 transition-all duration-300 border border-[#2C2C2C] hover:border-[#C5A44E]/40 bg-[#1E1E1E]/80 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-[#C5A44E]/10 border border-[#C5A44E]/20 flex items-center justify-center text-[#C5A44E] mb-4">
                <CardIcon type={card.icon} />
              </div>
              <h3 className="text-white font-semibold text-base mb-3">
                {card.title}
              </h3>
              <p className="text-[#999] text-sm leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust Bar */}
      </div>
    </section>
  );
}
