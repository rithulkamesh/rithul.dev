import Link from 'next/link';
import { presetsData } from '@/data/presets';
import { PresetCard } from '@/components/PresetCard';
import { redis } from '@/lib/redis';
import { DECORATIVE_VARIANTS, SAFE_VARIANTS, SECTION_VARIANTS } from '@/lib/animation';
import { motion } from 'framer-motion';

export async function HomeMusicSection() {
  let downloadData: string[] = [];
  try {
    downloadData = await redis.zrange('preset-downloads', 0, 2, { rev: true, withScores: true });
  } catch (error) {
    // silently fail for mock
  }

  const downloadCounts = new Map<string, number>();
  for (let i = 0; i < downloadData.length; i += 2) {
    const id = downloadData[i];
    const score = parseInt(downloadData[i + 1], 10);
    downloadCounts.set(id, score);
  }

  const featuredPresets = [...presetsData].map(preset => ({
    ...preset,
    downloads: downloadCounts.get(preset.id) || 0
  }))
  .sort((a, b) => b.downloads - a.downloads)
  .slice(0, 2);

  if (featuredPresets.length === 0) return null;

  // We have to make this a client wrapper if we want to use motion properly for the section,
  // but since it's a server component we can't use motion directly on the section tag.
  // Instead, we'll just render standard HTML here and rely on the children's internal motion,
  // or we can wrap it in a small client component. Given the pattern in your home page,
  // we'll leave it as standard HTML and let the home page handle scroll animations if needed,
  // or add a 'use client' wrapper.

  return (
    <section id="music" className="space-y-8">
      <div className="flex items-center gap-2">
        <div className="w-1 h-3 rounded-full bg-zinc-700/80 dark:bg-zinc-700/80 bg-zinc-400/80" />
        <h2 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
          Music & Sound Design
        </h2>
      </div>

      <div className="flex flex-col">
        {featuredPresets.map(preset => (
          <PresetCard key={preset.id} preset={preset} downloadCount={preset.downloads} />
        ))}
      </div>
      
      <Link
        href="/music"
        className="inline-flex text-sm font-bold text-foreground hover:text-foreground/80 transition-colors mt-4"
      >
        View all presets
        <span className="text-muted-foreground font-normal ml-2">→</span>
      </Link>
    </section>
  );
}
