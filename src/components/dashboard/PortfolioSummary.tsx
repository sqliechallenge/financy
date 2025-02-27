import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Percent,
  TrendingUp,
  Wallet,
  Briefcase,
  PiggyBank,
} from "lucide-react";
import AccountsSlider from "./AccountsSlider";

interface PortfolioSummaryProps {
  totalValue?: number;
  totalInvestment?: number;
  totalCash?: number;
  totalPerformance?: {
    value: number;
    percentage: number;
  };
  dailyChange?: {
    value: number;
    percentage: number;
  };
  monthlyChange?: {
    value: number;
    percentage: number;
  };
  yearlyChange?: {
    value: number;
    percentage: number;
  };
  totalAssets?: number;
  totalAccounts?: number;
}

const PortfolioSummary = ({
  totalValue = 124567.89,
  totalInvestment = 95000,
  totalCash = 29567.89,
  totalPerformance = { value: 29567.89, percentage: 31.1 },
  dailyChange = { value: 1234.56, percentage: 1.2 },
  monthlyChange = { value: 5678.9, percentage: 4.8 },
  yearlyChange = { value: 23456.78, percentage: 21.5 },
  totalAssets = 15,
  totalAccounts = 5,
}: PortfolioSummaryProps) => {
  const [showAccountsSlider, setShowAccountsSlider] = useState(false);
  const navigate = useNavigate();

  // Calculate percentages of total portfolio
  const investmentPercentage = (totalInvestment / totalValue) * 100;
  const cashPercentage = (totalCash / totalValue) * 100;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleAssetsClick = () => {
    navigate("/assets");
  };

  const handleAccountsClick = () => {
    setShowAccountsSlider(true);
  };

  return (
    <>
      <Card className="w-full bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Portfolio Value */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">
                Total Portfolio Value
              </h3>
              <div className="flex items-baseline">
                <DollarSign className="h-5 w-5 text-gray-400 mr-1" />
                <span className="text-3xl font-bold">
                  {formatCurrency(totalValue)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {dailyChange.value >= 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={`text-sm font-medium ${dailyChange.value >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {dailyChange.value >= 0 ? "+" : ""}
                  {formatCurrency(dailyChange.value)}
                  {" ("}
                  {dailyChange.percentage >= 0 ? "+" : ""}
                  {dailyChange.percentage.toFixed(2)}%{")"}
                </span>
                <span className="text-xs text-gray-500">Today</span>
              </div>
            </div>

            {/* Enhanced Summary Display */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500">
                Portfolio Breakdown
              </h3>
              <div className="space-y-3">
                {/* Total Performance */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">
                      Total Performance
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-green-500">
                      {formatCurrency(totalPerformance.value)}
                    </span>
                    <span className="text-xs text-green-500 ml-1">
                      (+{totalPerformance.percentage.toFixed(1)}%)
                    </span>
                  </div>
                </div>

                {/* Total Investment */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm text-gray-600">
                      Total Investment
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">
                      {formatCurrency(totalInvestment)}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">
                      ({investmentPercentage.toFixed(1)}%)
                    </span>
                  </div>
                </div>

                {/* Total Cash */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <PiggyBank className="h-4 w-4 text-amber-500 mr-2" />
                    <span className="text-sm text-gray-600">Total Cash</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">
                      {formatCurrency(totalCash)}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">
                      ({cashPercentage.toFixed(1)}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats with Interactive Cards */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={handleAssetsClick}
                >
                  <div className="flex items-center space-x-2">
                    <Wallet className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-600">Assets</span>
                  </div>
                  <p className="text-xl font-bold mt-1">{totalAssets}</p>
                </div>
                <div
                  className="bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={handleAccountsClick}
                >
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-purple-500" />
                    <span className="text-sm text-gray-600">Accounts</span>
                  </div>
                  <p className="text-xl font-bold mt-1">{totalAccounts}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AccountsSlider
        open={showAccountsSlider}
        onOpenChange={setShowAccountsSlider}
      />
    </>
  );
};

export default PortfolioSummary;
