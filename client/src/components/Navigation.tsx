import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">SP</span>
            </div>
            <span className="font-bold text-lg">SapientPriors</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            <Button
              variant="ghost"
              onClick={() => scrollToSection('vision')}
              data-testid="link-vision"
            >
              Vision
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('research')}
              data-testid="link-research"
            >
              Research
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('product')}
              data-testid="link-product"
            >
              Product
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('team')}
              data-testid="link-team"
            >
              Team
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('contact')}
              data-testid="link-contact"
            >
              Contact
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              className="ml-4"
              data-testid="button-get-started"
            >
              Get Started
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-menu-toggle"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => scrollToSection('vision')}
              data-testid="link-vision-mobile"
            >
              Vision
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => scrollToSection('research')}
              data-testid="link-research-mobile"
            >
              Research
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => scrollToSection('product')}
              data-testid="link-product-mobile"
            >
              Product
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => scrollToSection('team')}
              data-testid="link-team-mobile"
            >
              Team
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => scrollToSection('contact')}
              data-testid="link-contact-mobile"
            >
              Contact
            </Button>
            <Button
              className="w-full"
              onClick={() => scrollToSection('contact')}
              data-testid="button-get-started-mobile"
            >
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}