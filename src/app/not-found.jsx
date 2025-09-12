import Layout from '../components/Layout';
import { Card, Button } from '../components/ui';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="text-center max-w-md w-full py-12">
          <div className="mb-6 flex justify-center">
            <Image 
              src="/logo.png" 
              alt="Entre Páginas" 
              width={150} 
              height={48}
              className="h-12 w-auto rounded-lg"
            />
          </div>
          
          <div className="text-6xl mb-4">📖</div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Página não encontrada
          </h1>
          
          <p className="text-muted mb-6">
            A página que você está procurando não existe ou foi movida.
          </p>
          
          <div className="space-y-3">
            <Link href="/" className="block">
              <Button className="w-full">
                🏠 Voltar ao início
              </Button>
            </Link>
            
            <Link href="/entradas" className="block">
              <Button variant="outline" className="w-full">
                📝 Ver entradas
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
