import { Navigate, useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getProjectById } from "@/api/ProjectAPI"
import EditProjectForm from "@/components/projects/EditProjectForm"
import Spinner from "@/components/spinner/Spinner"

export default function EditProjectView() {
    // Obtenemos el id de la ruta
    const params = useParams()
    const idProject = Number(params.idProject!)
    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', idProject], // Tiene que ser único
        queryFn: () => getProjectById(idProject), // Ejecuta getProjectById
        retry: false
    })
    if(isLoading) return <Spinner/>
    if(isError) return <Navigate to='/404'/>
    if(data) return <EditProjectForm data={data} idProject={idProject}/>
}
