'use client';

import { Preset } from '@/data/presets';
import { AudioPlayer } from './AudioPlayer';
import { Download } from 'lucide-react';
import Link from 'next/link';

interface PresetCardProps {
  preset: Preset;
  downloadCount?: number;
}

export function PresetCard({ preset, downloadCount = 0 }: PresetCardProps) {
  return (
    <div className="group relative flex flex-col md:flex-row justify-between gap-6 py-6 border-b border-zinc-800 last:border-0 transition-colors">
      {/* Left side: Info */}
      <div className="flex flex-col gap-3 md:w-1/2">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold text-foreground">
            {preset.title}
          </h3>
          {downloadCount > 0 && (
            <span className="text-xs font-mono text-muted-foreground">
              {downloadCount.toLocaleString()} DLs
            </span>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          {preset.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-1">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-zinc-800/50 text-zinc-300">
            {preset.plugin}
          </span>
          {preset.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-[10px] font-mono uppercase border border-zinc-800 text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right side: Player & Action */}
      <div className="flex flex-col justify-center gap-4 md:w-[40%] shrink-0">
        {preset.audioPreviewUrl ? (
          <AudioPlayer src={preset.audioPreviewUrl} title={preset.title} />
        ) : (
          <div className="h-[40px] flex items-center text-xs font-mono text-zinc-600">No preview available</div>
        )}

        <Link
          href={`/api/download?id=${preset.id}`}
          className="inline-flex items-center justify-center gap-2 rounded bg-foreground px-4 py-2 text-xs font-medium text-background transition-colors hover:bg-foreground/80 w-fit"
        >
          <Download className="h-3 w-3" />
          Download .fxp
        </Link>
      </div>
    </div>
  );
}
