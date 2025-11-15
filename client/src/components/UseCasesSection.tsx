import { Mail, MessageSquare, Code, FileText, ShoppingCart, Headphones } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function UseCasesSection() {
  const useCases = [
    {
      icon: Mail,
      title: "Email Assistants",
      description: "Learn user tone, length preferences, and communication style to draft perfectly personalized emails",
      apiFlow: "Send email interactions → Get learned preferences → Generate personalized drafts",
      example: {
        scenario: "Professional email drafting assistant",
        learns: ["Preferred email length (concise vs detailed)", "Tone preferences (formal vs casual)", "Common sign-offs and greetings", "Industry-specific terminology"],
        outcome: "After 5-10 emails, the assistant automatically matches your writing style without any prompting"
      }
    },
    {
      icon: MessageSquare,
      title: "Customer Support Chatbots",
      description: "Remember customer preferences, past issues, and communication style for consistent, personalized support",
      apiFlow: "Log support conversations → Retrieve customer context → Provide tailored assistance",
      example: {
        scenario: "E-commerce support bot",
        learns: ["Customer's past issues and resolutions", "Preferred communication style", "Product preferences and purchase history", "Common questions and concerns"],
        outcome: "Provides context-aware support, referring to past conversations without asking customers to repeat themselves"
      }
    },
    {
      icon: Code,
      title: "Code Assistants",
      description: "Adapt to developer preferences for languages, frameworks, patterns, and coding style over time",
      apiFlow: "Track code interactions → Learn coding patterns → Suggest personalized solutions",
      example: {
        scenario: "AI coding companion",
        learns: ["Preferred programming language and framework", "Code style (functional vs OOP)", "Comment density and format", "Testing approach and libraries"],
        outcome: "Suggests code that matches your exact style and preferences, reducing time spent on edits"
      }
    },
    {
      icon: FileText,
      title: "Content Writers",
      description: "Master brand voice, formatting rules, and style guidelines to generate on-brand content consistently",
      apiFlow: "Analyze content edits → Extract style patterns → Apply learned voice",
      example: {
        scenario: "Marketing content generator",
        learns: ["Brand voice and tone guidelines", "Preferred heading structure", "Target audience language", "SEO keyword preferences"],
        outcome: "Generates on-brand content that requires minimal editing, maintaining consistency across all materials"
      }
    },
    {
      icon: ShoppingCart,
      title: "Shopping Assistants",
      description: "Understand dietary restrictions, size preferences, and shopping habits to recommend relevant products",
      apiFlow: "Track purchases & feedback → Build preference profile → Filter recommendations",
      example: {
        scenario: "Personalized shopping AI",
        learns: ["Dietary restrictions (vegetarian, gluten-free, etc.)", "Size and fit preferences", "Favorite brands and price ranges", "Shopping frequency and timing"],
        outcome: "Filters out irrelevant products automatically and suggests items that match your exact preferences"
      }
    },
    {
      icon: Headphones,
      title: "Virtual Assistants",
      description: "Learn scheduling preferences, priority patterns, and workflow habits to provide proactive assistance",
      apiFlow: "Monitor user actions → Identify behavioral patterns → Anticipate needs",
      example: {
        scenario: "Personal productivity assistant",
        learns: ["Meeting preferences (time of day, duration)", "Task prioritization patterns", "Work-life balance boundaries", "Communication channel preferences"],
        outcome: "Proactively suggests schedule optimizations and task ordering based on your learned habits"
      }
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

        <Accordion type="single" collapsible className="max-w-4xl mx-auto">
          {useCases.map((useCase, index) => (
            <AccordionItem key={index} value={`item-${index}`} data-testid={`use-case-accordion-${index}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <useCase.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{useCase.title}</h3>
                    <p className="text-sm text-muted-foreground">{useCase.description}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-14 pr-4 pb-4 space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Example: {useCase.example.scenario}</h4>
                  </div>

                  <div>
                    <p className="text-sm font-semibold mb-2">What it learns:</p>
                    <ul className="space-y-1">
                      {useCase.example.learns.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-primary/5 rounded-lg p-4">
                    <p className="text-sm font-semibold mb-1">Outcome:</p>
                    <p className="text-sm text-muted-foreground">{useCase.example.outcome}</p>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground font-mono">{useCase.apiFlow}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

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
