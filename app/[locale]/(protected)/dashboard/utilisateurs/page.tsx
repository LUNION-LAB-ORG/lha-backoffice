import React from "react";
import { UtilisateurList } from "@/components/(protected)/dashboard/utilisateurs/utilisateur-list";
import { prefetchUtilisateursListQuery } from "@/features/utilisateur/queries/utilisateur-list.query";
import { auth } from "@/lib/auth";
import { hasPermission } from "@/lib/rbac/rbac-navigation";
import { AppPermissions } from "@/lib/rbac/app-permissions";

export default async function UtilisateursPage() {
  const session = await auth();
  const user = session?.user;
  if (!user || !hasPermission(user.role, AppPermissions.READ_USER)) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
        <p>Vous n&#39;avez pas la permission d&#39;accéder à cette page.</p>
      </div>
    );
  }

  await prefetchUtilisateursListQuery({ page: 1, limit: 10 });
  return <UtilisateurList />;
}
