import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { ChevronLeft } from "lucide-react";
import UserForm from "./UserForm";
import prisma from "@/libs/prismadb";

const fetchLocations = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_URL}/api/location`, {
      cache: "no-store",
    });
    const repo = await res.json();
    const { locations } = await repo;
    return locations;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array or handle the error accordingly
  }
};

const page = async () => {
  const locations = await fetchLocations();
  return (
    <>
      <Link href="/admin/users" className="flex  mt-3">
        <Button>
          <ChevronLeft />
          Back
        </Button>
      </Link>
      <div className="mt-4">
        <h2 className="text-blue-500 font-bold mb-4">Add Users</h2>
        <UserForm locations={locations} />
      </div>
    </>
  );
};

export default page;
