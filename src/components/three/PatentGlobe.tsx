"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ── European country ISO codes ── */
const EUROPE_CODES = new Set([
  "040","056","100","191","203","208","233","246","250","276","300",
  "348","352","372","380","428","440","442","528","578","616","620",
  "642","703","705","724","752","756","826","008","070","499","688",
  "807","112","804",
]);
const USA_CODE = "840";
const INDIA_CODE = "356";

const LAND_COLOR = "#C8C3B8";
const USA_COLOR = "rgba(27, 42, 74, 0.7)";
const INDIA_COLOR = "rgba(196, 91, 40, 0.65)";
const EUROPE_COLOR = "rgba(0, 51, 153, 0.55)";

const LABELS = [
  { name: "United States", lat: 39, lon: -98, color: "#1B2A4A" },
  { name: "Europe", lat: 50, lon: 10, color: "#003399" },
  { name: "India", lat: 22, lon: 78, color: "#C45B28" },
];

export default function PatentGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [dimensions, setDimensions] = useState({ w: 800, h: 500 });

  useEffect(() => {
    const container = canvasRef.current?.parentElement;
    if (container) {
      const ro = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        setDimensions({ w: width, h: height });
      });
      ro.observe(container);
      return () => ro.disconnect();
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;

    async function draw() {
      try {
        const [worldData, topojsonClient, d3Geo] = await Promise.all([
          import("world-atlas/countries-110m.json"),
          import("topojson-client"),
          import("d3-geo"),
        ]);
        if (cancelled) return;

        const topology = worldData.default || worldData;
        const countriesGeo = topojsonClient.feature(
          topology as any,
          (topology as any).objects.countries
        ) as any;

        if (!canvas) return;
        const ctx = canvas.getContext("2d")!;
        const dpr = window.devicePixelRatio || 1;
        const w = dimensions.w;
        const h = dimensions.h;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        ctx.scale(dpr, dpr);

        // Clear
        ctx.clearRect(0, 0, w, h);

        // Natural Earth projection
        const projection = d3Geo.geoNaturalEarth1()
          .fitSize([w - 40, h - 40], { type: "Sphere" } as any)
          .translate([w / 2, h / 2]);

        const pathGen = d3Geo.geoPath(projection, ctx);

        // Draw graticule
        const graticule = d3Geo.geoGraticule10();
        ctx.beginPath();
        pathGen(graticule);
        ctx.strokeStyle = "rgba(197, 164, 78, 0.08)";
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Draw globe outline
        ctx.beginPath();
        pathGen({ type: "Sphere" } as any);
        ctx.strokeStyle = "rgba(197, 164, 78, 0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw all countries
        for (const feature of countriesGeo.features) {
          const id = feature.id || feature.properties?.id;
          ctx.beginPath();
          pathGen(feature);

          if (id === USA_CODE) {
            ctx.fillStyle = USA_COLOR;
          } else if (id === INDIA_CODE) {
            ctx.fillStyle = INDIA_COLOR;
          } else if (EUROPE_CODES.has(id)) {
            ctx.fillStyle = EUROPE_COLOR;
          } else {
            ctx.fillStyle = LAND_COLOR;
          }
          ctx.fill();
          ctx.strokeStyle = "rgba(160, 154, 142, 0.4)";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        // Draw pulsing dots for jurisdictions
        for (const label of LABELS) {
          const [x, y] = projection([label.lon, label.lat]) || [0, 0];
          // Outer glow
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 12);
          gradient.addColorStop(0, label.color + "80");
          gradient.addColorStop(1, label.color + "00");
          ctx.beginPath();
          ctx.arc(x, y, 12, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
          // Core dot
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = label.color;
          ctx.fill();
        }

        // Connection arcs
        const points = LABELS.map((l) => projection([l.lon, l.lat]) || [0, 0]);
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = "rgba(197, 164, 78, 0.3)";
        ctx.lineWidth = 1;
        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            const [x1, y1] = points[i];
            const [x2, y2] = points[j];
            const mx = (x1 + x2) / 2;
            const my = Math.min(y1, y2) - 30;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.quadraticCurveTo(mx, my, x2, y2);
            ctx.stroke();
          }
        }
        ctx.setLineDash([]);

        setReady(true);
      } catch (err) {
        console.warn("Map draw failed:", err);
      }
    }

    draw();
    return () => { cancelled = true; };
  }, [dimensions]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative" style={{ background: "radial-gradient(circle at center, #FDFBF7 0%, #F0EDE6 100%)" }}>
      <motion.canvas
        ref={canvasRef}
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 1 }}
      />
      {/* Jurisdiction labels */}
      {ready && (
        <div className="absolute inset-0 pointer-events-none">
          {LABELS.map((label, i) => (
            <motion.div
              key={label.name}
              className="absolute"
              style={{
                left: label.name === "United States" ? "18%" : label.name === "Europe" ? "50%" : "68%",
                top: label.name === "India" ? "62%" : "32%",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.2, duration: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: label.color }}
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                />
                <span className="font-mono text-[10px] tracking-[0.15em] text-[#5A5A5A] uppercase whitespace-nowrap">
                  {label.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
