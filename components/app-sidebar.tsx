"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  BookOpenTextIcon,
  Bot,
  Command,
  Frame,
  Heart,
  Map,
  PieChart,
  PlusCircle,
  Save,
  Settings2,
  SquareStackIcon,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import NavLogo from "./nav-logo";
import { Button } from "./ui/button";
import { NavPlatform } from "./nav-platform";
import { platform } from "os";
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

  navMain: [
    {
      title: "Playground",
      url: "",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Create Prompt",
          url: "/help",
        },
        {
          title: "Favorites",
          url: "/",
        },
          {
          title: "Cookbook",
          url: "/",
        },
      ],
    },
    {
      title: "Prompt Architectures",
      url: "/help",
      icon: Bot,
      items: [
        {
          title: "RISEN",
          url: "#",
        },
        {
          title: "FOCUS",
          url: "#",
        },
        {
          title: "Few Shot",
          url: "#",
        },
        {
          title: "All",
          url: "#",
        },
      ],
    },

  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],

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
      name: "Examples",
      url: "/examples",
      icon: BookOpenTextIcon,
    },
     {
      name: "Projects",
      url: "/projects",
      icon: SquareStackIcon,
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
        <NavMain items={data.navMain} />
        <NavPlatform platform={data.platform} pathName={asPathname}/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
