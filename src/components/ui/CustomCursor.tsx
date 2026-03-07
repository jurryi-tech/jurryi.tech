"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isThreeHover, setIsThreeHover] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const rippleId = useRef(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-cursor-hover]")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
      if (target.closest(".three-canvas-container") || target.tagName === "CANVAS") {
        setIsThreeHover(true);
      } else {
        setIsThreeHover(false);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const id = ++rippleId.current;
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 400);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("click", handleClick);
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("click", handleClick);
      document.body.style.cursor = "";
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        animate={{
          x: position.x - (isHovering ? 12 : 10),
          y: position.y - (isHovering ? 12 : 10),
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        {isThreeHover ? (
          <div className="w-6 h-6 flex items-center justify-center text-text-primary text-xs font-mono">
            ↻
          </div>
        ) : isHovering ? (
          <div className="w-6 h-6 rounded-full bg-gold/20 border border-gold/40" />
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20">
            <line x1="10" y1="2" x2="10" y2="18" stroke="#1A1A1A" strokeWidth="1" />
            <line x1="2" y1="10" x2="18" y2="10" stroke="#1A1A1A" strokeWidth="1" />
          </svg>
        )}
      </motion.div>
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="fixed pointer-events-none z-[99998] rounded-full border border-gold/10"
            style={{ left: ripple.x, top: ripple.y }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.1 }}
            animate={{ width: 40, height: 40, x: -20, y: -20, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
