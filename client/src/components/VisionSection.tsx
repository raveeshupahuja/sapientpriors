import { Target, TrendingUp, Cpu, Zap } from "lucide-react";

export default function VisionSection() {
  const beliefs = [
    {
      icon: Target,
      text: "Learn from experience in real-world environments"
    },
    {
      icon: TrendingUp,
      text: "Adapt to changing conditions and requirements"
    },
    {
      icon: Cpu,
      text: "Improve their performance continuously"
    },
    {
      icon: Zap,
      text: "Significantly reduce human intervention required"
    }
  ];

  return (
    <section id="vision" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Our Vision
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              SapientPriors is working towards creating agents that can learn continuously from their environment, adapt to new challenges, and improve over time while significantly reducing human intervention required.
            </p>
          </div>
          
          <div>
            <p className="text-base lg:text-lg text-muted-foreground mb-8">
              We believe the path to truly intelligent systems requires agents that can:
            </p>
            <div className="space-y-6">
              {beliefs.map((belief, index) => (
                <div key={index} className="flex gap-4" data-testid={`vision-item-${index}`}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <belief.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-base lg:text-lg">{belief.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}