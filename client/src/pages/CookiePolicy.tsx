import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <section className="py-20 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8">
              Cookie Policy
            </h1>
            <p className="text-sm text-muted-foreground mb-12">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose prose-slate max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Cookies are small text files that are placed on your device when you visit our website. They are widely used to make websites work more efficiently and provide information to website owners.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use cookies for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  <li><strong>Security Cookies:</strong> Help us detect and prevent security threats</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
                <h3 className="text-xl font-semibold mb-3">Session Cookies</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  These are temporary cookies that expire when you close your browser. They help maintain your session while using our website.
                </p>

                <h3 className="text-xl font-semibold mb-3">Persistent Cookies</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  These cookies remain on your device for a set period or until you delete them. They help us remember your preferences and improve your experience.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may use third-party services that set cookies on your device. These include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>Analytics services to understand website usage</li>
                  <li>Content delivery networks for improved performance</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You can control and manage cookies in various ways:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>Browser settings allow you to refuse or delete cookies</li>
                  <li>Most browsers accept cookies automatically, but you can modify settings to decline cookies</li>
                  <li>Note that disabling cookies may affect the functionality of our website</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have questions about our use of cookies, please contact us at:
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




