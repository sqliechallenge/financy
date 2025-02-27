import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2, Brain } from "lucide-react";

export interface AIFeature {
  id: string;
  name: string;
  description: string;
  price: number;
  requiresInput?: boolean;
  inputLabel?: string;
  inputType?: string;
  inputPlaceholder?: string;
}

export interface AdviceRequest {
  id: string;
  userId: string;
  feature: string;
  featureId: string;
  input?: string;
  response: string;
  status: "Not Done Yet" | "Done";
  requestDate: string;
  completionDate?: string;
  feedback?: boolean | null;
}

interface AIAdvisorFeaturesProps {
  features: AIFeature[];
  userBalance: number;
  onPurchaseAdvice: (featureId: string, input?: string) => Promise<boolean>;
}

const AIAdvisorFeatures: React.FC<AIAdvisorFeaturesProps> = ({
  features,
  userBalance,
  onPurchaseAdvice,
}) => {
  const [selectedFeature, setSelectedFeature] = useState<AIFeature | null>(
    null,
  );
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleGetAdvice = (feature: AIFeature) => {
    setSelectedFeature(feature);
    setUserInput("");
    setError("");
    setShowConfirmation(true);
  };

  const handleConfirmPurchase = async () => {
    if (!selectedFeature) return;

    // Check if input is required but empty
    if (selectedFeature.requiresInput && !userInput.trim()) {
      setError(
        `Please provide ${selectedFeature.inputLabel?.toLowerCase() || "input"}.`,
      );
      return;
    }

    // Check if balance is sufficient
    if (userBalance < selectedFeature.price) {
      setError("Insufficient balance. Please add funds.");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const success = await onPurchaseAdvice(selectedFeature.id, userInput);
      if (success) {
        setShowConfirmation(false);
        setSelectedFeature(null);
        setUserInput("");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => (
          <Card key={feature.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                {feature.name}
              </CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-2xl font-bold text-primary">
                €{feature.price.toFixed(2)}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleGetAdvice(feature)}
              >
                Get Advice
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
            <DialogDescription>
              You are about to purchase AI financial advice.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">{selectedFeature?.name}</span>
              <span className="font-bold">
                €{selectedFeature?.price.toFixed(2)}
              </span>
            </div>

            <Separator className="my-4" />

            {selectedFeature?.requiresInput && (
              <div className="space-y-2 mb-4">
                <Label htmlFor="user-input">
                  {selectedFeature.inputLabel || "Input"}
                </Label>
                <Input
                  id="user-input"
                  type={selectedFeature.inputType || "text"}
                  placeholder={selectedFeature.inputPlaceholder || ""}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  disabled={isProcessing}
                />
              </div>
            )}

            <div className="text-sm">
              <span className="text-muted-foreground">Your balance: </span>
              <span className="font-medium">€{userBalance.toFixed(2)}</span>
            </div>

            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmPurchase} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Purchase"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIAdvisorFeatures;
