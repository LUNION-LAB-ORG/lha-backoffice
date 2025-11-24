import { IconDashboard, IconHome2, IconUsersGroup } from "@tabler/icons-react";
import { AppPermissions } from "@/lib/rbac/app-permissions";

export type NavItem = {
  title: string;
  url: string;
  icon: React.ComponentType<any>;
  permission?: AppPermissions;
};

export type DataType = {
  navMain: NavItem[];
};

export const data: DataType = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Portefeuille de biens",
      url: "/dashboard/biens",
      icon: IconHome2,
      permission: AppPermissions.READ_PROPERTY,
    },
    {
      title: "Team",
      url: "/dashboard/utilisateurs",
      icon: IconUsersGroup,
      permission: AppPermissions.READ_USER,
    },
  ],
};
