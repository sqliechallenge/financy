import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ThumbsUp, ThumbsDown, CheckCircle } from "lucide-react";
import { AdviceRequest } from "./AIAdvisorFeatures";

interface AdviceListProps {
  adviceRequests: AdviceRequest[];
  onMarkAsDone: (adviceId: string) => void;
  onProvideFeedback: (adviceId: string, isHelpful: boolean) => void;
}

const AdviceList: React.FC<AdviceListProps> = ({
  adviceRequests,
  onMarkAsDone,
  onProvideFeedback,
}) => {
  if (adviceRequests.length === 0) {
    return (
      <div className="p-6 text-center bg-white rounded-lg shadow-sm border border-gray-200">
        <p className="text-gray-500">No advice requests yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {adviceRequests.map((advice) => (
        <Card key={advice.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{advice.feature}</CardTitle>
                <CardDescription>
                  Requested on{" "}
                  {new Date(advice.requestDate).toLocaleDateString()}
                </CardDescription>
              </div>
              <Badge
                variant={advice.status === "Done" ? "outline" : "secondary"}
              >
                {advice.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {advice.input && (
              <div className="mb-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Your input:
                </p>
                <p className="text-sm">{advice.input}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                AI Response:
              </p>
              <p className="text-sm">{advice.response}</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Separator />
            <div className="flex justify-between items-center w-full">
              {advice.status === "Not Done Yet" ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onMarkAsDone(advice.id)}
                  className="flex items-center gap-1"
                >
                  <CheckCircle className="h-4 w-4" />
                  Mark as Done
                </Button>
              ) : (
                <div className="text-xs text-muted-foreground">
                  Completed on{" "}
                  {new Date(advice.completionDate || "").toLocaleDateString()}
                </div>
              )}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onProvideFeedback(advice.id, true)}
                  disabled={
                    advice.feedback !== null && advice.feedback !== undefined
                  }
                  className={advice.feedback === true ? "bg-muted" : ""}
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Helpful
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onProvideFeedback(advice.id, false)}
                  disabled={
                    advice.feedback !== null && advice.feedback !== undefined
                  }
                  className={advice.feedback === false ? "bg-muted" : ""}
                >
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  Not Helpful
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default AdviceList;
