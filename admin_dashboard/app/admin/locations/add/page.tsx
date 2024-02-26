import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { ChevronLeft } from "lucide-react";
import LocationForm from "./locationForm";
const page = () => {
  return (
    <>
      <Link href="/admin/locations" className="flex  mt-3">
        <Button>
          <ChevronLeft />
          Back
        </Button>
      </Link>
      <div className="mt-4">
        <h2 className="text-blue-500 font-bold mb-4">Add Location</h2>
        <LocationForm />
      </div>
    </>
  );
};

export default page;
