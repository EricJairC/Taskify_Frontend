import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectAPI";
import { toast } from 'react-toastify'

export default function CreateProjectView() {

    // Navigate
    const navigate = useNavigate()

    // Definimos los valores iniciales del formulario
    const initialValues : ProjectFormData = {
        projectName: "",
        clientName: "",
        description: ""
    }

    // Construimos el hook para el formulario
    const { register, handleSubmit, formState: {errors} } = useForm({defaultValues: initialValues})

    // Utilizamos mutate porque vamos a crear un proyecto
    const {mutate} = useMutation({
        mutationFn: createProject, // Ejecutamos createProject
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => { // Toma data en caso de ser valido
            toast.success(data)
            navigate('/')
        }
    })

    // Obtenemos la información del formulario y llamamos a mutate
    const handleForm = async (formData : ProjectFormData) => {
        mutate(formData)
    }

  return (
    <>
        <div className=" max-w-3xl mx-auto flex flex-col">
            <div>
                <h1 className=" text-2xl text-colorPrimario font-bold">Crear Proyecto</h1>
                <p className=" text-xl font-light text-gray-500 mt-2">Llena el siguiente formulario para crear un proyecto</p>
                <nav className=" flex my-5">
                    <Link 
                        className=" bg-colorPrimario hover:bg-colorSecundario py-1 px-4 text-white text font-semibold cursor-pointer transition-colors rounded"
                        to='/'
                    >
                    Volver a Proyectos
                    </Link>
                </nav>
            </div>
            <form 
                className=" bg-white shadow-lg p-5 rounded-md w-full"
                onSubmit={handleSubmit(handleForm)}
                noValidate
            >
                <ProjectForm
                    register={register}
                    errors={errors}
                />
                <input type="submit"
                    value="Crear Proyecto"
                    className=" bg-colorPrimario hover:bg-colorSecundario w-full py-1 px-4 text-white font-semibold cursor-pointer transition-colors rounded" 
                />
            </form>
        </div>
    </>
  )
}
