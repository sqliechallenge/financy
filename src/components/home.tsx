import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthWrapper from "./auth/AuthWrapper";
import Dashboard from "./dashboard/Dashboard";
import AssetFormDialog from "./assets/AssetFormDialog";
import BalanceDisplay from "./balance/BalanceDisplay";
import AddFundsModal from "./balance/AddFundsModal";
import { Transaction } from "./balance/TransactionHistory";
import { Button } from "./ui/button";
import { Brain } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface Asset {
  id: string;
  name?: string;
  type: "cash" | "stocks" | "etfs" | "crypto";
  value: number;
  platform: string;
  performance: number;
  lastUpdated: string;
  [key: string]: any; // For additional properties based on asset type
}

interface User {
  id: string;
  email: string;
  balance: number;
  transactions: Transaction[];
}

const Home = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [showAddFunds, setShowAddFunds] = useState(false);

  // Mock user data
  const [user, setUser] = useState<User>({
    id: "user-1",
    email: "user@example.com",
    balance: 10, // Start with €10
    transactions: [],
  });

  // Mock portfolio data
  const [portfolioData, setPortfolioData] = useState({
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
  });

  // Handle login
  const handleLogin = (email: string) => {
    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setIsAuthenticated(true);
      setIsLoading(false);
      setUser((prev) => ({ ...prev, email }));
      console.log(`Logged in with email: ${email}`);
    }, 1500);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    console.log("User logged out");
  };

  // Handle adding a new asset
  const handleAddAsset = () => {
    setEditingAsset(null);
    setShowAssetForm(true);
  };

  // Handle editing an existing asset
  const handleEditAsset = (asset: Asset) => {
    setEditingAsset(asset);
    setShowAssetForm(true);
  };

  // Handle deleting an asset
  const handleDeleteAsset = (assetId: string) => {
    // In a real app, you would call an API to delete the asset
    console.log(`Deleting asset with ID: ${assetId}`);
    // Then update the UI accordingly
  };

  // Handle form submission for adding/editing assets
  const handleAssetFormSubmit = (data: any) => {
    if (editingAsset) {
      // Update existing asset
      console.log("Updating asset:", data);
    } else {
      // Add new asset
      console.log("Adding new asset:", data);
    }

    setShowAssetForm(false);
    setEditingAsset(null);
  };

  // Handle adding funds to user balance
  const handleAddFunds = (amount: number, method: string) => {
    // Update user balance
    setUser((prev) => ({
      ...prev,
      balance: prev.balance + amount,
      transactions: [
        {
          id: uuidv4(),
          type: "deposit",
          amount,
          method,
          description: `Added funds via ${method}`,
          date: new Date().toISOString(),
        },
        ...prev.transactions,
      ],
    }));
  };

  // Navigate to AI Advisor page
  const handleGoToAIAdvisor = () => {
    navigate("/ai-advisor");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthWrapper
        isAuthenticated={isAuthenticated}
        isLoading={isLoading}
        onLogin={handleLogin}
        onLogout={handleLogout}
      >
        <div className="container mx-auto px-4 py-6 space-y-6">
          <BalanceDisplay
            balance={user.balance}
            onAddFunds={() => setShowAddFunds(true)}
          />

          <div className="flex justify-end">
            <Button
              onClick={handleGoToAIAdvisor}
              className="flex items-center gap-2"
              variant="outline"
            >
              <Brain className="h-4 w-4" />
              AI Financial Advisor
            </Button>
          </div>
        </div>

        <Dashboard
          onAddAsset={handleAddAsset}
          onEditAsset={handleEditAsset}
          onDeleteAsset={handleDeleteAsset}
          onLogout={handleLogout}
          portfolioData={portfolioData}
        />

        {showAssetForm && (
          <AssetFormDialog
            isOpen={showAssetForm}
            onOpenChange={setShowAssetForm}
            isEditing={!!editingAsset}
            initialData={editingAsset}
            onSubmit={handleAssetFormSubmit}
            onCancel={() => {
              setShowAssetForm(false);
              setEditingAsset(null);
            }}
          />
        )}

        <AddFundsModal
          open={showAddFunds}
          onOpenChange={setShowAddFunds}
          onAddFunds={handleAddFunds}
        />
      </AuthWrapper>
    </div>
  );
};

export default Home;
