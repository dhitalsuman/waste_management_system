"use client";
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Navbar = () => {
  const router = useRouter();
  const handleLogOut = () => {
    deleteCookie("sarsafai");
    toast.success("Logged out successfully");
    router.push("/");
  };
  return (
    <div className="h-16 bg-blue-500 text-white flex items-center justify-around">
      <h2 className="font-medium text-lg">Swoccha</h2>
      <div className="flex items-center space-x-3">
        <p className="font-bold">Welcome Super Admin</p>
        <Avatar>
          <AvatarFallback className="text-black uppercase">A</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <Button
          className="bg-white text-black hover:bg-white"
          onClick={() => handleLogOut()}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
