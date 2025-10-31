// Charte graphique des couleurs Locali
export const COLORS = {
  // Couleurs principales du logo
  PRIMARY: {
    BLUE: '#12043e', // Bleu foncé principal (presque noir bleuté)
    GREEN: '#6ab023' // Vert principal de Locali
  },

  // Variantes des couleurs principales
  GREEN: {
    DEFAULT: '#6ab023', // Vert principal
    LIGHT: '#bae27a', // Vert clair
    DARK: '#14190d' // Vert très foncé (presque noir)
  },

  // Couleurs violettes
  PURPLE: {
    DEFAULT: '#c1add3', // Purple clair du footer
    DARK: '#593998' // Purple foncé
  },

  // Couleurs des boutons
  BUTTON: {
    DARK: '#14190d', // Vert très foncé pour boutons
    HOVER: '#12043e' // Bleu foncé pour hover
  },

  // Couleurs des réseaux sociaux (utilisant la charte)
  SOCIAL: {
    INSTAGRAM: {
      FROM: '#593998', // Purple foncé
      TO: '#c1add3' // Purple clair
    },
    FACEBOOK: '#12043e', // Bleu foncé
    LINKEDIN: '#593998' // Purple foncé
  },

  // Couleurs textuelles
  TEXT: {
    PRIMARY: '#12043e', // Bleu foncé principal
    SECONDARY: '#593998', // Purple foncé
    LIGHT: '#c1add3', // Purple clair
    WHITE: '#FFFFFF',
    GREEN: '#6ab023' // Vert pour accents
  },

  // Couleurs de fond
  BACKGROUND: {
    PRIMARY: '#FFFFFF',
    SECONDARY: '#c1add3', // Purple clair
    ACCENT: '#bae27a', // Vert clair
    DARK: '#14190d' // Vert très foncé
  },

  // Couleurs des bordures
  BORDER: {
    LIGHT: 'rgba(193, 173, 211, 0.3)', // Purple clair avec transparence
    DEFAULT: '#c1add3', // Purple clair
    DARK: '#593998' // Purple foncé
  }
}

// Dégradés prédéfinis
export const GRADIENTS = {
  HERO: 'linear-gradient(rgba(18, 4, 62, 0.6), rgba(18, 4, 62, 0.6))',
  INSTAGRAM: 'linear-gradient(to bottom right, #593998, #c1add3)',
  PRIMARY: 'linear-gradient(to right, #12043e, #6ab023)',
  GREEN: 'linear-gradient(to right, #6ab023, #bae27a)',
  CTA: 'linear-gradient(to right, #12043e, #6ab023)'
}

// Tailles de logo
export const LOGO_SIZES = {
  SMALL: '3rem', // 48px
  MEDIUM: '4rem', // 64px
  LARGE: '5rem' // 80px
}

// Typographie complète
export const FONTS = {
  // Poppins - Police par défaut pour les textes
  POPPINS: {
    THIN: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: '100',
      fontStyle: 'normal'
    },
    EXTRALIGHT: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: '200',
      fontStyle: 'normal'
    },
    LIGHT: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: '300',
      fontStyle: 'normal'
    },
    REGULAR: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: '400',
      fontStyle: 'normal'
    },
    MEDIUM: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: '500',
      fontStyle: 'normal'
    },
    SEMIBOLD: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: '600',
      fontStyle: 'normal'
    },
    BOLD: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: '700',
      fontStyle: 'normal'
    },
    EXTRABOLD: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: '800',
      fontStyle: 'normal'
    },
    BLACK: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: '900',
      fontStyle: 'normal'
    },
    // Versions italiques
    THIN_ITALIC: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: '100',
      fontStyle: 'italic'
    },
    EXTRALIGHT_ITALIC: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: '200',
      fontStyle: 'italic'
    },
    LIGHT_ITALIC: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: '300',
      fontStyle: 'italic'
    },
    REGULAR_ITALIC: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: '400',
      fontStyle: 'italic'
    },
    MEDIUM_ITALIC: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: '500',
      fontStyle: 'italic'
    },
    SEMIBOLD_ITALIC: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: '600',
      fontStyle: 'italic'
    },
    BOLD_ITALIC: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: '700',
      fontStyle: 'italic'
    },
    EXTRABOLD_ITALIC: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: '800',
      fontStyle: 'italic'
    },
    BLACK_ITALIC: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: '900',
      fontStyle: 'italic'
    }
  },

  // Kallisto - Police pour titres et éléments spéciaux
  KALLISTO: {
    LIGHT: {
      fontFamily: '"kallisto", sans-serif',
      fontWeight: '300',
      fontStyle: 'normal'
    },
    LIGHT_ITALIC: {
      fontFamily: '"kallisto", sans-serif',
      fontWeight: '300',
      fontStyle: 'italic'
    },
    BOLD: {
      fontFamily: '"kallisto", sans-serif',
      fontWeight: '800',
      fontStyle: 'normal'
    },
    BOLD_ITALIC: {
      fontFamily: '"kallisto", sans-serif',
      fontWeight: '800',
      fontStyle: 'italic'
    },
    LINED: {
      fontFamily: '"kallisto-lined", sans-serif',
      fontWeight: '400',
      fontStyle: 'normal'
    }
  }
}

// Palette complète pour référence
export const PALETTE = {
  BLUE_DARK: '#12043e', // Bleu foncé principal
  GREEN_PRIMARY: '#6ab023', // Vert principal
  PURPLE_DARK: '#593998', // Purple foncé
  PURPLE_LIGHT: '#c1add3', // Purple clair
  GREEN_DARK: '#14190d', // Vert très foncé
  GREEN_LIGHT: '#bae27a' // Vert clair
}
