import { Navigate, useLocation, useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getTaskById } from "@/api/TaskAPI"
import EditTaskModal from "./EditTaskModal"

export default function EditTaskData() {
    // Obtenemos id del proyecto
    const params = useParams()
    const idProject = +params.idProject!
    // Obtenemos el id de la tarea para poder llenar el formulario
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const idTask = +queryParams.get('editTask')!
    
    const {data, isError} = useQuery({
        queryKey: ['task', idTask],
        queryFn: () => getTaskById({idProject, idTask}),
        enabled: !!idTask, //Verificar que exista idTask para evitar consulta vacía
        retry: 1
    })
    if(isError) return <Navigate to={'/404'}/>
  if(data) return <EditTaskModal data={data} idTask={idTask}/>
}
