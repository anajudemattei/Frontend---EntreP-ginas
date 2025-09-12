export default function Footer() {
  return (
    <footer className="bg-white border-t border-primary/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center space-y-4">
          {/* Sobre em duas linhas */}
          <div className="space-y-2">
            <p className="text-muted text-sm max-w-2xl mx-auto">
              Entre Páginas é seu espaço pessoal para documentar a vida e organizar pensamentos.
            </p>
            <p className="text-muted text-sm max-w-2xl mx-auto">
              Também pode ser usado por psicólogos para monitorar emoções de pacientes.
            </p>
          </div>

          {/* Copyright */}
          <div className="border-t border-primary/10 pt-4">
            <p className="text-muted text-sm">
              © 2025 Entre Páginas. Feito com ❤️ para preservar suas memórias.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
