import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import TemplatesSection from '@/components/landing/TemplatesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import PricingSection from '@/components/landing/PricingSection';
import FAQSection from '@/components/landing/FAQSection';
import FooterSection from '@/components/landing/FooterSection';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#040817] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TemplatesSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}
