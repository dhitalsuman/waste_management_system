"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { setCookie } from "cookies-next";

import { redirect, useRouter } from "next/navigation";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: any) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (
        input.email === "superadmin@gmail.com" &&
        input.password === "superadmin"
      ) {
        // cookies().set("sarsafai", "sarsafaikocookie");
        setCookie("sarsafai", "sarsafaikocookie");
        router.push("/admin/dashboard");
        toast.success("Successfully logged in");
      }
      const response = await axios.post("/api/signin", {
        email: input.email,
        password: input.password,
      });
      console.log(response.data.findUser);
      if (response.status === 200 && response.data.findUser.role === "ADMIN") {
        router.push("/admin/dashboard");
        toast.success(response.data.message);
      }else{
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col  justify-center items-center h-[50vh] shadow-md  w-[30vw] ml-[40%] mt-[14%]">
      <div className="text-blue-500 font-bold">Welcome Back</div>
      <div className="space-y-3 mt-3">
        <Input
          placeholder="email"
          type="email"
          name="email"
          value={input.email}
          onChange={(e) => handleInputChange(e)}
        />
        <Input
          placeholder="password"
          type="password"
          name="password"
          value={input.password}
          onChange={(e) => handleInputChange(e)}
        />
        <Button
          disabled={loading}
          className="w-full bg-blue-500"
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
