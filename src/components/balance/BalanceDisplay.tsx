import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface BalanceDisplayProps {
  balance: number;
  onAddFunds: () => void;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({
  balance,
  onAddFunds,
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div>
        <h3 className="text-sm font-medium text-gray-500">Your Balance</h3>
        <p className="text-2xl font-bold">€{balance.toFixed(2)}</p>
      </div>
      <Button onClick={onAddFunds} className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        Add Funds
      </Button>
    </div>
  );
};

export default BalanceDisplay;
