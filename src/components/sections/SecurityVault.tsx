"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── SVG Icons ── */
const LockIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    <circle cx="12" cy="16" r="1" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const KeyIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);

const CloudIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    <path d="M12 12v6" />
    <path d="M8 16l4-4 4 4" />
  </svg>
);

const UsersIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const GavelIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 2.5l5 5-1.5 1.5-5-5z" />
    <path d="M8.5 8.5l5 5-1.5 1.5-5-5z" />
    <path d="M3 20l3-3" />
    <path d="M2 22h8" />
    <path d="M18 6l2-2" />
  </svg>
);

/* ── Card data ── */
const securityCards = [
  {
    icon: <LockIcon />,
    title: "Zero-Knowledge Architecture",
    description:
      "Your patent disclosures are processed in encrypted memory and never stored. The system retains no copies of your invention data \u2014 not in logs, not in training data, not anywhere.",
  },
  {
    icon: <ShieldIcon />,
    title: "SOC 2 Type II Certified",
    description:
      "Annual independent audits verify our security controls meet the highest standards for data protection, availability, and confidentiality.",
  },
  {
    icon: <KeyIcon />,
    title: "AES-256 Encryption",
    description:
      "All data in transit and at rest is encrypted using AES-256, the same standard used by intelligence agencies and financial institutions.",
  },
  {
    icon: <CloudIcon />,
    title: "Private Cloud Deployment",
    description:
      "Deploy Jurryi entirely within your own cloud infrastructure. Your data never leaves your environment. Full air-gap capability.",
  },
  {
    icon: <UsersIcon />,
    title: "Role-Based Access Control",
    description:
      "Granular permissions ensure only authorized team members can access specific patent applications, with complete audit trails.",
  },
  {
    icon: <GavelIcon />,
    title: "Attorney-Client Privilege Preserved",
    description:
      "Jurryi is designed as a tool under attorney direction \u2014 all outputs are work product under the supervision of a licensed practitioner.",
  },
];

export default function SecurityVault() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const vaultRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const vault = vaultRef.current;
    const trust = trustRef.current;
    if (!section || !vault || !trust) return;

    const ctx = gsap.context(() => {
      /* ── Vault door rotation on scroll ── */
      gsap.fromTo(
        vault,
        { rotation: 0 },
        {
          rotation: 90,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "40% center",
            scrub: 1,
          },
        }
      );

      /* ── Cards staggered fade-up ── */
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 70%",
              scrub: false,
              toggleActions: "play none none reverse",
            },
            delay: i * 0.1,
          }
        );
      });

      /* ── Trust bar ── */
      gsap.fromTo(
        trust,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: trust,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 md:py-32"
      style={{ background: "#1A1A1A" }}
    >
      {/* ── Title ── */}
      <div className="text-center mb-16 px-4">
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
          className="text-gray-400 text-lg md:text-xl tracking-wider uppercase"
        >
          Enterprise-Grade Security Architecture
        </motion.p>
      </div>

      {/* ── Vault Door ── */}
      <div className="flex justify-center mb-20">
        <div
          ref={vaultRef}
          className="relative w-[200px] h-[200px] md:w-[280px] md:h-[280px]"
          style={{ transformOrigin: "center center" }}
        >
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: "4px solid #B8860B",
              boxShadow:
                "0 0 30px rgba(184, 134, 11, 0.15), inset 0 0 20px rgba(184, 134, 11, 0.05)",
            }}
          />
          {/* Middle ring */}
          <div
            className="absolute rounded-full"
            style={{
              inset: "16px",
              border: "3px solid #8B7355",
              boxShadow: "inset 0 0 15px rgba(139, 115, 85, 0.1)",
            }}
          />
          {/* Inner ring */}
          <div
            className="absolute rounded-full"
            style={{
              inset: "36px",
              border: "2px solid #DAA520",
              boxShadow: "inset 0 0 10px rgba(218, 165, 32, 0.1)",
            }}
          />
          {/* Center circle */}
          <div
            className="absolute rounded-full flex items-center justify-center"
            style={{
              inset: "56px",
              background:
                "radial-gradient(circle, #2C2C2C 0%, #1A1A1A 100%)",
              border: "2px solid #B8860B",
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#DAA520"
              strokeWidth="1.5"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          {/* Spokes / handle lines */}
          {[0, 60, 120].map((deg) => (
            <div
              key={deg}
              className="absolute top-1/2 left-1/2 h-[1px] origin-left"
              style={{
                width: "calc(50% - 10px)",
                background:
                  "linear-gradient(to right, transparent, #B8860B, transparent)",
                transform: `rotate(${deg}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Security Cards Grid ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {securityCards.map((card, i) => (
          <div
            key={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="group rounded-xl p-6 md:p-8 transition-all duration-300 opacity-0"
            style={{
              background: "#2C2C2C",
              border: "1px solid rgba(184, 134, 11, 0.15)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "rgba(184, 134, 11, 0.6)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "rgba(184, 134, 11, 0.15)";
            }}
          >
            <div className="text-[#DAA520] mb-4">{card.icon}</div>
            <h3 className="text-white font-semibold text-lg mb-3">
              {card.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* ── Trust Bar ── */}
      <div
        ref={trustRef}
        className="max-w-4xl mx-auto mt-20 px-4 text-center opacity-0"
      >
        <div
          className="py-6 px-8 rounded-lg"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(184, 134, 11, 0.08), transparent)",
            borderTop: "1px solid rgba(184, 134, 11, 0.2)",
            borderBottom: "1px solid rgba(184, 134, 11, 0.2)",
          }}
        >
          <p className="text-gray-400 text-sm md:text-base tracking-wide">
            Trusted by{" "}
            <span className="text-[#DAA520] font-medium">AmLaw 100 firms</span>{" "}
            |{" "}
            <span className="text-[#DAA520] font-medium">
              Fortune 500 IP departments
            </span>{" "}
            |{" "}
            <span className="text-[#DAA520] font-medium">
              International patent prosecution teams
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
