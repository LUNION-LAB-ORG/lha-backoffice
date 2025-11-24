"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UtilisateurUpdateDTO,
  UtilisateurUpdateProfilDTO,
  UtilisateurUpdateProfilSchema,
} from "@/features/utilisateur/schema/utilisateur.schema";
import { useModifierProfilMutation } from "@/features/utilisateur/queries/utilisateur-update.mutation";
import { Input } from "@heroui/input";
import { useUtilisateurQuery } from "@/features/utilisateur/queries/utilisateur-detail.query";

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  userId: string;
};

export function UtilisateurProfilModal({ isOpen, setIsOpen, userId }: Props) {
  const { data: utilisateur, isLoading: isUserLoading } =
    useUtilisateurQuery(userId);

  const { mutateAsync: modifierProfilMutation, isPending } =
    useModifierProfilMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<UtilisateurUpdateProfilDTO>({
    resolver: zodResolver(UtilisateurUpdateProfilSchema),
    mode: "onChange",
  });

  const handleClose = useCallback(() => {
    if (!isPending) {
      setIsOpen(false);
    }
  }, [isPending, setIsOpen]);

  const onSubmit = useCallback(
    async (data: UtilisateurUpdateDTO) => {
      const payload: Partial<UtilisateurUpdateDTO> = { ...data };
      if (!payload.password) delete payload.password;
      if (!payload.phone) delete payload.phone;
      await modifierProfilMutation({
        id: utilisateur?.id || "",
        data: payload,
      });
      handleClose();
    },
    [modifierProfilMutation, handleClose, utilisateur],
  );

  useEffect(() => {
    if (!isOpen) return;

    const formValues = utilisateur
      ? {
          fullname: utilisateur.fullname,
          email: utilisateur.email,
          role: utilisateur.role,
          phone: utilisateur.phone || "",
          currentPassword: "",
          password: "",
        }
      : { role: undefined };

    reset(formValues);
  }, [isOpen, utilisateur, reset]);

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader className="flex flex-col gap-1">
            <h1 className="text-lg font-medium text-primary">
              {utilisateur?.fullname}
            </h1>
            <p className="text-sm text-gray-500">
              Modifiez les informations de votre profil utilisateur.
            </p>
          </ModalHeader>

          <ModalBody>
            <Input
              {...register("fullname")}
              isInvalid={!!errors.fullname}
              errorMessage={errors.fullname?.message}
              disabled={isPending || isUserLoading}
              placeholder="Nom complet"
              variant="bordered"
              type="text"
            />
            <Input
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              disabled={isPending || isUserLoading}
              placeholder="Email"
              variant="bordered"
              type="email"
            />
            <Input
              {...register("phone")}
              isInvalid={!!errors.phone}
              errorMessage={errors.phone?.message}
              disabled={isPending || isUserLoading}
              placeholder="Téléphone (optionnel)"
              variant="bordered"
              type="tel"
            />
          </ModalBody>

          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleClose}>
              Annuler
            </Button>
            <Button
              color="primary"
              type="submit"
              disabled={isPending || !isValid || isUserLoading}
              isLoading={isPending || isUserLoading}
            >
              Modifier
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
