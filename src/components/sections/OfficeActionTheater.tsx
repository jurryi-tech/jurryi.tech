"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Analysis ring data ── */
const rings = [
  {
    label: "Parsing examiner\u2019s rationale...",
    result: "Core argument: Combination of Smith + Patel + Zhang",
  },
  {
    label: "Analyzing cited references...",
    result:
      "Smith: federated learning base | Patel: DP mechanism | Zhang: medical imaging",
  },
  {
    label: "Identifying combination weaknesses...",
    result:
      "No teaching, suggestion, or motivation to combine Smith with Patel in medical domain",
  },
  {
    label: "Searching historical responses...",
    result: "847 similar Art Unit 2122 \u00A7 103 rejections analyzed",
  },
  {
    label: "Identifying successful strategies...",
    result:
      "Strategy #1: Challenge motivation (78%) | Strategy #2: Unexpected results (71%) | Strategy #3: Amend claims (89%)",
  },
  {
    label: "Generating optimal response...",
    result: "Combined strategy: Amend + Challenge | Predicted: 91% allowance",
  },
];

export default function OfficeActionTheater() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const documentRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const ringsContainerRef = useRef<HTMLDivElement>(null);
  const ringRefs = useRef<(HTMLDivElement | null)[]>([]);
  const responseRef = useRef<HTMLDivElement>(null);
  const greenStampRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const doc = documentRef.current;
    const stamp = stampRef.current;
    const ringsContainer = ringsContainerRef.current;
    const response = responseRef.current;
    const greenStamp = greenStampRef.current;
    const metrics = metricsRef.current;

    if (
      !section ||
      !pin ||
      !doc ||
      !stamp ||
      !ringsContainer ||
      !response ||
      !greenStamp ||
      !metrics
    )
      return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: pin,
        },
      });

      /* ── PHASE 1: Document descends into center (0-25%) ── */
      tl.fromTo(
        doc,
        { y: -300, rotation: -5, opacity: 0, scale: 0.9 },
        { y: 0, rotation: 0, opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" }
      );

      // Red stamp slams down
      tl.to(
        stamp,
        { scale: 1, opacity: 1, rotation: -12, duration: 0.05, ease: "back.out(3)" },
        "+=0.02"
      );

      // Hold for reading
      tl.to(doc, { duration: 0.08 });

      /* ── PHASE 2: AI Analyzes (25-55%) ── */
      // Document moves left and shrinks
      tl.to(doc, {
        x: "-35%",
        scale: 0.7,
        duration: 0.1,
        ease: "power2.inOut",
      });

      // Rings container appears
      tl.to(
        ringsContainer,
        { opacity: 1, x: 0, duration: 0.05, ease: "power2.out" },
        "<0.03"
      );

      // Each ring scales in
      ringRefs.current.forEach((ring, i) => {
        if (!ring) return;
        tl.fromTo(
          ring,
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.04, ease: "power2.out" },
          `>-0.01`
        );
      });

      // Hold analysis view
      tl.to(ringsContainer, { duration: 0.08 });

      /* ── PHASE 3: Response Document (55-100%) ── */
      // Fade out OA + rings
      tl.to([doc, ringsContainer], { opacity: 0, duration: 0.05 });

      // Response slides up
      tl.fromTo(
        response,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.12, ease: "power2.out" }
      );

      // Metrics fade in
      tl.fromTo(
        metrics,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.08, ease: "power2.out" },
        "+=0.02"
      );

      // ALLOWED stamp
      tl.to(
        greenStamp,
        { scale: 1, opacity: 1, rotation: -8, duration: 0.05, ease: "back.out(3)" },
        "+=0.01"
      );

      // Hold final view
      tl.to(response, { duration: 0.1 });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[180vh] w-full overflow-hidden"
      style={{
        background: `
          repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 27px,
            rgba(180, 160, 120, 0.03) 27px,
            rgba(180, 160, 120, 0.03) 28px
          ),
          #FAF8F5
        `,
      }}
    >
      {/* Section title */}
      <div className="absolute top-0 left-0 w-full z-30 pt-8 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-[#C8A951] uppercase mb-2">
            Office Action Response
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">
            From Rejection to Allowance
          </h2>
        </motion.div>
      </div>

      {/* Pinned viewport container */}
      <div
        ref={pinRef}
        className="relative h-screen flex items-center justify-center px-4 md:px-12 lg:px-20 overflow-hidden"
      >
        {/* ── PHASE 1: Office Action Document ── */}
        <div
          ref={documentRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[640px] bg-white shadow-2xl border border-gray-200 p-6 md:p-10 font-mono text-[11px] md:text-[13px] leading-relaxed text-gray-800 z-10"
          style={{ transformOrigin: "center center", opacity: 0 }}
        >
          <div className="text-center font-bold text-[13px] md:text-[15px] tracking-wider mb-4 text-gray-900">
            UNITED STATES PATENT AND TRADEMARK OFFICE
          </div>
          <div className="flex justify-between mb-1 text-gray-600 text-[10px] md:text-[12px]">
            <span>Office Action Summary</span>
            <span>Application No. 18/947,283</span>
          </div>
          <div className="flex justify-between mb-6 text-gray-600 text-[10px] md:text-[12px]">
            <span>Examiner: Wei Chen</span>
            <span>Art Unit: 2122</span>
          </div>
          <div className="border-t border-gray-300 pt-4 mb-4 font-bold text-gray-900 text-[12px] md:text-[14px]">
            REJECTION UNDER 35 U.S.C. &sect; 103
          </div>
          <p className="mb-3">
            Claims 1-16 are rejected under 35 U.S.C. &sect; 103 as being
            unpatentable over:
          </p>
          <div className="pl-6 mb-3 text-gray-700">
            <p>Smith (US 10,234,567) in view of</p>
            <p>Patel (US 11,345,678) and further in view of</p>
            <p>Zhang (WO 2023/012345)</p>
          </div>
          <p className="text-gray-700">
            The examiner maintains that it would have been obvious to one of
            ordinary skill in the art to combine the federated learning
            framework of Smith with the differential privacy mechanism of Patel
            and the medical imaging application of Zhang...
          </p>

          {/* Red rejection stamp */}
          <div
            ref={stampRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-red-600 text-red-600 font-bold text-2xl md:text-3xl px-6 py-3 opacity-0 scale-0 pointer-events-none"
            style={{
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            &sect; 103 REJECTION
          </div>
        </div>

        {/* ── PHASE 2: Analysis Rings ── */}
        <div
          ref={ringsContainerRef}
          className="absolute right-[5%] md:right-[10%] top-1/2 -translate-y-1/2 w-[420px] md:w-[500px] h-[420px] md:h-[500px] opacity-0 translate-x-[60px]"
        >
          {rings.map((ring, i) => {
            const size = 100 + i * 60;
            return (
              <div
                key={i}
                ref={(el) => {
                  ringRefs.current[i] = el;
                }}
                className="absolute rounded-full flex items-center justify-center opacity-0"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `50%`,
                  left: `50%`,
                  transform: `translate(-50%, -50%)`,
                  border: `2px solid rgba(30, 64, 175, ${0.8 - i * 0.1})`,
                  background: `radial-gradient(circle, rgba(30, 64, 175, ${0.04 + i * 0.01}) 0%, transparent 70%)`,
                }}
              >
                <div className="absolute text-center px-2" style={{ maxWidth: `${size - 20}px` }}>
                  <p className="text-[9px] md:text-[10px] text-blue-800 font-semibold leading-tight">
                    {ring.label}
                  </p>
                  <p className="text-[8px] md:text-[9px] text-blue-600 leading-tight mt-0.5">
                    {ring.result}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── PHASE 3: Response Document ── */}
        <div
          ref={responseRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[640px] bg-white shadow-2xl border border-gray-200 p-6 md:p-10 font-mono text-[11px] md:text-[13px] leading-relaxed text-gray-800 opacity-0 z-20"
        >
          <div className="text-center font-bold text-[13px] md:text-[15px] tracking-wider mb-6 text-gray-900">
            RESPONSE TO OFFICE ACTION
          </div>
          <p className="mb-6 text-gray-700">
            The Examiner&apos;s rejection fails to establish a prima facie case
            of obviousness because there is no teaching, suggestion, or
            motivation in the cited references to combine the federated learning
            framework of Smith with the differential privacy mechanism of Patel
            specifically in the medical imaging domain of Zhang...
          </p>

          {/* Success metrics */}
          <div ref={metricsRef} className="border-t border-gray-300 pt-4 space-y-2 opacity-0">
            <div className="flex items-center gap-2 text-gray-600 text-[11px] md:text-[12px]">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
              Time to generate response: 4 minutes 23 seconds
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-[11px] md:text-[12px]">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
              Historical success rate for this strategy: 91%
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-[11px] md:text-[12px]">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              Predicted outcome: ALLOWANCE
            </div>
          </div>

          {/* Green allowed stamp */}
          <div
            ref={greenStampRef}
            className="absolute top-[40%] right-[10%] border-4 border-green-600 text-green-600 font-bold text-3xl md:text-4xl px-8 py-4 opacity-0 scale-0 pointer-events-none"
            style={{
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
            }}
          >
            ALLOWED
          </div>
        </div>
      </div>
    </section>
  );
}
