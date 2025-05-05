import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TaskForm from './TaskForm';
import { useForm } from 'react-hook-form'
import { TaskFormData } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';

export default function AddTaskModal() {
    const navigate = useNavigate()
    // Permite leer datos de la url
    const location = useLocation()
    // Lee el parametro de la url
    const queryParams = new URLSearchParams(location.search)
    // Verificamos que exista el parametro
    const modalTask = queryParams.get('newTask')
    // En caso de que exista el parametro es true
    const show = modalTask ? true : false
    // Obteniendo el idProject
    const params = useParams()
    const idProject = +params.idProject!

    const initalValues : TaskFormData = {
        name: '',
        description: ''
    }

    const { register, handleSubmit, reset,formState: {errors} } = useForm({defaultValues: initalValues}) 

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: createTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['editProject', idProject]})
            toast.success(data)
            reset()
            navigate(location.pathname, {replace: true})
        }
    })

    const handleCreateTask = (formData : TaskFormData) => {
        const data = {
            formData,
            idProject
        }
        mutate(data)
    }

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true})}>
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
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-6">
                                    <Dialog.Title
                                        as="h3"
                                        className=" text-2xl text-colorPrimario font-bold mb-2"
                                    >
                                        Nueva Tarea
                                    </Dialog.Title>

                                    <p className="text-lg font-normal text-gray-800">Llena el formulario y crea  {''}
                                        <span className="text-colorPrimario font-semibold">una tarea</span>
                                    </p>

                                    <form action=""
                                        className=' mt-5 space-y-4'
                                        onSubmit={handleSubmit(handleCreateTask)}
                                        noValidate
                                    >
                                        <TaskForm
                                            register={register}
                                            errors={errors}
                                        />
                                        <input 
                                            type="submit"
                                            value="Guardar Tarea"
                                            className=" bg-colorPrimario hover:bg-colorSecundario w-full py-1 px-4 text-white font-semibold cursor-pointer transition-colors rounded text-center" 
                                        />
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}