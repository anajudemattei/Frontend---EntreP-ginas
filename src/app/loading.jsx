import Image from 'next/image';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <Image 
            src="/logo.png" 
            alt="Entre Páginas" 
            width={150} 
            height={48}
            className="h-12 w-auto rounded-lg animate-pulse"
          />
        </div>
        
        <div className="flex justify-center mb-4">
          <div className="w-8 h-8 animate-spin rounded-full border-2 border-primary/20 border-t-primary"></div>
        </div>
        
        <p className="text-muted">Carregando seu diário...</p>
      </div>
    </div>
  );
}
