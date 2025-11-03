import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const isHomePage = location === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" asChild>
            <button className="flex items-center gap-2 hover-elevate rounded-md px-2 py-1 -ml-2 cursor-pointer bg-transparent border-none">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SP</span>
              </div>
              <span className="font-bold text-lg">SapientPriors</span>
            </button>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/" asChild>
              <Button variant="ghost" data-testid="link-home">
                Home
              </Button>
            </Link>
            {isHomePage ? (
              <Button
                variant="ghost"
                onClick={() => scrollToSection('product')}
                data-testid="link-product"
              >
                Product
              </Button>
            ) : (
              <Link href="/#product" asChild>
                <Button variant="ghost" data-testid="link-product">
                  Product
                </Button>
              </Link>
            )}
            {isHomePage ? (
              <Button
                variant="ghost"
                onClick={() => scrollToSection('team')}
                data-testid="link-team"
              >
                Team
              </Button>
            ) : (
              <Link href="/#team" asChild>
                <Button variant="ghost" data-testid="link-team">
                  Team
                </Button>
              </Link>
            )}
            <Link href="/research" asChild>
              <Button variant="ghost" data-testid="link-research">
                Research
              </Button>
            </Link>
            <Link href="/careers" asChild>
              <Button variant="ghost" data-testid="link-careers">
                Careers
              </Button>
            </Link>
            {isHomePage ? (
              <Button
                onClick={() => scrollToSection('contact')}
                className="ml-4"
                data-testid="button-get-started"
              >
                Get Started
              </Button>
            ) : (
              <Link href="/#contact" asChild>
                <Button className="ml-4" data-testid="button-get-started">
                  Get Started
                </Button>
              </Link>
            )}
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
            <Link href="/" asChild>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="link-home-mobile"
              >
                Home
              </Button>
            </Link>
            {isHomePage ? (
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => scrollToSection('product')}
                data-testid="link-product-mobile"
              >
                Product
              </Button>
            ) : (
              <Link href="/#product" asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="link-product-mobile"
                >
                  Product
                </Button>
              </Link>
            )}
            {isHomePage ? (
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => scrollToSection('team')}
                data-testid="link-team-mobile"
              >
                Team
              </Button>
            ) : (
              <Link href="/#team" asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="link-team-mobile"
                >
                  Team
                </Button>
              </Link>
            )}
            <Link href="/research" asChild>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="link-research-mobile"
              >
                Research
              </Button>
            </Link>
            <Link href="/careers" asChild>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="link-careers-mobile"
              >
                Careers
              </Button>
            </Link>
            {isHomePage ? (
              <Button
                className="w-full"
                onClick={() => scrollToSection('contact')}
                data-testid="button-get-started-mobile"
              >
                Get Started
              </Button>
            ) : (
              <Link href="/#contact" asChild>
                <Button
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="button-get-started-mobile"
                >
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}