import { Card } from "@/components/ui/card";
import { Brain, Target, Lightbulb, Zap, Users, Database } from "lucide-react";

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
      title: "Online Learning",
      description: "Updating models in real-time from streaming data"
    },
    {
      title: "Meta-Learning",
      description: "Teaching agents how to learn efficiently"
    },
    {
      title: "Memory Systems",
      description: "Developing architectures that maintain and utilize long-term knowledge"
    },
    {
      title: "Personalization",
      description: "Adapting to individual users and contexts"
    },
    {
      title: "Robust Reasoning",
      description: "Building reliable decision-making under uncertainty"
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
          <h3 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6 text-center">
            Continually Learning Agents
          </h3>
          <p className="text-base lg:text-lg text-muted-foreground mb-8 text-center max-w-4xl mx-auto">
            Our primary research focus is building agents that can learn and improve continuously throughout their lifetime.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-12">
            <Card className="p-8">
              <h4 className="text-2xl font-semibold mb-6">The Challenge</h4>
              <p className="text-muted-foreground mb-6">
                Traditional AI systems are static after training. They cannot adapt to new situations, learn from mistakes, or improve based on experience. We're working to change that by developing agents that:
              </p>
              <ul className="space-y-3">
                {challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-3" data-testid={`challenge-${index}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                    <span className="text-sm lg:text-base">{challenge}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8">
              <h4 className="text-2xl font-semibold mb-6">Our Approach</h4>
              <p className="text-muted-foreground mb-6">
                We're combining multiple research directions to achieve continual learning:
              </p>
              <div className="space-y-4">
                {approaches.map((approach, index) => (
                  <div key={index} data-testid={`approach-${index}`}>
                    <h5 className="font-semibold text-sm lg:text-base mb-1">{approach.title}</h5>
                    <p className="text-sm text-muted-foreground">{approach.description}</p>
                  </div>
                ))}
              </div>
            </Card>
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