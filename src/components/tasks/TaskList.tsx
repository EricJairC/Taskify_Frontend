import { updateStatus } from "@/api/TaskAPI"
import { statusTranslations } from "@/locales/es"
import { Project, TaskProject, TaskStatus } from "@/types/index"
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import DropTask from "./DropTask"
import TaskCard from "./TaskCard"

type TaskListProps = {
    tasks: TaskProject[],
    canEdit: boolean
}

type GroupedTask = {
    [key: string] : TaskProject[]
}

const initialStatusGroups : GroupedTask = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: []
}

const statusStyles : {[key: string] : string} = {
    pending: 'border-t-slate-500',
    onHold: 'border-t-red-500',
    inProgress: 'border-t-blue-500',
    underReview: 'border-t-amber-500',
    completed: 'border-t-emerald-500'
}

export default function TaskList({tasks, canEdit} : TaskListProps) {

    const queryClient = useQueryClient()
    
    const navigate = useNavigate()

    // Obtenemos el id del proyecto
        const params = useParams()
        const idProject = +params.idProject!

    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['editProject', idProject]})
            navigate(location.pathname, {replace: true})
        }
    })

    const groupedTasks = (tasks ?? []).reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task];
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);

    const handleDragEnd = (e: DragEndEvent) => {
        const {over, active} = e
        if(over && over.id){
            const idTask = +active.id
            const status = over.id as TaskStatus
            mutate({idProject, idTask, status})
            queryClient.setQueryData(['editProject', idProject], (prevData : Project) => {
                const updatedTasks = prevData.tasks.map((task) => {
                    if(task.idTask === idTask){
                        return {
                            ...task,
                            status
                        }
                    }
                    return task
                })
                return {
                    ...prevData,
                    tasks: updatedTasks
                }
            })
        }else{

        }
    }

  return (
    <>
        <h2 className="text-2xl text-colorPrimario font-bold mb-5 mt-2">Tareas</h2>
        <div className='flex gap-5 overflow-x-scroll lg:overflow-hidden pb-32'>
            <DndContext onDragEnd={handleDragEnd}>
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className=' w-[20%] min-w-[180px] 2xl:min-w-0 2xl:w-1/5'>
                        <h3 className={`capitalize text-lg font-normal border-slate-300 border bg-white px-2 py-1 border-t-8 rounded-md ${statusStyles[status]}`}>{statusTranslations[status]}</h3>
                        <DropTask status={status}/>
                        <ul className='mt-5 space-y-5'>
                            {tasks.length == 0 ? (
                                <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                            ) : (
                                tasks.map(task => <TaskCard key={task.idTask} task={task} canEdit={canEdit}/>)
                            )}
                        </ul>
                    </div>
                ))}
            </DndContext>
        </div>
    </>
  )
}
