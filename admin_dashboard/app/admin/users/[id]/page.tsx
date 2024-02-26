import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import prisma from "@/libs/prismadb";
import EditUserForm from "./EditUserForm";

const page = async ({ params }: { params: any }) => {
  const id = params.id;
  const location = await prisma.location.findMany();
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return (
    <>
      <Link href="/admin/users" className="flex  mt-3">
        <Button>
          <ChevronLeft />
          Back
        </Button>
      </Link>
      <div className="mt-4">
        <h2 className="text-blue-500 font-bold mb-4">Edit User</h2>
      </div>
      {user && <EditUserForm location={location} user={user} />}
    </>
  );
};

export default page;
