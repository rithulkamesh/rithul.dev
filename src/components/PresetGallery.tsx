'use client';

import { useState } from 'react';
import { Preset } from '@/data/presets';
import { PresetCard } from '@/components/PresetCard';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PresetGalleryProps {
  presets: (Preset & { downloads: number })[];
}

export function PresetGallery({ presets }: PresetGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPresets = presets.filter((preset) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      preset.title.toLowerCase().includes(searchLower) ||
      preset.description.toLowerCase().includes(searchLower) ||
      preset.plugin.toLowerCase().includes(searchLower) ||
      preset.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="relative group w-full sm:max-w-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-zinc-500" aria-hidden="true" />
        </div>
        <input
          type="text"
          className="block w-full rounded border border-zinc-800 bg-transparent py-2 pl-10 pr-3 text-sm text-foreground placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none focus:ring-0 transition-colors"
          placeholder="Search presets, plugins, tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <AnimatePresence mode="popLayout">
          {filteredPresets.length > 0 ? (
            filteredPresets.map((preset) => (
              <motion.div
                key={preset.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <PresetCard preset={preset} downloadCount={preset.downloads} />
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 text-zinc-500 font-mono text-sm"
            >
              No matching presets found.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
