import Header from './Header';
import Footer from './Footer';
import Watermark from './Watermark';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background page-container">
      <Watermark />
      <Header />
      <main className="flex-1 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
