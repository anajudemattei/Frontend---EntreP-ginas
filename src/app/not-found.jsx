import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'var(--background)',
      padding: '2rem',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '6rem',
        height: '6rem',
        backgroundColor: 'rgba(248, 187, 217, 0.1)',
        borderRadius: '50%',
        opacity: 0.5
      }} />
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '15%',
        width: '4rem',
        height: '4rem',
        backgroundColor: 'rgba(255, 242, 204, 0.2)',
        borderRadius: '50%',
        opacity: 0.4
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '20%',
        width: '8rem',
        height: '8rem',
        backgroundColor: 'rgba(248, 187, 217, 0.05)',
        borderRadius: '50%',
        opacity: 0.6
      }} />

      <div style={{ 
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        border: '1px solid rgba(248, 187, 217, 0.2)',
        maxWidth: '28rem',
        width: '100%'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <Image 
            src="/logo.png" 
            alt="Entre Páginas" 
            width={100} 
            height={100}
            style={{ 
              borderRadius: '50%', 
              border: '3px solid rgba(248, 187, 217, 0.3)',
              margin: '0 auto',
              display: 'block'
            }}
          />
        </div>

        {/* Número 404 estilizado */}
        <div style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, var(--primary), var(--secondary))',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem',
          lineHeight: 1
        }}>
          404
        </div>
        
        {/* Título */}
        <h1 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          color: 'var(--foreground)', 
          marginBottom: '1rem' 
        }}>
          Página não encontrada
        </h1>
        
        {/* Descrição */}
        <p style={{ 
          color: 'var(--muted)', 
          fontSize: '1rem', 
          marginBottom: '2rem',
          lineHeight: 1.6
        }}>
          Parece que esta página se perdeu entre as páginas do seu diário. 
          Que tal voltarmos ao início da sua história?
        </p>
        
        {/* Botões de ação */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '0.75rem',
          marginBottom: '1rem'
        }}>
          <Link 
            href="/" 
            style={{ 
              textDecoration: 'none'
            }}
          >
            <button 
              className="btn-primary-404"
              style={{
                width: '100%',
                padding: '0.75rem 1.5rem',
                backgroundColor: 'var(--secondary)',
                color: 'var(--foreground)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              🏠 Voltar ao início
            </button>
          </Link>
          
          <Link 
            href="/entradas" 
            style={{ 
              textDecoration: 'none'
            }}
          >
            <button 
              className="btn-outline-404"
              style={{
                width: '100%',
                padding: '0.75rem 1.5rem',
                backgroundColor: 'transparent',
                color: 'var(--primary)',
                border: '2px solid var(--primary)',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              📝 Ver suas entradas
            </button>
          </Link>
        </div>

        {/* Mensagem motivacional */}
        <p style={{ 
          color: 'var(--muted)', 
          fontSize: '0.875rem',
          fontStyle: 'italic',
          opacity: 0.8
        }}>
          "Cada página perdida é uma nova página para ser escrita"
        </p>
      </div>
    </div>
  );
}
