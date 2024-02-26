import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(){
    const user=await prisma.notifications.deleteMany()
    return NextResponse.json({message:"success"});
}