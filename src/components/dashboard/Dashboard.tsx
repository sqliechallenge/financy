import React, { useState } from "react";
import Header from "./Header";
import PortfolioSummary from "./PortfolioSummary";
import AssetAllocation from "./AssetAllocation";
import PerformanceMetrics from "./PerformanceMetrics";
import AssetTable from "./AssetTable";
import AIAdvisor from "./AIAdvisor";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

interface DashboardProps {
  userName?: string;
  userEmail?: string;
  avatarUrl?: string;
  portfolioData?: {
    totalValue: number;
    dailyChange: {
      value: number;
      percentage: number;
    };
    monthlyChange: {
      value: number;
      percentage: number;
    };
    yearlyChange: {
      value: number;
      percentage: number;
    };
    totalAssets: number;
    totalAccounts: number;
    assetAllocation: {
      byType: Array<{
        name: string;
        value: number;
        color: string;
      }>;
      byPlatform: Array<{
        name: string;
        value: number;
        color: string;
      }>;
    };
  };
  onAddAsset?: () => void;
  onEditAsset?: (asset: any) => void;
  onDeleteAsset?: (assetId: string) => void;
  onLogout?: () => void;
}

const defaultPortfolioData = {
  totalValue: 124567.89,
  dailyChange: { value: 1234.56, percentage: 1.2 },
  monthlyChange: { value: 5678.9, percentage: 4.8 },
  yearlyChange: { value: 23456.78, percentage: 21.5 },
  totalAssets: 15,
  totalAccounts: 5,
  assetAllocation: {
    byType: [
      { name: "Stocks", value: 45000, color: "#0ea5e9" },
      { name: "ETFs", value: 30000, color: "#22c55e" },
      { name: "Crypto", value: 15000, color: "#f59e0b" },
      { name: "Cash", value: 10000, color: "#8b5cf6" },
    ],
    byPlatform: [
      { name: "Robinhood", value: 35000, color: "#0ea5e9" },
      { name: "Coinbase", value: 15000, color: "#22c55e" },
      { name: "Vanguard", value: 40000, color: "#f59e0b" },
      { name: "Bank of America", value: 10000, color: "#8b5cf6" },
    ],
  },
};

const Dashboard = ({
  userName = "John Doe",
  userEmail = "john.doe@example.com",
  avatarUrl = "",
  portfolioData = defaultPortfolioData,
  onAddAsset = () => console.log("Add asset clicked"),
  onEditAsset = (asset) => console.log("Edit asset", asset),
  onDeleteAsset = (assetId) => console.log("Delete asset", assetId),
  onLogout = () => console.log("Logout clicked"),
}: DashboardProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        userName={userName}
        userEmail={userEmail}
        avatarUrl={avatarUrl}
        onLogout={onLogout}
      />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Portfolio Dashboard</h1>
          <Button onClick={onAddAsset} className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Add Asset
          </Button>
        </div>

        <PortfolioSummary
          totalValue={portfolioData.totalValue}
          dailyChange={portfolioData.dailyChange}
          monthlyChange={portfolioData.monthlyChange}
          yearlyChange={portfolioData.yearlyChange}
          totalAssets={portfolioData.totalAssets}
          totalAccounts={portfolioData.totalAccounts}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AssetAllocation data={portfolioData.assetAllocation} />
          <PerformanceMetrics />
        </div>

        <AssetTable onEditAsset={onEditAsset} onDeleteAsset={onDeleteAsset} />

        <AIAdvisor />
      </main>
    </div>
  );
};

export default Dashboard;
