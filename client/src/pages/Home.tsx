import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import VisionSection from "@/components/VisionSection";
import ResearchSection from "@/components/ResearchSection";
import PersonalizationSection from "@/components/PersonalizationSection";
import ProductSection from "@/components/ProductSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CodeExampleSection from "@/components/CodeExampleSection";
import ApiDemoSection from "@/components/ApiDemoSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <VisionSection />
        <ResearchSection />
        <PersonalizationSection />
        <ProductSection />
        <HowItWorksSection />
        <CodeExampleSection />
        <ApiDemoSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}