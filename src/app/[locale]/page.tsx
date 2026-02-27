import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { ManifestoSection } from '@/components/sections/ManifestoSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-oztech-dark text-white">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProductsSection />
        <ManifestoSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
