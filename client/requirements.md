## Packages
framer-motion | Page transitions, scanning animations, and cybersecurity-themed visual effects
lucide-react | Icons (Dog icon, security shields, alerts)
clsx | Conditional class merging
tailwind-merge | Tailwind utility class merging
date-fns | Formatting timestamps for recent searches

## Notes
- Tailwind Config needs to extend fontFamily to use custom Google fonts:
  fontFamily: {
    sans: ["Space Grotesk", "sans-serif"],
    mono: ["JetBrains Mono", "monospace"],
  }
- The app defaults to dark mode with a neon/cybersecurity aesthetic.
- Background grid patterns are handled purely via CSS in index.css.
