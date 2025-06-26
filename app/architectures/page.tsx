"use client";


import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ArchitectureCard from "./components/architecture-card";
import { Architecture } from "@/lib/schema";
import { useRouter } from "next/navigation";
import Spinenr from "@/components/spinner";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
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
        {/* <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        </div> */}

        <div className="flex flex-col pl-8 pt-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Architecture</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

        {loading? <Spinenr/> :

        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 pt-2">
          {architectures.map((data: Architecture, index: number) => (
            <div className="w-full" key={index}>
              <ArchitectureCard data={data} onDelete={fetchArchitectures} />
            </div>
          ))}
          <div className="w-full">
            <div 
            onClick={ ()=> { router.push("/architectures/add-new")}}
            className="border-2 border-dashed border-gray-400 rounded-xl p-6 flex items-center justify-center cursor-pointer h-full hover:bg-gray-50">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-600">
                  + Add New Architecture
                </p>
              </div>
            </div>
          </div>
        </div>
}
      </div>
    </div>
  );
}
