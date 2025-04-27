'use client'

import { Button } from "@/components/ui/buttons/Button"
import { Field } from "@/components/ui/fields/Fields"
import { Heading } from "@/components/ui/Heading"
import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import { authService } from "@/services/auth.service"
import { IAuthForm } from "@/types/auth.types"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


export function Auth() {
 
    const [isLoginForm, setIsLoginForm] = useState(false)

    const { push } = useRouter()

    const { mutate } = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data: IAuthForm) => authService.main(isLoginForm ? 'login' :
            'register', data),
        onSuccess() {
            toast("Successfully login!", {
                style: {
                  backgroundColor: 'green',
                  
                },
                duration: 5000, // Duration in milliseconds (5000ms = 5 seconds)
              });
            reset()        
            push(DASHBOARD_PAGES.HOME)
        },

        onError(error) {

            toast(error.message, {
                style: {
                  backgroundColor: 'red',
                  
                },
                duration: 5000, // Duration in milliseconds (5000ms = 5 seconds)
              });
            }
            
        }

    )
    const onSubmit: SubmitHandler<IAuthForm> = data => {
        mutate(data)
    }
    const userSchema = z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters long"),
    });
    
  
    const {
        register,
        handleSubmit,
        reset, // Import reset method from react-hook-form
        formState: { errors },   //formState: {
                                //     isDirty: false,
                                //     isValid: true,
                                //     errors: { /* error details */ },
                                //   }
      } = useForm<IAuthForm>({
        resolver: zodResolver(userSchema),
      });
    return (
        <div className='flex min-h-screen'>
            <form
                className='w-1/4 m-auto shadow bg-sidebar rounded-xl p-layout '
                onSubmit={handleSubmit(onSubmit)}
            >
                <Heading title='Auth' />

                <Field
                    id="email"
                    label="Email"
                    placeholder="Enter email:"
                    type="email"
                    extra='mb-4'                   
                    {...register("email")}
                    error={errors.email}                    
                />

                <Field
                    id="password"
                    label="Password"
                    placeholder="Enter password:"
                    type="password"
                    extra='mb-6'
                    {...register("password")}
                    error={errors.password}                        
                />

                <div className="flex items-center gap-5 justify-center">
                    <Button onClick={()=> setIsLoginForm(true)}>Login</Button>
                    <Button onClick={()=> setIsLoginForm(false)}>Register</Button>
                </div>
            </form>
        </div>
    )
}