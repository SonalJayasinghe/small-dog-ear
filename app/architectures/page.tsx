"use client";
import AddArchitectureForm from "@/components/forms/add-architecture-form";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import ArchitectureCard from "./components/architecture-card";
import { Architecture } from "@/lib/schema";
import AddNewArchitecture from "./components/add-new-architecture";

export default function Page() {
  const [architectures, setArchitectuers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArchitectures = () => {
    axios
      .get("/api/v1/architecture")
      .then((res) => {
        setArchitectuers(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
        toast("Something Went Wrong");
      });
  };
  useEffect(() => {
    fetchArchitectures();
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6"></div>
          <AddNewArchitecture onAdd ={fetchArchitectures}/>
        </div>
        {loading && <p> loading</p>}
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
          {architectures.map((data: Architecture, index: number) => (
            <div className="w-full" key={index}>
              <ArchitectureCard data={data} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
