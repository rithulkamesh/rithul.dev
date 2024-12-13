interface MetaInfo {
  title: string;
  description: string;
}

interface Image {
  url: string;
}

interface SocialMediaInfo {
  card: string;
  title: string;
  description: string;
  images: string[];
}

interface OpenGraphInfo {
  type: string;
  siteName: string;
  url: string;
  title: string;
  images: Image[];
}

interface MetadataInterface {
  title: string;
  description: string;
  metadataBase: URL;
  openGraph: OpenGraphInfo;
  twitter: SocialMediaInfo;
  icons: {
    icon: string;
  };
}

class Meta implements MetaInfo {
  title: string;
  description: string;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}

class SocialMedia implements SocialMediaInfo {
  card: string;
  title: string;
  description: string;
  images: string[];

  constructor(
    card: string,
    title: string,
    description: string,
    images: string[],
  ) {
    this.card = card;
    this.title = title;
    this.description = description;
    this.images = images;
  }
}

class Metadata implements MetadataInterface {
  title: string;
  description: string;
  metadataBase: URL;
  openGraph: OpenGraphInfo;
  twitter: SocialMediaInfo;
  icons: { icon: string };

  constructor(
    baseURL: string,
    metaInfo: Meta,
    images: Image[],
    iconPath: string,
  ) {
    this.title = metaInfo.title;
    this.description = metaInfo.description;
    this.metadataBase = new URL(baseURL);
    this.openGraph = {
      type: "website",
      siteName: metaInfo.title,
      url: baseURL,
      title: metaInfo.title,
      images,
    };
    this.twitter = new SocialMedia(
      "summary_large_image",
      metaInfo.title,
      metaInfo.description,
      images.map((img) => img.url),
    );
    this.icons = {
      icon: iconPath,
    };
  }
}

const meta = new Meta(
  "Rithul Kamesh",
  "Electronics student specializing in DSP, AI, and hardware innovation. Founder of pragmahq, tech enthusiast, musician, gamer, and digital creator.",
);

const images: Image[] = [{ url: "https://rithul.dev/og_image.png" }];

export { meta, images, Metadata };
