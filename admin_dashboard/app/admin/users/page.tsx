import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { PlusCircle } from "lucide-react";
import prisma from "@/libs/prismadb";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./column";

async function getData() {
  // Fetch data from your API here.
  try {
    const res = await fetch(`${process.env.NEXT_URL}/api/users`, {
      cache: "no-store",
    });
    const repo = await res.json();
    const { users } = await repo;
    return users;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array or handle the error accordingly
  }
}
const page = async () => {
  const data = await getData();
  return (
    <>
      <Link
        href="/admin/users/add"
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
