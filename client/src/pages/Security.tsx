import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Security() {
  const securityFeatures = [
    {
      icon: Lock,
      title: "Encryption in Transit and at Rest",
      description: "All data transmitted to and from our API is encrypted using TLS 1.3. Data at rest is encrypted using industry-standard encryption algorithms."
    },
    {
      icon: Shield,
      title: "Authentication & Authorization",
      description: "API access is secured with API keys and OAuth 2.0. We implement role-based access control to ensure only authorized users can access data."
    },
    {
      icon: Eye,
      title: "Data Privacy",
      description: "We never sell your data. User data is processed only to provide our learning services and is never shared with third parties without explicit consent."
    },
    {
      icon: CheckCircle2,
      title: "Regular Security Audits",
      description: "We conduct regular security assessments, penetration testing, and vulnerability scans to identify and address potential security issues."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                Security
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                We take security seriously. Your data and your users' data are protected with industry-leading security measures.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {securityFeatures.map((feature, index) => (
                <Card key={index} className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We implement multiple layers of security to protect your data:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>End-to-end encryption for all API communications</li>
                  <li>Secure data storage with encrypted databases</li>
                  <li>Regular backups with encrypted backup storage</li>
                  <li>Access controls and audit logging</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Compliance</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We are committed to maintaining compliance with relevant data protection regulations:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>GDPR (General Data Protection Regulation)</li>
                  <li>CCPA (California Consumer Privacy Act)</li>
                  <li>Industry best practices and standards</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Incident Response</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  In the event of a security incident, we have procedures in place to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>Quickly identify and contain the incident</li>
                  <li>Notify affected users in a timely manner</li>
                  <li>Conduct thorough post-incident analysis</li>
                  <li>Implement measures to prevent future incidents</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Reporting Security Issues</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you discover a security vulnerability, please report it to us responsibly. We appreciate your help in keeping our service secure.
                </p>
                <p className="text-muted-foreground">
                  Email: <a href="mailto:raveeshupahuja@sapientpriors.com?subject=Security Vulnerability Report" className="text-primary hover:underline">raveeshupahuja@sapientpriors.com</a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  For security-related questions or concerns, please contact us at:
                </p>
                <p className="text-muted-foreground">
                  Email: <a href="mailto:raveeshupahuja@sapientpriors.com" className="text-primary hover:underline">raveeshupahuja@sapientpriors.com</a>
                  <br />
                  Address: 23203 SE 27th St, Sammamish, WA 98075
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

