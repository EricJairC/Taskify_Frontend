import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/ErrorMessage"
import { User, UserProfileForm } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "@/api/ProfileAPI"
import { toast } from "react-toastify"

type ProfileFormProps = {
    data: User
}

export default function ProfileForm({ data } : ProfileFormProps) {

    const { register, handleSubmit, formState: { errors } } = useForm<UserProfileForm>({ defaultValues: data })

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['user']})
        }
    })

    const handleEditProfile = (formData : UserProfileForm) => {
        mutate(formData)
    }

    return (
        <>
            <div className="mx-auto max-w-3xl">
                <h1 className="font-bold text-colorPrimario text-2xl mb-1">Mi Perfil</h1>
                <p className="text-xl font-light text-gray-500 mt-2 mb-5">Aquí puedes actualizar tu información</p>

                <form
                    onSubmit={handleSubmit(handleEditProfile)}
                    className=" bg-white shadow-lg p-5 rounded-md w-full"
                    noValidate
                >
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-base font-semibold"
                            htmlFor="name"
                        >Nombre</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Tu Nombre"
                            className="w-full p-2 text-base border border-gray-300 rounded-md"
                            {...register("name", {
                                required: "Nombre de usuario es obligatoro",
                            })}
                        />
                        {errors.name && (
                            <ErrorMessage>{errors.name.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="mb-5 space-y-3">
                        <label
                            className="text-base font-semibold"
                            htmlFor="password"
                        >E-mail</label>
                        <input
                            id="text"
                            type="email"
                            placeholder="Tu Email"
                            className="w-full p-2 text-base border border-gray-300 rounded-md"
                            {...register("email", {
                                required: "EL e-mail es obligatorio",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "E-mail no válido",
                                },
                            })}
                        />
                        {errors.email && (
                            <ErrorMessage>{errors.email.message}</ErrorMessage>
                        )}
                    </div>
                    <input
                        type="submit"
                        value='Guardar cambios'
                        className="bg-colorPrimario hover:bg-colorSecundario w-full py-1 px-4 text-white font-semibold cursor-pointer transition-colors rounded text-center"
                    />
                </form>
            </div>
        </>
    )
}