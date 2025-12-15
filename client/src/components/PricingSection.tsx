import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Rocket, Users, Zap } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function PricingSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    useCase: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          subject: 'Beta Program Interest',
          to: 'raveeshupahuja@sapientpriors.com'
        }),
      });

      if (response.ok) {
        toast({
          title: "Message Received!",
          description: "We'll get back to you within 48 hours to schedule your free consultation.",
        });
        setFormData({
          name: "",
          email: "",
          company: "",
          useCase: "",
          message: ""
        });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or email us directly at raveeshupahuja@sapientpriors.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const betaFeatures = [
    {
      icon: Rocket,
      title: "Early Access",
      description: "Get exclusive access to new features before public release"
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Work directly with our team for onboarding and integration"
    },
    {
      icon: Zap,
      title: "Shape the Product",
      description: "Your feedback directly influences our product roadmap"
    }
  ];

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
            Get in touch below for a <span className="font-semibold text-primary">free consultation</span> and to discuss beta access tailored to your needs.
          </p>
        </div>

        {/* Beta Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {betaFeatures.map((feature, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Beta Application Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 lg:p-10">
            <div className="flex justify-center mb-4">
              <span className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
                Free Consultation
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-6 text-center">Get in Touch for Beta Access</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  placeholder="Acme Inc."
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="useCase">What's your use case? *</Label>
                <Input
                  id="useCase"
                  placeholder="e.g., Chatbot personalization, customer support, etc."
                  value={formData.useCase}
                  onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Additional Information (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about your project, expected usage, timeline, etc."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Get in Touch"}
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                <span className="font-semibold text-primary">Free consultation included.</span> We'll get back to you within 48 hours.
              </p>
            </form>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center max-w-3xl mx-auto">
          <Card className="p-6 bg-primary/5 border-primary/20">
            <p className="text-sm font-semibold mb-2">What's Included</p>
            <p className="text-sm text-muted-foreground">
              Beta partners get access to our full REST API, support for all major AI providers (OpenAI, Anthropic, Google),
              dedicated onboarding assistance, and the opportunity to influence our product roadmap.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
