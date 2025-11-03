import { Card } from "@/components/ui/card";
import { User, TrendingUp, Globe, Shield } from "lucide-react";

export default function PersonalizationSection() {
  const features = [
    {
      icon: User,
      title: "Learn individual user preferences",
      description: "Adapt to unique patterns and needs"
    },
    {
      icon: TrendingUp,
      title: "Evolve over time",
      description: "Continuously refine understanding through interactions"
    },
    {
      icon: Globe,
      title: "Generalize across contexts",
      description: "Apply learned preferences intelligently"
    },
    {
      icon: Shield,
      title: "Maintain privacy",
      description: "Learn without compromising user data"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Personalization as a Service
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
            Our first step towards autonomous continually learning agents
          </p>
        </div>

        <p className="text-base lg:text-lg text-muted-foreground max-w-4xl mx-auto mb-12 text-center">
          We're currently focused on personalization as a critical puzzle piece in building continually learning agents. Our Personalization as a Service platform enables AI systems to:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 hover-elevate"
              data-testid={`feature-card-${index}`}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        <p className="text-base lg:text-lg text-muted-foreground max-w-4xl mx-auto mt-12 text-center">
          This foundation in personalization is teaching us how to build systems that truly learn and adapt, bringing us closer to our vision of fully autonomous continually learning agents.
        </p>
      </div>
    </section>
  );
}