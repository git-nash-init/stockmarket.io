import Hero from '@/components/Hero';
import ModulesSection from '@/components/ModulesSection';
import BlogSection from '@/components/BlogSection';
import StatsSection from '@/components/StatsSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <section id="modules">
        <ModulesSection />
      </section>
      <section id="blog">
        <BlogSection />
      </section>
      <StatsSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
