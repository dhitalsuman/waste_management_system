"use client"

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Notifications({notifications}:{notifications:any[]}){
    const router=useRouter();
    const handleDelete=async()=>{

        try {


            const response=await axios.delete('/api/fohorCollection');
            toast.success("Successfuly deleted notifications");
            router.refresh();
            
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }

    }
    
    return(
        <>
        <Button variant={"destructive"} onClick={()=>handleDelete()} >Delete Notifications</Button>
     {
      notifications.map((item)=>(
        <div className="mt-10, p-5 h-30 rounded-md shadow-md p-10 mb-5" key={item.id}>
<p>{item.message}</p>
{item.createdAt !== null && <p>Created At:{item.createdAt.toLocaleString()}</p>}
<p>{item.UserNotifications[0]?item.UserNotifications[0].user.location.name:"Null"}</p>

     </div>
      ))
     }
        </>
    )
}