import { createAcount } from "@/api/AuthAPI";
import ErrorMessage from "@/components/ErrorMessage";
import { UserRegistrationForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function RegisterView() {

  const initialValues: UserRegistrationForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  // Utilizamos mutate porque vamos a crear un proyecto
  const { mutate } = useMutation({
    mutationFn: createAcount,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
    }
  })

  const password = watch('password');

  const handleRegister = (formData: UserRegistrationForm) => {
    mutate(formData)
  }

  return (
    <>
      <div className="flex flex-col bg-white px-3 py-6 items-center rounded-lg shadow-md">
        <h1 className="font-bold text-colorPrimario text-2xl mb-1">Crear Cuenta</h1>
        <form
          onSubmit={handleSubmit(handleRegister)}
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

          <div className="flex flex-col gap-2">
            <label
              className="text-base font-semibold"
            >Nombre</label>
            <input
              type="name"
              placeholder="Nombre de Registro"
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
              {...register("name", {
                required: "El Nombre de usuario es obligatorio",
              })}
            />
            {errors.name && (
              <ErrorMessage>{errors.name.message}</ErrorMessage>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-base font-semibold"
            >Password</label>

            <input
              type="password"
              placeholder="Password de Registro"
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
              {...register("password", {
                required: "El Password es obligatorio",
                minLength: {
                  value: 8,
                  message: 'El Password debe ser mínimo de 8 caracteres'
                }
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-base font-semibold"
            >Repetir Password</label>

            <input
              id="password_confirmation"
              type="password"
              placeholder="Repite Password de Registro"
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
              {...register("password_confirmation", {
                required: "Repetir Password es obligatorio",
                validate: value => value === password || 'Los Passwords no son iguales'
              })}
            />

            {errors.password_confirmation && (
              <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            value='Registrarme'
            className="bg-colorPrimario hover:bg-colorSecundario w-full py-1 px-4 text-white font-semibold cursor-pointer transition-colors rounded text-center"
          />
        </form>
        <nav className=" mt-5 flex flex-col space-y-1">
            <Link
              to={'/auth/login'}
              className=" text-center text-gray-500 font-normal"
            >¿Ya tienes cuenta? <span className=" text-colorPrimario font-semibold">Iniciar sesión</span>
            </Link>
            <Link
              to={'/auth/forgot-password'}
              className=" text-center text-gray-500 font-normal"
            >¿Olvidaste tu contraseña? <span className=" text-colorPrimario font-semibold">Reestablecer</span>
            </Link>
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