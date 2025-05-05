import api from "@/lib/axios"
import { dashboardProjectSchema, editProjectSchema, Project, ProjectFormData, projectSchema } from "../types"
import { isAxiosError } from "axios"

// Creación de proyecto
export async function createProject(formData : ProjectFormData){
    try {
        const { data } = await api.post('/projects', formData)
        return data
    } catch (error) {
        // Forzamos a que el error sea de axios
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error) 
        }       
    }
}

// Obtiene los proyectos
export async function getProjects(){
    try {
        const { data } = await api.get('/projects')
        // Validamos que concuerda con nuestro schema
        const response = dashboardProjectSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        // Forzamos a que el error sea de axios
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error) 
        }       
    }
}

// Obtiene un proyecto por id
export async function getProjectById(idProject : Project['idProject']){
    try {
        const { data } = await api.get(`/projects/${idProject}`)
        const response = editProjectSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        // Forzamos a que el error sea de axios
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error) 
        }       
    }
}

export async function getFullProject(idProject : Project['idProject']){
    try {
        const { data } = await api.get(`/projects/${idProject}`)
        const response = projectSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        // Forzamos a que el error sea de axios
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error) 
        }       
    }
}

type ProjectAPIType = {
    formData: ProjectFormData,
    idProject: Project['idProject']
}

// Edita proyecto
export async function updateProject({formData, idProject} : ProjectAPIType ){
    try {
        const { data } = await api.patch<string>(`/projects/${idProject}`, formData)
        return data
    } catch (error) {
        // Forzamos a que el error sea de axios
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error) 
        }       
    }
}

// Elimina un proyecto 
export async function deleteProject(idProject : Project['idProject']){
    try {
        const { data } = await api.delete<string>(`/projects/${idProject}`)
        return data
    } catch (error) {
        // Forzamos a que el error sea de axios
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error) 
        }       
    }
}