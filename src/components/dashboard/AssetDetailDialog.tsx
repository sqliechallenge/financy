import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Coins,
  DollarSign,
  Landmark,
  LineChart,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

interface Asset {
  id: string;
  name: string;
  type: "cash" | "stocks" | "etfs" | "crypto";
  value: number;
  platform: string;
  performance: number;
  lastUpdated: string;
  shares?: number;
  purchasePrice?: number;
  purchaseDate?: string;
  symbol?: string;
  notes?: string;
}

interface AssetDetailDialogProps {
  asset: Asset | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AssetDetailDialog: React.FC<AssetDetailDialogProps> = ({
  asset,
  open,
  onOpenChange,
}) => {
  if (!asset) return null;

  const getAssetIcon = (type: Asset["type"]) => {
    switch (type) {
      case "cash":
        return <Wallet className="h-6 w-6 text-blue-500" />;
      case "stocks":
        return <LineChart className="h-6 w-6 text-green-500" />;
      case "etfs":
        return <Landmark className="h-6 w-6 text-purple-500" />;
      case "crypto":
        return <Coins className="h-6 w-6 text-amber-500" />;
      default:
        return <DollarSign className="h-6 w-6 text-gray-500" />;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const getAssetTypeLabel = (type: Asset["type"]) => {
    const labels = {
      cash: "Cash",
      stocks: "Stocks",
      etfs: "ETFs",
      crypto: "Cryptocurrency",
    };
    return labels[type];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {getAssetIcon(asset.type)}
            <DialogTitle>{asset.name}</DialogTitle>
          </div>
          <DialogDescription>
            {getAssetTypeLabel(asset.type)} on {asset.platform}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
            <span className="text-sm font-medium">Current Value</span>
            <span className="text-xl font-bold">
              {formatCurrency(asset.value)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 border rounded-md">
              <span className="text-sm text-muted-foreground">Performance</span>
              <div className="flex items-center mt-1">
                {asset.performance > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span
                  className={`font-medium ${asset.performance > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {asset.performance > 0 ? "+" : ""}
                  {asset.performance}%
                </span>
              </div>
            </div>

            <div className="p-3 border rounded-md">
              <span className="text-sm text-muted-foreground">
                Last Updated
              </span>
              <p className="font-medium mt-1">
                {new Date(asset.lastUpdated).toLocaleDateString()}
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium">Asset Details</h4>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <p>{getAssetTypeLabel(asset.type)}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Platform</p>
                <p>{asset.platform}</p>
              </div>

              {asset.shares && (
                <div>
                  <p className="text-sm text-muted-foreground">Shares/Amount</p>
                  <p>{asset.shares}</p>
                </div>
              )}

              {asset.purchasePrice && (
                <div>
                  <p className="text-sm text-muted-foreground">
                    Purchase Price
                  </p>
                  <p>{formatCurrency(asset.purchasePrice)}</p>
                </div>
              )}

              {asset.purchaseDate && (
                <div>
                  <p className="text-sm text-muted-foreground">Purchase Date</p>
                  <p>{new Date(asset.purchaseDate).toLocaleDateString()}</p>
                </div>
              )}

              {asset.symbol && (
                <div>
                  <p className="text-sm text-muted-foreground">Symbol</p>
                  <p>{asset.symbol}</p>
                </div>
              )}
            </div>

            {asset.notes && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">Notes</p>
                <p className="text-sm">{asset.notes}</p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssetDetailDialog;
