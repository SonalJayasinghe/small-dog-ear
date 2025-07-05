"use client";

import * as React from "react";
import {
  IconDashboard,
  IconFolder,
  IconHeart,
  IconTopologyStar3,
  IconBook2
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import { NavPlatform } from "./nav-platform";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Saved Prompts",
      url: "/saved-prompts",
      icon: IconHeart,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: IconFolder,
    },
     {
      title: "Architectures",
      url: "/architectures",
      icon: IconTopologyStar3,
    },
    {
      title: "Examples",
      url: "/examples",
      icon: IconBook2,
    },
  ],
  
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { theme } = useTheme();
  const [logo, setLogo] = useState("/small_dog_logo.png");

  useEffect(() => {
    if (theme === "dark") {
      setLogo("/small_dog_logo_white.png");
    } else {
      setLogo("/small_dog_logo.png");
    }
  }, [theme]);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <Image src={logo} alt="Logo" width={32} height={32} />
                <span className="text-base font-semibold">Small Dog Ear</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
