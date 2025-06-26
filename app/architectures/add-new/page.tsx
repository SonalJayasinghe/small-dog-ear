import AddArchitectureForm from "@/components/forms/add-architecture-form";
import React from "react";

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

const page = () => {
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
                <Link href="/architectures">Archictectures</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Add New Architecture</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="pl-8 pr-8 pt-4 pb-8">
        <div className="p-4 ring-1 ring-accent shadow-sm rounded-xl">
          <AddArchitectureForm />
        </div>
      </div>
    </>
  );
};

export default page;
