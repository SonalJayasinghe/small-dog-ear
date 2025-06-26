import AddArchitectureForm from "@/components/forms/add-architecture-form";
import React from "react";

const page = () => {
  return (
    <div className="p-8">
      <div className="p-4 ring-1 ring-accent shadow-sm rounded-xl">
        <AddArchitectureForm />
      </div>
    </div>
  );
};

export default page;
