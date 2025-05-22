"use client"
import AddArchitectureForm from "@/components/forms/add-architecture-form";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import ArchitectureCard from "./components/architecture-card";


export default function Page() {

  const [architectures, setArchitectuers] = useState([])
  const [loading, setLoading] = useState(true)
  const {data: session, status} = useSession();

  useEffect(()=>{

      axios.get(`/api/v1/architecture${session?.user.id ? "/" + session?.user.id : ""}`)
        .then((res) => {
          setArchitectuers(res.data)
          setLoading(false)
          console.log(res.data)
        })
        .catch((err) => {
          setLoading(false);
          toast("Something Went Wrong")
        })
    
  },[status, session])


  return (
    <div className="flex flex-1 flex-col">
      {session?.user.id}
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6"></div>
          <AddArchitectureForm userId={session?.user.id!} />
        </div>
       {architectures.map((architecture: any, index: number) => (
  <ArchitectureCard key={index} />
))}
      </div>
    </div>
  );
}
