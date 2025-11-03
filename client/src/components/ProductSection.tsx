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
            The Product: Continuous Learning API
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
            Transform your LLM application into a continuously learning agent
          </p>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl lg:text-3xl font-semibold mb-4 text-center">
            The Problem with Current LLMs
          </h3>
          <p className="text-base lg:text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
            Today's LLM applications don't learn from users over time. Every conversation starts from scratch:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {problems.map((item, index) => (
              <Card
                key={index}
                className="p-6"
                data-testid={`problem-card-${index}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.problem}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <p className="text-base lg:text-lg text-muted-foreground mt-8 text-center max-w-3xl mx-auto">
            The model has no memory of your preferences, corrections, or interaction history. Each session is isolated.
          </p>
        </div>

        <div>
          <h3 className="text-2xl lg:text-3xl font-semibold mb-4 text-center">
            The Solution: Integrate Our API
          </h3>
          <p className="text-base lg:text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
            By integrating our Continuous Learning API, your application becomes an agent that truly learns:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutions.map((item, index) => (
              <Card
                key={index}
                className="p-6"
                data-testid={`solution-card-${index}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.solution}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <p className="text-base lg:text-lg text-muted-foreground mt-8 text-center max-w-3xl mx-auto">
            Your agent continuously improves, becoming more personalized and effective with every interaction.
          </p>
        </div>
      </div>
    </section>
  );
}