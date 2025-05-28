import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Architecture } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { IconTrash } from "@tabler/icons-react";
import React from "react";

const ArchitectureCard = ({ data }: { data: Architecture }) => {
  return (
    <>
      <div
        className={cn(
          "bg-card text-card-foreground flex flex-col gap-3 rounded-xl border py-4 px-4 shadow-sm h-full justify-between cursor-pointer"
        )}
      >
        <div className=" flex w-full">
          <p className="text-xl font-semibold line-clamp-1 gap-2">
            {data.name}
          </p>
        </div>
        <div className="w-full flex">
          <p className=" text-muted-foreground text-sm line-clamp-3">
            {data.description}
          </p>
        </div>
        <div className=" flex w-full justify-between items-end">
          <Badge variant={"outline"} className="font-light">
            {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
          </Badge>
          {data.type === 'custom' && <Button className="w-6 h-6" variant={"destructive"}> <IconTrash/> </Button>}
        </div>
      </div>
    </>
  );
};

export default ArchitectureCard;
