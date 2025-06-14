import { getProjectTeam, removeUserFromProject } from "@/api/TeamAPI";
import AddMemberModal from "@/components/team/AddMemberModal";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Fragment } from 'react';
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProjectTeamView() {

    const navigate = useNavigate()

    const params = useParams()

    const queryClient = useQueryClient()

    const idProject = +params.idProject!
    
    const { data, isLoading, isError} = useQuery({
        queryKey: ['projectTeam', idProject],
        queryFn: () => getProjectTeam(idProject),
        retry: false
    })

    const {mutate} = useMutation({
        mutationFn: removeUserFromProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['projectTeam', idProject]})
        }
    })

    if(isLoading) return 'Cargando'
    if(isError) return <Navigate to={'/404'}/>


   if(data) return (
    <>
        <h1 className=" text-2xl text-colorPrimario font-bold">Administrar equipo</h1>
            <p className=" text-xl font-light text-gray-500 mt-2">Administra el equipo de trabajo para este proyecto</p>
            <nav className=" my-5 flex gap-3">
                <button
                    className="  bg-colorPrimario hover:bg-colorSecundario py-1 px-4 text-white text font-semibold cursor-pointer transition-colors rounded"  
                    onClick={() => navigate(location.pathname+'?addMember=true')}   //Agregamos a la url el estado del modal          
                >
                    Agregar Colaborador
                </button>
                <Link
                    className="  bg-colorPrimario hover:bg-colorSecundario py-1 px-4 text-white text font-semibold cursor-pointer transition-colors rounded"
                    to={`/projects/${idProject}`}
                >
                    Volver a proyecto
                </Link>
            </nav>
            <h2 className="text-2xl text-colorPrimario font-bold">Miembros actuales</h2>
            {data.length ? (
                <ul role="list" className="flex flex-col gap-4 border-gray-100 mt-5 mb-24">
                    {data?.map((member) => (
                        <li key={member.idUser} className="flex justify-between px-5 py-5 bg-white shadow-md rounded-md">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto space-y-2">
                                    <p className="text-gray-600 cursor-pointer hover:underline text-2xl font-bold">
                                        {member.name}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                       {member.email}
                                    </p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-6">
                                <Menu as="div" className="relative flex-none">
                                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                            <span className="sr-only">opciones</span>
                                            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
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
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-person ring-1 ring-gray-900/5 focus:outline-none">
                                            <Menu.Item>
                                                <button
                                                    type='button'
                                                    className='block px-3 py-1 text-sm leading-6 text-red-500 font-semibold'
                                                    onClick={() => mutate({idProject, idUser : member.idUser})}
                                                >
                                                    Eliminar del Proyecto
                                                </button>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-center py-20'>No hay miembros en este equipo</p>
            )}
            <AddMemberModal/>
    </>
  )
}
