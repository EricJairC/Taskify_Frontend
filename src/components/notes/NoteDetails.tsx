import { deleteNote } from "@/api/NoteAPI"
import { useAuth } from "@/hooks/useAuth"
import { Note } from "@/types/index"
import { formatDate } from "@/utils/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import Spinner from "../spinner/Spinner"

type NoteDetailsProps = {
    note: Note
}

export default function NoteDetails({note} : NoteDetailsProps) {

    const {data, isLoading} = useAuth()

    const canDelete = useMemo(() => data?.idUser === note.createdByUser.idUser, [data])

    const queryClient = useQueryClient()

    const params = useParams()
    const idProject = +params.idProject!

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const idTask = +queryParams.get('viewTask')!

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['task', idTask]})
        }
    })

    if(isLoading) return <Spinner/>

  return (
    <div className=" p-3 flex justify-between items-center">
        <div>
            <span className=" font-bold">{note.createdByUser.name}</span>
            <p>
                {note.content} 
            </p>
            <p className=" text-xs text-slate-500">
                {formatDate(note.createdAt)}
            </p>
        </div>
        {canDelete && (
            <button
                type="button"
                className=" bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold transition-colors cursor-pointer rounded-md"
                onClick={() => mutate({idProject, idTask, idNote: note.idNote})}
            >
                Eliminar
            </button>
        )}
    </div>
  )
}
