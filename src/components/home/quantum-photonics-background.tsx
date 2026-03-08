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

type CodeParticleConfig = {
  id: string;
  symbol: string;
  top: string;
  left?: string;
  right?: string;
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

const CODE_PARTICLES: CodeParticleConfig[] = [
  { id: "code-1", symbol: "{ }", top: "35%", left: "88%", delay: 0.6 },
  { id: "code-2", symbol: "λ", top: "85%", right: "18%", delay: 2.2 },
  { id: "code-3", symbol: "->", top: "22%", right: "25%", delay: 1.1 },
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

      {/* Code-themed particles — subtle, same palette */}
      {CODE_PARTICLES.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute font-mono text-emerald-300/20 dark:text-cyan-300/18 text-lg whitespace-nowrap select-none"
          style={{
            top: particle.top,
            left: particle.left,
            right: particle.right,
            fontFamily: "var(--font-code), 'Fira Code', monospace",
            fontFeatureSettings: '"liga" 1, "calt" 1',
          }}
          initial={{ opacity: 0, y: 4, rotate: -3 }}
          animate={{
            opacity: [0, 0.12, 0.08, 0.12, 0],
            y: [4, -2, 2, -1, 4],
            rotate: [-3, 2, -1, 1, -3],
          }}
          transition={{
            repeat: Infinity,
            duration: 14 + (particle.delay % 3) * 2,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        >
          {particle.symbol}
        </motion.div>
      ))}
    </div>
  );
};

