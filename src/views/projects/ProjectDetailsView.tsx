import { getFullProject } from "@/api/ProjectAPI"
import Spinner from "@/components/spinner/Spinner"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import EditTaskData from "@/components/tasks/EditTaskData"
import TaskList from "@/components/tasks/TaskList"
import TaskModalDetails from "@/components/tasks/TaskModalDetails"
import { useAuth } from "@/hooks/useAuth"
import { isManager } from "@/utils/policies"
import { useQuery } from '@tanstack/react-query'
import { useMemo } from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"

export default function ProjectDetailsView() {

    const { data : user, isLoading : authLoading } = useAuth()
 
    const navigate = useNavigate()
    // Obtenemos el id de la ruta
    const params = useParams()
    const idProject = Number(params.idProject!)
    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', idProject], // Tiene que ser único
        queryFn: () => getFullProject(idProject), // Ejecuta getProjectById
        retry: false
    })

    // Verificamos que el usuario sea el manager
    const canEdit = useMemo(() => {
    if (!data || !user) return false
    return data.manager === user.idUser
    }, [data, user])

    if(isLoading && authLoading) return <Spinner/>
    if(isError) return <Navigate to='/404'/>
    if(data && user) return (
        <>
            <h1 className=" text-2xl text-colorPrimario font-bold">{data.projectName}</h1>
            <p className=" text-xl font-light text-gray-500 mt-2 mb-2">{data.description}</p>
            {isManager(data.manager, user.idUser) && (
                <nav className=" mb-3 flex gap-3">
                    <button
                        className="   bg-colorPrimario hover:bg-colorSecundario py-1 px-4 text-white text font-semibold cursor-pointer transition-colors rounded"
                        onClick={() => navigate(location.pathname + '?newTask=true')}   //Agregamos a la url el estado del modal          
                    >
                        Agregar tarea
                    </button>
                    <Link
                        className="   bg-colorPrimario hover:bg-colorSecundario py-1 px-4 text-white text font-semibold cursor-pointer transition-colors rounded"
                        to={'team'}
                    >
                        Colaboradores
                    </Link>
                </nav>
            )}
            <TaskList
                tasks={data.tasks}
                canEdit={canEdit}
            />
            <AddTaskModal/>
            <EditTaskData/>
            <TaskModalDetails/>
        </>
    )
}
