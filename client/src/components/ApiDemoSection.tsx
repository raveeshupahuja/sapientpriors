import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { AlertCircle, Loader2, Send, Mail } from "lucide-react";

export default function ApiDemoSection() {
  const [apiKey, setApiKey] = useState("");
  const [userId, setUserId] = useState("demo-user-123");
  const [userMessage, setUserMessage] = useState("I prefer concise emails");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [activeEndpoint, setActiveEndpoint] = useState<'learn' | 'context'>('learn');

  const handleTryLearn = async () => {
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/personalization/learn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey && { 'Authorization': `Bearer ${apiKey}` })
        },
        body: JSON.stringify({
          userId,
          interaction: {
            query: 'Write an email to the team',
            response: userMessage,
            feedback: 'positive'
          }
        })
      });

      const data = await res.json();
      setResponse({ status: res.status, data });
    } catch (error) {
      setResponse({ 
        status: 500, 
        data: { error: 'Network Error', message: 'Failed to connect to API' } 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTryContext = async () => {
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch(`/api/personalization/context/${userId}`, {
        method: 'GET',
        headers: {
          ...(apiKey && { 'Authorization': `Bearer ${apiKey}` })
        }
      });

      const data = await res.json();
      setResponse({ status: res.status, data });
    } catch (error) {
      setResponse({ 
        status: 500, 
        data: { error: 'Network Error', message: 'Failed to connect to API' } 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContactClick = () => {
    window.location.href = 'mailto:raveeshupahuja@sapientpriors.com?subject=API Access Request';
  };

  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Try the API
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
            Test our Personalization API endpoints. Authentication is required for access.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-8">
            <h3 className="text-2xl font-semibold mb-6">API Demo</h3>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="api-key" className="mb-2 block">
                  API Key (Optional - Leave empty to see auth error)
                </Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter your API key..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  data-testid="input-api-key"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Don't have an API key? Contact us to get access.
                </p>
              </div>

              <div>
                <Label htmlFor="user-id" className="mb-2 block">
                  User ID
                </Label>
                <Input
                  id="user-id"
                  placeholder="demo-user-123"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  data-testid="input-user-id"
                />
              </div>

              <div className="flex gap-2 border-b pb-4">
                <Button
                  variant={activeEndpoint === 'learn' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveEndpoint('learn')}
                  data-testid="button-endpoint-learn"
                >
                  POST /learn
                </Button>
                <Button
                  variant={activeEndpoint === 'context' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveEndpoint('context')}
                  data-testid="button-endpoint-context"
                >
                  GET /context
                </Button>
              </div>

              {activeEndpoint === 'learn' && (
                <div>
                  <Label htmlFor="message" className="mb-2 block">
                    User Preference/Feedback
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="e.g., I prefer concise emails"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    rows={3}
                    data-testid="input-message"
                  />
                </div>
              )}

              <Button
                className="w-full"
                onClick={activeEndpoint === 'learn' ? handleTryLearn : handleTryContext}
                disabled={loading || !userId}
                data-testid="button-try-api"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending Request...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Try {activeEndpoint === 'learn' ? 'Learn' : 'Get Context'} Endpoint
                  </>
                )}
              </Button>
            </div>
          </Card>

          <Card className="p-8">
            <h3 className="text-2xl font-semibold mb-6">API Response</h3>
            
            {!response ? (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <div className="text-center">
                  <Send className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Click "Try Endpoint" to see the response</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Status:</span>
                  <span
                    className={`px-3 py-1 rounded-md text-sm font-mono ${
                      response.status === 200
                        ? 'bg-primary/10 text-primary'
                        : 'bg-destructive/10 text-destructive'
                    }`}
                    data-testid="text-response-status"
                  >
                    {response.status}
                  </span>
                </div>

                <div>
                  <span className="font-semibold block mb-2">Response Body:</span>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto font-mono">
                    <code data-testid="text-response-body">
                      {JSON.stringify(response.data, null, 2)}
                    </code>
                  </pre>
                </div>

                {response.status === 401 && (
                  <Card className="p-6 bg-destructive/5 border-destructive/20">
                    <div className="flex items-start gap-4">
                      <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-destructive mb-2">
                          Authentication Required
                        </h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          {response.data.message}
                        </p>
                        <Button
                          onClick={handleContactClick}
                          variant="outline"
                          size="sm"
                          data-testid="button-contact-for-access"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Contact for API Access
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            )}
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Want to integrate this into your application?
          </p>
          <Button
            onClick={handleContactClick}
            size="lg"
            data-testid="button-get-api-access"
          >
            Request API Access
          </Button>
        </div>
      </div>
    </section>
  );
}