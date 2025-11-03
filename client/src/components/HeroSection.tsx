import { Button } from "@/components/ui/button";
import heroImage from '@assets/generated_images/AI_neural_network_hero_2e27284c.png';

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
          Building Completely Autonomous Continually Learning Agents
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
          Making AI that learns, adapts, and improves continuously in the real world
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={scrollToContact}
            className="backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-6 text-lg"
            data-testid="button-hero-get-started"
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })}
            className="backdrop-blur-md bg-white/5 hover:bg-white/10 border border-white/30 text-white px-8 py-6 text-lg"
            data-testid="button-hero-learn-more"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}