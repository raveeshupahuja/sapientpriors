import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Clock, Quote, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function CaseStudySection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const challenges = [
    "Users had to repeatedly specify their insurance needs and coverage preferences in every conversation",
    "The assistant couldn't remember past frustrations or preferences mentioned in earlier sessions",
    "No continuity between sessions led to inconsistent recommendations",
    "Critical context like user pain points (e.g., complicated claim processes, coverage gaps) was lost between conversations"
  ];

  const solutions = [
    {
      icon: Users,
      title: "Personalized Insurance Profiles",
      description: "Automatically learns each user's coverage needs, risk concerns, and insurance preferences"
    },
    {
      icon: TrendingUp,
      title: "Consistent Insurance Advice",
      description: "Remembers past recommendations and builds on previous conversations for coherent guidance"
    },
    {
      icon: Clock,
      title: "Context-Aware Interactions",
      description: "Recalls user's insurance situation, past questions, and preferences for faster, more relevant responses"
    }
  ];


  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
            What Our Customers Say
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
            See how companies are using our API to build truly personalized AI experiences
          </p>
        </div>

        {/* Testimonial Card */}
        <Card className="p-8 lg:p-10 relative max-w-4xl mx-auto mb-8">
          <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />
          <blockquote className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-6 relative z-10">
            "SapientPriors' API has transformed how Ental.ai interacts with our users. Instead of repeatedly asking about financial preferences, our assistant now remembers each user's goals, risk tolerance, and communication style. The integration was seamless, and we saw immediate improvements in user engagement and satisfaction."
          </blockquote>
          <div className="flex items-center gap-4 mb-6">
            <div>
              <div className="font-semibold text-foreground">
                <a
                  href="https://www.linkedin.com/in/devangmundhra/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Devang Mundhra
                </a>
              </div>
              <div className="text-sm text-muted-foreground">
                Co-founder,{" "}
                <a
                  href="https://ental.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Ental.ai
                </a>
              </div>
            </div>
          </div>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors pt-4 border-t border-border"
          >
            {isExpanded ? (
              <>
                Hide Customer Success Story
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Read Customer Success Story
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </Card>

        {/* Expandable Customer Success Story Details */}
        {isExpanded && (
          <div className="max-w-7xl mx-auto space-y-16 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                <span className="text-sm font-semibold text-primary">Customer Success Story</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold tracking-tight mb-4">
                How Ental.ai Transformed Insurance Advisory with Personalization
              </h3>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                <a
                  href="https://ental.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-foreground hover:text-primary transition-colors"
                >
                  Ental.ai
                </a>
                , a WhatsApp-based insurance advisory assistant, integrated our Continuous Learning API
                to deliver truly personalized insurance recommendations and advice.
              </p>
            </div>

            {/* The Challenge */}
            <div>
              <h4 className="text-2xl lg:text-3xl font-semibold mb-6 text-center">
                The Challenge
              </h4>
              <Card className="p-8">
                <p className="text-base lg:text-lg text-muted-foreground mb-6">
                  Before integrating SapientPriors' API, Ental.ai's insurance assistant faced a common problem:
                  every conversation started from scratch. Users had to repeatedly explain their insurance needs,
                  coverage requirements, and preferences.
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
            <div>
              <h4 className="text-2xl lg:text-3xl font-semibold mb-6 text-center">
                The Solution: API Integration
              </h4>
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
            <div>
              <h4 className="text-2xl lg:text-3xl font-semibold mb-6 text-center">
                How It Works
              </h4>
              <Card className="p-8 bg-card/50">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">User mentions insurance frustration early on</h4>
                      <p className="text-sm text-muted-foreground">
                        "I'm really frustrated with my current insurance provider - their claim filing process takes forever and is so complicated"
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">System learns and stores user's pain points</h4>
                      <p className="text-sm text-muted-foreground font-mono">
                        POST /api/learn
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Stores: "User frustrated with current insurance claim filing process - prioritize easy claims when recommending insurance"
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Weeks later: User asks about insurance renewal</h4>
                      <p className="text-sm text-muted-foreground">
                        "It's time to renew my policy. What are my best options?"
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">AI retrieves context and prioritizes easy claim filing</h4>
                      <p className="text-sm text-muted-foreground font-mono">
                        GET /api/context?user_id=xyz
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        The assistant remembers the earlier frustration and recommends insurance providers known for simple, fast claim processes—without the user having to repeat their concern
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
