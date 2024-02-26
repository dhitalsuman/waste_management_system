"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const path = usePathname();
  const links = [
    { name: "Home", href: "/admin/dashboard" },
    { name: "Users", href: "/admin/users" },
    { name: "Locations", href: "/admin/locations" },
    { name: "Notifications", href: "/admin/map" },
  ];
  return (
    <div className=" w-[13rem]  p-10 shadow-md space-y-4">
      {links.map((link, index) => (
        <div key={index} className="">
          <Link
            href={link.href}
            className={
              path.includes(link.href) ? "text-blue-500" : "text-black"
            }
          >
            <Button className="w-full" variant="outline">
              {link.name}
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
