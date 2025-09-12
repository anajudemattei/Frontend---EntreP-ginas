import Image from 'next/image';

export default function SplashScreen({ message = "Carregando..." }) {
  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo com animação */}
        <div className="mb-8 flex justify-center">
          <div className="animate-pulse">
            <Image 
              src="/logo.png" 
              alt="Entre Páginas" 
              width={200} 
              height={64}
              className="h-16 w-auto rounded-lg"
            />
          </div>
        </div>
        
        {/* Animação de loading */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
        
        {/* Mensagem */}
        <p className="text-muted text-lg">{message}</p>
        
        {/* Barra de progresso animada */}
        <div className="mt-6 w-64 h-1 bg-primary/20 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '60%' }}></div>
        </div>
      </div>
    </div>
  );
}
