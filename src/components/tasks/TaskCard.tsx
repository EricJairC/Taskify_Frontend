import { deleteTask } from "@/api/TaskAPI"
import { TaskProject } from "@/types/index"
import { useDraggable } from '@dnd-kit/core'
import { Menu, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { Fragment } from "react/jsx-runtime"

type TaskCardProps = {
    task: TaskProject,
    canEdit: boolean
}

export default function TaskCard({task, canEdit} : TaskCardProps) {
    // Obtenemos el idProject
    const params = useParams()
    const idProject = +params.idProject!

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.idTask
    })

    const navigate = useNavigate()

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: deleteTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['task']})
            queryClient.invalidateQueries({queryKey: ['editProject', idProject]})
            toast.success(data)
        }
    })

    const style = transform ? {
        transform: `translate3D(${transform.x}px, ${transform.y}px, 0)`,
        padding: "1.25rem",
        backgroundColor: '#FFF',
        width: '300px',
        display: 'flex',
        borderWidth: '1px',
        borderColor: 'rgb(203 213 225 / var(--tw-border-opacity))',
        borderRadius: '0.5rem'
    } : undefined

  return (
    
    <li className="p-4 bg-white border border-slate-300 rounded-lg shadow-md flex justify-between gap-3 hover:shadow-lg transition-shadow duration-300">
        <div 
            {...listeners}
            {...attributes}
            ref={setNodeRef}
            style={style}
            className="min-w-0 flex flex-col gap-y-4"
        >
            <p className="text-xl font-semibold text-slate-600 text-left">
                {task.name}
            </p>
            <p className="text-sm text-slate-500 text-left truncate">
                {task.description}
            </p>
        </div>
        <div className="flex shrink-0 gap-x-4">
            <Menu as="div" className="relative flex-none">
                <Menu.Button className=" text-gray-500 hover:text-gray-900 focus:outline-none">
                    <span className="sr-only">Opciones</span>
                    <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
                </Menu.Button>
                <Transition 
                    as={Fragment} 
                    enter="transition ease-out duration-100" 
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100" 
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100" 
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <Menu.Item>
                            <button 
                                type="button" 
                                className="px-3 py-1 text-sm leading-6 text-gray-900 w-full flex hover:bg-gray-100"
                                onClick={() => navigate(location.pathname + `?viewTask=${task.idTask}`)}
                            >
                                Ver Tarea
                            </button>
                        </Menu.Item>
                        {canEdit && (
                            <>
                                <Menu.Item>
                                    <button
                                        type="button"
                                        className="flex px-3 py-1 text-sm leading-6 text-gray-900 w-full hover:bg-gray-100"
                                        onClick={() => navigate(location.pathname + `?editTask=${task.idTask}`)}
                                    >
                                        Editar Tarea
                                    </button>
                                </Menu.Item>
                                <Menu.Item>
                                    <button
                                        type="button"
                                        className="flex px-3 py-1 text-sm leading-6 text-red-500 w-full hover:bg-red-50"
                                        onClick={() => mutate({ idProject, idTask: task.idTask })}
                                    >
                                        Eliminar Tarea
                                    </button>
                                </Menu.Item>
                            </>
                        )}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    </li>
  )
}
