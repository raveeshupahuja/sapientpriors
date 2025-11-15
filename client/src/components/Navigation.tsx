import { Button } from "@/components/ui/button";
import { Menu, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const isHomePage = location === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" asChild>
            <button className="flex items-center gap-3 hover-elevate rounded-md px-2 py-1 -ml-2 cursor-pointer bg-transparent border-none">
              <img 
                src="/sapientpriors-sp-logo.svg" 
                alt="SapientPriors Logo" 
                className="w-10 h-10"
              />
              <span className="font-bold text-lg">SapientPriors</span>
            </button>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {isHomePage ? (
              <Button
                variant="ghost"
                onClick={scrollToTop}
                data-testid="link-home"
              >
                Home
              </Button>
            ) : (
              <Link href="/" asChild>
                <Button variant="ghost" onClick={scrollToTop} data-testid="link-home">
                  Home
                </Button>
              </Link>
            )}
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" data-testid="link-resources">
                  Resources <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {isHomePage ? (
                  <>
                    <DropdownMenuItem onClick={() => scrollToSection('use-cases')}>
                      Use Cases
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => scrollToSection('privacy-api')}>
                      API Documentation
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => scrollToSection('pricing')}>
                      Pricing
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/#use-cases">Use Cases</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/#privacy-api">API Documentation</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/#pricing">Pricing</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/faq">FAQ</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
            {isHomePage ? (
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={scrollToTop}
                data-testid="link-home-mobile"
              >
                Home
              </Button>
            ) : (
              <Link href="/" asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={scrollToTop}
                  data-testid="link-home-mobile"
                >
                  Home
                </Button>
              </Link>
            )}
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
            <div className="border-t border-b py-2 my-2">
              <p className="px-4 py-2 text-sm font-semibold text-muted-foreground">Resources</p>
              {isHomePage ? (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-start pl-8"
                    onClick={() => scrollToSection('use-cases')}
                    data-testid="link-use-cases-mobile"
                  >
                    Use Cases
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start pl-8"
                    onClick={() => scrollToSection('privacy-api')}
                    data-testid="link-api-docs-mobile"
                  >
                    API Documentation
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start pl-8"
                    onClick={() => scrollToSection('pricing')}
                    data-testid="link-pricing-mobile"
                  >
                    Pricing
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/#use-cases" asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start pl-8"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Use Cases
                    </Button>
                  </Link>
                  <Link href="/#privacy-api" asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start pl-8"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      API Documentation
                    </Button>
                  </Link>
                  <Link href="/#pricing" asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start pl-8"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Pricing
                    </Button>
                  </Link>
                </>
              )}
              <Link href="/faq" asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start pl-8"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="link-faq-mobile"
                >
                  FAQ
                </Button>
              </Link>
            </div>
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