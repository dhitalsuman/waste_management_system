import Login from "@/components/Login";
import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const cookieStore = cookies();
  const sarsafai = cookieStore.get("sarsafai");
  if (sarsafai) {
    redirect("/admin/dashboard");
  }
  return (
    <>
      <div>
        <Login />
      </div>
    </>
  );
}
