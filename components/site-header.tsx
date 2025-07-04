"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"


export function SiteHeader() {

  const nav = usePathname()
  const routeMap = {
    "/dashboard": "Dashboard",
    "/projects": "Projects",
    "/saved-prompts": "Saved Prompts",
    "/architectures": "Architectures",
    "/examples": "Examples",
    "/architectures/add-new": "Add New Architecture"
  }

  function mapRoute(path:string){  
    return routeMap[path as keyof typeof routeMap] || "Unknown Page";
  }
  

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{mapRoute(nav)}</h1>
        <div className="ml-auto flex items-center gap-2">
          {/* <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://www.sonal.lk"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              sonal.lk
            </a>
          </Button> */}
          <p className=" text-muted-foreground"> Version 1.0.0-alpha</p>
        </div>
      </div>
    </header>
  )
}
