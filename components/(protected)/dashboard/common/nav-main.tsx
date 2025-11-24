"use client";

import { IconCirclePlusFilled } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { NavItem } from "@/components/(protected)/dashboard/common/data";
import { filterNavigationByRole } from "@/lib/rbac/rbac-navigation";
import { UtilisateurRole } from "@/features/utilisateur/types/utilisateur.type";
import { useSession } from "next-auth/react";

export function NavMain({ items }: { items: NavItem[] }) {
  const router = useRouter();
  const session = useSession();
  const userRole =
    (session.data?.user?.role as UtilisateurRole) || UtilisateurRole.AGENT;
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              asChild
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <Link href="/dashboard/biens/creer">
                <IconCirclePlusFilled />
                <span>Création rapide</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {filterNavigationByRole(items, userRole).map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                onClick={() => router.push(item.url)}
                className="cursor-pointer"
                tooltip={item.title}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
