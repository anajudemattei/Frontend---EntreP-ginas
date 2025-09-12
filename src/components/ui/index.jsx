export function Card({ children, className = '', ...props }) {
  return (
    <div className={`card p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white',
    ghost: 'text-primary bg-transparent hover:bg-primary/10',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Input({ 
  label, 
  error, 
  className = '', 
  ...props 
}) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${error ? 'border-error' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-error text-sm">{error}</p>
      )}
    </div>
  );
}

export function Textarea({ 
  label, 
  error, 
  className = '', 
  ...props 
}) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-vertical ${error ? 'border-error' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-error text-sm">{error}</p>
      )}
    </div>
  );
}

export function Select({ 
  label, 
  error, 
  children, 
  className = '', 
  ...props 
}) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <select
        className={`w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${error ? 'border-error' : ''} ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="text-error text-sm">{error}</p>
      )}
    </div>
  );
}

export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error',
  };

  return (
    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

export function LoadingSpinner({ size = 'md' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className={`${sizes[size]} animate-spin rounded-full border-2 border-primary/20 border-t-primary`}></div>
  );
}
