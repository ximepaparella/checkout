export const HEADER_TEXT = {
  'pt-BR': {
    logoAriaLabel: 'Inspire - Ir para página inicial',
    securityTitle: 'COMPRA SEGURA',
    securitySubtitle: '100% PROTEGIDO',
    securityAriaLabel: 'Compra segura',
  },
} as const;

// Get current locale (can be extended with i18n library later)
const getLocale = (): keyof typeof HEADER_TEXT => {
  return 'pt-BR';
};

export const getHeaderText = () => {
  const locale = getLocale();
  return HEADER_TEXT[locale];
};
