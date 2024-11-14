"use client";

import { Heart, Star } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@darkbluetechnologies/ui/sidebar";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getBasePath } from "../utils/path-helpers";

const MENU_ITEMS = [
  {
    title: "Popular movies",
    url: "/",
    icon: Star,
  },
  {
    title: "Favourite movies",
    url: "/favourite-movies",
    icon: Heart,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Movies Explorer</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MENU_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={getBasePath(item.url) === getBasePath(pathname)}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
