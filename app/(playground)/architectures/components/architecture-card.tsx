"use client";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Architecture } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const ArchitectureCard = ({
  data,
  onDelete,
}: {
  data: Architecture;
  onDelete: () => void;
}) => {
  const router = useRouter();
  return (
    <>
      <div
        className={cn(
          "bg-card text-card-foreground flex flex-col gap-3 rounded-xl border justify-between py-4 px-4 shadow-sm h-full  cursor-pointer"
        )}
      >
        <div className=" flex w-full">
          <p className="text-xl font-semibold line-clamp-1 gap-2">
            {data.name}
          </p>
        </div>
        <div className="h-full w-full flex items-start">
          <p className=" text-muted-foreground text-sm line-clamp-3">
            {data.description}
          </p>
        </div>
        <div className=" flex w-full justify-between items-end">
          <Badge variant={"outline"} className="font-light">
            {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
          </Badge>

          <div className=" flex gap-2">
            {data.type === "custom" && (
            <Button
              className="w-8 h-8 cursor-pointer hover:scale-110"
              variant={"outline"}
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/architectures/edit/${data.name}`);
              }}
            >
              {" "}
              <IconEdit />{" "}
            </Button> )}

            {data.type === "custom" && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="w-8 h-8 cursor-pointer hover:scale-110"
                    variant={"destructive"}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {" "}
                    <IconTrash />{" "}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. Once delete you cannot
                      recover the deleted architecture.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      className=" cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        axios
                          .delete(`/api/v1/architecture/${data._id}`)
                          .then((res) => {
                            toast("Deleted successfully");
                            onDelete();
                          })
                          .catch((err) => {
                            console.log(err);
                            toast("Something went wrong");
                          });
                      }}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ArchitectureCard;
