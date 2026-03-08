"use client";

import { motion } from "framer-motion";

/** Small nodes exchanging pulses for hivemind page. Use inside a relative container. */
export function HivemindPulses() {
  const nodes = [
    { left: "15%", top: "25%" },
    { left: "50%", top: "20%" },
    { left: "85%", top: "25%" },
    { left: "25%", top: "70%" },
    { left: "75%", top: "70%" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.08]">
      {nodes.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-primary"
          style={{ left: pos.left, top: pos.top }}
          animate={{
            boxShadow: [
              "0 0 0 0 hsl(var(--primary) / 0.4)",
              "0 0 0 12px hsl(var(--primary) / 0)",
            ],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.4,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
