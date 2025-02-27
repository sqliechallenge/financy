import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface AIAdvice {
  title: string;
  description: string;
  details: string;
  type: "suggestion" | "warning" | "opportunity";
}

interface AIAdvisorProps {
  portfolioData?: {
    totalValue: number;
    assetAllocation: Record<string, number>;
    performance: number;
  };
  advice?: AIAdvice[];
  isLoading?: boolean;
  onRefresh?: () => void;
  onFeedback?: (adviceIndex: number, isPositive: boolean) => void;
}

const AIAdvisor = ({
  portfolioData = {
    totalValue: 125000,
    assetAllocation: { stocks: 45, bonds: 30, cash: 15, crypto: 10 },
    performance: 8.5,
  },
  advice = [
    {
      title: "Diversify Your Stock Holdings",
      description: "Your portfolio is heavily concentrated in tech stocks.",
      details:
        "Consider adding exposure to other sectors like healthcare, consumer staples, and utilities to reduce volatility and improve risk-adjusted returns.",
      type: "suggestion",
    },
    {
      title: "Increase Emergency Fund",
      description: "Your cash reserves are below recommended levels.",
      details:
        "Financial experts suggest maintaining 3-6 months of expenses in cash. Based on your profile, consider increasing your cash allocation by approximately $10,000.",
      type: "warning",
    },
    {
      title: "Tax-Loss Harvesting Opportunity",
      description:
        "Some of your investments have unrealized losses that could be used for tax benefits.",
      details:
        "Consider selling underperforming assets to offset capital gains and reduce your tax liability. This strategy could save you approximately $2,500 in taxes this year.",
      type: "opportunity",
    },
  ],
  isLoading = false,
  onRefresh = () => console.log("Refreshing AI advice..."),
  onFeedback = (adviceIndex, isPositive) =>
    console.log(
      `Feedback for advice ${adviceIndex}: ${isPositive ? "positive" : "negative"}`,
    ),
}: AIAdvisorProps) => {
  const [expandedAdvice, setExpandedAdvice] = useState<number | null>(null);

  const toggleAdviceExpansion = (index: number) => {
    setExpandedAdvice(expandedAdvice === index ? null : index);
  };

  const getAdviceIcon = (type: AIAdvice["type"]) => {
    switch (type) {
      case "suggestion":
        return <Lightbulb className="h-5 w-5 text-blue-500" />;
      case "warning":
        return <Lightbulb className="h-5 w-5 text-amber-500" />;
      case "opportunity":
        return <Lightbulb className="h-5 w-5 text-green-500" />;
      default:
        return <Lightbulb className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAdviceColor = (type: AIAdvice["type"]) => {
    switch (type) {
      case "suggestion":
        return "border-l-4 border-blue-500 bg-blue-50";
      case "warning":
        return "border-l-4 border-amber-500 bg-amber-50";
      case "opportunity":
        return "border-l-4 border-green-500 bg-green-50";
      default:
        return "border-l-4 border-gray-300";
    }
  };

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-bold">
            AI Financial Advisor
          </CardTitle>
          <CardDescription>
            Personalized recommendations based on your portfolio
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isLoading}
          className="flex items-center gap-1"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
            <p className="mt-4 text-sm text-gray-500">
              Analyzing your portfolio...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {advice.map((item, index) => (
              <div
                key={index}
                className={`rounded-md p-4 transition-all ${getAdviceColor(item.type)}`}
              >
                <div
                  className="flex cursor-pointer items-center justify-between"
                  onClick={() => toggleAdviceExpansion(index)}
                >
                  <div className="flex items-center gap-3">
                    {getAdviceIcon(item.type)}
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {expandedAdvice === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>

                {expandedAdvice === index && (
                  <div className="mt-3 border-t pt-3">
                    <p className="text-sm text-gray-700">{item.details}</p>
                    <div className="mt-3 flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onFeedback(index, true)}
                        className="flex items-center gap-1"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        Helpful
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onFeedback(index, false)}
                        className="flex items-center gap-1"
                      >
                        <ThumbsDown className="h-4 w-4" />
                        Not Helpful
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4 text-xs text-gray-500">
        <p>Powered by DeepSeek-R1 API</p>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </CardFooter>
    </Card>
  );
};

export default AIAdvisor;
