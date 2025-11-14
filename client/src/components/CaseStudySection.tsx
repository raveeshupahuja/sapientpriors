import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Clock } from "lucide-react";

export default function CaseStudySection() {
  const challenges = [
    "Users had to repeatedly specify their financial goals and risk tolerance in every conversation",
    "The assistant couldn't remember investment preferences or past advice given",
    "No continuity between sessions led to inconsistent recommendations",
    "Users felt like they were starting from scratch each time"
  ];

  const solutions = [
    {
      icon: Users,
      title: "Personalized Financial Profiles",
      description: "Automatically learns each user's risk tolerance, investment goals, and financial preferences"
    },
    {
      icon: TrendingUp,
      title: "Consistent Investment Advice",
      description: "Remembers past recommendations and builds on previous conversations for coherent guidance"
    },
    {
      icon: Clock,
      title: "Context-Aware Interactions",
      description: "Recalls user's financial situation, past questions, and preferences for faster, more relevant responses"
    }
  ];


  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary">Customer Success Story</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
            How Ental.ai Transformed Financial Advisory with Personalization
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
            <a
              href="https://ental.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground hover:text-primary transition-colors"
            >
              Ental.ai
            </a>
            , a WhatsApp-based personal finance assistant, integrated our Continuous Learning API
            to deliver truly personalized financial advice and investment recommendations.
          </p>
        </div>

        {/* The Challenge */}
        <div className="mb-16">
          <h3 className="text-2xl lg:text-3xl font-semibold mb-6 text-center">
            The Challenge
          </h3>
          <Card className="p-8">
            <p className="text-base lg:text-lg text-muted-foreground mb-6">
              Before integrating SapientPriors' API, Ental.ai's financial assistant faced a common problem:
              every conversation started from scratch. Users had to repeatedly explain their financial situation,
              goals, and preferences.
            </p>
            <ul className="space-y-3">
              {challenges.map((challenge, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{challenge}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* The Solution */}
        <div className="mb-16">
          <h3 className="text-2xl lg:text-3xl font-semibold mb-6 text-center">
            The Solution: API Integration
          </h3>
          <p className="text-base lg:text-lg text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
            Ental.ai integrated our two-endpoint REST API into their WhatsApp bot.
            The integration took less than a week and immediately started learning from user interactions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <Card key={index} className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <solution.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-3">{solution.title}</h4>
                <p className="text-sm text-muted-foreground">{solution.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h3 className="text-2xl lg:text-3xl font-semibold mb-6 text-center">
            How It Works
          </h3>
          <Card className="p-8 bg-card/50">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-2">User sends message on WhatsApp</h4>
                  <p className="text-sm text-muted-foreground">
                    "I want to invest $5,000 for my retirement in 20 years"
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Ental.ai calls SapientPriors API</h4>
                  <p className="text-sm text-muted-foreground font-mono">
                    GET /api/context?user_id=xyz
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Retrieves learned preferences: risk tolerance, investment history, communication style
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Personalized response generated</h4>
                  <p className="text-sm text-muted-foreground">
                    AI receives user context and generates advice tailored to their specific situation
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold mb-2">System learns from interaction</h4>
                  <p className="text-sm text-muted-foreground font-mono">
                    POST /api/learn
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Updates user profile with new information for even better future recommendations
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </section>
  );
}
