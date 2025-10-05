'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-4 group">
              <Image 
                src="/logo.png" 
                alt="Entre Páginas" 
                width={48} 
                height={48}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all"
              />
              <span className="text-xl font-semibold text-foreground tracking-tight">Entre Páginas</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-1">
            <Link href="/" className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all font-medium">
              Início
            </Link>
            <Link href="/entradas" className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all font-medium">
              Entradas
            </Link>
            <Link href="/favoritos" className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all font-medium">
              Favoritos
            </Link>
            <Link href="/relatorios" className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all font-medium">
              Relatórios
            </Link>
            <Link href="/sobre" className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all font-medium">
              Sobre Mim
            </Link>
            <Link href="/perfil" className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all font-medium">
              Perfil
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/entradas/nova" className="bg-yellow-200 hover:bg-yellow-300 text-gray-800 px-6 py-2.5 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
              Nova Entrada
            </Link>
          </div>

          <div className="md:hidden flex items-center space-x-3">
            <Link href="/entradas/nova" className="bg-yellow-200 hover:bg-yellow-300 text-gray-800 px-4 py-2 rounded-lg font-semibold transition-all text-sm">
              Nova
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-primary rounded-lg hover:bg-primary/5 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 px-2 border-t border-gray-100 bg-white/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="px-4 py-3 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all font-medium">
                Início
              </Link>
              <Link href="/entradas" className="px-4 py-3 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all font-medium">
                Entradas
              </Link>
              <Link href="/favoritos" className="px-4 py-3 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all font-medium">
                Favoritos
              </Link>
              <Link href="/relatorios" className="px-4 py-3 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all font-medium">
                Relatórios
              </Link>
              <Link href="/sobre" className="px-4 py-3 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all font-medium">
                Sobre Mim
              </Link>
              <Link href="/perfil" className="px-4 py-3 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all font-medium">
                Perfil
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
