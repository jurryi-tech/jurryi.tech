"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface DrawSVGProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

export default function DrawSVG({
  children,
  className = "",
  duration = 1.5,
  delay = 0,
}: DrawSVGProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const paths = ref.current.querySelectorAll("path, line, circle, rect, polyline, polygon");

    paths.forEach((path) => {
      const el = path as SVGGeometryElement;
      if (el.getTotalLength) {
        const length = el.getTotalLength();
        gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(el, {
          strokeDashoffset: 0,
          duration,
          delay,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === ref.current) t.kill();
      });
    };
  }, [duration, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
