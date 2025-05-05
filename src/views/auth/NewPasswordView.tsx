import NewPasswordToken from "@/components/auth/NewPasswordToken"
import NewPasswordForm from "@/components/auth/NewPasswordForm"
import { useState } from "react"
import { ConfirmToken } from "@/types/index"

export default function NewPasswordView() {

  const [token, setToken] = useState<ConfirmToken['token']>('')

  const [isValidToken, setIsValidToken] = useState(false)

  return (
    <>
      <div className=" flex flex-col bg-white px-3 py-6 items-center rounded-lg shadow-md">
        <h1 className="font-bold text-colorPrimario text-2xl mb-1">Reestablecer password</h1>
        {!isValidToken ?
          <div>
            <p className="font-light text-lg mb-3">
              Ingresa el código que recibiste {''}
              <span className=" text-colorPrimario font-bold"> por email</span>
            </p> 
            <NewPasswordToken 
              token={token}
              setToken={setToken}
              setIsValidToken={setIsValidToken}
            /> 
          </div>
          :
          <NewPasswordForm
            token={token}
        />}
        </div>
    </>
  )
}
