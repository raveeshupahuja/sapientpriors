import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

const tooltips: Record<string, string> = {
  hotpotqa: "Industry benchmark for multi-document question answering",
  locomo: "Industry benchmark for long-context conversational memory",
  singleHop: "Answer a question using one remembered fact from an earlier interaction. E.g., 'I work at Stripe.' → 'Where do I work?'",
  multiHop: "Combine multiple remembered facts across conversations to answer. E.g., 'I work at Stripe.' + 'My office is in Chicago.' → 'Which city do I work in?'",
  temporal: "Reason about when events happened or which fact is most recent. E.g., 'I lived in New York.' + 'Last year, I moved to Chicago.' → 'Where did I live before Chicago?'",
  contextSize: "Amount of conversation history being searched",
  f1: "Balances precision (usually right) and recall (very thorough). E.g., an AI agent deciding when to escalate: high precision = escalations are justified; high recall = doesn't miss critical cases. A high F1 means escalating the right cases at the right time.",
  openDomain: "The model must identify which memories are relevant without topic restriction. E.g., 'I'm vegetarian.' + 'I work at Stripe.' → 'Where would be a good place for me to have lunch near work?'",
};

function InfoTooltip({ tooltipKey }: { tooltipKey: keyof typeof tooltips }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="inline-block w-4 h-4 ml-1 text-muted-foreground cursor-help" />
      </TooltipTrigger>
      <TooltipContent>
        <p className="max-w-xs">{tooltips[tooltipKey]}</p>
      </TooltipContent>
    </Tooltip>
  );
}

const locomoData = [
  { metric: "Single Hop", tooltipKey: "singleHop" as const, mem0: 41.92, ours: 56.35 },
  { metric: "Multi Hop", tooltipKey: "multiHop" as const, mem0: 32.41, ours: 40.65 },
  { metric: "Temporal", tooltipKey: "temporal" as const, mem0: 29.84, ours: 50.27 },
  { metric: "Open Domain", tooltipKey: "openDomain" as const, mem0: 15.71, ours: 29.63 },
];

const hotpotqaData = [
  { context: "56K", tooltipKey: "contextSize" as const, mem0: 30.12, ours: 60.13 },
  { context: "224K", tooltipKey: "contextSize" as const, mem0: 32.44, ours: 54.28 },
  { context: "448K", tooltipKey: "contextSize" as const, mem0: 26.55, ours: 56.36 },
];

const calcImprovement = (ours: number, mem0: number) =>
  `+${Math.round(((ours - mem0) / mem0) * 100)}%`;

const headlineCards = [
  {
    improvement: calcImprovement(hotpotqaData[2].ours, hotpotqaData[2].mem0),
    metric: "Multi-Document Question Answering",
    subMetric: "HotpotQA 448K",
    tooltipKey: "hotpotqa" as const,
    description: "Long Context",
  },
  {
    improvement: calcImprovement(locomoData[3].ours, locomoData[3].mem0),
    metric: "Connecting Dots Across Conversations",
    tooltipKey: "openDomain" as const,
    description: "Open Domain",
  },
  {
    improvement: calcImprovement(locomoData[2].ours, locomoData[2].mem0),
    metric: "Temporal Reasoning",
    tooltipKey: "temporal" as const,
    description: "Time Based Reasoning",
  },
  {
    improvement: calcImprovement(locomoData[0].ours, locomoData[0].mem0),
    metric: "Direct Fact Retrieval",
    tooltipKey: "singleHop" as const,
    description: "Single Hop Recall",
  },
];

export default function BenchmarksSection() {
  return (
    <TooltipProvider>
      <section id="benchmarks" className="py-20 lg:py-32 bg-muted/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
              Proven Performance
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              Real benchmarks on industry-standard datasets using Qwen2.5-14b
            </p>
          </div>

          {/* Headline Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
            {headlineCards.map((card, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">
                  {card.improvement}
                </div>
                <div className="text-sm lg:text-base font-medium flex items-center justify-center">
                  {card.metric}
                  <InfoTooltip tooltipKey={card.tooltipKey} />
                </div>
                {"subMetric" in card && card.subMetric && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {card.subMetric}
                  </div>
                )}
                {card.description && (
                  <div className="text-xs lg:text-sm text-muted-foreground mt-1">
                    {card.description}
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Detailed Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* LoCoMo Table */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                LoCoMo Benchmark
                <InfoTooltip tooltipKey="locomo" />
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  (F1 Score
                  <InfoTooltip tooltipKey="f1" />)
                </span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                        Tasks
                      </th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">
                        MEM0
                      </th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-green-600">
                        Ours
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {locomoData.map((row, index) => (
                      <tr key={index} className="border-b last:border-b-0">
                        <td className="py-3 px-2 text-sm flex items-center">
                          {row.metric}
                          <InfoTooltip tooltipKey={row.tooltipKey} />
                        </td>
                        <td className="py-3 px-2 text-sm text-right text-muted-foreground">
                          {row.mem0.toFixed(2)}
                        </td>
                        <td className="py-3 px-2 text-sm text-right font-semibold text-green-600">
                          {row.ours.toFixed(2)} <span className="text-xs">(+{Math.round(((row.ours - row.mem0) / row.mem0) * 100)}%)</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* HotpotQA Table */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                HotpotQA Benchmark
                <InfoTooltip tooltipKey="hotpotqa" />
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  (F1 Score
                  <InfoTooltip tooltipKey="f1" />)
                </span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                        Context
                        <InfoTooltip tooltipKey="contextSize" />
                      </th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">
                        MEM0
                      </th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-green-600">
                        Ours
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotpotqaData.map((row, index) => (
                      <tr key={index} className="border-b last:border-b-0">
                        <td className="py-3 px-2 text-sm">{row.context}</td>
                        <td className="py-3 px-2 text-sm text-right text-muted-foreground">
                          {row.mem0.toFixed(2)}
                        </td>
                        <td className="py-3 px-2 text-sm text-right font-semibold text-green-600">
                          {row.ours.toFixed(2)} <span className="text-xs">(+{Math.round(((row.ours - row.mem0) / row.mem0) * 100)}%)</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
