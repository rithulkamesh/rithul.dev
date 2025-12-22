// Safe Animation Pattern: Content is visible by default.
// Animations are progressive enhancements (0.92 -> 1).
// NO opacity: 0 on content.

// "Engineered" Ease - confident, no bounce, high damping.
export const TRANSITION_EASE = [0.25, 0.4, 0.25, 1] as const;
export const DURATION = 0.4;
export const STAGGER_DELAY = 0.06;

// For main content containers
export const SECTION_VARIANTS = {
  hidden: { opacity: 1 }, // ensure visible even if js fails/before anim
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_DELAY,
      delayChildren: 0.1,
    },
  },
};

// SAFE: Text/Content only moves slightly and fades available -> full
export const SAFE_VARIANTS = {
  hidden: { opacity: 0.92, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION,
      ease: TRANSITION_EASE,
    },
  },
};

// DECORATIVE: Can disappear/scale from 0 because it's not content
export const DECORATIVE_VARIANTS = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION,
      ease: TRANSITION_EASE,
    },
  },
};

// CLIP REVEAL: For headers, masked reveal (feels constructed)
export const CLIP_REVEAL_VARIANTS = {
  hidden: { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" },
  visible: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    transition: {
      duration: 0.5,
      ease: TRANSITION_EASE,
    },
  },
};
