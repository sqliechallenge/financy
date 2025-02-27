import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

export interface Transaction {
  id: string;
  type: "deposit" | "debit";
  amount: number;
  method?: string;
  description: string;
  date: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
}) => {
  if (transactions.length === 0) {
    return (
      <div className="p-6 text-center bg-white rounded-lg shadow-sm border border-gray-200">
        <p className="text-gray-500">No transactions yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <Table>
        <TableCaption>Your transaction history</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                <div className="flex items-center">
                  {transaction.type === "deposit" ? (
                    <ArrowUpCircle className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <ArrowDownCircle className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  <span className="capitalize">{transaction.type}</span>
                </div>
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.method || "-"}</TableCell>
              <TableCell>
                {new Date(transaction.date).toLocaleDateString()}
              </TableCell>
              <TableCell
                className={`text-right font-medium ${transaction.type === "deposit" ? "text-green-600" : "text-red-600"}`}
              >
                {transaction.type === "deposit" ? "+" : "-"}€
                {transaction.amount.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionHistory;
