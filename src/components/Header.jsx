'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-diary border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-5">
              <Image 
                src="/logo.png" 
                alt="Entre Páginas" 
                width={55} 
                height={55}
                className="h-12 w-12 rounded-full object-cover"
              />
              <span className="text-xl font-bold text-foreground">Entre Páginas</span>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Início
            </Link>
            <Link href="/entradas" className="text-foreground hover:text-primary transition-colors">
              Entradas
            </Link>
            <Link href="/favoritos" className="text-foreground hover:text-primary transition-colors">
              Favoritos
            </Link>
            <Link href="/relatorios" className="text-foreground hover:text-primary transition-colors">
              Relatórios
            </Link>
            <Link href="/perfil" className="text-foreground hover:text-primary transition-colors">
              Perfil
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/entradas/nova" className="bg-yellow-200 hover:bg-yellow-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
              Nova Entrada
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-foreground hover:text-primary"
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary/10">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Início
              </Link>
              <Link href="/entradas" className="text-foreground hover:text-primary transition-colors">
                Entradas
              </Link>
              <Link href="/favoritos" className="text-foreground hover:text-primary transition-colors">
                Favoritos
              </Link>
              <Link href="/relatorios" className="text-foreground hover:text-primary transition-colors">
                Relatórios
              </Link>
              <Link href="/perfil" className="text-foreground hover:text-primary transition-colors">
                Perfil
              </Link>
              <Link href="/entradas/nova" className="bg-yellow-200 hover:bg-yellow-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors w-fit">
                Nova Entrada
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
