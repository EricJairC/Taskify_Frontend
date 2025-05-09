import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RequestConfirmationCodeForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from '@tanstack/react-query'
import { RequestConfirmationCode } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RequestNewCodeView() {
    const initialValues: RequestConfirmationCodeForm = {
        email: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: RequestConfirmationCode,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
        }
    })

    const handleRequestCode = (formData: RequestConfirmationCodeForm) => {
        mutate(formData)
    }

    return (
        <>
            <div className="flex flex-col bg-white px-3 py-6 items-center rounded-lg shadow-md">
                <h1 className="font-bold text-colorPrimario text-2xl mb-1">Solicitar Código de Confirmación</h1>
                <p className="font-light text-lg mb-3">
                    Coloca tu e-mail para recibir {''}
                    <span className=" text-colorPrimario font-bold"> un nuevo código</span>
                </p>
        
                <form
                    onSubmit={handleSubmit(handleRequestCode)}
                    className="space-y-4 w-full px-4"
                    noValidate
                >
                    <div className="flex flex-col gap-2">
                        <label
                            className="text-base font-semibold"
                            htmlFor="email"
                        >Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email de Registro"
                            className="w-full p-2 text-sm border border-gray-300 rounded-md"
                            {...register("email", {
                                required: "El Email de registro es obligatorio",
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
                        value='Enviar Código'
                        className="bg-colorPrimario hover:bg-colorSecundario w-full py-1 px-4 text-white font-semibold cursor-pointer transition-colors rounded text-center"
                    />
                </form>
                    
                <nav className=" mt-5 flex flex-col space-y-1">
                    <Link
                    to="/"
                    className="text-center text-gray-500 font-normal"
                    >
                    Volver al <span className=" text-colorPrimario font-semibold">Inicio</span>
                    </Link>
                </nav>
            </div>
        </>
    )
}