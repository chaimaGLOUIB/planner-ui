'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Heading } from '@/components/ui/Heading'
import Loader from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Fields'

import { IAuthForm } from '@/types/auth.types'


import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { authService } from '@/services/auth.service'

const FullScreenLoader = () => (
	<div className='fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center'>
		<div className='w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
	</div>
)

export function Auth() {
	const [isLoginForm, setIsLoginForm] = useState(false)

	const { push } = useRouter()

	const { mutate, isPending } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) =>
			authService.main(isLoginForm ? 'login' : 'register', data),
		onSuccess() {
			toast('Successfully login!', {
				style: {
					backgroundColor: 'green'
				},
				duration: 5000 // Duration in milliseconds (5000ms = 5 seconds)
			})
			reset()
			push(DASHBOARD_PAGES.HOME)
		},

		onError(error: unknown) {
			const isAxiosError = axios.isAxiosError(error)

			const isNetworkError = isAxiosError && !error.response

			const isServerError =
				isAxiosError && error.response && error.response.status >= 500

			const isServerNotReady = isNetworkError || isServerError

			const errorMessage = isServerNotReady
				? 'Waking up the server… this may take up to one minute.'
				: isAxiosError
					? error.message
					: 'Something went wrong'

			toast(errorMessage, {
				style: {
					backgroundColor: 'red'
				},
				duration: 5000
			})

			if (isServerNotReady) {
				setTimeout(() => {
					toast('Server is ready. Please try logging in again.', {
						style: {
							backgroundColor: 'red'
						},
						duration: 5000
					})
				}, 120000)
			}
		}
	})
	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data)
	}
	const userSchema = z.object({
		email: z.string().email('Invalid email address'),
		password: z.string().min(8, 'Password must be at least 8 characters long')
	})

	const {
		register,
		handleSubmit,
		reset, // Import reset method from react-hook-form
		formState: { errors } //formState: {
		//     isDirty: false,
		//     isValid: true,
		//     errors: { /* error details */ },
		//   }
	} = useForm<IAuthForm>({
		resolver: zodResolver(userSchema)
	})

	return (
		<div className='flex min-h-screen relative'>
			{isPending && <FullScreenLoader />}

			<form
				className='w-1/4 m-auto shadow bg-sidebar rounded-xl p-layout'
				onSubmit={handleSubmit(onSubmit)}
			>
				<Heading title='Auth' />

				<Field
					id='email'
					label='Email'
					placeholder='Enter email:'
					type='email'
					extra='mb-4'
					{...register('email')}
					error={errors.email}
					info='chaimaaglouib@gmail.com'
				/>

				<Field
					id='password'
					label='Password'
					placeholder='Enter password:'
					type='password'
					extra='mb-6'
					{...register('password')}
					error={errors.password}
					info='12345678'
				/>

				<div className='flex items-center gap-5 justify-center'>
					<Button onClick={() => setIsLoginForm(true)}>Login</Button>
					<Button onClick={() => setIsLoginForm(false)}>Register</Button>
				</div>
			</form>
		</div>
	)
}
