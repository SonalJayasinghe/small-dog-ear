"use client"
import AddArchitectureForm from "@/components/forms/add-architecture-form";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import Spinenr from "@/components/spinner";



const page = () => {
    const { name } = useParams(); // get name from URL
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/v1/architecture/${name}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast("Failed to fetch architecture");
        setLoading(false);
      });
  }, [name]);

  
  return (
    <>
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
              <BreadcrumbLink asChild>
                <Link href="/architectures">Architectures</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit Architecture</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="pl-8 pr-8 pt-4 pb-8">
        <div className="p-4 ring-1 ring-accent shadow-sm rounded-xl">
          {loading ? (
           <Spinenr/>
          ) : data ? (
            <AddArchitectureForm initialData={data} />
          ) : (
            <p className="text-red-500">Architecture not found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
