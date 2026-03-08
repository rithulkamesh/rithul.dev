"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

/** Subtle drifting document icons for docproc page. Use inside a relative container. */
export function DocprocDrift() {
  const positions = [
    { left: "10%", top: "20%", delay: 0, duration: 12 },
    { left: "85%", top: "15%", delay: 2, duration: 14 },
    { left: "5%", top: "60%", delay: 1, duration: 10 },
    { left: "90%", top: "55%", delay: 3, duration: 11 },
    { left: "40%", top: "10%", delay: 0.5, duration: 13 },
    { left: "70%", top: "75%", delay: 1.5, duration: 15 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.06]">
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: pos.left, top: pos.top }}
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -15, 10, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: pos.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: pos.delay,
            ease: "easeInOut",
          }}
        >
          <FileText className="h-4 w-4 text-foreground" />
        </motion.div>
      ))}
    </div>
  );
}
