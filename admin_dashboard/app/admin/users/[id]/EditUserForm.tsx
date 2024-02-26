"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Toaster, toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Location, Role } from "@prisma/client";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "FullName must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Pasword must be at least 8 characters.",
  }),
  role: z.string().min(1, {
    message: "Please select Role",
  }),
  locationId: z.string().min(2, {
    message: "Location must be selected.",
  }),
});

interface EditUserFormProps {
  user: {
    id: string;
    fullName: string;
    email: string;
    password: string;
    role: Role;
    locationId: string;
    createdAt: Date;
    updatedAt: Date;
  };
  location: {
    id: string;
    name: string;
    areaCode: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}
const EditUserForm: React.FC<EditUserFormProps> = ({ location, user }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      role: user.role,
      locationId: user.locationId,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const { fullName, email, password, role, locationId } = values;
    try {
      setLoading(true);
      const response = await axios.patch(`/api/signup/${user.id}`, {
        fullName,
        email,
        password,
        role,
        locationId,
      });
      toast.success(response.data.messsage);
      router.refresh();

      router.push("/admin/users");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/signup/${user.id}`);
      toast.success(response.data.message);
      router.refresh;
      router.push("/admin/users");
      router.refresh();
    } catch (error) {
      setLoading(true);

      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-[50vw]">
        <div>
          <Button
            className="ml-[43rem]"
            variant={"destructive"}
            disabled={loading}
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Full Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="OFFICER">Officer</SelectItem>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="locationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {location.map((item) => (
                        <div key={item.id}>
                          <SelectItem value={item.id}>{item.name}</SelectItem>
                        </div>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default EditUserForm;
