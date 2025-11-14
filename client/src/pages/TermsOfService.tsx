import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <section className="py-20 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8">
              Terms of Service
            </h1>
            <p className="text-sm text-muted-foreground mb-12">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose prose-slate max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  By accessing or using SapientPriors' Continuous Learning API ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Use License</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Permission is granted to use our API for commercial and non-commercial purposes, subject to the following restrictions:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>You must not use the Service for any unlawful purpose or to violate any laws</li>
                  <li>You must not attempt to gain unauthorized access to the Service or its related systems</li>
                  <li>You must not use the Service to transmit any harmful code, viruses, or malicious software</li>
                  <li>You must not reverse engineer, decompile, or disassemble the Service</li>
                  <li>You must comply with all applicable data protection and privacy laws</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">API Usage and Limits</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We reserve the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>Set and modify usage limits and quotas</li>
                  <li>Monitor API usage to ensure compliance with these Terms</li>
                  <li>Suspend or terminate access for violations of these Terms</li>
                  <li>Modify or discontinue the Service with reasonable notice</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">User Data and Privacy</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You are responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>Obtaining necessary consents from end users before sending their data to our API</li>
                  <li>Complying with all applicable privacy laws and regulations</li>
                  <li>Ensuring data accuracy and security</li>
                  <li>Not sending sensitive personal information without proper safeguards</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The Service and its original content, features, and functionality are owned by SapientPriors and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the Service will be uninterrupted, secure, or error-free.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  In no event shall SapientPriors be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Termination</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may terminate or suspend your access to the Service immediately, without prior notice, for any breach of these Terms. Upon termination, your right to use the Service will cease immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We reserve the right to modify these Terms at any time. We will notify users of any material changes via email or through the Service. Your continued use of the Service after such modifications constitutes acceptance of the updated Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about these Terms, please contact us at:
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

