import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "Beta",
      period: "pricing",
      description: "Perfect for testing and small projects",
      features: [
        "20,000 interactions stored",
        "2,000 API calls per month",
        "Basic learning algorithms",
        "Email support",
        "7-day data retention"
      ],
      cta: "Join Beta Program",
      highlighted: false
    },
    {
      name: "Professional",
      price: "Beta",
      period: "pricing",
      description: "Best for growing applications",
      features: [
        "200,000 interactions stored",
        "20,000 API calls per month",
        "Advanced learning algorithms",
        "Priority email support",
        "Analytics dashboard"
      ],
      cta: "Join Beta Program",
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large-scale deployments",
      features: [
        "Unlimited interactions stored",
        "Unlimited API calls",
        "Enterprise-grade learning",
        "24/7 dedicated support",
        "Custom data retention",
        "On-premise deployment option",
        "SLA guarantee",
        "Custom integrations",
        "Dedicated account manager"
      ],
      cta: "Join Beta Program",
      highlighted: false
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary">Early Beta Program</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
            Join Our Beta Program
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-4">
            We're currently in early beta and accepting a limited number of partners to help shape the future of continuous learning AI.
          </p>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
            Contact us to discuss beta access and pricing tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`p-8 ${
                plan.highlighted
                  ? "border-2 border-primary shadow-xl relative"
                  : "border-2 border-border"
              }`}
              data-testid={`pricing-card-${index}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                  Recommended
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/ {plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={scrollToContact}
                className={`w-full ${
                  plan.highlighted
                    ? ""
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
                data-testid={`pricing-cta-${index}`}
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto">
          <Card className="p-6 bg-primary/5 border-primary/20">
            <p className="text-sm font-semibold mb-2">Early Beta Benefits</p>
            <p className="text-sm text-muted-foreground">
              Beta partners get early access to new features, dedicated onboarding support, and the opportunity to shape our product roadmap.
              All plans include access to our REST API, support for all major AI providers (OpenAI, Anthropic, Google), and automatic scaling.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
