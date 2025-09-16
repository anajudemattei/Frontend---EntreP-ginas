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
  const baseStyles = {
    fontWeight: '500',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  };

  const variants = {
    primary: {
      backgroundColor: 'var(--secondary)',
      color: 'var(--foreground)',
      border: 'none'
    },
    secondary: {
      backgroundColor: 'var(--primary)',
      color: 'white',
      border: 'none'
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--primary)',
      border: '2px solid var(--primary)'
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--primary)',
      border: 'none'
    }
  };

  const sizes = {
    sm: { padding: '0.375rem 0.75rem', fontSize: '0.875rem' },
    md: { padding: '0.5rem 1rem', fontSize: '1rem' },
    lg: { padding: '0.75rem 1.5rem', fontSize: '1.125rem' }
  };

  const buttonStyle = {
    ...baseStyles,
    ...variants[variant],
    ...sizes[size]
  };

  return (
    <button 
      style={buttonStyle}
      className={`btn-ui-${variant} ${className}`}
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
    <div style={{ marginBottom: '0.25rem' }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: '0.875rem',
          fontWeight: '500',
          color: 'var(--foreground)',
          marginBottom: '0.5rem'
        }}>
          {label}
        </label>
      )}
      <input
        style={{
          width: '100%',
          padding: '0.75rem',
          border: '1px solid rgba(248, 187, 217, 0.3)',
          borderRadius: '8px',
          fontSize: '1rem',
          transition: 'all 0.2s ease',
          boxSizing: 'border-box',
          backgroundColor: 'white'
        }}
        className={`focus:border-primary focus:ring-2 focus:ring-primary/20 ${className}`}
        {...props}
      />
      {error && (
        <p style={{ color: 'var(--error)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          {error}
        </p>
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
    <div style={{ marginBottom: '0.25rem' }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: '0.875rem',
          fontWeight: '500',
          color: 'var(--foreground)',
          marginBottom: '0.5rem'
        }}>
          {label}
        </label>
      )}
      <select
        style={{
          width: '100%',
          padding: '0.75rem',
          border: '1px solid rgba(248, 187, 217, 0.3)',
          borderRadius: '8px',
          fontSize: '1rem',
          transition: 'all 0.2s ease',
          boxSizing: 'border-box',
          backgroundColor: 'white',
          cursor: 'pointer'
        }}
        className={`focus:border-primary focus:ring-2 focus:ring-primary/20 ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p style={{ color: 'var(--error)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          {error}
        </p>
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
