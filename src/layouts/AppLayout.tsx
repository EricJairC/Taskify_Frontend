import Menu from '@/components/menu/Menu'
import Spinner from '@/components/spinner/Spinner'
import { useAuth } from '@/hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AppLayout() {

    const { data, isError, isLoading } = useAuth()

    if (isLoading) return <Spinner/>
    if (isError) {
        return <Navigate to='/main' />
    }

    if (data) return (
        <>
            <div className="w-full flex flex-col items-center">
                <Menu/>
                <section className="mt-3 sm:mt-5 w-full flex justify-center">
                    <div className="w-11/12 md:w-10/12 lg:w-9/12 lg:min-w-[750px]">
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
