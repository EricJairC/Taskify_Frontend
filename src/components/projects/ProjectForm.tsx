import { FieldErrors, UseFormRegister } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage';
import { ProjectFormData } from 'types';

type ProjectFormProps = {
    register: UseFormRegister<ProjectFormData>
    errors: FieldErrors<ProjectFormData>
}

export default function ProjectForm({ errors, register }: ProjectFormProps) {
    return (
        <>
            <div className="mb-3 space-y-2">
                <label htmlFor="projectName" className="text-base font-semibold">
                    Nombre del proyecto
                </label>
                <input
                    id="projectName"
                    className="w-full p-2 text-base border border-gray-200 rounded-md"
                    type="text"
                    placeholder="Ej. Ecommerce"
                    {...register("projectName", {
                        required: "El Titulo del Proyecto es obligatorio",
                    })}
                />

                {errors.projectName && (
                    <ErrorMessage>{errors.projectName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-3 space-y-2">
                <label htmlFor="clientName" className="text-base font-semibold">
                    Nombre del cliente
                </label>
                <input
                    id="clientName"
                    className="w-full p-2 text-base border border-gray-200 rounded-md"
                    type="text"
                    placeholder="Ej. Bancomer"
                    {...register("clientName", {
                        required: "El Nombre del Cliente es obligatorio",
                    })}
                />

                {errors.clientName && (
                    <ErrorMessage>{errors.clientName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-3 space-y-2">
                <label htmlFor="description" className="text-base font-semibold">
                    Descripción
                </label>
                <textarea
                    id="description"
                    className="w-full p-2 text-base border border-gray-200 rounded-md"
                    placeholder="Ej. Ecommerce con react y nodejs"
                    {...register("description", {
                        required: "Una descripción del proyecto es obligatoria"
                    })}
                />

                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}
