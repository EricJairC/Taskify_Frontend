import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Project, TeamMember, TeamMemberForm, teamMembersScema } from "../types";

export async function findUserByEmail({idProject, formData} : {idProject: Project['idProject'], formData: TeamMemberForm}) {
    try {
        const url = `/projects/${idProject}/team/find`
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function addUserToProject({idProject, idUser} : {idProject: Project['idProject'], idUser: TeamMember['idUser']}) {
    try {
        const url = `/projects/${idProject}/team`
        const { data } = await api.post(url, {idUser})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjectTeam(idProject: Project['idProject']) {
    try {
        const url = `/projects/${idProject}/team`
        const { data } = await api.get(url)
        const response = teamMembersScema.safeParse(data)
        if(response.success){
            return response.data
        } 
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function removeUserFromProject({idProject, idUser} : {idProject: Project['idProject'], idUser: TeamMember['idUser']}) {
    try {
        const url = `/projects/${idProject}/team/${idUser}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}