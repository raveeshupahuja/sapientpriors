import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CodeExampleSection() {
  const [activeTab, setActiveTab] = useState<'javascript' | 'python' | 'curl'>('javascript');
  const [copied, setCopied] = useState(false);

  const codeExamples = {
    javascript: `// Send user interaction to learn preferences
await fetch('https://api.sapientpriors.com/learn', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    userId: 'user-123',
    interaction: {
      query: 'Write an email to the team',
      response: 'Keep it concise please',
      feedback: 'positive'
    }
  })
});

// Retrieve personalized context
const context = await fetch(
  'https://api.sapientpriors.com/context/user-123',
  {
    headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
  }
).then(res => res.json());

// Use context in your AI prompt
const response = await openai.chat.completions.create({
  messages: [
    { role: 'system', content: context.preferences },
    { role: 'user', content: userMessage }
  ]
});`,
    python: `# Send user interaction to learn preferences
import requests

requests.post(
    'https://api.sapientpriors.com/learn',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'userId': 'user-123',
        'interaction': {
            'query': 'Write an email to the team',
            'response': 'Keep it concise please',
            'feedback': 'positive'
        }
    }
)

# Retrieve personalized context
response = requests.get(
    'https://api.sapientpriors.com/context/user-123',
    headers={'Authorization': 'Bearer YOUR_API_KEY'}
)
context = response.json()

# Use context in your LLM prompt
completion = openai.ChatCompletion.create(
    messages=[
        {'role': 'system', 'content': context['preferences']},
        {'role': 'user', 'content': user_message}
    ]
)`,
    curl: `# Send user interaction to learn preferences
curl -X POST https://api.sapientpriors.com/learn \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "userId": "user-123",
    "interaction": {
      "query": "Write an email to the team",
      "response": "Keep it concise please",
      "feedback": "positive"
    }
  }'

# Retrieve personalized context
curl https://api.sapientpriors.com/context/user-123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
            Simple Integration
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
            Get started in minutes with our straightforward API
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="flex items-center justify-between bg-muted px-6 py-4 border-b">
            <div className="flex gap-2">
              <Button
                variant={activeTab === 'javascript' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('javascript')}
                data-testid="tab-javascript"
              >
                JavaScript
              </Button>
              <Button
                variant={activeTab === 'python' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('python')}
                data-testid="tab-python"
              >
                Python
              </Button>
              <Button
                variant={activeTab === 'curl' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('curl')}
                data-testid="tab-curl"
              >
                cURL
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              data-testid="button-copy-code"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <div className="p-6 bg-background">
            <pre className="font-mono text-sm overflow-x-auto">
              <code data-testid="code-example">{codeExamples[activeTab]}</code>
            </pre>
          </div>
        </Card>
      </div>
    </section>
  );
}