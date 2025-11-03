import { Card } from "@/components/ui/card";
import { Brain, Target, Lightbulb, Zap, Users, Database, RefreshCw, Network, BookOpen, Sparkles, Shield } from "lucide-react";

export default function ResearchSection() {
  const researchAreas = [
    {
      icon: Brain,
      title: "Meta-Learning",
      description: "Enabling models to learn how to learn, adapting quickly to new tasks and domains. This is fundamental to building agents that can continuously acquire new skills and knowledge efficiently."
    },
    {
      icon: Target,
      title: "Reasoning & Inference",
      description: "Developing advanced reasoning capabilities through reinforcement learning. Agents need robust reasoning to make decisions and learn from complex environments."
    },
    {
      icon: Lightbulb,
      title: "Self-Aware Systems",
      description: "Building models with calibrated confidence and uncertainty quantification. Continual learning requires knowing what you know and what you need to learn."
    },
    {
      icon: Zap,
      title: "Efficient Learning",
      description: "Developing scalable and cost-effective training methods for advanced AI systems. Continual learning must be practical and sustainable for real-world deployment."
    },
    {
      icon: Users,
      title: "Personalization",
      description: "Creating systems that adapt to individual users and contexts. Personalization is a key capability for agents that learn continuously in diverse environments."
    },
    {
      icon: Database,
      title: "Memory & Knowledge Retention",
      description: "Developing architectures that can maintain long-term knowledge while continuing to learn new information without catastrophic forgetting."
    }
  ];

  const challenges = [
    "Learn from every interaction and experience",
    "Adapt their behavior based on feedback and outcomes",
    "Transfer knowledge across different tasks and domains",
    "Improve their performance over extended periods of operation",
    "Operate autonomously with minimal human intervention"
  ];

  const approaches = [
    {
      icon: RefreshCw,
      title: "Online Learning",
      description: "Updating models in real-time from streaming data, enabling continuous adaptation"
    },
    {
      icon: BookOpen,
      title: "Meta-Learning",
      description: "Teaching agents how to learn efficiently across diverse tasks and domains"
    },
    {
      icon: Database,
      title: "Memory Systems",
      description: "Developing architectures that maintain and utilize long-term knowledge"
    },
    {
      icon: Sparkles,
      title: "Personalization",
      description: "Adapting to individual users and contexts for tailored experiences"
    },
    {
      icon: Shield,
      title: "Robust Reasoning",
      description: "Building reliable decision-making under uncertainty and evolving conditions"
    }
  ];

  return (
    <section id="research" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Research
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
            Exploring the foundations of continually learning autonomous agents
          </p>
        </div>

        <div className="mb-20">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
              Continually Learning Agents
            </h3>
            <p className="text-base lg:text-lg text-muted-foreground">
              Our primary research focus is building agents that can learn and improve continuously throughout their lifetime.
            </p>
          </div>

          <div className="max-w-6xl mx-auto mb-16">
            <Card className="p-8 lg:p-10">
              <h4 className="text-2xl font-semibold mb-6">The Challenge</h4>
              <p className="text-muted-foreground mb-6 max-w-3xl">
                Traditional AI systems are static after training. They cannot adapt to new situations, learn from mistakes, or improve based on experience. We're working to change that by developing agents that:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-3" data-testid={`challenge-${index}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                    <span className="text-sm lg:text-base">{challenge}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="max-w-6xl mx-auto">
            <h4 className="text-2xl font-semibold mb-8 text-center">Our Approach</h4>
            <p className="text-muted-foreground mb-10 text-center max-w-3xl mx-auto">
              We're combining multiple research directions to achieve continual learning:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approaches.map((approach, index) => (
                <Card 
                  key={index} 
                  className="p-6 hover-elevate" 
                  data-testid={`approach-${index}`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <approach.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h5 className="font-semibold text-base mb-3">{approach.title}</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">{approach.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-3xl lg:text-4xl font-bold tracking-tight mb-12 text-center">
            Research Areas
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchAreas.map((area, index) => (
              <Card
                key={index}
                className="p-8 hover-elevate"
                data-testid={`research-area-${index}`}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <area.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-3">{area.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{area.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}