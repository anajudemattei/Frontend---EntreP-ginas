// Componente para gerar favicon SVG
export function generateFavicon() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#F8BBD9"/>
          <stop offset="100%" style="stop-color:#E891B8"/>
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="6" fill="url(#bg)"/>
      <rect x="6" y="8" width="20" height="16" rx="2" fill="white" opacity="0.95"/>
      <line x1="10" y1="12" x2="22" y2="12" stroke="#F8BBD9" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="10" y1="16" x2="18" y2="16" stroke="#F8BBD9" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="10" y1="20" x2="20" y2="20" stroke="#F8BBD9" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="25" cy="9" r="2" fill="#FFF2CC" opacity="0.8"/>
      <circle cx="28" cy="25" r="1.5" fill="#F8BBD9" opacity="0.6"/>
    </svg>
  `;
}

// Função para gerar o data URL do favicon
export function getFaviconDataUrl() {
  const svg = generateFavicon();
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
