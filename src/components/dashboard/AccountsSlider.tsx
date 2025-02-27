import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Building, CreditCard, Landmark, Wallet } from "lucide-react";

interface Account {
  id: string;
  name: string;
  type: "bank" | "investment" | "crypto" | "card";
  provider: string;
  balance: number;
  currency?: string;
}

interface AccountsSliderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accounts?: Account[];
}

const AccountsSlider: React.FC<AccountsSliderProps> = ({
  open,
  onOpenChange,
  accounts = [
    {
      id: "1",
      name: "Checking Account",
      type: "bank",
      provider: "Bank of America",
      balance: 5432.1,
      currency: "USD",
    },
    {
      id: "2",
      name: "Savings Account",
      type: "bank",
      provider: "Chase",
      balance: 12500.0,
      currency: "USD",
    },
    {
      id: "3",
      name: "Investment Portfolio",
      type: "investment",
      provider: "Vanguard",
      balance: 78500.45,
      currency: "USD",
    },
    {
      id: "4",
      name: "Crypto Wallet",
      type: "crypto",
      provider: "Coinbase",
      balance: 8750.34,
      currency: "USD",
    },
    {
      id: "5",
      name: "Credit Card",
      type: "card",
      provider: "American Express",
      balance: -2340.56,
      currency: "USD",
    },
  ],
}) => {
  const getAccountIcon = (type: Account["type"]) => {
    switch (type) {
      case "bank":
        return <Building className="h-5 w-5 text-blue-500" />;
      case "investment":
        return <Landmark className="h-5 w-5 text-green-500" />;
      case "crypto":
        return <Wallet className="h-5 w-5 text-amber-500" />;
      case "card":
        return <CreditCard className="h-5 w-5 text-purple-500" />;
      default:
        return <Building className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatCurrency = (value: number, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(value);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Accounts</SheetTitle>
          <SheetDescription>
            View all your connected financial accounts
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        <ScrollArea className="h-[calc(100vh-180px)] pr-4">
          <div className="space-y-4">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-full bg-muted">
                    {getAccountIcon(account.type)}
                  </div>
                  <div>
                    <h4 className="font-medium">{account.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {account.provider}
                    </p>
                  </div>
                </div>
                <div
                  className={`text-right ${account.balance < 0 ? "text-red-500" : ""}`}
                >
                  <p className="font-semibold">
                    {formatCurrency(account.balance, account.currency)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {account.type === "card" ? "Balance Due" : "Available"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default AccountsSlider;
