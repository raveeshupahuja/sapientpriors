import { Card } from "@/components/ui/card";

export default function ProductSection() {
  return (
    <section id="product" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            What Is It?
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-4 font-medium">
            A REST API that doesn't just remember—it learns. Discovers what your users want, even when they don't say it.
          </p>
          <p className="text-base lg:text-lg text-muted-foreground mb-6">
            Learns explicit preferences your users tell it, discovers implicit ones they don't, and adapts to each user's unique style.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm mb-8">
            <span className="px-4 py-2 bg-card border border-border rounded-lg font-mono">POST /api/learn</span>
            <span className="px-4 py-2 bg-card border border-border rounded-lg font-mono">GET /api/context</span>
            <span className="px-4 py-2 bg-card border border-border rounded-lg text-muted-foreground">2 Endpoints</span>
          </div>
          <p className="text-base lg:text-lg text-muted-foreground">
            Works with OpenAI, Anthropic, Google, or any AI provider. No fine-tuning required.
          </p>
        </div>

        <div className="mb-20">
          <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-center">
            The Problem: AI Applications Don't Remember
          </h3>
          <p className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
            Your users have to repeat themselves in every conversation. Each session starts from scratch, creating a frustrating experience.
          </p>

          {/* Before/After Visual Comparison */}
          <div className="mb-12 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Before */}
              <Card className="p-8 border-2 border-destructive/20">
                <div className="flex items-center gap-2 mb-6">
                  <div className="px-3 py-1 bg-destructive/10 text-destructive rounded-md text-sm font-semibold">
                    Without SapientPriors
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-muted-foreground">
                    <p className="text-sm font-semibold mb-2">Monday - User says:</p>
                    <p className="text-xs text-muted-foreground italic">"I prefer concise emails"</p>
                  </div>
                  <div className="text-center text-2xl text-muted-foreground">↓</div>
                  <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-muted-foreground">
                    <p className="text-sm font-semibold mb-2">Tuesday - AI suggests:</p>
                    <div className="text-xs bg-background/50 p-3 rounded mb-2 font-mono">
                      <p className="mb-2">Hi John,</p>
                      <p className="mb-2">I hope this email finds you well and you're having a great week so far. I wanted to reach out regarding the quarterly report...</p>
                      <p className="text-destructive">❌ Too long again!</p>
                    </div>
                    <p className="text-xs text-muted-foreground italic">User has to remind: "Keep it concise!"</p>
                  </div>
                  <div className="text-center text-2xl text-muted-foreground">↓</div>
                  <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-muted-foreground">
                    <p className="text-sm font-semibold mb-2">Wednesday - Same problem:</p>
                    <p className="text-xs text-muted-foreground">Still generates long emails, user frustrated</p>
                  </div>
                  <div className="mt-4 p-4 bg-destructive/5 rounded-lg">
                    <p className="text-sm text-destructive font-semibold">User frustration increases ↗</p>
                  </div>
                </div>
              </Card>

              {/* After */}
              <Card className="p-8 border-2 border-primary/20 bg-primary/5">
                <div className="flex items-center gap-2 mb-6">
                  <div className="px-3 py-1 bg-primary/10 text-primary rounded-md text-sm font-semibold">
                    With SapientPriors
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-background rounded-lg p-4 border-l-4 border-primary">
                    <p className="text-sm font-semibold mb-2">Monday - User says:</p>
                    <p className="text-xs text-muted-foreground italic mb-2">"I prefer concise emails"</p>
                    <p className="text-xs text-primary">✓ Learned and stored</p>
                  </div>
                  <div className="text-center text-2xl text-primary">↓</div>
                  <div className="bg-background rounded-lg p-4 border-l-4 border-primary">
                    <p className="text-sm font-semibold mb-2">Tuesday - AI suggests:</p>
                    <div className="text-xs bg-muted/30 p-3 rounded mb-2 font-mono">
                      <p className="mb-2">Hi John,</p>
                      <p className="mb-2">Quick update on the Q4 report...</p>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">User edits: "on the Q4 report" → "re: Q4 report"</p>
                    <p className="text-xs text-primary">✓ Learns: user prefers "re:" over "regarding/about"</p>
                  </div>
                  <div className="text-center text-2xl text-primary">↓</div>
                  <div className="bg-background rounded-lg p-4 border-l-4 border-primary">
                    <p className="text-sm font-semibold mb-2">Wednesday - AI suggests:</p>
                    <div className="text-xs bg-muted/30 p-3 rounded mb-2 font-mono">
                      <p className="mb-2">Hi Sarah,</p>
                      <p>Re: Budget approval—approved. Will confirm by EOD.</p>
                    </div>
                    <p className="text-xs text-primary">✓ Automatically applies: concise + "re:" style</p>
                  </div>
                  <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-primary font-semibold">User satisfaction increases ↗</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 border-2">
              <div className="mb-4">
                <h4 className="text-xl font-semibold mb-4">Without Our API</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>Users repeat preferences every conversation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>No memory of past interactions or corrections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>Each session starts from scratch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>Frustrating, repetitive user experience</span>
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="p-8 border-2 border-primary/20 bg-primary/5">
              <div className="mb-4">
                <h4 className="text-xl font-semibold mb-4">With Our API</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Learns explicit preferences your users tell it</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Discovers implicit preferences they don't mention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Adapts to each user's unique style and patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Gets smarter with every conversation</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}