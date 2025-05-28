import AddArchitectureForm from "@/components/forms/add-architecture-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconCirclePlus } from "@tabler/icons-react";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area"


const AddNewArchitecture = ({onAdd}: {onAdd: () => void}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className=" cursor-pointer">
          {" "}
          <IconCirclePlus /> Add New Architecture
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Add New Architecture</DialogTitle>
          <DialogDescription>
            Add your own prompt engineering architecture here. You can use the
            architecture when prompt engineering.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96 ">

          <AddArchitectureForm onAdd={onAdd}/>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewArchitecture;
