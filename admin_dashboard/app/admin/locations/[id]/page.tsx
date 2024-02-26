import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import LocationForm from "../add/locationForm";
import prisma from "@/libs/prismadb";
import LocationEditForm from "./LocationEditForm";

const page = async ({ params }: { params: any }) => {
  const id = params.id;
  const location = await prisma.location.findUnique({
    where: {
      id,
    },
  });
  return (
    <>
      <Link href="/admin/locations" className="flex  mt-3">
        <Button>
          <ChevronLeft />
          Back
        </Button>
      </Link>
      <div className="mt-4">
        <h2 className="text-blue-500 font-bold mb-4">Edit Location</h2>
        {location && <LocationEditForm location={location} />}
      </div>
    </>
  );
};

export default page;
