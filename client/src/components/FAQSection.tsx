import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const faqs = [
    {
      question: "How does the learning process work?",
      answer: "Our system uses advanced machine learning to analyze user interactions in real-time. When you send data via the /api/learn endpoint, our models extract patterns, preferences, and implicit signals. This learned context is then made available through the /api/context endpoint, which you can inject into your AI prompts for personalized responses."
    },
    {
      question: "What AI providers do you support?",
      answer: "We're provider-agnostic and work with all major AI platforms including OpenAI (GPT-4, GPT-3.5), Anthropic (Claude), Google (Gemini), and any other LLM provider. Our API simply provides learned context that you inject into your existing prompts—no vendor lock-in required."
    },
    {
      question: "How long does it take to see results?",
      answer: "You'll start seeing personalization after just a few interactions (typically 3-5). The system continuously improves with each interaction, becoming more accurate over time. Most users notice significant improvements in personalization quality within the first week of deployment."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. All data is encrypted at rest and in transit using industry-standard protocols. We're SOC 2 compliant and never share your data with third parties. Pro and Enterprise plans offer additional options like private cloud deployment, custom data retention policies, and on-premise installations for complete control."
    },
    {
      question: "Can I use this with my existing AI application?",
      answer: "Yes! Our API is designed to integrate seamlessly with existing applications. It only takes a few lines of code to add learning capabilities. Simply call our API before and after your AI interactions—we provide SDKs for Python, JavaScript, and REST endpoints for any platform."
    },
    {
      question: "What counts as a 'memory' vs an 'API call'?",
      answer: "A 'memory' is a discrete piece of learned information (e.g., 'user prefers concise emails'). An 'API call' is any request to our endpoints (both /api/learn and /api/context). The Free plan includes 20,000 memories and 2,000 API calls per month, which is suitable for hundreds of active users."
    },
    {
      question: "How is this different from vector databases or RAG?",
      answer: "While vector databases store and retrieve similar content, we specialize in learning user preferences and behavioral patterns over time. We extract insights from interactions—not just retrieve similar past conversations. Think of us as the 'memory and learning layer' that complements your existing RAG or vector search setup."
    },
    {
      question: "Can I export or delete user data?",
      answer: "Yes. You have full control over your data. Through our API, you can export all learned preferences for any user at any time, or delete a user's entire profile. We provide GDPR-compliant data handling and 'right to be forgotten' support out of the box."
    },
    {
      question: "What happens if I exceed my plan limits?",
      answer: "We'll notify you when you're approaching your limits. You can upgrade at any time, and we offer overage protection—your application won't suddenly stop working. For the Free plan, new API calls will receive a notification to upgrade, while Pro plans have soft limits with reasonable overage pricing."
    },
    {
      question: "Do you offer a free trial of Pro features?",
      answer: "Yes! When you sign up for Pro, you get a 14-day free trial with full access to all Pro features. No credit card required to start. You can also start with the Free plan and upgrade whenever you're ready."
    },
    {
      question: "How do I get started?",
      answer: "Getting started is easy! Click 'Get Started' to contact us, and we'll set up your account with API keys. You'll receive access to our documentation, SDKs, and example code. Most developers have a basic integration running within an hour."
    }
  ];

  return (
    <section id="faq" className="py-20 lg:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
            Everything you need to know about SapientPriors
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border rounded-lg px-6 bg-card"
              data-testid={`faq-item-${index}`}
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="font-semibold">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <a
            href="#contact"
            className="text-primary hover:underline font-semibold"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Contact us and we'll be happy to help →
          </a>
        </div>
      </div>
    </section>
  );
}
