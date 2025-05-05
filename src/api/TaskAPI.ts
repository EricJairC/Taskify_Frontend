import api from "@/lib/axios";
import { Project, Task, TaskFormData, taskSchema } from "../types";
import { isAxiosError } from "axios";

type TaskAPI = {
    formData: TaskFormData,
    idProject: Project['idProject'],
    idTask: Task['idTask'],
    status: Task['status']
}

export async function createTask({formData, idProject} : Pick<TaskAPI, 'formData' | 'idProject'>){
    try {
        const url = `http://localhost:4000/api/projects/${idProject}/tasks`;
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getTaskById({idProject, idTask} : Pick<TaskAPI, 'idProject' | 'idTask'>){
    try {
        const url = `/projects/${idProject}/tasks/${idTask}`
        const {data} = await api.get(url)
        const response = taskSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateTask({idProject, idTask, formData}  : Pick<TaskAPI, 'idProject' | 'idTask' | 'formData'>){
    try {
        const url = `/projects/${idProject}/tasks/${idTask}`
        const {data} = await api.patch(url, formData) 
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteTask({idProject, idTask} : Pick<TaskAPI, 'idProject' | 'idTask'>){
    try {
        const url = `/projects/${idProject}/tasks/${idTask}`
        const {data} = await api.delete(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateStatus({idProject, idTask, status} : Pick<TaskAPI, 'idProject' | 'idTask' | 'status'>){
    try {
        const url = `/projects/${idProject}/tasks/${idTask}/status`
        const {data} = await api.patch(url, {status})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}