import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit,
  MoreHorizontal,
  Trash2,
  TrendingDown,
  TrendingUp,
  Filter,
  ListFilter,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AssetDetailDialog from "./AssetDetailDialog";

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

interface AssetTableProps {
  assets?: Asset[];
  onEditAsset?: (asset: Asset) => void;
  onDeleteAsset?: (assetId: string) => void;
  showViewAllButton?: boolean;
}

const platformLogos: Record<string, string> = {
  "Bank of America": "https://api.dicebear.com/7.x/avataaars/svg?seed=BoA",
  Robinhood: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robinhood",
  Vanguard: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vanguard",
  Coinbase: "https://api.dicebear.com/7.x/avataaars/svg?seed=Coinbase",
  Chase: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chase",
  Fidelity: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fidelity",
  "TD Ameritrade":
    "https://api.dicebear.com/7.x/avataaars/svg?seed=TDAmeritrade",
  "E*TRADE": "https://api.dicebear.com/7.x/avataaars/svg?seed=ETrade",
  Binance: "https://api.dicebear.com/7.x/avataaars/svg?seed=Binance",
  Kraken: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kraken",
};

const defaultAssets = [
  {
    id: "1",
    name: "Savings Account",
    type: "cash",
    value: 15000,
    platform: "Bank of America",
    performance: 0.5,
    lastUpdated: "2023-06-15",
    notes: "Emergency fund",
  },
  {
    id: "2",
    name: "AAPL",
    type: "stocks",
    value: 8500,
    platform: "Robinhood",
    performance: 12.3,
    lastUpdated: "2023-06-18",
    shares: 50,
    purchasePrice: 150.25,
    purchaseDate: "2022-01-15",
    symbol: "AAPL",
  },
  {
    id: "3",
    name: "VOO",
    type: "etfs",
    value: 22000,
    platform: "Vanguard",
    performance: 8.7,
    lastUpdated: "2023-06-17",
    shares: 60,
    purchasePrice: 320.45,
    purchaseDate: "2021-11-20",
    symbol: "VOO",
  },
  {
    id: "4",
    name: "Bitcoin",
    type: "crypto",
    value: 5000,
    platform: "Coinbase",
    performance: -3.2,
    lastUpdated: "2023-06-18",
    shares: 0.15,
    purchasePrice: 32000,
    purchaseDate: "2022-03-10",
    symbol: "BTC",
  },
  {
    id: "5",
    name: "Emergency Fund",
    type: "cash",
    value: 10000,
    platform: "Chase",
    performance: 0.2,
    lastUpdated: "2023-06-10",
    notes: "Do not touch unless emergency",
  },
];

const AssetTable = ({
  assets = defaultAssets,
  onEditAsset = () => {},
  onDeleteAsset = () => {},
  showViewAllButton = true,
}: AssetTableProps) => {
  const navigate = useNavigate();
  const [sortColumn, setSortColumn] = useState<keyof Asset>("value");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [showAssetDetail, setShowAssetDetail] = useState(false);
  const [filterType, setFilterType] = useState<Asset["type"] | "all">("all");
  const [filterPlatform, setFilterPlatform] = useState<string | "all">("all");

  const handleSort = (column: keyof Asset) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  const handleRowClick = (asset: Asset) => {
    setSelectedAsset(asset);
    setShowAssetDetail(true);
  };

  const handleViewAllAssets = () => {
    navigate("/assets");
  };

  const handleFilterTypeChange = (type: Asset["type"] | "all") => {
    setFilterType(type);
  };

  const handleFilterPlatformChange = (platform: string | "all") => {
    setFilterPlatform(platform);
  };

  // Get unique platforms for filter
  const platforms = Array.from(new Set(assets.map((asset) => asset.platform)));

  // Apply filters
  const filteredAssets = assets.filter((asset) => {
    const typeMatch = filterType === "all" || asset.type === filterType;
    const platformMatch =
      filterPlatform === "all" || asset.platform === filterPlatform;
    return typeMatch && platformMatch;
  });

  // Sort filtered assets
  const sortedAssets = [...filteredAssets].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

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

  const getPlatformLogo = (platform: string) => {
    return (
      platformLogos[platform] ||
      "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
    );
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Filters */}
      <div className="p-4 border-b flex flex-wrap gap-4 items-center">
        <div className="flex items-center">
          <ListFilter className="h-4 w-4 mr-2 text-gray-500" />
          <span className="text-sm font-medium">Filters:</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Type:</span>
          <select
            className="text-sm border rounded-md px-2 py-1"
            value={filterType}
            onChange={(e) =>
              handleFilterTypeChange(e.target.value as Asset["type"] | "all")
            }
          >
            <option value="all">All Types</option>
            <option value="cash">Cash</option>
            <option value="stocks">Stocks</option>
            <option value="etfs">ETFs</option>
            <option value="crypto">Crypto</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Platform:</span>
          <select
            className="text-sm border rounded-md px-2 py-1"
            value={filterPlatform}
            onChange={(e) => handleFilterPlatformChange(e.target.value)}
          >
            <option value="all">All Platforms</option>
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Table>
        <TableCaption className="pb-4">
          Your financial assets portfolio
          {showViewAllButton && (
            <Button
              variant="outline"
              size="sm"
              className="ml-4"
              onClick={handleViewAllAssets}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View All Assets
            </Button>
          )}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Asset Name
              {sortColumn === "name" && (
                <span className="ml-1">
                  {sortDirection === "asc" ? "↑" : "↓"}
                </span>
              )}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("type")}
            >
              Type
              {sortColumn === "type" && (
                <span className="ml-1">
                  {sortDirection === "asc" ? "↑" : "↓"}
                </span>
              )}
            </TableHead>
            <TableHead
              className="cursor-pointer text-right"
              onClick={() => handleSort("value")}
            >
              Value
              {sortColumn === "value" && (
                <span className="ml-1">
                  {sortDirection === "asc" ? "↑" : "↓"}
                </span>
              )}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("platform")}
            >
              Platform
              {sortColumn === "platform" && (
                <span className="ml-1">
                  {sortDirection === "asc" ? "↑" : "↓"}
                </span>
              )}
            </TableHead>
            <TableHead
              className="cursor-pointer text-right"
              onClick={() => handleSort("performance")}
            >
              Performance
              {sortColumn === "performance" && (
                <span className="ml-1">
                  {sortDirection === "asc" ? "↑" : "↓"}
                </span>
              )}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("lastUpdated")}
            >
              Last Updated
              {sortColumn === "lastUpdated" && (
                <span className="ml-1">
                  {sortDirection === "asc" ? "↑" : "↓"}
                </span>
              )}
            </TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAssets.map((asset) => (
            <TableRow
              key={asset.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleRowClick(asset)}
            >
              <TableCell className="font-medium">{asset.name}</TableCell>
              <TableCell>{getAssetTypeLabel(asset.type)}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(asset.value)}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <img
                    src={getPlatformLogo(asset.platform)}
                    alt={asset.platform}
                    className="h-6 w-6 rounded-full"
                  />
                  <span>{asset.platform}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end">
                  {asset.performance > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : asset.performance < 0 ? (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  ) : null}
                  <span
                    className={
                      asset.performance > 0
                        ? "text-green-500"
                        : asset.performance < 0
                          ? "text-red-500"
                          : ""
                    }
                  >
                    {asset.performance > 0 ? "+" : ""}
                    {asset.performance}%
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {new Date(asset.lastUpdated).toLocaleDateString()}
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEditAsset(asset)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDeleteAsset(asset.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AssetDetailDialog
        asset={selectedAsset}
        open={showAssetDetail}
        onOpenChange={setShowAssetDetail}
      />
    </div>
  );
};

export default AssetTable;
