import { isAxiosError } from "axios";
import { UpdateCurrentUserPasswordForm, UserProfileForm } from "../types";
import api from "@/lib/axios";


export async function updateProfile(formData : UserProfileForm) {
    try {
        const { data } = await api.patch<string>('/auth/profile', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function changePassword(formData : UpdateCurrentUserPasswordForm) {
    try {
        const { data } = await api.post<string>('/auth/updated-password', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}