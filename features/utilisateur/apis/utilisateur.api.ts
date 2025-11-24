import { api } from "@/lib/api";
import { IUtilisateur } from "../types/utilisateur.type";
import {
  IUtilisateurAddUpdateResponse,
  IUtilisateurDeleteResponse,
} from "../types/utilisateur.type";
import { PaginatedResponse } from "@/types/api.type";
import { SearchParams } from "ak-api-http";
import {
  UtilisateurAddDTO,
  UtilisateurUpdateDTO,
  UtilisateurUpdatePasswordDTO,
} from "../schema/utilisateur.schema";
import { IUtilisateursParams } from "../types/utilisateur.type";

export interface IUtilisateurAPI {
  obtenirTousUtilisateurs(
    params: IUtilisateursParams,
  ): Promise<PaginatedResponse<IUtilisateur>>;
  obtenirUtilisateur(id: string): Promise<IUtilisateur>;
  ajouterUtilisateur(
    data: UtilisateurAddDTO,
  ): Promise<IUtilisateurAddUpdateResponse>;
  modifierProfil(
    id: string,
    data: UtilisateurUpdateDTO,
  ): Promise<IUtilisateurAddUpdateResponse>;
  modifierMotDePasse(
    data: UtilisateurUpdatePasswordDTO,
  ): Promise<IUtilisateurAddUpdateResponse>;
  supprimerUtilisateur(id: string): Promise<IUtilisateurDeleteResponse>;
}

export const utilisateurAPI: IUtilisateurAPI = {
  obtenirTousUtilisateurs(
    params: IUtilisateursParams,
  ): Promise<PaginatedResponse<IUtilisateur>> {
    return api.request<PaginatedResponse<IUtilisateur>>({
      endpoint: `/users`,
      method: "GET",
      searchParams: params as SearchParams,
    });
  },

  obtenirUtilisateur(id: string): Promise<IUtilisateur> {
    console.log("Obtaining user with id:", id);
    return api.request<IUtilisateur>({
      endpoint: `/users/detail`,
      method: "GET",
    });
  },
  ajouterUtilisateur(
    data: UtilisateurAddDTO,
  ): Promise<IUtilisateurAddUpdateResponse> {
    return api.request<IUtilisateurAddUpdateResponse>({
      endpoint: `/users`,
      method: "POST",
      data,
    });
  },
  modifierProfil(
    id: string,
    data: UtilisateurUpdateDTO,
  ): Promise<IUtilisateurAddUpdateResponse> {
    return api.request<IUtilisateurAddUpdateResponse>({
      endpoint: `/users/${id}`,
      method: "PATCH",
      data,
    });
  },

  modifierMotDePasse(
    data: UtilisateurUpdatePasswordDTO,
  ): Promise<IUtilisateurAddUpdateResponse> {
    return api.request<IUtilisateurAddUpdateResponse>({
      endpoint: `/users/update-password`,
      method: "PATCH",
      data,
    });
  },

  supprimerUtilisateur(id: string): Promise<IUtilisateurDeleteResponse> {
    return api.request<IUtilisateurDeleteResponse>({
      endpoint: `/users/delete/${id}`,
      method: "DELETE",
    });
  },
};
