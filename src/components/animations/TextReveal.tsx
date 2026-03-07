"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  scrollTrigger?: boolean;
  type?: "mask" | "fade-up" | "typewriter" | "chars";
  goldLine?: boolean;
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  scrollTrigger = true,
  type = "mask",
  goldLine = false,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const triggerConfig = scrollTrigger
      ? {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      : {};

    if (type === "mask") {
      gsap.fromTo(
        el,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration,
          delay,
          ease: "power3.out",
          ...triggerConfig,
        }
      );
      if (goldLine && lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, opacity: 1 },
          {
            scaleX: 1,
            opacity: 0,
            duration: duration + 0.2,
            delay,
            ease: "power3.out",
            ...triggerConfig,
          }
        );
      }
    } else if (type === "fade-up") {
      gsap.fromTo(
        el,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay,
          ease: "power2.out",
          ...triggerConfig,
        }
      );
    } else if (type === "chars") {
      const text = el.textContent || "";
      el.innerHTML = "";
      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        el.appendChild(span);
      });
      gsap.fromTo(
        el.children,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.02,
          stagger: 0.02,
          delay,
          ease: "none",
          ...triggerConfig,
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [delay, duration, scrollTrigger, type, goldLine]);

  return (
    <div className={`relative ${className}`}>
      <div ref={ref}>{children}</div>
      {goldLine && (
        <div
          ref={lineRef}
          className="absolute inset-0 border-r-2 border-gold pointer-events-none origin-left"
        />
      )}
    </div>
  );
}
