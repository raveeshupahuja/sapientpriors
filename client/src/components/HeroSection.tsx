import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-background">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
          Make Your AI Smarter
          <br />
          <span className="text-muted-foreground">With Every Conversation</span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
          AI that learns what your users mean, not just what they say
        </p>
        <p className="text-base text-muted-foreground/80 mb-8 max-w-xl mx-auto">
          Learns explicit preferences, discovers implicit ones, and adapts to each user's unique style
        </p>

        {/* Trust Signal */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <Badge variant="secondary" className="px-4 py-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
            Trusted by companies like Ental.ai
          </Badge>
        </div>
        
        {/* Single CTA */}
        <Button
          size="lg"
          onClick={scrollToContact}
          className="px-8 py-6 text-lg"
          data-testid="button-hero-get-started"
        >
          Get Started
        </Button>
      </div>
    </section>
  );
}