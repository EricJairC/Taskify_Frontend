import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { Task, TaskFormData } from '@/types/index';
import { useForm } from 'react-hook-form';
import TaskForm from './TaskForm';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';

type EditTaskDataProps = {
    data: Task
    idTask: Task['idTask']
}

export default function EditTaskModal({data, idTask} : EditTaskDataProps) {

    const navigate = useNavigate()
    // Obteniendo el idProject
    const params = useParams()
    const idProject = +params.idProject!

    const { register, handleSubmit, reset,formState: {errors} } = useForm<TaskFormData>({defaultValues: {
        name: data.name,
        description: data.description
    }}) 

    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: updateTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['editProject', idProject]})
            queryClient.invalidateQueries({queryKey: ['task', idTask]})
            toast.success(data)
            reset()
            navigate(location.pathname, {replace: true})
        }
    })

    const handleEditTask = (formData: TaskFormData) => {
        const data = {
            idProject, 
            idTask,
            formData
        }
        mutate(data)
    }
    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true}) }>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-8">
                                <Dialog.Title
                                    as="h3"
                                    className="font-bold text-colorPrimario text-2xl mb-1"
                                >
                                    Editar Tarea
                                </Dialog.Title>

                                <p className="text-lg font-normal text-gray-600">Realiza cambios a una tarea en {''}
                                    <span className="text-colorPrimario font-semibold">este formulario</span>
                                </p>

                                <form
                                    className="mt-5 space-y-4"
                                    onSubmit={handleSubmit(handleEditTask)}
                                    noValidate
                                >
                                    <TaskForm
                                        register={register}
                                        errors={errors}
                                    />                    
                                    <input
                                        type="submit"
                                        className=" bg-colorPrimario hover:bg-colorSecundario w-full py-1 px-4 text-white font-semibold cursor-pointer transition-colors rounded text-center"
                                        value='Guardar Tarea'
                                    />
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}