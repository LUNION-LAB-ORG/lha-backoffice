"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UtilisateurUpdatePasswordDTO,
  UtilisateurUpdatePasswordSchema,
} from "@/features/utilisateur/schema/utilisateur.schema";
import { Input } from "@heroui/input";
import { useModifierPasswordMutation } from "@/features/utilisateur/queries/utilisateur-update-password.mutation";

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export function UtilisateurUpdatePasswordModal({
  isOpen,
  setIsOpen,
}: Props) {
  const { mutateAsync: modifierPasswordMutation, isPending } =
    useModifierPasswordMutation();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<UtilisateurUpdatePasswordDTO>({
    resolver: zodResolver(UtilisateurUpdatePasswordSchema),
    mode: "onChange",
  });

  const handleClose = useCallback(() => {
    if (!isPending) {
      setIsOpen(false);
    }
  }, [isPending, setIsOpen]);

  const onSubmit = useCallback(
    async (data: UtilisateurUpdatePasswordDTO) => {
      await modifierPasswordMutation({
        data,
      });
      handleClose();
    },
    [modifierPasswordMutation, handleClose],
  );

  useEffect(() => {
    if (!isOpen) return;

    const formValues = {
      currentPassword: "",
      password: "",
    };

    reset(formValues);
  }, [isOpen, reset]);

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader className="flex flex-col gap-1">
            <h1 className="text-lg font-medium text-primary">
              Modifier le mot de passe
            </h1>
            <p className="text-sm text-gray-500">
              Modifiez les informations de votre profil utilisateur.
            </p>
          </ModalHeader>

          <ModalBody>
            <Input
              {...register("currentPassword")}
              isInvalid={!!errors.currentPassword}
              errorMessage={errors.currentPassword?.message}
              disabled={isPending}
              placeholder="Mot de passe actuel"
              variant="bordered"
              type={showPassword ? "text" : "password"}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-xs text-primary underline"
                >
                  {showPassword ? "Masquer" : "Afficher"}
                </button>
              }
            />
            <Input
              {...register("newPassword")}
              isInvalid={!!errors.newPassword}
              errorMessage={errors.newPassword?.message}
              disabled={isPending}
              placeholder="Nouveau mot de passe"
              variant="bordered"
              type={showPassword ? "text" : "password"}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-xs text-primary underline"
                >
                  {showPassword ? "Masquer" : "Afficher"}
                </button>
              }
            />
            <Input
              {...register("confirmNewPassword")}
              isInvalid={!!errors.confirmNewPassword}
              errorMessage={errors.confirmNewPassword?.message}
              disabled={isPending}
              placeholder="Confirmer le nouveau mot de passe"
              variant="bordered"
              type={showPassword ? "text" : "password"}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-xs text-primary underline"
                >
                  {showPassword ? "Masquer" : "Afficher"}
                </button>
              }
            />
          </ModalBody>

          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleClose}>
              Annuler
            </Button>
            <Button
              color="primary"
              type="submit"
              disabled={isPending || !isValid}
              isLoading={isPending}
            >
              Modifier
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
