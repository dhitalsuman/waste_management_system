import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(){
    const delLoc=await prisma.location.deleteMany();
    return NextResponse.json({ message: "Success",  });

}