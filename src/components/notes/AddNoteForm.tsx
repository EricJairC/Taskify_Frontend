import { NoteFormData } from '@/types/index'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../ErrorMessage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '@/api/NoteAPI'
import { toast } from 'react-toastify'
import { useLocation, useParams } from 'react-router-dom'

export default function AddNoteForm() {

    const params = useParams()
    // Obtenemos la url para obtener viewTask
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    // Obtenemos el idProject de params
    const idProject = +params.idProject!

    // Obtenemos idTask de la url
    const idTask = +queryParams.get('viewTask')!

    const initialValues : NoteFormData = {
        content: ''
    }

    const { register, handleSubmit, formState: {errors}, reset} = useForm({defaultValues: initialValues})

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            queryClient.invalidateQueries({queryKey: ['task', idTask]})
        }
    })

    const handleAddNote = (formData : NoteFormData) => {
        mutate({idProject, idTask, formData})
    }

  return (
    <form onSubmit={handleSubmit(handleAddNote)}
        className=" mt-5 space-y-4"
        noValidate
    >
        <div className=" flex flex-col gap-2">
            <label className=" text-base font-semibold" htmlFor="content">Crear nota</label>
            <input 
                type="text"
                id="content"
                placeholder="Contenido de la nota"
                className=" w-full p-2 text-base border border-gray-300 rounded-md"
                {...register('content', {
                    required: 'El contenido de la nota es obligatorio'
                })}
            />
            {errors.content && (
                <ErrorMessage>{errors.content.message}</ErrorMessage>
            )}
        </div>
        <input 
            type="submit" 
            value='Crear nota'
            className=" bg-colorPrimario hover:bg-colorSecundario w-full py-1 px-4 text-white font-semibold cursor-pointer transition-colors rounded text-center target:border-hidden"
        />
    </form>
  )
}
