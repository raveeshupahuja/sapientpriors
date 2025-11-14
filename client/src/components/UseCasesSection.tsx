import { Card } from "@/components/ui/card";
import { Mail, MessageSquare, Code, FileText, ShoppingCart, Headphones } from "lucide-react";

export default function UseCasesSection() {
  const useCases = [
    {
      icon: Mail,
      title: "Email Assistants",
      description: "Learn user tone, length preferences, and communication style to draft perfectly personalized emails",
      apiFlow: "Send email interactions → Get learned preferences → Generate personalized drafts"
    },
    {
      icon: MessageSquare,
      title: "Customer Support Chatbots",
      description: "Remember customer preferences, past issues, and communication style for consistent, personalized support",
      apiFlow: "Log support conversations → Retrieve customer context → Provide tailored assistance"
    },
    {
      icon: Code,
      title: "Code Assistants",
      description: "Adapt to developer preferences for languages, frameworks, patterns, and coding style over time",
      apiFlow: "Track code interactions → Learn coding patterns → Suggest personalized solutions"
    },
    {
      icon: FileText,
      title: "Content Writers",
      description: "Master brand voice, formatting rules, and style guidelines to generate on-brand content consistently",
      apiFlow: "Analyze content edits → Extract style patterns → Apply learned voice"
    },
    {
      icon: ShoppingCart,
      title: "Shopping Assistants",
      description: "Understand dietary restrictions, size preferences, and shopping habits to recommend relevant products",
      apiFlow: "Track purchases & feedback → Build preference profile → Filter recommendations"
    },
    {
      icon: Headphones,
      title: "Virtual Assistants",
      description: "Learn scheduling preferences, priority patterns, and workflow habits to provide proactive assistance",
      apiFlow: "Monitor user actions → Identify behavioral patterns → Anticipate needs"
    }
  ];

  return (
    <section id="use-cases" className="py-20 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
            Use Cases
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-4">
            Our Continuous Learning API works with any AI application that needs personalization
          </p>
          <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
            Simple REST API integration - works with OpenAI, Anthropic, Google, or any AI provider
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-shadow"
              data-testid={`use-case-card-${index}`}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <useCase.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{useCase.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{useCase.description}</p>
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground font-mono">{useCase.apiFlow}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto">
            <span className="font-semibold text-foreground">How it works:</span> Send user interactions to our API,
            retrieve personalized context for each session, and inject it into your AI prompts.
            Your application learns and improves continuously.
          </p>
        </div>
      </div>
    </section>
  );
}
