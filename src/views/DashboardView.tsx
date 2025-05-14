import { getProjects } from "@/api/ProjectAPI"
import DeleteProjectModal from "@/components/projects/DeleteProjectModal"
import { useAuth } from "@/hooks/useAuth"
import { isManager } from "@/utils/policies"
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { useQuery } from "@tanstack/react-query"
import { Fragment } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"

export default function DashboardView() {

    const location = useLocation()

    const navigate = useNavigate()

    const { data: user, isLoading: authLoading } = useAuth()

    const { data, isLoading } = useQuery({
        queryKey: ['projects'], 
        queryFn: getProjects,
    })

    if (isLoading && authLoading) return 'Cargando'

    // Si tenemos información en data retorna
    if (data && user) return (
    <>
        <h1 className=" text-2xl text-colorPrimario font-bold">Mis proyectos</h1>
        <p className=" text-xl font-light text-gray-500 mt-2">Maneja y administra tus proyectos</p>
        <nav className=" my-5">
            <Link 
                className=" bg-colorPrimario hover:bg-colorSecundario py-1 px-4 text-white text-lg font-semibold cursor-pointer transition-colors rounded-md"
                to='/projects/create'
            >
            Nuevo Proyecto
            </Link>
        </nav>
        {data ? (
          <ul role="list" className="flex flex-col gap-4 border-gray-100 mt-5 mb-24">
          {data.map((project) => (
            <li 
              key={project.idProject} 
              className="flex justify-between px-5 py-5 bg-white shadow-md rounded-md"
            >
                <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto space-y-2">
                        <div className=" mb-2">
                            {isManager(project.manager, user.idUser) ? <p className=" font-bold text-xs uppercase bg-indigo-50 border-2 text-indigo-500 border-indigo-500 rounded-lg inline-block py-1 px-3">Manager</p> : <p className="font-bold text-xs uppercase bg-green-50 border-2 text-green-500 border-green-500 rounded-lg inline-block py-1 px-3">Miembro del equipo</p>}
                        </div>
                        <Link to={`/projects/${project.idProject}`}
                            className="text-gray-600 cursor-pointer hover:underline text-2xl font-bold"
                        >{project.projectName}</Link>
                        <p className="text-sm text-gray-400">
                            Cliente: {project.clientName}
                        </p>
                        <p className="text-sm text-gray-400">
                            {project.description}
                        </p>
                    </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6 ">
                    <Menu as="div" className="relative flex-none">
                        <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900 ">
                            <span className="sr-only">opciones</span>
                            <EllipsisVerticalIcon className="h-7 w-7" aria-hidden="true" />
                        </Menu.Button>
                        <Transition as={Fragment} enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95">
                            <Menu.Items
                                className="absolute right-0 z-10 mt-2 w-36 md:w-56 origin-top-right rounded-md bg-white py-2 shadow-person ring-1 ring-gray-900/5 focus:outline-none"
                            >
                                    <Menu.Item>
                                        <Link to={`/projects/${project.idProject}`}
                                            className='block px-3 py-1 text-sm leading-6 text-gray-900 font-semibold'>
                                        Ver Proyecto
                                        </Link>
                                    </Menu.Item>

                                    {project.manager === user.idUser && (
                                        <>
                                            <Menu.Item>
                                                <Link 
                                                    to={`/projects/${project.idProject}/edit`}
                                                    className='block px-3 py-1 text-sm leading-6 text-gray-900 font-semibold'>
                                                Editar Proyecto
                                                </Link>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <button 
                                                    type='button' 
                                                    className='block px-3 py-1 text-sm leading-6 text-red-500 font-semibold'
                                                    onClick={() => navigate(location.pathname + `?deleteProject=${project.idProject}`)}
                                                >
                                                Eliminar Proyecto
                                                </button>
                                            </Menu.Item>
                                        </>
                                    )}
                                    
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </li>
          ))}
          </ul>
        ) : (
          <p className=" text-center py-20">
            No hay proyectos aún {' '}
            <Link
              className=" text-colorPrimario font-bold"
              to={'/projects/create'}
            />
          </p>
        )}
        <DeleteProjectModal/>
    </>
  )
}
