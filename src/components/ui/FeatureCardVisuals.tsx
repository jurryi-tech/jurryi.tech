"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════
   1. STAT — Big number + label + change badge
   ═══════════════════════════════════════════ */
interface StatData {
  value: string;
  label: string;
  change?: string;
}

function StatVisual({ data, accentColor }: { data: StatData; accentColor: string }) {
  return (
    <div className="flex items-end gap-3 py-3">
      <motion.span
        className="font-serif font-bold text-[32px] leading-none"
        style={{ color: accentColor }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {data.value}
      </motion.span>
      <div className="flex flex-col gap-1 pb-1">
        <span className="text-[11px] font-mono text-[#888]">{data.label}</span>
        {data.change && (
          <motion.span
            className="text-[10px] font-mono px-1.5 py-0.5 rounded-full w-fit"
            style={{ backgroundColor: accentColor + "15", color: accentColor }}
            initial={{ opacity: 0, x: -5 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {data.change}
          </motion.span>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   2. CHART — Animated vertical bar chart
   ═══════════════════════════════════════════ */
interface ChartData {
  bars: number[];
  labels?: string[];
}

function ChartVisual({ data, accentColor }: { data: ChartData; accentColor: string }) {
  return (
    <div className="flex items-end gap-1.5 h-[80px] py-2">
      {data.bars.map((val, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1">
          <motion.div
            className="w-full rounded-t-sm min-w-[12px]"
            style={{ backgroundColor: accentColor, opacity: 0.3 + (val / 100) * 0.7 }}
            initial={{ height: 0 }}
            whileInView={{ height: `${Math.max(val * 0.65, 4)}px` }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
          />
          {data.labels && data.labels[i] && (
            <span className="text-[8px] text-[#aaa] font-mono truncate w-full text-center">
              {data.labels[i]}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   3. LIST — Animated checklist items
   ═══════════════════════════════════════════ */
interface ListData {
  items: string[];
  checked?: number[];
}

function ListVisual({ data, accentColor }: { data: ListData; accentColor: string }) {
  const checkedSet = new Set(data.checked || data.items.map((_, i) => i));
  return (
    <div className="flex flex-col gap-2 py-2">
      {data.items.slice(0, 4).map((item, i) => (
        <motion.div
          key={i}
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
        >
          <motion.div
            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: checkedSet.has(i) ? accentColor + "20" : "#f0f0f0",
              border: `1.5px solid ${checkedSet.has(i) ? accentColor : "#ddd"}`,
            }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.1, type: "spring", stiffness: 400 }}
          >
            {checkedSet.has(i) && (
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1.5 4L3 5.5L6.5 2" stroke={accentColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </motion.div>
          <span className="text-[11px] text-[#666] leading-tight truncate">{item}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   4. COMPARISON — Before / After boxes
   ═══════════════════════════════════════════ */
interface ComparisonData {
  before: string;
  after: string;
  improvement: string;
}

function ComparisonVisual({ data, accentColor }: { data: ComparisonData; accentColor: string }) {
  return (
    <div className="flex items-center gap-2 py-2">
      <div className="flex-1 bg-[#f5f3f0] rounded-lg p-2.5 text-center">
        <span className="text-[9px] font-mono text-[#aaa] block mb-1">BEFORE</span>
        <span className="text-[13px] font-medium text-[#888] line-through">{data.before}</span>
      </div>
      <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
        <motion.svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          initial={{ opacity: 0, x: -4 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
        <motion.span
          className="text-[8px] font-mono font-medium whitespace-nowrap"
          style={{ color: accentColor }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {data.improvement}
        </motion.span>
      </div>
      <motion.div
        className="flex-1 rounded-lg p-2.5 text-center"
        style={{ backgroundColor: accentColor + "10", border: `1px solid ${accentColor}30` }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <span className="text-[9px] font-mono block mb-1" style={{ color: accentColor }}>AFTER</span>
        <span className="text-[13px] font-medium" style={{ color: accentColor }}>{data.after}</span>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   5. TIMELINE — 3 connected dots
   ═══════════════════════════════════════════ */
interface TimelineData {
  steps: string[];
}

function TimelineVisual({ data, accentColor }: { data: TimelineData; accentColor: string }) {
  return (
    <div className="flex items-start gap-0 py-3 px-1">
      {data.steps.slice(0, 3).map((step, i) => (
        <div key={i} className="flex items-center flex-1">
          <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <motion.div
              className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-mono font-bold text-white"
              style={{ backgroundColor: accentColor }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, type: "spring", stiffness: 300 }}
            >
              {i + 1}
            </motion.div>
            <span className="text-[9px] text-[#888] text-center leading-tight max-w-[70px]">{step}</span>
          </div>
          {i < data.steps.slice(0, 3).length - 1 && (
            <motion.div
              className="h-[1.5px] flex-1 mx-1 mt-2.5 self-start"
              style={{ backgroundColor: accentColor + "40" }}
              initial={{ scaleX: 0, transformOrigin: "left" }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.2, duration: 0.4 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   6. PROFILE — Mini user/entity card
   ═══════════════════════════════════════════ */
interface ProfileData {
  name: string;
  subtitle: string;
  stat: string;
  statLabel: string;
}

function ProfileVisual({ data, accentColor }: { data: ProfileData; accentColor: string }) {
  const initials = data.name.split(" ").map(w => w[0]).join("").slice(0, 2);
  const numVal = parseInt(data.stat) || 0;
  return (
    <motion.div
      className="flex items-center gap-3 py-2 px-3 rounded-lg border border-[#eee] bg-[#fafafa]"
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
        style={{ backgroundColor: accentColor }}
      >
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium text-[#333] truncate">{data.name}</p>
        <p className="text-[10px] text-[#999] truncate">{data.subtitle}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <div className="flex-1 h-1.5 rounded-full bg-[#eee] overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: accentColor }}
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.min(numVal, 100)}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            />
          </div>
          <span className="text-[9px] font-mono flex-shrink-0" style={{ color: accentColor }}>
            {data.stat} {data.statLabel}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   7. CODE — Mini dark terminal snippet
   ═══════════════════════════════════════════ */
interface CodeData {
  lines: string[];
}

function CodeVisual({ data, accentColor }: { data: CodeData; accentColor: string }) {
  return (
    <div className="bg-[#1e1e1e] rounded-lg p-3 py-2.5 overflow-hidden">
      <div className="flex gap-1.5 mb-2">
        <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
        <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
        <div className="w-2 h-2 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex flex-col gap-1">
        {data.lines.slice(0, 4).map((line, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.3 }}
          >
            <span className="text-[9px] font-mono text-[#555] select-none w-3 text-right">{i + 1}</span>
            <span className="text-[10px] font-mono text-[#ccc] truncate">
              {line.split(/(\b(?:import|from|const|function|return|await|POST|GET|200)\b)/).map((part, j) =>
                /^(import|from|const|function|return|await|POST|GET|200)$/.test(part) ? (
                  <span key={j} style={{ color: accentColor }}>{part}</span>
                ) : (
                  <span key={j}>{part}</span>
                )
              )}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   8. METRIC — Circular progress ring
   ═══════════════════════════════════════════ */
interface MetricData {
  value: number;
  max: number;
  label: string;
}

function MetricVisual({ data, accentColor }: { data: MetricData; accentColor: string }) {
  const pct = Math.min((data.value / data.max) * 100, 100);
  const r = 30;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex items-center gap-3 py-2">
      <div className="relative w-[70px] h-[70px] flex-shrink-0">
        <svg width="70" height="70" viewBox="0 0 70 70" className="transform -rotate-90">
          <circle cx="35" cy="35" r={r} fill="none" stroke="#eee" strokeWidth="4" />
          <motion.circle
            cx="35" cy="35" r={r} fill="none"
            stroke={accentColor}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[14px] font-bold font-mono" style={{ color: accentColor }}>
            {data.value}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-[11px] text-[#666] leading-tight">{data.label}</span>
        <span className="text-[9px] font-mono text-[#aaa]">of {data.max}</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   DISPATCHER
   ═══════════════════════════════════════════ */
export type CardType = "stat" | "chart" | "list" | "comparison" | "timeline" | "profile" | "code" | "metric";

export function renderCardVisual(
  cardType: CardType | undefined,
  cardData: Record<string, any> | undefined,
  accentColor: string
): ReactNode | null {
  if (!cardType || !cardData) return null;

  switch (cardType) {
    case "stat":
      return <StatVisual data={cardData as StatData} accentColor={accentColor} />;
    case "chart":
      return <ChartVisual data={cardData as ChartData} accentColor={accentColor} />;
    case "list":
      return <ListVisual data={cardData as ListData} accentColor={accentColor} />;
    case "comparison":
      return <ComparisonVisual data={cardData as ComparisonData} accentColor={accentColor} />;
    case "timeline":
      return <TimelineVisual data={cardData as TimelineData} accentColor={accentColor} />;
    case "profile":
      return <ProfileVisual data={cardData as ProfileData} accentColor={accentColor} />;
    case "code":
      return <CodeVisual data={cardData as CodeData} accentColor={accentColor} />;
    case "metric":
      return <MetricVisual data={cardData as MetricData} accentColor={accentColor} />;
    default:
      return null;
  }
}
