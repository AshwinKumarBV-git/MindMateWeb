export const theme = {
  color: {
    brand: '#CABDFF',
    brandDeep: '#B6A6FF',
    brandLight: '#E0D7FF',
    yellow: '#F8E27C',
    teal: '#A7E8E0',
    blush: '#FBD0D9',
    text: { 
      light: '#1A1A1A', 
      dark: '#FFFFFF' 
    },
    bg: { 
      light: '#FFFFFF', 
      dark: '#0F0E14' 
    },
    card: { 
      light: '#F7F7FB', 
      dark: '#1A1626' 
    },
    deep: {
      dark: '#1E1A2B'
    },
    border: { 
      light: '#E9E6F7', 
      dark: '#2C2740' 
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },
  radius: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  motion: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500,
    },
    ease: [0.25, 0.1, 0.25, 1.0],
  },
  typography: {
    fontFamily: {
      body: 'Inter, sans-serif',
      heading: 'Poppins, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
  },
}

export type Theme = typeof theme

// Gradient presets for cards
export const gradients = {
  lavender: 'bg-gradient-to-br from-brand/20 via-brand/10 to-transparent',
  sunset: 'bg-gradient-to-br from-blush/20 via-yellow/10 to-transparent',
  ocean: 'bg-gradient-to-br from-teal/20 via-brand/10 to-transparent',
  default: 'bg-gradient-to-br from-brand/15 via-brand-light/10 to-transparent',
}

// Motion variants for Framer Motion
export const motionVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  },
  slideInLeft: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  slideInRight: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  scaleIn: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
    transition: { duration: 0.2 },
  },
  cardHover: {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
    transition: { duration: 0.2 },
  },
}
