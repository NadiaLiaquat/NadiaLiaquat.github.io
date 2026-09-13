/**
 * theme.js — maps a semantic accent key to the utility classes used across
 * cards, borders, dots and glows. Keeps neon usage consistent and centralized.
 */
export const ACCENTS = {
  cyan: {
    text: 'text-cyan',
    border: 'border-cyan/40',
    borderHover: 'hover:border-cyan/60',
    ring: 'shadow-neon-cyan',
    dot: 'bg-cyan',
    bar: 'bg-cyan',
    glowVar: 'rgba(0,245,255,0.14)',
  },
  pink: {
    text: 'text-pink',
    border: 'border-pink/40',
    borderHover: 'hover:border-pink/60',
    ring: 'shadow-neon-pink',
    dot: 'bg-pink',
    bar: 'bg-pink',
    glowVar: 'rgba(255,43,214,0.14)',
  },
  purple: {
    text: 'text-purple',
    border: 'border-purple/40',
    borderHover: 'hover:border-purple/60',
    ring: 'shadow-neon-purple',
    dot: 'bg-purple',
    bar: 'bg-purple',
    glowVar: 'rgba(138,43,226,0.16)',
  },
  green: {
    text: 'text-green',
    border: 'border-green/40',
    borderHover: 'hover:border-green/60',
    ring: 'shadow-neon-green',
    dot: 'bg-green',
    bar: 'bg-green',
    glowVar: 'rgba(57,255,136,0.14)',
  },
}

export function accent(key) {
  return ACCENTS[key] || ACCENTS.cyan
}

export default accent
