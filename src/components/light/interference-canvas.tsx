"use client";

import { useEffect, useRef } from "react";

const BUFFER_W = 220;
const BUFFER_H = 140;
const WAVELENGTH = 11; // buffer px per cycle
const SPEED = 0.035; // cycles per frame

type Source = { x: number; y: number };

const DEFAULT_SOURCES: Source[] = [
  { x: BUFFER_W * 0.35, y: BUFFER_H * 0.4 },
  { x: BUFFER_W * 0.65, y: BUFFER_H * 0.6 },
];

export const InterferenceCanvas = () => {
  const visibleRef = useRef<HTMLCanvasElement>(null);
  const bufferRef = useRef<HTMLCanvasElement | null>(null);
  const sourcesRef = useRef<Source[]>(DEFAULT_SOURCES.map((s) => ({ ...s })));
  const draggingRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const visible = visibleRef.current;
    if (!visible) return;

    const buffer = document.createElement("canvas");
    buffer.width = BUFFER_W;
    buffer.height = BUFFER_H;
    bufferRef.current = buffer;
    const bctx = buffer.getContext("2d")!;
    const vctx = visible.getContext("2d")!;
    const image = bctx.createImageData(BUFFER_W, BUFFER_H);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const resize = () => {
      const rect = visible.getBoundingClientRect();
      visible.width = Math.round(rect.width);
      visible.height = Math.round(rect.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const draw = () => {
      const sources = sourcesRef.current;
      const data = image.data;
      const t = timeRef.current;

      for (let y = 0; y < BUFFER_H; y++) {
        for (let x = 0; x < BUFFER_W; x++) {
          let v = 0;
          for (const s of sources) {
            const dx = x - s.x;
            const dy = y - s.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            v += Math.sin((2 * Math.PI * (dist / WAVELENGTH - t)));
          }
          v /= sources.length;
          const mag = Math.min(1, Math.abs(v));
          const idx = (y * BUFFER_W + x) * 4;
          if (v >= 0) {
            data[idx] = 10 + mag * 20; // r
            data[idx + 1] = 10 + mag * 190; // g
            data[idx + 2] = 15 + mag * 220; // b
          } else {
            data[idx] = 10 + mag * 40;
            data[idx + 1] = 10 + mag * 190;
            data[idx + 2] = 15 + mag * 130;
          }
          data[idx + 3] = 255;
        }
      }
      bctx.putImageData(image, 0, 0);

      vctx.imageSmoothingEnabled = true;
      vctx.clearRect(0, 0, visible.width, visible.height);
      vctx.drawImage(buffer, 0, 0, visible.width, visible.height);

      const scaleX = visible.width / BUFFER_W;
      const scaleY = visible.height / BUFFER_H;
      for (const s of sources) {
        const px = s.x * scaleX;
        const py = s.y * scaleY;
        vctx.beginPath();
        vctx.arc(px, py, 6, 0, Math.PI * 2);
        vctx.fillStyle = "rgba(255,255,255,0.9)";
        vctx.shadowColor = "rgba(255,255,255,0.8)";
        vctx.shadowBlur = 12;
        vctx.fill();
        vctx.shadowBlur = 0;
      }

      if (!reducedMotion || draggingRef.current !== null) {
        timeRef.current += SPEED;
      }
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const toBufferCoords = (clientX: number, clientY: number) => {
    const visible = visibleRef.current!;
    const rect = visible.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * BUFFER_W,
      y: ((clientY - rect.top) / rect.height) * BUFFER_H,
    };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const p = toBufferCoords(e.clientX, e.clientY);
    const sources = sourcesRef.current;
    let closest = -1;
    let closestDist = Infinity;
    sources.forEach((s, i) => {
      const d = Math.hypot(s.x - p.x, s.y - p.y);
      if (d < closestDist) {
        closestDist = d;
        closest = i;
      }
    });
    if (closest !== -1 && closestDist < 20) {
      draggingRef.current = closest;
      (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (draggingRef.current === null) return;
    const p = toBufferCoords(e.clientX, e.clientY);
    sourcesRef.current[draggingRef.current] = {
      x: Math.max(0, Math.min(BUFFER_W, p.x)),
      y: Math.max(0, Math.min(BUFFER_H, p.y)),
    };
  };

  const onPointerUp = () => {
    draggingRef.current = null;
  };

  const addSource = () => {
    if (sourcesRef.current.length >= 5) return;
    sourcesRef.current = [
      ...sourcesRef.current,
      { x: BUFFER_W * 0.5, y: BUFFER_H * 0.5 },
    ];
  };

  const reset = () => {
    sourcesRef.current = DEFAULT_SOURCES.map((s) => ({ ...s }));
  };

  return (
    <div className="space-y-3">
      <canvas
        ref={visibleRef}
        className="w-full h-[280px] md:h-[420px] rounded-xl border border-border cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      />
      <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
        <button
          onClick={addSource}
          className="rounded border border-border px-2 py-1 hover:border-foreground/40 hover:text-foreground transition-colors"
        >
          + add source
        </button>
        <button
          onClick={reset}
          className="rounded border border-border px-2 py-1 hover:border-foreground/40 hover:text-foreground transition-colors"
        >
          reset
        </button>
        <span className="text-muted-foreground/60">
          drag the white dots
        </span>
      </div>
    </div>
  );
};
