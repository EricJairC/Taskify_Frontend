import { addUserToProject } from "@/api/TeamAPI"
import { TeamMember } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

type SearchResultProps = {
    user: TeamMember,
    reset: () => void
}

export default function SearchResult({user, reset} : SearchResultProps) {

    const params = useParams()
    const idProject = +params.idProject!

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            queryClient.invalidateQueries({queryKey: ['projectTeam', idProject]})
        }
    })

    const handleAddUserToProject = () => {
        const data = {
            idProject,
            idUser: user.idUser
        }
        mutate(data)
    }

  return (
    <>
        <p className=" mt-5 text-center font-semibold">Resultado: </p>
        <div className=" flex justify-between items-center">
            <p>{user.name}</p>
            <button
                className=" bg-colorPrimario hover:bg-colorSecundario py-1 px-4 text-white text-normal font-semibold cursor-pointer transition-colors rounded-md"
                onClick={handleAddUserToProject}
            >
                Agregar al proyecto
            </button>
        </div>
    </>
  )
}
