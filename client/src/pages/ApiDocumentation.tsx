import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ApiDemoSection from "@/components/ApiDemoSection";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Code, Book, Zap, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ApiDocumentation() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const CodeBlock = ({ code, language = "javascript", section }: { code: string; language?: string; section: string }) => (
    <div className="relative group">
      <button
        onClick={() => copyToClipboard(code, section)}
        className="absolute top-3 right-3 p-2 rounded-md bg-zinc-700 hover:bg-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity z-10"
        aria-label="Copy code"
      >
        {copiedSection === section ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-zinc-200" />
        )}
      </button>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          padding: '1rem'
        }}
        showLineNumbers={false}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                <Code className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">API Documentation</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Build AI That Learns
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Integrate the SapientPriors personalization layer into your AI application with a few simple API calls.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="#concepts">Core Concepts</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#api-usage">API Usage</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#sample-app">Sample App</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#faq">FAQ</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-16 border-b">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-2">3 APIs</h3>
                <p className="text-muted-foreground">Account, App, Interactions & Context</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-2">&lt;5 min</h3>
                <p className="text-muted-foreground">Integration time to get started</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                  <Book className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-2">REST</h3>
                <p className="text-muted-foreground">Simple HTTP JSON API</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Concepts */}
        <section id="concepts" className="py-20 lg:py-32 bg-muted/30">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Core Concepts</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Understand the fundamental concepts before integrating the API.
            </p>

            <div className="space-y-8">
              {/* Concept 1: Hierarchy */}
              <div className="bg-background rounded-lg p-6 border">
                <h3 className="text-2xl font-semibold mb-4">Account → App → User Hierarchy</h3>
                <p className="text-muted-foreground mb-4">
                  SapientPriors uses a three-level hierarchy to organize your data:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🏢</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Account</h4>
                      <p className="text-sm text-muted-foreground">Your organization (e.g., "Acme Corp"). One account per company.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📱</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">App</h4>
                      <p className="text-sm text-muted-foreground">A specific AI application (e.g., "Email Assistant", "Code Helper"). Each app has its own objective and isolated learning.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">👤</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">User</h4>
                      <p className="text-sm text-muted-foreground">Individual end-users of your app. Each user's preferences are learned independently.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Concept 2: Two-Step Pattern */}
              <div className="bg-background rounded-lg p-6 border">
                <h3 className="text-2xl font-semibold mb-4">The Two-Step Learning Pattern</h3>
                <p className="text-muted-foreground mb-6">
                  SapientPriors works through a simple two-step cycle:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg p-6 border-2 border-green-200 dark:border-green-800">
                    <div className="text-3xl mb-3">📥</div>
                    <h4 className="font-semibold text-lg mb-2">1. Capture Interactions</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      <code className="text-xs bg-background px-2 py-1 rounded">POST /interactions</code>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Every time the user provides input—preferences, edits, feedback—send it to the API. The backend automatically infers patterns and updates learning.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg p-6 border-2 border-blue-200 dark:border-blue-800">
                    <div className="text-3xl mb-3">🎯</div>
                    <h4 className="font-semibold text-lg mb-2">2. Get Context</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      <code className="text-xs bg-background px-2 py-1 rounded">GET /context</code>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Before generating AI responses, retrieve learned preferences and patterns. Use this context to personalize your AI's behavior.
                    </p>
                  </div>
                </div>
              </div>

              {/* Concept 3: Objectives */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg p-6 border-2 border-blue-200 dark:border-blue-800">
                <h3 className="text-2xl font-semibold mb-4">💡 Objectives: The North Star</h3>
                <p className="text-muted-foreground mb-4">
                  Every app has an <strong>objective</strong>—a clear, measurable goal that guides what the AI learns. Good objectives are:
                </p>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-background/80 rounded-lg p-4">
                    <div className="text-2xl mb-2">📊</div>
                    <h4 className="font-semibold mb-1">Measurable</h4>
                    <p className="text-xs text-muted-foreground">Track progress with concrete metrics</p>
                  </div>
                  <div className="bg-background/80 rounded-lg p-4">
                    <div className="text-2xl mb-2">👥</div>
                    <h4 className="font-semibold mb-1">User-Centric</h4>
                    <p className="text-xs text-muted-foreground">Focus on user outcomes, not process</p>
                  </div>
                  <div className="bg-background/80 rounded-lg p-4">
                    <div className="text-2xl mb-2">🎯</div>
                    <h4 className="font-semibold mb-1">Outcome-Focused</h4>
                    <p className="text-xs text-muted-foreground">Define the end result you want</p>
                  </div>
                </div>
                <div className="bg-background/80 rounded-lg p-4">
                  <p className="text-sm mb-2">
                    <strong className="text-green-700 dark:text-green-400">✓ Good Example:</strong>
                  </p>
                  <code className="text-xs bg-muted px-2 py-1 rounded block">
                    "Minimize the edits required by the user when drafting emails by learning their writing style"
                  </code>
                  <p className="text-xs text-muted-foreground mt-2">
                    This is measurable (edit count), user-centric (minimize effort), and outcome-focused (fewer edits).
                  </p>
                </div>
                <div className="mt-4 p-4 bg-background/80 rounded-lg border border-blue-300 dark:border-blue-700">
                  <p className="text-sm">
                    <strong className="text-blue-900 dark:text-blue-100">📖 Learn More:</strong> See <a href="#faq" className="text-primary hover:underline font-semibold">How to Write Effective Objectives</a> in the FAQ for detailed examples and formulas.
                  </p>
                </div>
              </div>

              {/* Concept 4: Backend Inference */}
              <div className="bg-background rounded-lg p-6 border">
                <h3 className="text-2xl font-semibold mb-4">Backend Does the Heavy Lifting</h3>
                <p className="text-muted-foreground mb-4">
                  You don't need to classify interaction types or analyze patterns. Just send raw data:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">What You Send:</h4>
                    <div className="bg-muted/50 rounded p-3">
                      <code className="text-xs">
                        {'{'}<br/>
                        &nbsp;&nbsp;"user_message": "Make it shorter",<br/>
                        &nbsp;&nbsp;"ai_response": "...",<br/>
                        &nbsp;&nbsp;"task": "email_drafting"<br/>
                        {'}'}
                      </code>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">What Backend Infers:</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400">✓</span>
                        <span className="text-muted-foreground">This is an edit (not a new request)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400">✓</span>
                        <span className="text-muted-foreground">User prefers concise communication</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400">✓</span>
                        <span className="text-muted-foreground">Update confidence scores automatically</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* API Usage (formerly Quick Start) */}
        <section id="api-usage" className="py-20 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">API Usage</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get up and running with SapientPriors in minutes.
            </p>

            <div className="space-y-8">
              {/* Step 1 */}
              <div>
                <h3 className="text-2xl font-semibold mb-4">1. Create Account & App</h3>
                <p className="text-muted-foreground mb-4">
                  First create your account, then create an app with a base prompt and objective.
                </p>
                <CodeBlock
                  section="account-create"
                  code={`// 1. Create account
const accountResponse = await fetch('https://api.sapientpriors.com/v1/accounts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@company.com',
    organization: 'Your Company'
  })
});

const { account_id, api_key } = await accountResponse.json();

// 2. Create app
const appResponse = await fetch(\`https://api.sapientpriors.com/v1/accounts/\${account_id}/apps\`, {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${api_key}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Email Assistant',
    base_prompt: 'You are a helpful AI assistant for business communication.',
    objective: 'Make writing emails as seamless as possible by minimizing the edits required by the user.'
  })
});

const { app_id } = await appResponse.json();
// Save account_id, app_id, and api_key securely!`}
                />
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-blue-900 dark:text-blue-100">💡 Need help writing objectives?</strong> See our detailed guide: <a href="#faq" className="text-primary hover:underline">How to Write Effective Objectives</a>
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div>
                <h3 className="text-2xl font-semibold mb-4">2. Record User Interactions</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Key principle:</strong> Every time you get information from the user—messages, explicit preferences, edits, feedback, actions—post it to the interactions endpoint with as much of the surrounding context as possible. The more context you provide, the better the AI can learn.
                </p>
                <div className="space-y-4 mb-4">
                  <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">What User Sees:</p>
                    <p className="text-sm text-blue-800 dark:text-blue-200 italic">"Draft an email to the team about the product launch"</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <p className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">User Replies:</p>
                    <p className="text-sm text-green-800 dark:text-green-200 italic">"Make it shorter and add a TLDR at the top"</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                    <p className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-2">What You Send to API:</p>
                  </div>
                </div>
                <CodeBlock
                  section="interactions"
                  code={`// Just send the raw interaction - backend infers everything
const response = await fetch(
  'https://api.sapientpriors.com/v1/accounts/acc_123/apps/app_456/users/user_789/interactions',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_message: 'Make it shorter and add a TLDR at the top',
      ai_response: 'Draft an email to the team about the product launch',
      task: 'email_drafting',
      topic: 'product_launch',
      recipient: 'team'
    })
  }
);

const data = await response.json();
console.log(data.insights_generated);
// ["User prefers concise communication style", "User prefers TLDR format at beginning"]`}
                />
              </div>

              {/* Step 3 */}
              <div>
                <h3 className="text-2xl font-semibold mb-4">3. Get Context to Personalize Actions</h3>
                <p className="text-muted-foreground mb-4">
                  Whenever the user wants to perform an action, get their learned context to personalize the experience.
                </p>
                <div className="space-y-4 mb-4">
                  <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">What User Sees (Next Day):</p>
                    <p className="text-sm text-blue-800 dark:text-blue-200 italic">"Draft an email to Sarah about Q4 results"</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                    <p className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-2">What You Do: Get Context First</p>
                  </div>
                </div>
                <CodeBlock
                  section="context"
                  code={`// Get context before drafting the email
const contextResponse = await fetch(
  'https://api.sapientpriors.com/v1/accounts/acc_123/apps/app_456/users/user_789/context?task=email_drafting&topic=Q4_results&recipient=Sarah',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  }
);

const context = await contextResponse.json();
console.log(context.learned_preferences);
// [
//   { preference: 'concise_communication', confidence: 0.95 },
//   { preference: 'tldr_at_top', confidence: 0.87 }
// ]
console.log(context.suggested_approach);
// "Draft a concise email with TLDR at the beginning. Keep under 100 words."

// Use context to enhance your AI prompt
const enhancedPrompt = \`
  Draft a professional email about Q4 results to Sarah.
  Style guidance: \${context.suggested_approach}
\`;
const aiResponse = await yourAI.generate(enhancedPrompt);`}
                />
                <div className="mt-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <p className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">What User Sees (AI Response):</p>
                  <p className="text-sm text-green-800 dark:text-green-200 font-mono">
                    Hi Sarah,<br/><br/>
                    TLDR: Q4 exceeded targets—revenue +15%, costs -8%.<br/><br/>
                    Great quarter overall. Full report attached.<br/><br/>
                    Thanks
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-2">✓ AI automatically applied both learned preferences!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sample App Walkthrough */}
        <section id="sample-app" className="py-20 lg:py-32 bg-muted/30">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Building a Personalized Email Co-pilot</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Complete walkthrough: Build an email assistant that learns your writing style and preferences.
            </p>

            <div className="space-y-8">
              {/* Step 1: Setup */}
              <div className="bg-background rounded-lg p-6 border">
                <h3 className="text-2xl font-semibold mb-4">Step 1: Initialize Your App</h3>
                <p className="text-muted-foreground mb-4">
                  First, create your account and set up your email co-pilot app.
                </p>
                <CodeBlock
                  section="sample-setup"
                  code={`// Initialize SapientPriors for your email co-pilot
async function initializeApp() {
  // 1. Create account
  const accountRes = await fetch('https://api.sapientpriors.com/v1/accounts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'dev@yourcompany.com',
      organization: 'YourCompany'
    })
  });

  const { account_id, api_key } = await accountRes.json();

  // 2. Create email co-pilot app
  const appRes = await fetch(\`https://api.sapientpriors.com/v1/accounts/\${account_id}/apps\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${api_key}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Email Co-pilot',
      description: 'Personalized email writing assistant',
      base_prompt: 'You are a professional email writing assistant that helps users draft clear, effective business emails.',
      objective: 'Make writing emails for the user as seamless as possible by learning their unique style and automating their preferences.',
      metadata: {
        use_case: 'email_assistant',
        version: '1.0'
      }
    })
  });

  const { app_id } = await appRes.json();

  // Store these securely (e.g., environment variables)
  return { account_id, app_id, api_key };
}

// Store credentials
const { account_id, app_id, api_key } = await initializeApp();`}
                />
              </div>

              {/* Step 2: User Interaction */}
              <div className="bg-background rounded-lg p-6 border">
                <h3 className="text-2xl font-semibold mb-4">Step 2: Handle User Requests</h3>
                <p className="text-muted-foreground mb-4">
                  When a user asks to draft an email, get their learned context first.
                </p>

                <div className="space-y-4 mb-4">
                  <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">User Input:</p>
                    <p className="text-sm text-blue-800 dark:text-blue-200 italic">"Draft an email to Alex about the budget approval"</p>
                  </div>
                </div>

                <CodeBlock
                  section="sample-request"
                  code={`async function handleEmailRequest(userId, userMessage) {
  // Parse user's request
  const recipient = 'Alex';
  const topic = 'budget_approval';
  const task = 'email_drafting';

  // 1. Get learned context for this user
  const contextRes = await fetch(
    \`https://api.sapientpriors.com/v1/accounts/\${account_id}/apps/\${app_id}/users/\${userId}/context?\` +
    new URLSearchParams({ task, topic, recipient }),
    {
      headers: { 'Authorization': \`Bearer \${api_key}\` }
    }
  );

  const context = await contextRes.json();

  // 2. Build personalized AI prompt
  const systemPrompt = \`You are an email writing assistant.
User preferences: \${context.suggested_approach || 'No preferences learned yet'}

Learned patterns:
\${context.learned_preferences?.map(p =>
  \`- \${p.preference} (confidence: \${p.confidence})\`
).join('\\n') || '- None yet'}

Draft an email following these preferences.\`;

  // 3. Generate email with your AI (OpenAI, Anthropic, etc.)
  const aiEmail = await generateWithAI(systemPrompt, {
    recipient,
    topic: 'budget approval',
    userRequest: userMessage
  });

  return aiEmail;
}

// Example AI generation function (using OpenAI)
async function generateWithAI(systemPrompt, params) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: \`Draft email to \${params.recipient} about \${params.topic}\` }
    ]
  });

  return response.choices[0].message.content;
}`}
                />
              </div>

              {/* Step 3: User Edits */}
              <div className="bg-background rounded-lg p-6 border">
                <h3 className="text-2xl font-semibold mb-4">Step 3: Capture User Edits</h3>
                <p className="text-muted-foreground mb-4">
                  When users edit the AI draft, record those edits to learn their preferences.
                </p>

                <div className="space-y-4 mb-4">
                  <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-100 mb-2">AI Generated:</p>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200 font-mono">
                      Hi Alex,<br/><br/>
                      I wanted to follow up regarding the budget approval request we discussed last week...
                      [long email]
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <p className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">User Edited To:</p>
                    <p className="text-sm text-green-800 dark:text-green-200 font-mono">
                      Hi Alex,<br/><br/>
                      TLDR: Budget approved - $50K for Q1.<br/><br/>
                      Great news on your budget request. Finance approved the full amount this morning...
                    </p>
                  </div>
                </div>

                <CodeBlock
                  section="sample-record-edit"
                  code={`async function recordUserEdit(userId, originalEmail, editedEmail, context) {
  // Just send what AI generated and what user changed it to
  // Backend will infer the patterns automatically
  await fetch(
    \`https://api.sapientpriors.com/v1/accounts/\${account_id}/apps/\${app_id}/users/\${userId}/interactions\`,
    {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${api_key}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ai_response: originalEmail,
        user_message: editedEmail,
        task: 'email_drafting',
        recipient: context.recipient,
        topic: context.topic
      })
    }
  );
}`}
                />
              </div>

              {/* Step 4: User Feedback */}
              <div className="bg-background rounded-lg p-6 border">
                <h3 className="text-2xl font-semibold mb-4">Step 4: Capture Explicit Feedback</h3>
                <p className="text-muted-foreground mb-4">
                  Let users provide direct feedback or state preferences explicitly.
                </p>

                <div className="space-y-4 mb-4">
                  <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">User Says:</p>
                    <p className="text-sm text-blue-800 dark:text-blue-200 italic">"Always use bullet points for action items"</p>
                  </div>
                </div>

                <CodeBlock
                  section="sample-feedback"
                  code={`async function recordUserFeedback(userId, feedback, context) {
  // Just send the user's message - backend infers it's a preference
  await fetch(
    \`https://api.sapientpriors.com/v1/accounts/\${account_id}/apps/\${app_id}/users/\${userId}/interactions\`,
    {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${api_key}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_message: feedback,
        ai_response: context.currentEmail || null,
        task: 'email_drafting'
      })
    }
  );
}

// Example: User clicks thumbs up/down
async function recordThumbsFeedback(userId, emailDraft, isPositive) {
  // Send simple feedback signal with the content
  await fetch(
    \`https://api.sapientpriors.com/v1/accounts/\${account_id}/apps/\${app_id}/users/\${userId}/interactions\`,
    {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${api_key}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_message: isPositive ? '👍' : '👎',
        ai_response: emailDraft,
        task: 'email_drafting'
      })
    }
  );
}`}
                />
              </div>

              {/* Step 5: Continuous Improvement */}
              <div className="bg-background rounded-lg p-6 border">
                <h3 className="text-2xl font-semibold mb-4">Step 5: Watch It Improve Over Time</h3>
                <p className="text-muted-foreground mb-4">
                  After a few interactions, the AI will automatically adapt to each user's style.
                </p>

                <div className="space-y-4 mb-4">
                  <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                    <p className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-2">Day 1: First Email (No Context)</p>
                    <p className="text-sm text-purple-800 dark:text-purple-200 font-mono">
                      Long, formal, no TLDR → User edits heavily
                    </p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                    <p className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-2">Day 3: Third Email (Learning Applied)</p>
                    <p className="text-sm text-purple-800 dark:text-purple-200 font-mono">
                      Concise, TLDR at top, bullet points → User approves with minimal edits
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <p className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">Day 7: Fully Personalized (High Confidence)</p>
                    <p className="text-sm text-green-800 dark:text-green-200 font-mono">
                      Perfect match to user's style → No edits needed!
                    </p>
                  </div>
                </div>

                <CodeBlock
                  section="sample-progress"
                  code={`// Monitor learning progress
async function getUserLearningStats(userId) {
  const contextRes = await fetch(
    \`https://api.sapientpriors.com/v1/accounts/\${account_id}/apps/\${app_id}/users/\${userId}/context\`,
    {
      headers: { 'Authorization': \`Bearer \${api_key}\` }
    }
  );

  const context = await contextRes.json();

  // Show user their learned preferences
  console.log('Your AI has learned:');
  context.learned_preferences?.forEach(pref => {
    console.log(\`✓ \${pref.preference} (confidence: \${Math.round(pref.confidence * 100)}%)\`);
  });

  return context;
}

// Example output after 1 week:
// Your AI has learned:
// ✓ concise_communication (confidence: 95%)
// ✓ tldr_at_top (confidence: 87%)
// ✓ bullet_points_for_actions (confidence: 82%)
// ✓ casual_tone_with_internal_team (confidence: 78%)
// ✓ formal_tone_with_clients (confidence: 91%)`}
                />
              </div>

              {/* Complete Integration */}
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6 border-2 border-primary/20">
                <h3 className="text-2xl font-semibold mb-4">Complete Integration Example</h3>
                <p className="text-muted-foreground mb-4">
                  Putting it all together in your email co-pilot application.
                </p>
                <CodeBlock
                  section="sample-complete"
                  code={`// Main email co-pilot handler
class EmailCopilot {
  constructor(accountId, appId, apiKey) {
    this.accountId = accountId;
    this.appId = appId;
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.sapientpriors.com/v1';
  }

  async draftEmail(userId, userRequest, recipient, topic) {
    // 1. Get personalized context
    const context = await this.getContext(userId, {
      task: 'email_drafting',
      recipient,
      topic
    });

    // 2. Generate personalized email
    const email = await this.generateEmail(userRequest, context);

    return { email, context };
  }

  async handleUserEdit(userId, originalEmail, editedEmail, metadata) {
    // Simple: just send AI output and user's version
    await this.recordInteraction(userId, {
      ai_response: originalEmail,
      user_message: editedEmail,
      ...metadata
    });
  }

  async handleUserFeedback(userId, feedback, aiResponse, metadata) {
    // Simple: just send user's feedback message
    await this.recordInteraction(userId, {
      user_message: feedback,
      ai_response: aiResponse || null,
      ...metadata
    });
  }

  // Helper methods
  async getContext(userId, params) {
    const url = \`\${this.baseUrl}/accounts/\${this.accountId}/apps/\${this.appId}/users/\${userId}/context?\` +
      new URLSearchParams(params);

    const res = await fetch(url, {
      headers: { 'Authorization': \`Bearer \${this.apiKey}\` }
    });

    return res.json();
  }

  async recordInteraction(userId, data) {
    const url = \`\${this.baseUrl}/accounts/\${this.accountId}/apps/\${this.appId}/users/\${userId}/interactions\`;

    await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${this.apiKey}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  async generateEmail(request, context) {
    // Use context.suggested_approach to personalize your AI prompts
    const systemPrompt = \`Draft a professional email.
Style: \${context.suggested_approach || 'Professional and clear'}\`;

    // Call your AI service (OpenAI, Anthropic, etc.)
    return await yourAI.generate(systemPrompt, request);
  }
}

// Usage
const copilot = new EmailCopilot(account_id, app_id, api_key);

// User wants to draft an email
const { email } = await copilot.draftEmail(
  'user_123',
  'Draft email to Sarah about Q4 results',
  'Sarah',
  'Q4_results'
);

// User edits it
await copilot.handleUserEdit('user_123', email, editedEmail, {
  task: 'email_drafting',
  recipient: 'Sarah',
  topic: 'Q4_results'
});

// Over time, emails get better and better! 🚀`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Live Demo */}
        <section id="live-demo">
          <ApiDemoSection />
        </section>

        {/* Code Example */}
        <section id="demo-example" className="py-20 lg:py-32 bg-muted/30">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Example Implementation</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Complete code examples showing how to implement the demo above using the SapientPriors API.
            </p>

            <div className="space-y-6">
              <div className="bg-background rounded-lg p-6 border">
                <h3 className="text-xl font-semibold mb-4">Monday: Record User Preference</h3>
                <CodeBlock
                  section="demo-monday"
                  code={`// User says: "I prefer concise emails"
// Just send the raw message - backend infers it's a preference
const mondayInteraction = await fetch(
  'https://api.sapientpriors.com/v1/accounts/acc_123/apps/app_456/users/user_john/interactions',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_message: 'I prefer concise emails',
      task: 'email_drafting'
    })
  }
);

const monday = await mondayInteraction.json();
console.log('Insights generated:', monday.insights_generated);
// ["User prefers concise communication style"]
console.log('Confidence:', monday.confidence_updated);
// { concise_communication: 0.73 }`}
                />
              </div>

              <div className="bg-background rounded-lg p-6 border">
                <h3 className="text-xl font-semibold mb-4">Tuesday: Get Context + User Edits Draft</h3>
                <CodeBlock
                  section="demo-tuesday"
                  code={`// Tuesday: User wants to draft an email
// 1. Get context first
const tuesdayContext = await fetch(
  'https://api.sapientpriors.com/v1/accounts/acc_123/apps/app_456/users/user_john/context?task=email_drafting&topic=Q4_performance',
  {
    headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
  }
);

const context = await tuesdayContext.json();
console.log('Preferences:', context.learned_preferences);
// [{ preference: 'concise_communication', confidence: 0.73 }]

// 2. Use context to enhance your AI prompt
const enhancedPrompt = \`Draft professional email. \${context.suggested_approach}\`;
const aiDraft = await yourAI.generate(enhancedPrompt,
  "Draft email to John about Q4 performance"
);
// AI generates a more concise email based on learned preference!

// 3. User edits the draft to add TLDR - just send both versions
const tuesdayEdit = await fetch(
  'https://api.sapientpriors.com/v1/accounts/acc_123/apps/app_456/users/user_john/interactions',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ai_response: aiDraft,
      user_message: "TLDR: Q4 strong—revenue +12%\\n\\n" + aiDraft,
      task: 'email_drafting',
      recipient: 'John',
      topic: 'Q4_performance'
    })
  }
);

const editResult = await tuesdayEdit.json();
console.log('New insights:', editResult.insights_generated);
// ["User prefers TLDR format at the beginning of emails"]`}
                />
              </div>

              <div className="bg-background rounded-lg p-6 border">
                <h3 className="text-xl font-semibold mb-4">Wednesday: Full Personalization Applied</h3>
                <CodeBlock
                  section="demo-wednesday"
                  code={`// Wednesday: User wants another email
// 1. Get context (now with BOTH preferences)
const wednesdayContext = await fetch(
  'https://api.sapientpriors.com/v1/accounts/acc_123/apps/app_456/users/user_john/context?task=email_drafting&recipient=Sarah',
  {
    headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
  }
);

const context = await wednesdayContext.json();
console.log('Preferences:', context.learned_preferences);
// [
//   { preference: 'concise_communication', confidence: 0.95 },
//   { preference: 'tldr_at_top', confidence: 0.87 }
// ]
console.log('Suggested approach:', context.suggested_approach);
// "Draft a concise email with TLDR at the beginning. Keep under 100 words."

// 2. Use enhanced context with your AI
const enhancedPrompt = \`Draft professional email. \${context.suggested_approach}\`;
const aiEmail = await yourAI.generate(enhancedPrompt,
  "Email Sarah about Q1 marketing budget approval ($50K approved)"
);

console.log(aiEmail);
// Hi Sarah,
//
// TLDR: Budget approved. Confirming by EOD.
//
// Good news on your Q1 marketing budget request. Finance approved the full
// $50K this morning. They were impressed with your ROI projections.
//
// I'll send formal confirmation with fund codes by end of day.
//
// Thanks

// ✅ Perfect! No editing needed - AI learned both preferences!`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* API Overview */}
        <section className="py-20 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">API Overview</h2>

            <div className="space-y-8">
              {/* Account Management */}
              <div className="border rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">Account Management API</h3>
                <p className="text-muted-foreground mb-4">
                  Create and manage your organization account.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-mono rounded">POST</span>
                    <code className="text-sm">/accounts</code>
                    <span className="text-sm text-muted-foreground">Create account</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono rounded">GET</span>
                    <code className="text-sm">/accounts/:account_id</code>
                    <span className="text-sm text-muted-foreground">Get account details</span>
                  </div>
                </div>
              </div>

              {/* App Management */}
              <div className="border rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">App Management API</h3>
                <p className="text-muted-foreground mb-4">
                  Create and configure apps with base prompts and objectives.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-mono rounded">POST</span>
                    <code className="text-sm">/accounts/:account_id/apps</code>
                    <span className="text-sm text-muted-foreground">Create app</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono rounded">GET</span>
                    <code className="text-sm">/accounts/:account_id/apps/:app_id</code>
                    <span className="text-sm text-muted-foreground">Get app details</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-xs font-mono rounded">PATCH</span>
                    <code className="text-sm">/accounts/:account_id/apps/:app_id</code>
                    <span className="text-sm text-muted-foreground">Update app configuration</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono rounded">GET</span>
                    <code className="text-sm">/accounts/:account_id/apps</code>
                    <span className="text-sm text-muted-foreground">List all apps</span>
                  </div>
                </div>
              </div>

              {/* Interactions & Context API */}
              <div className="border rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">Interactions & Context API</h3>
                <p className="text-muted-foreground mb-4">
                  Capture user interactions and retrieve personalized context for actions.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-mono rounded">POST</span>
                    <code className="text-sm">/accounts/:account_id/apps/:app_id/users/:user_id/interactions</code>
                    <span className="text-sm text-muted-foreground">Record user interaction</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono rounded">GET</span>
                    <code className="text-sm">/accounts/:account_id/apps/:app_id/users/:user_id/context</code>
                    <span className="text-sm text-muted-foreground">Get learned context</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Common questions about integrating SapientPriors into your application.
            </p>

            <div className="space-y-6">
              {/* FAQ 1: How to Write Effective Objectives */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg p-6 border-2 border-blue-200 dark:border-blue-800">
                <h3 className="text-2xl font-semibold mb-4">💡 How do I write effective objectives?</h3>
                <p className="text-muted-foreground mb-4">
                  The <strong>objective</strong> is the most important part of your app configuration. It guides how the AI learns from user interactions. A good objective is measurable, user-centric, and outcome-focused.
                </p>

                <div className="space-y-4">
                  <div className="bg-background/80 rounded-lg p-4">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">✓ Good Objectives</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400 mt-1">→</span>
                        <div>
                          <code className="text-xs bg-muted px-2 py-0.5 rounded">Make writing emails as seamless as possible by minimizing the edits required by the user</code>
                          <p className="text-muted-foreground mt-1">Measurable (edit count), user-centric (seamless), outcome-focused (minimize effort)</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400 mt-1">→</span>
                        <div>
                          <code className="text-xs bg-muted px-2 py-0.5 rounded">Reduce code review cycles by learning the team's style guide and best practices</code>
                          <p className="text-muted-foreground mt-1">Measurable (review cycles), specific (style guide), clear benefit (reduce work)</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400 mt-1">→</span>
                        <div>
                          <code className="text-xs bg-muted px-2 py-0.5 rounded">Generate marketing copy that requires zero edits by matching brand voice and tone</code>
                          <p className="text-muted-foreground mt-1">Ambitious goal (zero edits), specific target (brand voice), clear outcome</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-background/80 rounded-lg p-4">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">✗ Avoid These</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 dark:text-red-400 mt-1">→</span>
                        <div>
                          <code className="text-xs bg-muted px-2 py-0.5 rounded">Learn user preferences</code>
                          <p className="text-muted-foreground mt-1">Too vague - what preferences? For what purpose?</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 dark:text-red-400 mt-1">→</span>
                        <div>
                          <code className="text-xs bg-muted px-2 py-0.5 rounded">Provide personalized suggestions</code>
                          <p className="text-muted-foreground mt-1">Process-focused, not outcome-focused - what's the end goal?</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 dark:text-red-400 mt-1">→</span>
                        <div>
                          <code className="text-xs bg-muted px-2 py-0.5 rounded">Be helpful</code>
                          <p className="text-muted-foreground mt-1">Not measurable - how do you know if you achieved it?</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-background/80 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">📋 Objective Formula</h4>
                    <div className="bg-muted/50 p-3 rounded text-sm font-mono mb-2">
                      [Outcome Verb] + [What] + by [How/Metric]
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <strong>Examples:</strong><br/>
                      • <strong>Minimize</strong> [Outcome] + <strong>user edits</strong> [What] + <strong>by learning writing style</strong> [How]<br/>
                      • <strong>Reduce</strong> [Outcome] + <strong>response time</strong> [What] + <strong>by predicting common replies</strong> [How]<br/>
                      • <strong>Eliminate</strong> [Outcome] + <strong>formatting errors</strong> [What] + <strong>by learning document standards</strong> [How]
                    </p>
                  </div>

                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4 border border-blue-300 dark:border-blue-700">
                    <p className="text-sm">
                      <strong className="text-blue-900 dark:text-blue-100">💡 Pro Tip:</strong> The objective shapes what patterns the AI looks for. A clear, measurable objective helps the system learn faster and more accurately.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">Resources</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="/docs/API_SPECIFICATION.md"
                target="_blank"
                className="p-6 border rounded-lg hover:border-primary transition-colors bg-background"
              >
                <Book className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Full API Specification</h3>
                <p className="text-muted-foreground">
                  Complete API reference with all endpoints, parameters, and response schemas.
                </p>
              </a>

              <div className="p-6 border rounded-lg bg-background">
                <Code className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">TypeScript SDK</h3>
                <p className="text-muted-foreground mb-4">
                  Type-safe SDK for TypeScript and JavaScript applications.
                </p>
                <code className="text-sm bg-muted px-2 py-1 rounded">npm install @sapientpriors/sdk</code>
                <p className="text-xs text-muted-foreground mt-2">Coming soon</p>
              </div>

              <div className="p-6 border rounded-lg bg-background">
                <Zap className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Python SDK</h3>
                <p className="text-muted-foreground mb-4">
                  Official Python client library for SapientPriors API.
                </p>
                <code className="text-sm bg-muted px-2 py-1 rounded">pip install sapientpriors</code>
                <p className="text-xs text-muted-foreground mt-2">Coming soon</p>
              </div>

              <a
                href="/#pricing"
                className="p-6 border rounded-lg hover:border-primary transition-colors bg-background"
              >
                <h3 className="text-xl font-semibold mb-2">API Pricing</h3>
                <p className="text-muted-foreground">
                  Free tier: 10,000 requests/day, 100 users. Paid plans for production use.
                </p>
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-32">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Build?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get your API key and start integrating personalized learning into your AI application today.
            </p>
            <Button size="lg" asChild>
              <a href="/#pricing">Get Access</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
