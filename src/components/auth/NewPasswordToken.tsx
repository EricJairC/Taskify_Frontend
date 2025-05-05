import { validateToken } from '@/api/AuthAPI';
import { ConfirmToken } from '@/types/index';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { useMutation } from '@tanstack/react-query';
import { Dispatch } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

type NewPasswordTokenProps = {
    token: ConfirmToken['token'],
    setToken: Dispatch<React.SetStateAction<string>>,
    setIsValidToken: Dispatch<React.SetStateAction<boolean>>
}

export default function NewPasswordToken({token, setToken, setIsValidToken} : NewPasswordTokenProps) {

    const { reset } = useForm();
    

    const { mutate } = useMutation({
        mutationFn: validateToken,
        onError: (error) =>{
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            setIsValidToken(true)
        }
    })

    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token)
    }

    const handleComplete = (token: ConfirmToken['token']) => {
        mutate({token})
        reset()
    }

    return (
        <>
            <form
                className="space-y-4 w-full px-4"
            >
                <div className="flex justify-center gap-3">
                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                    </PinInput>
                </div>
            </form>
            <nav className="mt-5 flex flex-col space-y-1">
                <Link
                    to='/auth/forgot-password'
                    className="text-center text-gray-500 font-normal"
                >
                    Solicitar un <span className=" text-colorPrimario font-semibold">nuevo código</span>
                </Link>
            </nav>
        </>
    )
}