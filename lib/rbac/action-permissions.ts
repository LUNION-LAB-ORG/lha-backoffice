import {
  ROLE_PERMISSIONS,
  UtilisateurRole,
} from "@/features/utilisateur/types/utilisateur.type";
import { AppPermissions } from "@/lib/rbac/app-permissions";

export interface ActionContext {
  resourceOwnerId?: string;
  currentUserId: string;
  userRole: UtilisateurRole;
}

export function hasActionPermission(
  userRole: UtilisateurRole,
  action: AppPermissions,
  context?: ActionContext,
): boolean {
  const rolePermissions = ROLE_PERMISSIONS[userRole] || [];

  return rolePermissions.includes(action);
}
