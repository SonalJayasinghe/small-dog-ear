"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Spinenr from "@/components/spinner";
import { Architecture } from "@/lib/schema";

const Page = () => {
  const { name } = useParams();
  const [data, setData] = useState<Architecture>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/v1/architecture/${name}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
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
              <BreadcrumbPage>View Architecture</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="pl-8 pr-8 pt-4 pb-8">
          {loading ? (
            <Spinenr />
          ) : data ? (
            <Card className="max-w-3xl mx-auto mt-6 shadow-md rounded-2xl p-6 space-y-1">
              <div>
                <h2 className="text-lg font-semibold text-accent-foreground">
                  {data.name}
                </h2>
                <p className="text-muted-foreground text-base">
                  {data.description || "No description provided."}
                </p>
              </div>


              <div>
                <h2 className="text-lg font-semibold text-accent-foreground mb-2">
                  Sections
                </h2>
                {data.sections.length > 0 ? (
                  <div className="space-y-4">
                    {data.sections.map((section: any, idx: number) => (
                      <div
                        key={idx}
                        className="border rounded-xl p-4 bg-muted/20"
                      >
                        <h3 className="font-medium">
                        {section.section_name}
                        </h3>
                        {section.section_description && (
                          <p className="text-muted-foreground">
                         {section.section_description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No sections available.
                  </p>
                )}
              </div>
            </Card>
          ) : (
            <p className="text-red-500">Architecture not found.</p>
          )}
        </div>
    </>
  );
};

export default Page;
