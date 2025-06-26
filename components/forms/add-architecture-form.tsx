"use client";

import React, { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArchitectureSchema } from "@/lib/schema";
import { IconPlus, IconX } from "@tabler/icons-react";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type FormSchema = z.infer<typeof ArchitectureSchema>;

const AddArchitectureForm = () => {
  const router = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(ArchitectureSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "default",
      sections: [{ section_name: "", section_description: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sections",
  });

  const onSubmit = async (values: FormSchema) => {
    console.log(values);
    try {
      const response = await axios.post("/api/v1/architecture", values);
      console.log("Data saved:", response.data);
      toast("Architecture saved successfully!");
      form.reset();
      router.push("/architectures");
    } catch (error) {
      console.error("Save failed:", error);
      toast("Error saving architecture.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-[180px]" {...field}>
                    <SelectValue placeholder="Select Prompt Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {fields.map((field, index) => (
          <div key={field.id} className="border p-4 rounded space-y-2">
            <FormField
              control={form.control}
              name={`sections.${index}.section_name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`sections.${index}.section_description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant={"outline"}
              onClick={() => remove(index)}
              className=" cursor-pointer"
            >
              <IconX /> Remove Section
            </Button>
          </div>
        ))}

        <div className="w-full">
          <div
            onClick={() =>
              append({ section_name: "", section_description: "" })
            }
            className="border-2 border-dashed border-gray-400 rounded-sm p-2 flex items-center justify-center cursor-pointer h-full hover:bg-gray-50"
          >
            <div className="text-center">
              <p className="text-md font-semibold text-gray-600">
                + Add New Section
              </p>
            </div>
          </div>
        </div>

        <div className=" flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger>
              <Button
                type="reset"
                variant={"outline"}
                className=" cursor-pointer"
              >
                Reset
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will reset what you entered.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => form.reset()}>
                  Reset
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button type="submit" className=" cursor-pointer">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddArchitectureForm;
