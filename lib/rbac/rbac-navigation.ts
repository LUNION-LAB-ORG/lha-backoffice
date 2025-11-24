import { NavItem } from "@/components/(protected)/dashboard/common/data";
import { UtilisateurRole } from "@/features/utilisateur/types/utilisateur.type";
import { ROLE_PERMISSIONS } from "@/features/utilisateur/types/utilisateur.type";
import { AppPermissions } from "@/lib/rbac/app-permissions";

export function filterNavigationByRole(
  navigation: NavItem[],
  userRole: UtilisateurRole,
) {
  return navigation
    .map((item) => {
      if (item.permission && !hasPermission(userRole, item.permission)) {
        return null; // Si l'utilisateur n'a pas la permission, on retourne null
      }

      return item;
    })
    .filter((item): item is NavItem => item !== null);
}

export function hasPermission(
  userRole: UtilisateurRole,
  permission: AppPermissions,
): boolean {
  const rolePermissions = ROLE_PERMISSIONS[userRole] || [];
  return rolePermissions.includes(permission);
}
