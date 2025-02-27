import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/dashboard/Header";
import AssetTable from "@/components/dashboard/AssetTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AllAssetsPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleEditAsset = (asset: any) => {
    console.log("Edit asset", asset);
  };

  const handleDeleteAsset = (assetId: string) => {
    console.log("Delete asset", assetId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handleBack}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">All Assets</h1>
        </div>

        <AssetTable
          onEditAsset={handleEditAsset}
          onDeleteAsset={handleDeleteAsset}
        />
      </main>
    </div>
  );
};

export default AllAssetsPage;
