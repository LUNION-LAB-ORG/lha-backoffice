"use client";

import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";
import { processAndValidateFormData } from "ak-zod-form-kit";
import { CheckCircle2, X } from "lucide-react";
import { modifierMotDePasseAction } from "../actions/utilisateur.action";
import {
  UtilisateurUpdatePasswordDTO,
  UtilisateurUpdatePasswordSchema,
} from "../schema/utilisateur.schema";
import { useInvalidateUtilisateurQuery } from "./index.query";

export const useModifierPasswordMutation = () => {
  const invalidateUtilisateurQuery = useInvalidateUtilisateurQuery();
  return useMutation({
    mutationFn: async ({ data }: { data: UtilisateurUpdatePasswordDTO }) => {
      // Validation des données
      const validation = processAndValidateFormData(
        UtilisateurUpdatePasswordSchema,
        data,
        {
          outputFormat: "object",
        },
      );
      if (!validation.success) {
        throw new Error(
          validation.errorsInString ||
            "Une erreur est survenue lors de la validation des données.",
        );
      }

      const result = await modifierMotDePasseAction(
        validation.data as UtilisateurUpdatePasswordDTO,
      );

      if (!result.success) {
        throw new Error(
          result.error || "Erreur lors de la modification de l'utilisateur",
        );
      }

      return result.data!;
    },
    onSuccess: async () => {
      addToast({
        title: "Mot de passe modifié avec succès",
        description: "Mot de passe modifié avec succès",
        promise: invalidateUtilisateurQuery(),
        icon: <CheckCircle2 />,
        color: "success",
      });
    },
    onError: async (error) => {
      addToast({
        title: "Erreur modification du mot de passe:",
        description: error.message,
        promise: Promise.reject(error),
        icon: <X />,
        color: "danger",
      });
    },
  });
};
