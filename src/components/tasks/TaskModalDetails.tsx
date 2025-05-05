import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTaskById, updateStatus } from '@/api/TaskAPI';
import { toast } from 'react-toastify';
import { formatDate } from '@/utils/index';
import { statusTranslations } from '@/locales/es';
import { TaskStatus } from '@/types/index';
import NotesPanel from '../notes/NotesPanel';

export default function TaskModalDetails() {

    const navigate = useNavigate()

    const queryClient = useQueryClient()

    // Obtenemos el id del proyecto
    const params = useParams()
    const idProject = +params.idProject!

    // Obtenemos el id de la tarea
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const idTask = +queryParams.get('viewTask')!

    // En caso de que esté el id de la tarea se abre modal
    const show = idTask ? true : false

    // Obtenemos la data 
    const { data, isError, error } = useQuery({
        queryKey: ['task', idTask],
        queryFn: () => getTaskById({idProject, idTask}),
        enabled: !!idTask, // Solo si existe idtask se hace la consulta
        retry: false
    })

    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['task', idTask]})
            queryClient.invalidateQueries({queryKey: ['editProject', idProject]})
            toast.success(data)
            navigate(location.pathname, {replace: true})
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as TaskStatus
        const data = { idProject, idTask, status }
        mutate(data)
    }

    if(isError){
        toast.error(error.message, {toastId: 'error'})
        return <Navigate to={`/projects/${idProject}`}/>
    }
  
    if(data) return (
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
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-8">
                                    <p className='text-sm text-slate-400'>Agregada el: {formatDate(data.createdAt)}</p>
                                    <p className='text-sm text-slate-400'>Última actualización: {formatDate(data.updatedAt)}</p>
                                    {data.completedByUser && (
                                        <p className='text-sm text-slate-500'>
                                            <span className=' text-sm text-slate-400'>Estado actualizado por:</span><span>{' '}</span>
                                            {data.completedByUser.name}
                                        </p>
                                    )}

                                    <Dialog.Title
                                        as="h3"
                                        className="font-bold text-colorPrimario text-2xl my-1"
                                    >{data.name}
                                    </Dialog.Title>
                                    <p className='text-lg font-normal text-gray-600'>Descripción: {data.description}</p>
                                    <div className='mt-5 space-y-3'>
                                        <label className='text-base font-semibold'>Estado</label>
                                        <select 
                                            className=' w-full p-2 text-base border border-gray-300 rounded-md'
                                            defaultValue={data.status}
                                            onChange={handleChange}
                                        >
                                            {Object.entries(statusTranslations).map(([key, value]) => (
                                                <option key={key} value={key}>{value}</option>
                                            ))}        
                                        </select>
                                    </div>
                                    <NotesPanel
                                        notes={data.notes}
                                    />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}