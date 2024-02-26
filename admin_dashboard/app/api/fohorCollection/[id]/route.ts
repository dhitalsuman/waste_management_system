import { Location } from '@prisma/client';
import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{params}:{params:any}){

    try {
        console.log(params);
        const locationId=params.id;
      const findLocation=await prisma.location.findUnique({
          where:{
              id:locationId
          }
      });
      // const getNotification=await prisma.notifications.findMany({

      //   select:{
      //     Location:true
      //   }
      // })
      return NextResponse.json({message:"okay ",findLocation});
    } catch (error) {
      return NextResponse.json({ e: error }, { status: 500 });
      
    }
  }