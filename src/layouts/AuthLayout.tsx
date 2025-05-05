import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export default function AuthLayout() {
  return (
    <>
        <div className=' bg-gray-200 min-h-screen flex w-full h-full items-center justify-center'>
            <div className=' w-[450px]'>
                <div className=' mx-4'>
                    <Outlet/>
                </div>
            </div>

        </div>
        <ToastContainer
            pauseOnHover={false}
            pauseOnFocusLoss={false}
        />
    </>
  )
}
