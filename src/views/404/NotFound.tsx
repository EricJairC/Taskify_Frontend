import { Link } from "react-router-dom";


export default function NotFound() {
  return (
    <>
        <h1 className=" font-black text-center text-4xl text-colorPrimario">Página no encontrada</h1>
        <p className=" mt-10 text-center">
            Tal vez quieras volver a {' '}
            <Link className=" text-colorPrimario font-bold" to={'/'}>
                Proyectos
            </Link>
        </p>
    </>
  )
}
