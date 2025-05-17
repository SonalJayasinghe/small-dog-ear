"use client";

import * as React from "react";
import {
  BookOpenTextIcon,
  PlusCircle,
  Save,
  SquareStackIcon,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import NavLogo from "./nav-logo";
import { NavPlatform } from "./nav-platform";
import { usePathname } from "next/navigation"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  branding: {
    name: "Small Dog Ear",
    logo: "/small_dog_logo.png",
    tagline: "Prompting with Paws",
  },

  platform: [
    {
      name: "New Prompt",
      url: "/new-prompt",
      icon: PlusCircle,
    },
    {
      name: "Saved",
      url: "/saved",
      icon: Save,
    },
  
     {
      name: "Projects",
      url: "/projects",
      icon: SquareStackIcon,
    },
      {
      name: "Examples",
      url: "/examples",
      icon: BookOpenTextIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

    const asPathname = usePathname()
    console.log("asPathname", asPathname)

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavLogo branding={data.branding} />
      </SidebarHeader>
      <SidebarContent>
        <NavPlatform platform={data.platform} pathName={asPathname}/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
