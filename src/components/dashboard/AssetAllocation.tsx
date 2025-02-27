import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface AssetAllocationProps {
  data?: {
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
}

const defaultData = {
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
};

const AssetAllocation: React.FC<AssetAllocationProps> = ({
  data = defaultData,
}) => {
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Asset Allocation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="byType" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="byType">By Asset Type</TabsTrigger>
            <TabsTrigger value="byPlatform">By Platform</TabsTrigger>
          </TabsList>

          <TabsContent value="byType" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.byType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.byType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString()}`,
                    "Value",
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="byPlatform" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.byPlatform}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.byPlatform.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString()}`,
                    "Value",
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AssetAllocation;
