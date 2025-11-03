export default function Footer() {
  return (
    <footer className="py-12 border-t bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">SP</span>
            </div>
            <span className="font-bold text-lg">SapientPriors</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Making AI that learns, adapts, and improves continuously in the real world
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SapientPriors. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}