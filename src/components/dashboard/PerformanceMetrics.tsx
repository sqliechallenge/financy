import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from "lucide-react";

interface PerformanceMetricsProps {
  timeRange?: string;
  totalGain?: number;
  percentageGain?: number;
  performanceData?: {
    labels: string[];
    values: number[];
  };
  topGainers?: Array<{
    name: string;
    gain: number;
    percentageGain: number;
  }>;
  topLosers?: Array<{
    name: string;
    loss: number;
    percentageLoss: number;
  }>;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  timeRange = "1M",
  totalGain = 1250.75,
  percentageGain = 5.2,
  performanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    values: [10000, 11200, 10800, 12000, 12500, 13250],
  },
  topGainers = [
    { name: "AAPL", gain: 450.25, percentageGain: 8.3 },
    { name: "MSFT", gain: 325.5, percentageGain: 6.7 },
    { name: "AMZN", gain: 275.0, percentageGain: 5.1 },
  ],
  topLosers = [
    { name: "NFLX", loss: 125.75, percentageLoss: 3.2 },
    { name: "META", loss: 95.5, percentageLoss: 2.1 },
    { name: "TSLA", loss: 85.25, percentageLoss: 1.8 },
  ],
}) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);
  const [selectedTab, setSelectedTab] = useState("overview");

  // Simple chart rendering using divs
  const renderChart = () => {
    const maxValue = Math.max(...performanceData.values);
    const minValue = Math.min(...performanceData.values);
    const range = maxValue - minValue;

    return (
      <div className="mt-4 h-48 flex items-end space-x-2">
        {performanceData.values.map((value, index) => {
          const height = ((value - minValue) / range) * 100;
          const isPositive =
            index > 0 && value >= performanceData.values[index - 1];

          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className={`w-full rounded-t-sm ${isPositive ? "bg-green-500" : "bg-red-500"}`}
                style={{ height: `${height}%` }}
              />
              <span className="text-xs mt-1">
                {performanceData.labels[index]}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">
            Performance Metrics
          </CardTitle>
          <Select
            value={selectedTimeRange}
            onValueChange={setSelectedTimeRange}
          >
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1W">1 Week</SelectItem>
              <SelectItem value="1M">1 Month</SelectItem>
              <SelectItem value="3M">3 Months</SelectItem>
              <SelectItem value="6M">6 Months</SelectItem>
              <SelectItem value="1Y">1 Year</SelectItem>
              <SelectItem value="ALL">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center">
            {percentageGain >= 0 ? (
              <ArrowUpCircle className="h-8 w-8 text-green-500 mr-2" />
            ) : (
              <ArrowDownCircle className="h-8 w-8 text-red-500 mr-2" />
            )}
            <div>
              <p className="text-2xl font-bold">
                $
                {Math.abs(totalGain).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p
                className={`text-sm ${percentageGain >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {percentageGain >= 0 ? "+" : ""}
                {percentageGain}%
              </p>
            </div>
          </div>
        </div>

        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="gainers">Top Gainersss</TabsTrigger>
            <TabsTrigger value="losers">Top Losers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-4">
            {renderChart()}
          </TabsContent>

          <TabsContent value="gainers" className="pt-4">
            <div className="space-y-3">
              {topGainers.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
                >
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-500">
                      +${item.gain.toFixed(2)}
                    </p>
                    <p className="text-xs text-green-500">
                      +{item.percentageGain}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="losers" className="pt-4">
            <div className="space-y-3">
              {topLosers.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
                >
                  <div className="flex items-center">
                    <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-500">
                      -${item.loss.toFixed(2)}
                    </p>
                    <p className="text-xs text-red-500">
                      -{item.percentageLoss}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
