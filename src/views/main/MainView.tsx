import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

export default function MainView() {

    const { isLoading } = useAuth()
    
    if(isLoading === false) return (
    <div className="relative w-full h-[88vh] bg-gradient-to-r from-colorTerciario to-colorPrimario rounded flex flex-col items-center justify-center md:flex-row gap-8 px-4 py-5 md:p-16">
      <div className="flex flex-col gap-5 justify-center md:w-1/2 text-center md:text-left">
        <p className="text-[clamp(2rem,3.75vw,3.75rem)] font-bold leading-tight">
          <span className="uppercase text-colorResaltado">Organiza</span> tu trabajo, transforma tu{" "}
          <span className="uppercase text-colorResaltado">equipo</span>.
        </p>
        <p className="text-[clamp(0.9rem,2vw,1.125rem)] text-gray-700 font-semibold">
          Taskify es la forma más simple y poderosa de gestionar proyectos, tareas y equipos en un solo lugar.
          Mantén el control, colabora en tiempo real y lleva tus ideas del caos a la acción.
        </p>
        <div>
          <Link
            to="/auth/login"
            className="text-[clamp(0.9rem,2vw,1rem)] inline-block py-2 px-6 bg-white rounded font-bold text-gray-800 hover:text-colorPrimario hover:scale-95 hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            Regístrate ahora
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center md:w-1/2">
        <img
          className="w-full max-w-[200px] md:max-w-[500px] h-auto object-contain"
          src="/image.webp"
          alt="Taskify"
        />
      </div>
    </div>
  );
}