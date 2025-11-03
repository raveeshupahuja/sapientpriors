import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2, Briefcase, Users, Zap, Target, MapPin, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { jobs } from "@/data/jobs";

export default function Careers() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState("");
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

  const handleApply = (jobTitle: string) => {
    setSelectedRole(jobTitle);
    setFormData({ ...formData, role: jobTitle });
    const formElement = document.getElementById('application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
        setSelectedRole("");
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

            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-8 text-center">Open Positions</h2>
              <div className="space-y-6 max-w-5xl mx-auto">
                {jobs.map((job) => (
                  <Card key={job.id} className="overflow-hidden" data-testid={`job-card-${job.id}`}>
                    <div className="p-6 lg:p-8">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-3" data-testid={`job-title-${job.id}`}>
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge variant="default" data-testid={`job-type-${job.id}`}>
                              {job.type}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {job.location}
                            </Badge>
                            {job.type === "Internship" && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                6-12 months
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {job.description}
                          </p>
                        </div>
                        <div className="flex gap-2 lg:flex-col">
                          <Button
                            onClick={() => handleApply(job.title)}
                            data-testid={`button-apply-${job.id}`}
                          >
                            Apply Now
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                            data-testid={`button-details-${job.id}`}
                          >
                            {expandedJob === job.id ? (
                              <>
                                <ChevronUp className="w-4 h-4 mr-2" />
                                Less Details
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-4 h-4 mr-2" />
                                More Details
                              </>
                            )}
                          </Button>
                        </div>
                      </div>

                      {expandedJob === job.id && (
                        <div className="mt-6 pt-6 border-t space-y-6" data-testid={`job-details-${job.id}`}>
                          <div>
                            <h4 className="font-semibold text-lg mb-3">Key Responsibilities</h4>
                            <ul className="space-y-2">
                              {job.responsibilities.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <span className="text-primary mt-1">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-lg mb-3">Required Qualifications</h4>
                            <ul className="space-y-2">
                              {job.requirements.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <span className="text-primary mt-1">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {job.preferred && job.preferred.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-lg mb-3">Preferred Qualifications</h4>
                              <ul className="space-y-2">
                                {job.preferred.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <span className="text-primary mt-1">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div>
                            <h4 className="font-semibold text-lg mb-3">Benefits & Perks</h4>
                            <ul className="space-y-2">
                              {job.benefits.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <span className="text-primary mt-1">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Card id="application-form" className="p-8 lg:p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-2">Apply for a Position</h2>
              <p className="text-muted-foreground mb-8">
                {selectedRole 
                  ? `Applying for: ${selectedRole}` 
                  : "Fill out the form below to apply for any of our open positions."}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" data-testid="label-name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      data-testid="input-name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" data-testid="label-email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
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
                    <Label htmlFor="phone" data-testid="label-phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      data-testid="input-phone"
                    />
                  </div>

                  <div>
                    <Label htmlFor="linkedin" data-testid="label-linkedin">LinkedIn Profile</Label>
                    <Input
                      id="linkedin"
                      name="linkedin"
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      data-testid="input-linkedin"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="role" data-testid="label-role">Role of Interest *</Label>
                  <Input
                    id="role"
                    name="role"
                    required
                    placeholder="e.g., Machine Learning Engineer, Machine Learning Engineer Intern"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    data-testid="input-role"
                  />
                </div>

                <div>
                  <Label htmlFor="experience" data-testid="label-experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    name="experience"
                    placeholder="e.g., 5 years"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    data-testid="input-experience"
                  />
                </div>

                <div>
                  <Label htmlFor="coverLetter" data-testid="label-cover-letter">Cover Letter / Why SapientPriors? *</Label>
                  <Textarea
                    id="coverLetter"
                    name="coverLetter"
                    required
                    rows={6}
                    placeholder="Tell us about yourself, your experience, and why you're interested in joining SapientPriors..."
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    data-testid="input-cover-letter"
                  />
                </div>

                <div>
                  <Label htmlFor="resume" data-testid="label-resume">Resume / CV</Label>
                  <Input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setFormData({ ...formData, resume: e.target.files?.[0] || null })}
                    data-testid="input-resume"
                  />
                  <p className="text-xs text-muted-foreground mt-2" data-testid="text-resume-help">
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
                  href="mailto:careers@sapientpriors.com"
                  className="text-primary hover:underline"
                  data-testid="link-careers-email"
                >
                  careers@sapientpriors.com
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
