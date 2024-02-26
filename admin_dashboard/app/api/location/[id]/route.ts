import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest,{params}:{params:any}){
    try {
        const id=params.id;
        const location=await prisma.location.delete({
            where:{
                id
            }
        });
        return NextResponse.json({message:"Successfully deleted location"},{status:200});
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({e:error},{status:500})

    }

}

export async function PATCH(req:NextRequest,{params}:{params:any}){
    try {
        const {name,areaCode}=await req.json();
        const id=params.id;
        const location=await prisma.location.update(
            {
                where:{
                    id
                },
                data:{
name:name,
areaCode:areaCode
                }
            }
        );
        return NextResponse.json({message:"Successfully updated location",location},{status:200});
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({e:error},{status:500})

    }

}