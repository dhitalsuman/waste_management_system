import { Button } from "@/components/ui/button";
import React from "react";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { columns } from "./column";
import { DataTable } from "@/components/ui/data-table";
import prisma from "@/libs/prismadb";

async function getData() {
  // Fetch data from your API here.
  try {
    // Fetch data from your API here.
    const res = await fetch(`${process.env.NEXT_URL}/api/location`, {
      cache: "no-store",
    });
    const repo = await res.json();
    const { locations } = repo;

    return locations;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array or handle the error accordingly
  }
}

const page = async () => {
  const data = await getData();
  console.log(data)
  return (
    <>
      <Link
        href="/admin/locations/add"
        className="flex justify-end w-[80vw]  items-end mt-3"
      >
        <Button>
          <PlusCircle />
          Add
        </Button>
      </Link>
      <div className="mt-5">
        {data && <DataTable columns={columns} data={data} />}
      </div>
    </>
  );
};

export default page;
