import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Mail, Sparkles, MessageSquare, ArrowRight } from "lucide-react";

export default function ApiDemoSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            It Learns What You Don't Say
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
            Watch how our API discovers implicit preferences from behavior, learns your style, and confirms insights before applying them.
          </p>
        </div>

        <div className="space-y-8">
          {/* Step 1: Initial Email */}
          <div className="relative">
            <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
              1
            </div>
            <div className="ml-20">
              <div className="mb-3">
                <Badge variant="outline" className="mb-2">
                  First Interaction
                </Badge>
                <h3 className="text-xl font-semibold">User Composes Email</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  The AI generates a response, but the user edits it to be shorter
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <span className="font-semibold">AI Generated Draft</span>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-md text-sm space-y-3">
                    <p className="font-semibold">Subject: Project Update</p>
                    <div className="space-y-2 text-muted-foreground">
                      <p>Hi Team,</p>
                      <p>I wanted to take a moment to provide you with a comprehensive update on the current status of our project. Over the past week, we have made significant progress on several key deliverables and milestones.</p>
                      <p>First and foremost, I'm pleased to report that the frontend implementation has been completed successfully. The team has done an excellent job ensuring that all components are responsive and user-friendly.</p>
                      <p>Additionally, we've begun the initial phases of backend integration, which is proceeding according to our timeline. We anticipate completing this phase by the end of next week.</p>
                      <p>Please don't hesitate to reach out if you have any questions or concerns.</p>
                      <p>Best regards,<br/>Sarah</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-primary/50">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <span className="font-semibold">User's Edited Version</span>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-md text-sm space-y-3">
                    <p className="font-semibold">Subject: Project Update</p>
                    <div className="space-y-2">
                      <p>Hi Team,</p>
                      <p><strong>Frontend complete.</strong> Backend integration in progress, on track for next week.</p>
                      <p>Let me know if questions.</p>
                      <p>Sarah</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground bg-muted/30 p-3 rounded-md">
                    <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>System observes: User significantly shortened the email, removing details and formalities</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-6 h-6 text-muted-foreground" />
          </div>

          {/* Step 2: Insight Extraction */}
          <div className="relative">
            <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
              2
            </div>
            <div className="ml-20">
              <div className="mb-3">
                <Badge variant="outline" className="mb-2">
                  Preference Extraction
                </Badge>
                <h3 className="text-xl font-semibold">System Requests Confirmation</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Before applying the learned preference, the API asks the user to confirm
                </p>
              </div>
              <Card className="p-6 bg-accent/5 border-accent">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold mb-2">Insight Detected</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      "I noticed you prefer concise, direct emails without extra formalities. Should I generate shorter emails for you going forward?"
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="default" data-testid="button-confirm-preference">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Yes, use this preference
                      </Button>
                      <Button size="sm" variant="outline" data-testid="button-decline-preference">
                        No, keep current style
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-6 h-6 text-muted-foreground" />
          </div>

          {/* Step 3: Preference Applied */}
          <div className="relative">
            <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
              3
            </div>
            <div className="ml-20">
              <div className="mb-3">
                <Badge variant="outline" className="mb-2">
                  Preference Applied
                </Badge>
                <h3 className="text-xl font-semibold">Next Email Generated with Learned Preference</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  The AI now automatically generates concise emails matching the user's style
                </p>
              </div>
              <Card className="p-6 border-primary">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="font-semibold">New AI Generated Email</span>
                  <Badge variant="default" className="ml-auto">Personalized</Badge>
                </div>
                <div className="bg-primary/5 p-4 rounded-md text-sm space-y-3">
                  <p className="font-semibold">Subject: Q4 Planning</p>
                  <div className="space-y-2">
                    <p>Hi Team,</p>
                    <p><strong>Q4 priorities:</strong> Launch new features by Oct 15, complete security audit by Nov 1.</p>
                    <p>Planning session scheduled for Sept 30, 2pm. Agenda attached.</p>
                    <p>Questions welcome.</p>
                    <p>Sarah</p>
                  </div>
                </div>
                <div className="mt-4 flex items-start gap-2 text-xs bg-primary/10 text-primary p-3 rounded-md">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span><strong>Preference active:</strong> Generating concise, direct emails without unnecessary details</span>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-card rounded-lg p-8 border">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-4">Key Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Implicit Learning</h4>
                <p className="text-sm text-muted-foreground">
                  No need to manually configure preferences - the system learns from behavior
                </p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">User Confirmation</h4>
                <p className="text-sm text-muted-foreground">
                  Always asks permission before applying learned preferences
                </p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Continuous Adaptation</h4>
                <p className="text-sm text-muted-foreground">
                  Preferences evolve over time as user behavior changes
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Ready to add intelligent personalization to your application?
          </p>
          <Button
            onClick={() => window.location.href = 'mailto:raveeshupahuja@sapientpriors.com?subject=API Access Request'}
            size="lg"
            data-testid="button-request-api-access"
          >
            Request API Access
          </Button>
        </div>
      </div>
    </section>
  );
}