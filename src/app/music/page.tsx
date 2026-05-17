import { presetsData } from '@/data/presets';
import { PresetGallery } from '@/components/PresetGallery';
import { redis } from '@/lib/redis';
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
  title: 'Music & Presets | Rithul',
  description: 'Download my custom synthesizer presets, patches, and plugins.',
};

export const revalidate = 60;

export default async function MusicPage() {
  let downloadData: string[] = [];
  try {
    downloadData = await redis.zrange('preset-downloads', 0, -1, { rev: true, withScores: true });
  } catch (error) {
    console.error('Failed to fetch download counts from Redis:', error);
  }

  const downloadCounts = new Map<string, number>();
  for (let i = 0; i < downloadData.length; i += 2) {
    const id = downloadData[i];
    const score = parseInt(downloadData[i + 1], 10);
    downloadCounts.set(id, score);
  }

  const sortedPresets = [...presetsData].map(preset => ({
    ...preset,
    downloads: downloadCounts.get(preset.id) || 0
  })).sort((a, b) => b.downloads - a.downloads);

  return (
    <main className="relative mx-auto max-w-3xl px-6 md:px-12 flex flex-col gap-12 py-6">
      <Header />
      
      <div className="flex flex-col gap-12 py-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Music & Presets
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            A collection of my custom patches for synthesizers, custom VST plugins, and musical resources. Free to download and use in your own projects.
          </p>
        </div>

        <PresetGallery presets={sortedPresets} />
      </div>

      <Footer />
    </main>
  );
}
