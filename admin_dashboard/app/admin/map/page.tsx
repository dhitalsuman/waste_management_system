import { Button } from "@/components/ui/button";
import prisma from "@/libs/prismadb";
import React from "react";
import { toast } from "sonner";
import Notifications from "./components/Notifications";

const page = async() => {
  const notifications=await prisma.notifications.findMany({
    orderBy:{
      createdAt:"desc"
    },
    include:{
      UserNotifications:{
        include:{
          user:{
            include:{
              location:true
            }
          }
        }
      }
    }
   
    
 
  })
 
  return (
    <div className="mt-10">
      <Notifications
      notifications={notifications}
      />
    </div>
  );
};

export default page;
