"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const platformLinks = [
  "AI Patent Drafter",
  "Prior Art Search",
  "Office Action Response",
  "Claim Amendment Engine",
  "Portfolio Analytics",
  "Examiner Intelligence",
];

const resourceLinks = [
  "Documentation",
  "API Reference",
  "Patent Law Guide",
  "Blog",
  "Case Studies",
  "Webinars",
];

const companyLinks = [
  "About Us",
  "Careers",
  "Security",
  "Privacy Policy",
  "Terms of Service",
  "Contact",
];

const socialLinks = ["LinkedIn", "Twitter/X", "GitHub"];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".footer-col", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#111111] text-[#999] px-6 pt-20 pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div className="footer-col">
            <p className="font-mono text-white text-xl tracking-[0.2em] font-bold mb-4">
              JURRYI
            </p>
            <p className="text-sm leading-relaxed mb-6">
              AI-Powered Patent Prosecution Infrastructure
            </p>
            <p className="text-xs text-[#666]">
              &copy; 2024 Jurryi Tech, Inc. All rights reserved.
            </p>
          </div>

          {/* Column 2: Platform */}
          <div className="footer-col">
            <h4 className="font-mono text-white text-xs tracking-[0.2em] uppercase mb-5">
              Platform
            </h4>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="footer-col">
            <h4 className="font-mono text-white text-xs tracking-[0.2em] uppercase mb-5">
              Resources
            </h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="footer-col">
            <h4 className="font-mono text-white text-xs tracking-[0.2em] uppercase mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#333] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#666]">
            Built for patent attorneys, by patent attorneys.
          </p>
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-[#666] hover:text-white transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
