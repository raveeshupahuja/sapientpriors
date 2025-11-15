import { Card } from "@/components/ui/card";
import { Shield, Lock, FileText } from "lucide-react";

export default function DataPrivacySection() {
  const privacyFeatures = [
    {
      icon: Shield,
      title: "Your Data, Your Control",
      description: "All user data is encrypted at rest and in transit. You maintain full ownership and can export or delete data at any time."
    },
    {
      icon: Lock,
      title: "SOC 2 Compliant",
      description: "We follow industry-standard security practices with regular audits and compliance certifications."
    },
    {
      icon: FileText,
      title: "Transparent Data Usage",
      description: "We only use your data to provide the learning service. No third-party sharing, no training our models on your data."
    }
  ];

  const apiAccess = [
    {
      title: "POST /api/chat",
      description: "Send conversations - we automatically determine what to learn and what context to retrieve based on the ongoing conversation",
      example: `{
  "user_id": "user_123",
  "messages": [...]
}
→ Returns relevant context + learns from interaction`,
      highlight: true
    },
    {
      title: "POST /api/memory/save",
      description: "Explicitly save a specific preference or memory (optional - for manual control)",
      example: `{
  "user_id": "user_123",
  "memory": "User prefers 're:' format in emails"
}`
    },
    {
      title: "GET /api/memory/retrieve",
      description: "Explicitly retrieve saved memories for a user (optional - for manual control)",
      example: `{
  "user_id": "user_123"
}
→ Returns all learned preferences`
    }
  ];

  return (
    <section id="privacy-api" className="py-20 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Data Privacy */}
        <div className="mb-20">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
              Data Privacy & Security
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              Your users' data is protected with enterprise-grade security. We're committed to transparency and control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {privacyFeatures.map((feature, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* API Documentation */}
        <div>
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
              Simple API Access
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-4">
              <span className="font-semibold text-foreground">Automatic context handling:</span> Send your conversations and we intelligently determine what to learn and when to retrieve context.
            </p>
            <p className="text-sm text-muted-foreground">
              Need manual control? Optional explicit endpoints available for advanced use cases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {apiAccess.map((api, index) => (
              <Card
                key={index}
                className={`p-6 ${api.highlight ? 'border-2 border-primary bg-primary/5' : ''}`}
              >
                {api.highlight && (
                  <div className="mb-3">
                    <span className="text-xs font-semibold bg-primary text-primary-foreground px-2 py-1 rounded">
                      Recommended
                    </span>
                  </div>
                )}
                <div className="mb-4">
                  <code className="text-sm font-mono bg-primary/10 text-primary px-3 py-1.5 rounded">
                    {api.title}
                  </code>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{api.description}</p>
                <div className="bg-muted rounded-lg p-4">
                  <pre className="text-xs font-mono text-muted-foreground overflow-x-auto">
                    {api.example}
                  </pre>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="p-8 bg-primary/5 border-primary/20 max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold mb-3">Complete Documentation</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Access our full API documentation, SDKs for popular languages, and integration guides
                when you sign up. Get started in minutes with our quick-start templates.
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                <span className="px-3 py-1 bg-background rounded-md font-mono">Python SDK</span>
                <span className="px-3 py-1 bg-background rounded-md font-mono">JavaScript SDK</span>
                <span className="px-3 py-1 bg-background rounded-md font-mono">REST API</span>
                <span className="px-3 py-1 bg-background rounded-md font-mono">OpenAPI Spec</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
