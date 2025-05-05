import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { Project, ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";

type EditProjectFormProps = {
    data: ProjectFormData,
    idProject: Project['idProject']
}

export default function EditProjectForm({data, idProject} : EditProjectFormProps) {

    // Navigate
    const navigate = useNavigate()

    // Definimos el estado de editar
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description
    }})

    // Invalida la consulta previa para mantener actualizado el estado
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            // Forzamos a realizar una nueva consulta para actualizar el estado
            queryClient.invalidateQueries({queryKey: ['projects']})
            queryClient.invalidateQueries({queryKey: ['editProject', idProject]})
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (formData : ProjectFormData) => {
        const data = {
            formData,
            idProject
        }
        mutate(data)
    }

    return (
        <>
            <div className=" max-w-3xl mx-auto flex flex-col">
                <div>
                    <h1 className=" text-2xl text-colorPrimario font-bold">Editar Proyecto</h1>
                    <p className=" text-xl font-light text-gray-500 mt-2">Llena el siguiente formulario para editar un proyecto</p>
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
                        value="Guardar Cambios"
                        className=" bg-colorPrimario hover:bg-colorSecundario w-full py-1 px-4 text-white font-semibold cursor-pointer transition-colors rounded" 
                    />
                </form>
            </div>
        </>
    )
}
