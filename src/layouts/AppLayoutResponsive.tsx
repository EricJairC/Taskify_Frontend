import Spinner from '@/components/spinner/Spinner'
import { useAuth } from '@/hooks/useAuth'
import { ArrowLeftEndOnRectangleIcon, ArrowLeftStartOnRectangleIcon, Bars3Icon, UserIcon, WalletIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AppLayoutResponsive() {

    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const queryClient = useQueryClient()

    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN')
        queryClient.invalidateQueries({ queryKey: ['user'] })
    }

    const { data, isError, isLoading } = useAuth()

    if (isLoading) return <Spinner/>
    if (isError) {
        return <Navigate to='/auth/login' />
    }

    if (data) return (
        <>
            <div className="w-full flex flex-col items-center">
                <header className="w-full flex justify-center mt-6 z-30 relative">
                    <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:10/12 flex justify-between items-center">
                        <Link to="/" className="text-colorPrimario font-bold text-2xl">
                            Taskify
                        </Link>
                        <nav className="hidden md:flex space-x-8 items-center">
                            <Link className="font-semibold text-gray-800 hover:text-colorPrimario" to="/profile">
                                Mi Perfil
                            </Link>
                            <span className="font-semibold text-gray-800 hover:text-colorPrimario cursor-pointer">
                                Mis proyectos
                            </span>
                            <span
                                className="font-semibold text-gray-800 hover:text-colorPrimario cursor-pointer"
                                onClick={logout}
                            >
                                Cerrar Sesión
                            </span>
                            <Link
                                className="py-1 px-4 bg-colorPrimario rounded text-white font-bold hover:bg-colorSecundario transition-colors"
                                to="/auth/login"
                            >
                                Login
                            </Link>
                        </nav>
                        <div className="md:hidden flex items-center">
                            <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
                                <Bars3Icon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </header>
                <div
                    onClick={toggleMenu}
                    className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                        }`}
                ></div>
                <div
                    className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col p-4 transform transition-transform duration-300 ease-in-out
                    ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-colorPrimario font-bold text-2xl">Taskify</h2>
                        <button onClick={toggleMenu}>
                            <XMarkIcon className="h-6 w-6 text-gray-800" />
                        </button>
                    </div>
                    <nav className="flex flex-col space-y-3">

                        <Link
                            to="/"
                            className=' shadow-person flex flex-row items-center container-button rounded-lg'
                            onClick={toggleMenu}
                        >
                            <button className='shadow-p p-3 flex justify-center items-center rounded-lg button-icon'>
                                <WalletIcon
                                    className=' font-bold icon h-5 w-5 text-colorPrimario'
                                />
                            </button>
                            <div

                                className=' text-button rounded-md text-base font-medium text-black hover:text-white px-2'
                            >
                                Mis proyectos
                            </div>
                        </Link>
                        <Link
                            to="/profile"
                            className=' shadow-person flex flex-row items-center container-button rounded-lg'
                            onClick={toggleMenu}
                        >
                            <button className='shadow-p p-3 flex justify-center items-center rounded-lg button-icon'>
                                <UserIcon
                                    className=' font-bold icon h-5 w-5 text-colorPrimario'
                                />
                            </button>
                            <div

                                className=' text-button rounded-md text-base font-medium text-black hover:text-white px-2'
                            >
                                Mi perfil
                            </div>
                        </Link>

                        <div
                            className=' shadow-person flex flex-row items-center container-button rounded-lg cursor-pointer'
                            onClick={() => {
                                logout();
                                toggleMenu();
                            }}
                        >
                            <button className='shadow-p p-3 flex justify-center items-center rounded-lg button-icon'>
                                <ArrowLeftStartOnRectangleIcon
                                    className=' font-bold icon h-5 w-5 text-colorPrimario'
                                />
                            </button>
                            <div

                                className=' text-button rounded-md text-base font-medium text-black hover:text-white px-2'
                            >
                                Cerrar Sesión
                            </div>
                        </div>

                        <Link
                            to="/auth/login"
                            className=' shadow-person flex flex-row items-center container-button rounded-lg'
                            onClick={toggleMenu}
                        >
                            <button className='shadow-p p-3 flex justify-center items-center rounded-lg button-icon'>
                                <ArrowLeftEndOnRectangleIcon
                                    className=' font-bold icon h-5 w-5 text-colorPrimario'
                                />
                            </button>
                            <div

                                className=' text-button rounded-md text-base font-medium text-black hover:text-white px-2'
                            >
                                Login
                            </div>
                        </Link>
                    </nav>
                </div>
                <section className="mt-3 sm:mt-5 w-full flex justify-center">
                    <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:10/12 lg:min-w-[750px]">
                        <Outlet />
                    </div>
                </section>
            </div>
            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}
