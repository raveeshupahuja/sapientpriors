import { Card } from "@/components/ui/card";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Send user interactions to our API",
      description: "Forward conversation data and user actions to our learning endpoint"
    },
    {
      number: "2",
      title: "Our system learns patterns and preferences over time",
      description: "Advanced ML models analyze behavior and extract personalized insights"
    },
    {
      number: "3",
      title: "Retrieve personalized context for each user session",
      description: "Get relevant preferences and learned behaviors via simple API call"
    },
    {
      number: "4",
      title: "Your LLM uses this context to provide personalized responses",
      description: "Inject learned context into prompts for tailored, consistent interactions"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
            How It Works
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
            Simple API integration that adds continuous learning to any LLM application
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="p-8 relative"
              data-testid={`step-card-${index}`}
            >
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-primary-foreground">{step.number}</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}