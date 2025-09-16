import Image from 'next/image';

export default function Loading() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'var(--background)',
      padding: '2rem'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Image 
            src="/logo.png" 
            alt="Entre Páginas" 
            width={120} 
            height={120}
            style={{ 
              borderRadius: '50%', 
              border: '4px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              margin: '0 auto',
              display: 'block'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '2rem' }}>
          <img 
            src="/loading.gif" 
            alt="Carregando..." 
            width={80} 
            height={80}
            style={{ 
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              margin: '0 auto',
              display: 'block'
            }}
          />
        </div>
        
        <div>
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: 'var(--foreground)', 
            marginBottom: '1rem' 
          }}>
            Entre Páginas
          </h1>
          
          <p style={{ 
            color: 'var(--muted)', 
            fontSize: '1.125rem', 
            marginBottom: '1.5rem' 
          }}>
            Preparando seu diário digital...
          </p>
          
          <div style={{ 
            width: '16rem', 
            margin: '0 auto 1rem',
            height: '0.5rem',
            backgroundColor: 'rgba(248, 187, 217, 0.2)',
            borderRadius: '9999px',
            overflow: 'hidden'
          }}>
            <div 
              className="animate-loading-bar"
              style={{ 
                height: '100%',
                background: 'linear-gradient(to right, var(--primary), var(--secondary))',
                borderRadius: '9999px'
              }}
            ></div>
          </div>
          
          <p style={{ 
            color: 'var(--muted)', 
            fontSize: '0.875rem' 
          }}>
            Um espaço para suas memórias e pensamentos
          </p>
        </div>
      </div>
    </div>
  );
}
