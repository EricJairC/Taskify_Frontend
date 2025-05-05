import Menu from "@/components/menu/Menu";
import { Outlet } from "react-router-dom";


export default function MainLayout() {
    
  return (
    <>
        <div className="w-full flex flex-col items-center">
            <Menu/>
            <section className="mt-3 sm:mt-5 w-full flex justify-center">
                <div className="w-11/12 md:w-10/12 lg:w-9/12 lg:min-w-[750px]">
                    <Outlet />
                </div>
            </section>
        </div>
        
    </>
  )
}
