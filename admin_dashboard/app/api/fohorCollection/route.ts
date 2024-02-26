import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        const {locationId}=await req.json();
        const users=await prisma.user.findMany({
            where:{
                    locationId
            }
        })
        const message=`घर अगाडी फोहोर रख्दिनु हुन आनुरोध गर्दछौ ।  `
        const notification=await prisma.notifications.create({
            data:{
                message: message,
            }
        });

        const notificationId=notification.id;
   users.map(async(user) =>{
   
        await prisma.userNotifications.create({
            data:{
                userId: user.id,
                notificationId,
            }
        });
     
     })

    return NextResponse.json({ message:"Successfully send notification"}, { status: 200 });


        // const notifyUsers=
    } catch (error) {
    return NextResponse.json({ e: error }, { status: 500 });
        
    }
};

export async function GET(){
    try {
        const notifications=await prisma.userNotifications.findMany({
            include:{
                notification:true,
                
            }
        })
        return NextResponse.json({message:"Successful",notifications},{status:200})
    } catch (error) {
    return NextResponse.json({ e: error }, { status: 500 });
        
    }
}



export async function DELETE(){
    try {


        await prisma.notifications.deleteMany()
        return NextResponse.json({message:"Notifications Sucessfully Deleted"},{status:200})

        
    } catch (error) {
    return NextResponse.json({ e: error }, { status: 500 });
        
    }
}
