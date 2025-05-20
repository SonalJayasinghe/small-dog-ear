"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";


export default function Home() {
    const { data: session, status } = useSession()

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>
      <p className="text-lg">This is a simple example of a Next.js application.</p>
      {status === "loading" && <p>Loading...</p>}
      {status === "authenticated" && (
        <>
          <Image
            src={session.user?.image || ""}
            alt="User Image"
            width={100}
            height={100}
          />
          <p>{session.user?.name}</p>
          <Button
            variant="outline"
            onClick={() => signOut()}
            className="mt-4"
          >
            Sign out
          </Button>
        </>
      )}
      
    </main>
  );
}
