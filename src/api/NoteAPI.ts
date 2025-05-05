import { isAxiosError } from "axios";
import { Note, NoteFormData, Project, Task } from "../types";
import api from "@/lib/axios";

type NoteAPIType = {
    formData: NoteFormData,
    idProject: Project['idProject'],
    idTask: Task['idTask'],
    idNote: Note['idNote']
}

export async function createNote({idProject, idTask, formData} : Pick<NoteAPIType, 'idProject' | 'idTask' | 'formData'>) {
    try {
        const url = `/projects/${idProject}/tasks/${idTask}/notes`
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteNote({idProject, idTask, idNote} : Pick<NoteAPIType, 'idProject' | 'idTask' | 'idNote'>) {
    try {
        const url = `/projects/${idProject}/tasks/${idTask}/notes/${idNote}`
        const {data} = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}