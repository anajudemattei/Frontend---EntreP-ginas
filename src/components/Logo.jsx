export default function Logo({ size = 'md', showText = true, className = '', variant = 'default' }) {
  const sizes = {
    xs: { container: 'w-6 h-6', text: 'text-sm', icon: 'text-xs' },
    sm: { container: 'w-8 h-8', text: 'text-base', icon: 'text-sm' },
    md: { container: 'w-10 h-10', text: 'text-xl', icon: 'text-lg' },
    lg: { container: 'w-16 h-16', text: 'text-3xl', icon: 'text-2xl' },
    xl: { container: 'w-24 h-24', text: 'text-5xl', icon: 'text-4xl' },
  };

  const variants = {
    default: 'from-primary to-primary-dark',
    light: 'from-primary-light to-primary',
    dark: 'from-primary-dark to-primary',
    secondary: 'from-secondary to-secondary-dark',
  };

  const currentSize = sizes[size];
  const currentVariant = variants[variant];

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Logo Icon */}
      <div className={`${currentSize.container} bg-gradient-to-br ${currentVariant} rounded-xl flex items-center justify-center shadow-diary relative overflow-hidden group transition-all duration-200 hover:scale-105`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
        
        {/* Book Icon */}
        <div className="relative z-10">
          <svg
            className={`${currentSize.container} text-white drop-shadow-sm`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full opacity-60"></div>
        <div className="absolute bottom-1 left-1 w-1 h-1 bg-warning rounded-full opacity-40"></div>
        
        {/* Hover effect */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-primary ${currentSize.text} leading-tight`}>
            Entre Páginas
          </span>
          {(size === 'lg' || size === 'xl') && (
            <span className="text-xs text-muted font-medium">Diário Digital</span>
          )}
        </div>
      )}
    </div>
  );
}

// Componente específico para breadcrumbs
export function LogoBreadcrumb({ className = '' }) {
  return (
    <Logo 
      size="xs" 
      showText={false} 
      className={`inline-flex ${className}`}
      variant="light"
    />
  );
}

// Componente específico para carregamento
export function LogoLoader({ className = '' }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <Logo size="md" showText={false} variant="secondary" />
    </div>
  );
}
