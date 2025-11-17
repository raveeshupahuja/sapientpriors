import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, BookOpen, Rocket } from "lucide-react";
import { Link } from "wouter";

export default function CodeExampleSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
            Ready to Integrate?
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
            Explore our comprehensive API documentation with code examples, sample apps, and integration guides
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Core Concepts</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Understand the account hierarchy, two-step learning pattern, and how objectives guide the AI
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">API Usage</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Step-by-step guide with code examples in JavaScript, Python, and cURL
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Rocket className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Sample App</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Complete email copilot implementation showing real-world integration
            </p>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/api-docs">
            <Button size="lg" className="text-lg px-8" data-testid="button-view-documentation">
              View Full API Documentation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            Complete with interactive examples, best practices, and FAQ
          </p>
        </div>
      </div>
    </section>
  );
}