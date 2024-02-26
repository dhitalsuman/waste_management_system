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
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  areaCode: z.string().min(2, {
    message: "areaCode must be at least 2 characters.",
  }),
});

interface LocationEditFormProps {
  location: {
    id: string;
    name: string;
    areaCode: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

const LocationEditForm: React.FC<LocationEditFormProps> = ({ location }) => {
  console.log(location);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: location.name,
      areaCode: location.areaCode,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const { name, areaCode } = values;
    try {
      setLoading(true);
      const response = await axios.patch(`/api/location/${location.id}`, {
        name,
        areaCode,
      });
      toast.success(response.data.message);
      router.push("/admin/locations");
      router.refresh();
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
      const response = await axios.delete(`/api/location/${location.id}`);
      toast.success(response.data.message);
      router.refresh;
      router.push("/admin/locations");
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="ENter Location Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="areaCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Code" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex ">
              <Button type="submit" className="w-full" disabled={loading}>
                Edit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default LocationEditForm;
