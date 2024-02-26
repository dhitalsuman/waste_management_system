import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const users=await prisma.user.findMany(
            {
                orderBy:{
                    createdAt:"desc"
                }
            }
        );
        
        return NextResponse.json({message:"Success",users});
    } catch (error) {
        return NextResponse.json({ e: error }, { status: 500 });
    }
}