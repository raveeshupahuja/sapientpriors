import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function ContactSection() {
  const handleEmailClick = () => {
    window.location.href = 'mailto:raveeshupahuja@sapientpriors.com';
  };

  return (
    <section id="contact" className="py-20 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Ready to Build Continuously Learning Agents?
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
            Contact us to onboard your application and start delivering personalized experiences that improve over time.
          </p>
        </div>

        <Card className="p-8 lg:p-12 text-center">
          <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
          <p className="text-muted-foreground mb-8">
            Ready to add continuous learning to your application? Get in touch to discuss how our API can transform your product.
          </p>
          <a
            href="mailto:raveeshupahuja@sapientpriors.com"
            className="text-lg font-semibold text-primary hover:underline mb-8 block"
            data-testid="link-email"
          >
            raveeshupahuja@sapientpriors.com
          </a>
          <Button
            size="lg"
            onClick={handleEmailClick}
            className="px-8"
            data-testid="button-contact-email"
          >
            Send Email
          </Button>
        </Card>
      </div>
    </section>
  );
}