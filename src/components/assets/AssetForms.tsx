import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

type AssetType = "cash" | "stocks" | "etfs" | "crypto";

interface AssetFormsProps {
  assetType?: AssetType;
  onSubmit?: (data: any) => void;
}

// Cash form schema
const cashFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  amount: z.string().min(1, { message: "Amount is required" }),
  currency: z.string().min(1, { message: "Currency is required" }),
  provider: z.string().min(1, { message: "Provider is required" }),
  notes: z.string().optional(),
});

// Stocks form schema
const stocksFormSchema = z.object({
  ticker: z.string().min(1, { message: "Ticker symbol is required" }),
  shares: z.string().min(1, { message: "Number of shares is required" }),
  purchasePrice: z.string().min(1, { message: "Purchase price is required" }),
  purchaseDate: z.string().min(1, { message: "Purchase date is required" }),
  broker: z.string().min(1, { message: "Broker is required" }),
  notes: z.string().optional(),
});

// ETFs form schema
const etfsFormSchema = z.object({
  ticker: z.string().min(1, { message: "Ticker symbol is required" }),
  shares: z.string().min(1, { message: "Number of shares is required" }),
  purchasePrice: z.string().min(1, { message: "Purchase price is required" }),
  purchaseDate: z.string().min(1, { message: "Purchase date is required" }),
  broker: z.string().min(1, { message: "Broker is required" }),
  notes: z.string().optional(),
});

// Crypto form schema
const cryptoFormSchema = z.object({
  symbol: z.string().min(1, { message: "Crypto symbol is required" }),
  amount: z.string().min(1, { message: "Amount is required" }),
  purchasePrice: z.string().min(1, { message: "Purchase price is required" }),
  purchaseDate: z.string().min(1, { message: "Purchase date is required" }),
  wallet: z.string().min(1, { message: "Wallet/Exchange is required" }),
  notes: z.string().optional(),
});

const CashForm = ({
  onSubmit = () => {},
}: {
  onSubmit?: (data: any) => void;
}) => {
  const form = useForm<z.infer<typeof cashFormSchema>>({
    resolver: zodResolver(cashFormSchema),
    defaultValues: {
      name: "",
      amount: "",
      currency: "USD",
      provider: "",
      notes: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof cashFormSchema>) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 bg-white p-4 rounded-md"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Name</FormLabel>
              <FormControl>
                <Input placeholder="Savings Account" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="10000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="JPY">JPY</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="provider"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Provider/Bank</FormLabel>
              <FormControl>
                <Input placeholder="Bank of America" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Additional information" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Save Cash Asset
        </Button>
      </form>
    </Form>
  );
};

const StocksForm = ({
  onSubmit = () => {},
}: {
  onSubmit?: (data: any) => void;
}) => {
  const form = useForm<z.infer<typeof stocksFormSchema>>({
    resolver: zodResolver(stocksFormSchema),
    defaultValues: {
      ticker: "",
      shares: "",
      purchasePrice: "",
      purchaseDate: "",
      broker: "",
      notes: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof stocksFormSchema>) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 bg-white p-4 rounded-md"
      >
        <FormField
          control={form.control}
          name="ticker"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ticker Symbol</FormLabel>
              <FormControl>
                <Input placeholder="AAPL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shares"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Shares</FormLabel>
              <FormControl>
                <Input type="number" placeholder="10" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="purchasePrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purchase Price (per share)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="150.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="purchaseDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purchase Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="broker"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Broker/Platform</FormLabel>
              <FormControl>
                <Input placeholder="Robinhood" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Additional information" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Save Stock Asset
        </Button>
      </form>
    </Form>
  );
};

const ETFsForm = ({
  onSubmit = () => {},
}: {
  onSubmit?: (data: any) => void;
}) => {
  const form = useForm<z.infer<typeof etfsFormSchema>>({
    resolver: zodResolver(etfsFormSchema),
    defaultValues: {
      ticker: "",
      shares: "",
      purchasePrice: "",
      purchaseDate: "",
      broker: "",
      notes: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof etfsFormSchema>) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 bg-white p-4 rounded-md"
      >
        <FormField
          control={form.control}
          name="ticker"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ETF Ticker Symbol</FormLabel>
              <FormControl>
                <Input placeholder="VOO" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shares"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Shares</FormLabel>
              <FormControl>
                <Input type="number" placeholder="5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="purchasePrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purchase Price (per share)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="380.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="purchaseDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purchase Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="broker"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Broker/Platform</FormLabel>
              <FormControl>
                <Input placeholder="Vanguard" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Additional information" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Save ETF Asset
        </Button>
      </form>
    </Form>
  );
};

const CryptoForm = ({
  onSubmit = () => {},
}: {
  onSubmit?: (data: any) => void;
}) => {
  const form = useForm<z.infer<typeof cryptoFormSchema>>({
    resolver: zodResolver(cryptoFormSchema),
    defaultValues: {
      symbol: "",
      amount: "",
      purchasePrice: "",
      purchaseDate: "",
      wallet: "",
      notes: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof cryptoFormSchema>) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 bg-white p-4 rounded-md"
      >
        <FormField
          control={form.control}
          name="symbol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Crypto Symbol</FormLabel>
              <FormControl>
                <Input placeholder="BTC" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.00000001"
                  placeholder="0.25"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="purchasePrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purchase Price (per unit)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="30000.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="purchaseDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purchase Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="wallet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wallet/Exchange</FormLabel>
              <FormControl>
                <Input placeholder="Coinbase" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Additional information" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Save Crypto Asset
        </Button>
      </form>
    </Form>
  );
};

const AssetForms = ({
  assetType = "cash",
  onSubmit = () => {},
}: AssetFormsProps) => {
  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg">
      {assetType === "cash" && <CashForm onSubmit={onSubmit} />}
      {assetType === "stocks" && <StocksForm onSubmit={onSubmit} />}
      {assetType === "etfs" && <ETFsForm onSubmit={onSubmit} />}
      {assetType === "crypto" && <CryptoForm onSubmit={onSubmit} />}
    </div>
  );
};

export default AssetForms;
