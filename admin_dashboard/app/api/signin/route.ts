import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'


export async function POST(req:NextRequest){
    try {
        const {email,password}=await req.json();
        const findUser=await prisma.user.findUnique({
            where:{
                email
            }
        });
        if(!findUser){
    return NextResponse.json({ message:"Invalid Crediantials"  }, { status:410 });
        }

        if(password===findUser.password){
            cookies().set('sarsafai', findUser.id)
            return NextResponse.json({message:"Successfully Logged in",findUser},{status:200});
        }
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ e: error }, { status: 500 });
    }

}