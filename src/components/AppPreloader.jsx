'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AppPreloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simular carregamento
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="text-center max-w-sm w-full px-4">
        {/* Logo animada */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Image 
              src="/logo.png" 
              alt="Entre Páginas" 
              width={200} 
              height={64}
              className="h-16 w-auto rounded-lg"
            />
            <div className="absolute inset-0 animate-ping">
              <Image 
                src="/logo.png" 
                alt="Entre Páginas" 
                width={200} 
                height={64}
                className="h-16 w-auto rounded-lg opacity-20"
              />
            </div>
          </div>
        </div>
        
        {/* Texto de boas-vindas */}
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Entre Páginas
        </h2>
        <p className="text-muted mb-8">
          Preparando seu diário digital...
        </p>
        
        {/* Barra de progresso */}
        <div className="w-full h-2 bg-primary/20 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Porcentagem */}
        <p className="text-sm text-muted">
          {Math.round(progress)}%
        </p>
        
        {/* Animação de pontos */}
        <div className="flex justify-center mt-6 space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
