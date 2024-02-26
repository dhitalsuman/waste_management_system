import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { fullName, role, locationId,email,password } = await req.json();
    const findUser=await prisma.user.findUnique({
      where:{
        email
      }
    });
    if(findUser){
    return NextResponse.json({ message:"User already exists"  }, { status:409 });

    }
    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password,
        role,
        locationId,
      },
    });
    return NextResponse.json({ messsage: "Success", newUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ e: error }, { status: 500 });
  }
}
