import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: any }) {
    try {
        const userId = params.id; // Assuming params contain the user ID
        console.log(userId);

        const notifications = await prisma.userNotifications.findMany({
            where: {
                userId, // Filter by user ID
            },
            include: {
                notification: true, // Include notification details
            },
        });

        return NextResponse.json({ message: "Success", notifications });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error || "Internal Server Error" }, { status: 500 });
    }
}
