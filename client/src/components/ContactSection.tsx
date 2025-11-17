import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowUp } from "lucide-react";

export default function ContactSection() {
  const scrollToPricing = () => {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-gradient-to-b from-background to-card">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <Card className="p-8 lg:p-12 text-center border-2 border-primary/20">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our beta program and be part of shaping the future of continuous learning AI.
            Limited spots available.
          </p>
          <Button
            size="lg"
            onClick={scrollToPricing}
            className="px-8"
          >
            <ArrowUp className="w-4 h-4 mr-2 rotate-180" />
            Apply for Beta Access
          </Button>
          <p className="text-sm text-muted-foreground mt-6">
            Or email us directly at{" "}
            <a
              href="mailto:raveeshupahuja@sapientpriors.com"
              className="font-semibold text-primary hover:underline"
            >
              raveeshupahuja@sapientpriors.com
            </a>
          </p>
        </Card>
      </div>
    </section>
  );
}