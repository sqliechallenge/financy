import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIAdvisorFeatures, {
  AIFeature,
  AdviceRequest,
} from "@/components/advisor/AIAdvisorFeatures";
import AdviceList from "@/components/advisor/AdviceList";
import BalanceDisplay from "@/components/balance/BalanceDisplay";
import AddFundsModal from "@/components/balance/AddFundsModal";
import { v4 as uuidv4 } from "uuid";

// Mock AI features
const aiFeatures: AIFeature[] = [
  {
    id: "keep-or-sell",
    name: "Should I keep or sell this asset?",
    description:
      "Get personalized advice on whether to hold or sell a specific asset in your portfolio.",
    price: 1,
    requiresInput: true,
    inputLabel: "Asset Name",
    inputPlaceholder: "e.g., AAPL, Bitcoin, etc.",
  },
  {
    id: "sell-asset",
    name: "Should I sell this asset?",
    description:
      "Focused analysis on whether selling a specific asset is advisable in the current market.",
    price: 0.5,
    requiresInput: true,
    inputLabel: "Asset Name",
    inputPlaceholder: "e.g., AAPL, Bitcoin, etc.",
  },
  {
    id: "better-candidate",
    name: "Find a better candidate for this stock?",
    description:
      "Discover alternative investments that may outperform your current stock holdings.",
    price: 0.5,
    requiresInput: true,
    inputLabel: "Current Stock",
    inputPlaceholder: "e.g., AAPL, MSFT, etc.",
  },
  {
    id: "analyze-stocks",
    name: "Analyze these stocks (up to 5)",
    description:
      "Get a comprehensive analysis of multiple stocks in your portfolio or watchlist.",
    price: 1.5,
    requiresInput: true,
    inputLabel: "Stock Symbols (comma separated)",
    inputPlaceholder: "e.g., AAPL, MSFT, GOOGL, AMZN, TSLA",
  },
  {
    id: "analyze-patrimoine",
    name: "Analyze my patrimoine and give me advice",
    description:
      "Comprehensive review of your entire portfolio with strategic recommendations.",
    price: 3,
  },
  {
    id: "future-patrimoine",
    name: "What will be my patrimoine in X years?",
    description:
      "Forecast the potential future value of your portfolio based on current setup.",
    price: 1.5,
    requiresInput: true,
    inputLabel: "Number of Years",
    inputType: "number",
    inputPlaceholder: "e.g., 5, 10, 20",
  },
  {
    id: "finance-news",
    name: "What are the latest news in finance?",
    description:
      "Get a curated summary of the most important recent financial news and market trends.",
    price: 0.5,
  },
];

// Mock AI responses
const mockResponses: Record<string, string[]> = {
  "keep-or-sell": [
    "After analyzing [input], it's advisable to keep it. Market indicators suggest a potential 5-10% growth in the next 3 months.",
    "Based on recent performance and market trends, holding [input] is recommended. The asset shows strong fundamentals and potential for continued growth.",
    "For [input], our analysis indicates it's best to hold. While there's some volatility, the long-term outlook remains positive with projected stability.",
  ],
  "sell-asset": [
    "Based on recent volatility, selling [input] now could lock in profits before a predicted dip in the market.",
    "Our analysis suggests that [input] may face headwinds in the coming months. Consider selling to protect your gains and reinvest elsewhere.",
    "For [input], the technical indicators point to a potential downturn. Selling now might be prudent to avoid possible losses.",
  ],
  "better-candidate": [
    "Compared to [input], NVDA offers a stronger growth outlook with a 15% projected return based on AI market expansion.",
    "As an alternative to [input], consider AMD which shows better momentum and growth potential in the semiconductor sector.",
    "Instead of [input], our analysis suggests VTI (Vanguard Total Stock Market ETF) for better diversification and steady returns.",
  ],
  "analyze-stocks": [
    "Your portfolio of [input] is balanced, but some components show signs of underperformance. Consider diversifying further into different sectors.",
    "Analysis of [input] reveals a tech-heavy allocation. Consider adding some value stocks or dividend payers to balance risk.",
    "The stocks [input] have a combined beta of 1.2, indicating higher volatility than the market. Consider adding some defensive stocks for balance.",
  ],
  "analyze-patrimoine": [
    "Your patrimoine is solid, but allocating 20% more to bonds could reduce risk while maintaining growth potential. Consider increasing exposure to international markets for better diversification.",
    "Your current asset allocation shows good diversification, but there's room for improvement. Consider adding alternative investments like REITs or precious metals to further diversify.",
    "Analysis of your patrimoine indicates a slight overexposure to growth stocks. Consider rebalancing with more value-oriented investments to weather potential market corrections.",
  ],
  "future-patrimoine": [
    "Assuming a 4% annual return, your patrimoine could grow to approximately €[calculated] in [input] years. This projection accounts for current market conditions and historical performance.",
    "Based on your current setup and a conservative 3.5% growth rate, your patrimoine could reach about €[calculated] in [input] years. Consider increasing your regular contributions to accelerate growth.",
    "With your current allocation and a 5% projected annual return, your patrimoine may grow to roughly €[calculated] in [input] years. Market fluctuations could affect this estimate.",
  ],
  "finance-news": [
    "Tech stocks rallied 3% this week, driven by strong earnings from major players. Meanwhile, the Fed signaled potential rate cuts later this year, boosting market sentiment.",
    "Energy sector faced headwinds as oil prices dropped 5% due to increased supply concerns. In contrast, renewable energy stocks showed resilience with modest gains.",
    "Global markets showed mixed results as inflation data came in higher than expected in Europe, while Asian markets benefited from China's new economic stimulus package.",
  ],
};

const AIAdvisorPage: React.FC = () => {
  const navigate = useNavigate();
  const [userBalance, setUserBalance] = useState<number>(10); // Start with €10 for testing
  const [showAddFunds, setShowAddFunds] = useState<boolean>(false);
  const [adviceRequests, setAdviceRequests] = useState<AdviceRequest[]>([]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddFunds = (amount: number, method: string) => {
    // Update balance
    setUserBalance((prev) => prev + amount);

    // Add to transaction history (would be stored in a database in a real app)
    console.log(`Added €${amount} via ${method}`);
  };

  const getRandomResponse = (featureId: string, input?: string): string => {
    const responses = mockResponses[featureId] || [
      "Analysis complete. Thank you for using our AI advisor.",
    ];
    let response = responses[Math.floor(Math.random() * responses.length)];

    // Replace [input] placeholder with actual input
    if (input) {
      response = response.replace(/\[input\]/g, input);
    }

    // Replace [calculated] placeholder for future patrimoine
    if (featureId === "future-patrimoine" && input) {
      const years = parseInt(input);
      const currentPatrimoine = 100000; // Mock current patrimoine value
      const annualReturn = 0.04; // 4% annual return
      const futureValue = currentPatrimoine * Math.pow(1 + annualReturn, years);
      response = response.replace(/\[calculated\]/g, futureValue.toFixed(2));
    }

    return response;
  };

  const handlePurchaseAdvice = async (
    featureId: string,
    input?: string,
  ): Promise<boolean> => {
    // Find the feature
    const feature = aiFeatures.find((f) => f.id === featureId);
    if (!feature) return false;

    // Check if user has enough balance
    if (userBalance < feature.price) return false;

    // Deduct the price from balance
    setUserBalance((prev) => prev - feature.price);

    // Simulate AI processing
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate a response
        const response = getRandomResponse(featureId, input);

        // Create a new advice request
        const newAdvice: AdviceRequest = {
          id: uuidv4(),
          userId: "user-1", // In a real app, this would be the actual user ID
          feature: feature.name,
          featureId: feature.id,
          input: input,
          response: response,
          status: "Not Done Yet",
          requestDate: new Date().toISOString(),
        };

        // Add to advice requests
        setAdviceRequests((prev) => [newAdvice, ...prev]);

        resolve(true);
      }, 1500); // Simulate AI processing time
    });
  };

  const handleMarkAsDone = (adviceId: string) => {
    setAdviceRequests((prev) =>
      prev.map((advice) =>
        advice.id === adviceId
          ? {
              ...advice,
              status: "Done",
              completionDate: new Date().toISOString(),
            }
          : advice,
      ),
    );
  };

  const handleProvideFeedback = (adviceId: string, isHelpful: boolean) => {
    setAdviceRequests((prev) =>
      prev.map((advice) =>
        advice.id === adviceId ? { ...advice, feedback: isHelpful } : advice,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handleBack}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">AI Financial Advisor</h1>
        </div>

        <BalanceDisplay
          balance={userBalance}
          onAddFunds={() => setShowAddFunds(true)}
        />

        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="features">AI Features</TabsTrigger>
            <TabsTrigger value="my-advice">My Advice</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="space-y-6">
            <AIAdvisorFeatures
              features={aiFeatures}
              userBalance={userBalance}
              onPurchaseAdvice={handlePurchaseAdvice}
            />
          </TabsContent>

          <TabsContent value="my-advice" className="space-y-6">
            <AdviceList
              adviceRequests={adviceRequests}
              onMarkAsDone={handleMarkAsDone}
              onProvideFeedback={handleProvideFeedback}
            />
          </TabsContent>
        </Tabs>
      </main>

      <AddFundsModal
        open={showAddFunds}
        onOpenChange={setShowAddFunds}
        onAddFunds={handleAddFunds}
      />
    </div>
  );
};

export default AIAdvisorPage;
