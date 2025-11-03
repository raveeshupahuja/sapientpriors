import { Card } from "@/components/ui/card";
import { Brain, Target, Lightbulb, Zap, Users, Database, RefreshCw, Network, BookOpen, Sparkles, Shield } from "lucide-react";

export default function ResearchSection() {
  const challenges = [
    "Learn from every interaction and experience",
    "Adapt their behavior based on feedback and outcomes",
    "Transfer knowledge and skills across different environments, tasks, and domains",
    "Improve their performance over extended periods of operation",
    "Operate autonomously with minimal human intervention"
  ];

  const researchFocus = [
    {
      icon: RefreshCw,
      title: "Online Learning",
      description: "Developing methods for real-time model updates from streaming data, enabling agents to continuously adapt and improve from each interaction."
    },
    {
      icon: Brain,
      title: "Meta-Learning",
      description: "Teaching models how to learn efficiently, enabling rapid adaptation to new tasks and domains while retaining previously acquired knowledge."
    },
    {
      icon: Database,
      title: "Memory & Knowledge Retention",
      description: "Building architectures that maintain long-term knowledge while learning new information, preventing catastrophic forgetting in continual learning scenarios."
    },
    {
      icon: Target,
      title: "Reasoning & Inference",
      description: "Advancing reasoning capabilities through reinforcement learning to enable robust decision-making in complex, evolving environments."
    },
    {
      icon: Lightbulb,
      title: "Self-Aware Systems",
      description: "Creating models with calibrated confidence and uncertainty quantification that understand their own limitations and learning needs."
    },
    {
      icon: Users,
      title: "Personalization",
      description: "Developing systems that adapt to individual users and contexts, creating tailored experiences through continuous learning from user interactions."
    },
    {
      icon: Zap,
      title: "Efficient Learning",
      description: "Creating scalable and cost-effective training methods that make continual learning practical and sustainable for real-world deployment."
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

          <div className="max-w-6xl mx-auto">
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
        </div>

        <div>
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
              Our Research Focus
            </h3>
            <p className="text-base lg:text-lg text-muted-foreground">
              We're advancing the science of continual learning through multiple interconnected research directions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {researchFocus.map((area, index) => (
              <Card
                key={index}
                className="p-6 lg:p-8 hover-elevate"
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