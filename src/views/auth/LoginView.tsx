import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query'
import { authenticateUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {

  const navigate = useNavigate()

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      navigate('/')
    }
  })

  const handleLogin = (formData: UserLoginForm) => { 
    mutate(formData)
  }

  return (
    <>
      <div className=" flex flex-col bg-white px-3 py-6 items-center rounded-lg shadow-md">
        <h1 className="font-bold text-colorPrimario text-2xl mb-1">Inicio de sesión</h1>
        
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="space-y-4 w-full px-4"
          noValidate
        >
          <div className="flex flex-col gap-2">
            <label
              className="text-base font-semibold"
            >Email</label>

            <input
              id="email"
              type="email"
              placeholder="Ej. juan@gmail.com"
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
              {...register("email", {
                required: "El Email es obligatorio",
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
            >Password</label>

            <input
              type="password"
              placeholder="********"
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
              {...register("password", {
                required: "El Password es obligatorio",
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            value='Iniciar Sesión'
            className="bg-colorPrimario hover:bg-colorSecundario w-full py-1 px-4 text-white font-semibold cursor-pointer transition-colors rounded text-center"
          />
          <nav className=" flex flex-col space-y-1">
            <Link
              to={'/auth/register'}
              className=" text-center text-gray-500 font-normal"
            >¿No tienes cuenta? <span className=" text-colorPrimario font-semibold">Crea una</span>
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
        </form>
      </div>
    </>
  )
}