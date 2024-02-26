import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest,{params}:{params:any}){
    try {
        const id=params.id;
        const user=await prisma.user.delete({
            where:{
                id
            }
        });
        return NextResponse.json({message:"Successfully deleted user"},{status:200});
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({e:error},{status:500})

    }

}

export async function PATCH(req:NextRequest,{params}:{params:any}){
    try {
        const { fullName, role, locationId,email,password } = await req.json();
        const id=params.id;
        const user=await prisma.user.update(
            {
                where:{
                    id
                },
                data: {
                    fullName,
                    email,
                    password,
                    role,
                    locationId,
                  },
            }
        );
        return NextResponse.json({message:"Successfully updated user",user},{status:200});
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({e:error},{status:500})

    }

}