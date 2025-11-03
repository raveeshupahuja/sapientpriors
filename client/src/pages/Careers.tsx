import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2, Briefcase, Users, Zap, Target } from "lucide-react";

export default function Careers() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    role: "",
    experience: "",
    coverLetter: "",
    resume: null as File | null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          formDataToSend.append(key, value);
        }
      });

      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        toast({
          title: "Application Submitted!",
          description: "Thank you for your interest. We'll review your application and get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          linkedin: "",
          role: "",
          experience: "",
          coverLetter: "",
          resume: null
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again or email us directly.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    {
      icon: Target,
      title: "Cutting-Edge Research",
      description: "Work on the forefront of AI and machine learning, building the future of autonomous agents"
    },
    {
      icon: Users,
      title: "Collaborative Environment",
      description: "Join a team of experienced ML engineers from top tech companies"
    },
    {
      icon: Zap,
      title: "Impactful Work",
      description: "Your contributions will directly shape the next generation of AI systems"
    },
    {
      icon: Briefcase,
      title: "Growth Opportunities",
      description: "Continuous learning and professional development in a fast-growing field"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
                Careers at SapientPriors
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Join us in building the future of continually learning autonomous agents
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {benefits.map((benefit, index) => (
                <Card key={index} className="p-6" data-testid={`benefit-card-${index}`}>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </Card>
              ))}
            </div>

            <Card className="p-8 lg:p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-2">Apply Now</h2>
              <p className="text-muted-foreground mb-8">
                We're always looking for talented individuals passionate about AI research and development. Submit your application below.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      data-testid="input-name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      data-testid="input-email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      data-testid="input-phone"
                    />
                  </div>

                  <div>
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <Input
                      id="linkedin"
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      data-testid="input-linkedin"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="role">Role of Interest *</Label>
                  <Input
                    id="role"
                    required
                    placeholder="e.g., Machine Learning Engineer, Research Scientist"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    data-testid="input-role"
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    placeholder="e.g., 5 years"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    data-testid="input-experience"
                  />
                </div>

                <div>
                  <Label htmlFor="coverLetter">Cover Letter / Why SapientPriors? *</Label>
                  <Textarea
                    id="coverLetter"
                    required
                    rows={6}
                    placeholder="Tell us about yourself, your experience, and why you're interested in joining SapientPriors..."
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    data-testid="input-cover-letter"
                  />
                </div>

                <div>
                  <Label htmlFor="resume">Resume / CV</Label>
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setFormData({ ...formData, resume: e.target.files?.[0] || null })}
                    data-testid="input-resume"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Accepted formats: PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                  data-testid="button-submit-application"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              </form>
            </Card>

            <div className="mt-12 text-center text-muted-foreground">
              <p>
                Questions about careers at SapientPriors? Email us at{' '}
                <a
                  href="mailto:raveeshupahuja@sapientpriors.com"
                  className="text-primary hover:underline"
                  data-testid="link-careers-email"
                >
                  raveeshupahuja@sapientpriors.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}