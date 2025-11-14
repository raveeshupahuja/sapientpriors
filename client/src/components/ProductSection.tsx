import { Card } from "@/components/ui/card";
import { Mail, Code, FileText, ShoppingCart, CheckCircle2 } from "lucide-react";

export default function ProductSection() {
  const problems = [
    {
      icon: Mail,
      title: "Email Assistant",
      problem: 'You tell it to "keep emails concise" today, but tomorrow it forgets and writes long emails again'
    },
    {
      icon: Code,
      title: "Code Helper",
      problem: "You prefer TypeScript with functional patterns, but it keeps suggesting class-based JavaScript"
    },
    {
      icon: FileText,
      title: "Writing Tool",
      problem: "You've corrected the same formatting preferences 10 times, yet it still doesn't remember your style"
    },
    {
      icon: ShoppingCart,
      title: "Shopping Assistant",
      problem: "You're vegetarian and mention it repeatedly, but it continues recommending meat products"
    }
  ];

  const solutions = [
    {
      icon: Mail,
      title: "Email Assistant",
      solution: "After a few interactions, it automatically writes concise emails matching your tone and style"
    },
    {
      icon: Code,
      title: "Code Helper",
      solution: "Learns you prefer TypeScript with functional patterns and consistently applies this knowledge"
    },
    {
      icon: FileText,
      title: "Writing Tool",
      solution: "Remembers all formatting preferences and applies them automatically to new content"
    },
    {
      icon: ShoppingCart,
      title: "Shopping Assistant",
      solution: "Understands your dietary restrictions and proactively filters recommendations"
    }
  ];

  return (
    <section id="product" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            What Is It?
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-4 font-medium">
            A REST API that doesn't just remember—it learns. Discovers what your users want, even when they don't say it.
          </p>
          <p className="text-base lg:text-lg text-muted-foreground mb-6">
            Learns explicit preferences your users tell it, discovers implicit ones they don't, and adapts to each user's unique style.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm mb-8">
            <span className="px-4 py-2 bg-card border border-border rounded-lg font-mono">POST /api/learn</span>
            <span className="px-4 py-2 bg-card border border-border rounded-lg font-mono">GET /api/context</span>
            <span className="px-4 py-2 bg-card border border-border rounded-lg text-muted-foreground">2 Endpoints</span>
          </div>
          <p className="text-base lg:text-lg text-muted-foreground">
            Works with OpenAI, Anthropic, Google, or any AI provider. No fine-tuning required.
          </p>
        </div>

        <div className="mb-20">
          <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-center">
            The Problem: AI Applications Don't Remember
          </h3>
          <p className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
            Your users have to repeat themselves in every conversation. Each session starts from scratch, creating a frustrating experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 border-2">
              <div className="mb-4">
                <h4 className="text-xl font-semibold mb-4">Without Our API</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>Users repeat preferences every conversation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>No memory of past interactions or corrections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>Each session starts from scratch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>Frustrating, repetitive user experience</span>
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="p-8 border-2 border-primary/20 bg-primary/5">
              <div className="mb-4">
                <h4 className="text-xl font-semibold mb-4">With Our API</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Learns explicit preferences your users tell it</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Discovers implicit preferences they don't mention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Adapts to each user's unique style and patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Gets smarter with every conversation</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>

        <div>
          <h3 className="text-3xl lg:text-4xl font-bold mb-8 text-center">
            Real Examples
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutions.map((item, index) => (
              <Card
                key={index}
                className="p-6"
                data-testid={`solution-card-${index}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.solution}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}