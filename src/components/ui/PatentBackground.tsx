"use client";
import { useEffect, useRef } from "react";
import { PATENT_BG_TEXT, PATENT_WORDS } from "@/lib/constants";

export default function PatentBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const fullText = PATENT_BG_TEXT.repeat(80);
    el.textContent = fullText;

    const interval = setInterval(() => {
      const word = PATENT_WORDS[Math.floor(Math.random() * PATENT_WORDS.length)];
      const text = el.textContent || "";
      const idx = text.toLowerCase().indexOf(word);
      if (idx > -1) {
        const before = text.slice(0, idx);
        const match = text.slice(idx, idx + word.length);
        const after = text.slice(idx + word.length);
        el.innerHTML = "";
        el.appendChild(document.createTextNode(before));
        const span = document.createElement("span");
        span.textContent = match;
        span.style.color = "#C5A44E";
        span.style.transition = "color 0.5s";
        el.appendChild(span);
        el.appendChild(document.createTextNode(after));
        setTimeout(() => {
          span.style.color = "inherit";
        }, 500);
      }
    }, 3000);

    const handleScroll = () => {
      if (el) {
        el.style.transform = `translateY(${window.scrollY * -0.1}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <div ref={ref} className="patent-bg-texture" />;
}
