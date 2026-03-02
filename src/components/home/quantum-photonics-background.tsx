"use client";

import { motion } from "framer-motion";

type AtomConfig = {
  id: string;
  top?: string;
  left?: string;
  right?: string;
  size: number;
  electrons: number;
  delay: number;
};

type PhotonConfig = {
  id: string;
  top: string;
  left: string;
  length: number;
  delay: number;
};

const ATOMS: AtomConfig[] = [
  { id: "atom-1", top: "12%", left: "6%", size: 64, electrons: 2, delay: 0 },
  { id: "atom-2", top: "58%", right: "4%", size: 80, electrons: 3, delay: 1.5 },
  { id: "atom-3", top: "78%", left: "12%", size: 56, electrons: 1, delay: 0.8 },
];

const PHOTONS: PhotonConfig[] = [
  { id: "photon-1", top: "20%", left: "-5%", length: 96, delay: 0.4 },
  { id: "photon-2", top: "46%", left: "10%", length: 80, delay: 1.2 },
  { id: "photon-3", top: "70%", left: "-10%", length: 112, delay: 2.1 },
];

export const QuantumPhotonicsBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Atoms with orbiting electrons */}
      {ATOMS.map((atom) => (
        <div
          key={atom.id}
          className="absolute opacity-[0.22]"
          style={{
            top: atom.top,
            left: atom.left,
            right: atom.right,
          }}
        >
          <div
            className="relative"
            style={{
              width: atom.size,
              height: atom.size,
            }}
          >
            {/* Orbits */}
            <div className="absolute inset-0 rounded-full border border-emerald-200/18" />
            <div className="absolute inset-[18%] rounded-full border border-cyan-300/14" />

            {/* Nucleus */}
            <div className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/80 shadow-[0_0_18px_rgba(16,185,129,0.35)]" />

            {/* Electrons */}
            {Array.from({ length: atom.electrons }).map((_, idx) => (
              <motion.div
                key={`${atom.id}-electron-${idx}`}
                className="absolute inset-0"
                style={{
                  transformOrigin: "50% 50%",
                }}
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 18 + idx * 4,
                  ease: "linear",
                  delay: atom.delay + idx * 1.2,
                }}
              >
                <div className="absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-y-1/2 translate-x-6 rounded-full bg-cyan-300/75 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* Photon streaks */}
      {PHOTONS.map((photon) => (
        <motion.div
          key={photon.id}
          className="absolute h-px rounded-full bg-cyan-300/30"
          style={{
            top: photon.top,
            left: photon.left,
            width: photon.length,
          }}
          initial={{ x: "-10%", opacity: 0 }}
          animate={{ x: "140%", opacity: [0, 1, 0] }}
          transition={{
            repeat: Infinity,
            duration: 7.5,
            ease: "easeInOut",
            delay: photon.delay,
          }}
        />
      ))}
    </div>
  );
};

