import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { PlusCircle, X } from "lucide-react";
import AssetTypeSelector from "./AssetTypeSelector";
import AssetForms from "./AssetForms";

interface AssetFormDialogProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  isEditing?: boolean;
  initialData?: any;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

const AssetFormDialog = ({
  isOpen = true,
  onOpenChange = () => {},
  isEditing = false,
  initialData = null,
  onSubmit = () => {},
  onCancel = () => {},
}: AssetFormDialogProps) => {
  const [assetType, setAssetType] = useState<
    "cash" | "stocks" | "etfs" | "crypto"
  >(initialData?.type || "cash");

  const handleAssetTypeChange = (
    type: "cash" | "stocks" | "etfs" | "crypto",
  ) => {
    setAssetType(type);
  };

  const handleSubmit = (formData: any) => {
    const assetData = {
      ...formData,
      type: assetType,
      id: initialData?.id || Date.now().toString(),
    };
    onSubmit(assetData);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEditing ? "Edit Asset" : "Add New Asset"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the details of your existing asset."
              : "Add a new asset to your portfolio by filling out the form below."}
          </DialogDescription>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={handleCancel}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <AssetTypeSelector
            selectedType={assetType}
            onSelect={handleAssetTypeChange}
          />

          <AssetForms assetType={assetType} onSubmit={handleSubmit} />
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Trigger component for opening the dialog
export const AddAssetButton = ({
  onClick = () => {},
}: {
  onClick?: () => void;
}) => {
  return (
    <Button
      onClick={onClick}
      className="flex items-center gap-2"
      variant="default"
    >
      <PlusCircle className="h-4 w-4" />
      Add Asset
    </Button>
  );
};

export default AssetFormDialog;
