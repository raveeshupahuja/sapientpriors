import { Link, useLocation } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [location, setLocation] = useLocation();

  const handleHashLink = (hash: string, e: React.MouseEvent) => {
    e.preventDefault();
    const isHomePage = location === '/';
    const sectionId = hash.replace('#', '');
    
    if (isHomePage) {
      // If on home page, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      // Update URL hash
      window.history.pushState(null, '', hash);
    } else {
      // If on another page, navigate to home first
      setLocation('/');
      // Then set hash and scroll after navigation
      setTimeout(() => {
        window.location.hash = hash;
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }, 100);
    }
  };

  return (
    <footer className="border-t bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Company */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/sapientpriors-sp-logo.svg" 
                alt="SapientPriors Logo" 
                className="w-10 h-10"
              />
              <span className="font-bold text-lg">SapientPriors</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Making AI that learns, adapts, and improves continuously in the real world
            </p>
            <p className="text-xs text-muted-foreground">
              23203 SE 27th St<br />
              Sammamish, WA 98075
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/#product" onClick={(e) => handleHashLink('#product', e)} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Features
                </a>
              </li>
              <li>
                <a href="/#how-it-works" onClick={(e) => handleHashLink('#how-it-works', e)} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/#use-cases" onClick={(e) => handleHashLink('#use-cases', e)} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Use Cases
                </a>
              </li>
              <li>
                <a href="/#contact" onClick={(e) => handleHashLink('#contact', e)} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Pricing
                </a>
              </li>
              <li>
                <Link href="/api-docs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/#team" onClick={(e) => handleHashLink('#team', e)} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  About Us
                </a>
              </li>
              <li>
                <Link href="/research" className="text-muted-foreground hover:text-foreground transition-colors">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/raveeshu-pahuja-82b77924/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="/#contact" onClick={(e) => handleHashLink('#contact', e)} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/api-docs" className="text-muted-foreground hover:text-foreground transition-colors">
                  API Docs
                </Link>
              </li>
              <li>
                <a href="/#testimonials" onClick={(e) => handleHashLink('#testimonials', e)} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="mailto:raveeshupahuja@sapientpriors.com?subject=Support Request" className="text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="mailto:raveeshupahuja@sapientpriors.com?subject=Partnership Inquiry" className="text-muted-foreground hover:text-foreground transition-colors">
                  Partnerships
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-muted-foreground hover:text-foreground transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} SapientPriors. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="mailto:raveeshupahuja@sapientpriors.com" className="hover:text-foreground transition-colors">
              raveeshupahuja@sapientpriors.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}