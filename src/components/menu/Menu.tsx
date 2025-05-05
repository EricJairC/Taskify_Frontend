import { useAuth } from "@/hooks/useAuth";
import { ArrowLeftEndOnRectangleIcon, ArrowLeftStartOnRectangleIcon, Bars3Icon, UserIcon, WalletIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Menu() {
    const navigate = useNavigate()

    const queryClient = useQueryClient()

    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN')
        queryClient.invalidateQueries({ queryKey: ['user'] })
        queryClient.removeQueries({ queryKey: ['user'] })
        navigate('/auth/login')
    }

    const { data, isLoading } = useAuth()

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

    if(isLoading === false) return (
        <>
            <header className="w-full flex justify-center mt-6 z-30 relative">
                <div className="w-11/12 md:w-10/12 lg:w-9/12 flex justify-between items-center">
                    <Link to="/" className="text-colorPrimario font-bold text-2xl">
                        Taskify
                    </Link>
                    <nav className="hidden md:flex space-x-8 items-center">
                    {data !== undefined ? (
                        <>
                        <Link className="font-semibold text-gray-800 hover:text-colorPrimario" to="/profile">
                            Mi Perfil
                        </Link>
                        <Link className="font-semibold text-gray-800 hover:text-colorPrimario cursor-pointer" to="/">
                            Mis proyectos
                        </Link>
                            
                        <span
                            className="font-semibold text-gray-800 hover:text-colorPrimario cursor-pointer"
                            onClick={logout}
                        >
                            Cerrar Sesión
                        </span>
                        </>
                    ) : (
                        <Link
                            className="py-1 px-4 bg-colorPrimario rounded text-white font-bold hover:bg-colorSecundario transition-colors"
                            to="/auth/login"
                        >
                            Login
                        </Link>
                    )}
                        
                        
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
                    {logout &&
                        <>
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

                                    className=' text-button rounded-md text-base font-normal text-black hover:text-white px-2'
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

                                    className=' text-button rounded-md text-base font-normal text-black hover:text-white px-2'
                                >
                                    Mi perfil
                                </div>
                            </Link>

                            <div
                                className=' shadow-person flex flex-row items-center container-button rounded-lg cursor-pointer'
                                onClick={() => {
                                    logout?.();
                                    toggleMenu();
                                }}
                            >
                                <button className='shadow-p p-3 flex justify-center items-center rounded-lg button-icon'>
                                    <ArrowLeftStartOnRectangleIcon
                                        className=' font-bold icon h-5 w-5 text-colorPrimario'
                                    />
                                </button>
                                <div

                                    className=' text-button rounded-md text-base font-normal text-black hover:text-white px-2'
                                >
                                    Cerrar Sesión
                                </div>
                            </div>
                        </>
                    }
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

                            className=' text-button rounded-md text-base font-normal text-black hover:text-white px-2'
                        >
                            Login
                        </div>
                    </Link>
                </nav>
            </div>
        </>
    )
}
