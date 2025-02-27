import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Coins, Landmark, LineChart, Wallet } from "lucide-react";

interface AssetTypeSelectorProps {
  selectedType?: "cash" | "stocks" | "etfs" | "crypto";
  onSelect?: (type: "cash" | "stocks" | "etfs" | "crypto") => void;
}

const AssetTypeSelector = ({
  selectedType = "cash",
  onSelect = () => {},
}: AssetTypeSelectorProps) => {
  const assetTypes = [
    {
      id: "cash",
      name: "Cash",
      description: "Bank accounts, savings, and physical cash",
      icon: <Wallet className="h-6 w-6" />,
    },
    {
      id: "stocks",
      name: "Stocks",
      description: "Individual company shares",
      icon: <LineChart className="h-6 w-6" />,
    },
    {
      id: "etfs",
      name: "ETFs",
      description: "Exchange-traded funds and index funds",
      icon: <Landmark className="h-6 w-6" />,
    },
    {
      id: "crypto",
      name: "Crypto",
      description: "Cryptocurrencies and digital assets",
      icon: <Coins className="h-6 w-6" />,
    },
  ];

  return (
    <div className="w-full bg-background p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Select Asset Type</h3>
      <div className="grid grid-cols-2 gap-4">
        {assetTypes.map((type) => (
          <TooltipProvider key={type.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card
                  className={`cursor-pointer transition-all hover:border-primary ${selectedType === type.id ? "border-2 border-primary" : ""}`}
                  onClick={() =>
                    onSelect(type.id as "cash" | "stocks" | "etfs" | "crypto")
                  }
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center gap-2">
                      {type.icon}
                      <CardTitle className="text-base">{type.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-xs text-muted-foreground">
                      {type.description}
                    </p>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Select {type.name} as your asset type</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default AssetTypeSelector;
