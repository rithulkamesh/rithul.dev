export type PluginType = 'Surgext' | 'Serum' | 'Vital' | 'Omnisphere' | 'Kontakt' | 'Other';

export interface Preset {
  id: string;
  title: string;
  plugin: PluginType;
  description: string;
  audioPreviewUrl: string | null;
  downloadUrl: string; // The relative path in the public folder, e.g., '/presets/octavarium-lead.fxp'
  dateAdded: string;
  tags: string[];
}

export const presetsData: Preset[] = [
  {
    id: "octavarium-keyboard-solo",
    title: "Octavarium Keyboard Solo",
    plugin: "Other", // You can update this to the exact plugin used
    description: "A meticulously recreated patch for the legendary keyboard solo in Dream Theater's Octavarium.",
    audioPreviewUrl: "/audio/octavarium_demo.mp3",
    downloadUrl: "/presets/octavarium.fxp",
    dateAdded: "2024-05-18",
    tags: ["Dream Theater", "Lead", "Prog", "Jordan Rudess"],
  }
];
