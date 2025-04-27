'use client'

import { TypeUserForm } from '@/types/auth.types'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import useInitialData from './useInitialData'
import { useUpdateSettings } from './useUpdateSettings'
import { Field } from '@/components/ui/fields/Fields'
import { Button } from '@/components/ui/buttons/Button'

const Settings = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<TypeUserForm>({
        mode: 'onChange'
    })

    useInitialData(reset)

    const { isPending, mutate } = useUpdateSettings()

    const onSubmit: SubmitHandler<TypeUserForm> = data => {
        const { password, ...rest } = data

        mutate({
            ...rest,
            password: password || undefined
        })
    }
    return (
        <div>
            <form
                className='w-2/4'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='grid grid-cols-2 gap-10'>
                    <div>
                        <Field
                            id='email'
                            label='Email'
                            placeholder='Enter email: '
                            type='email'
                            {...register('email', {
                                required: 'Email is required!'
                            })}
                            extra='mb-4'
                            error={errors.email}                    


                        />
                       

                        <Field
                            id='name'
                            label='Name'
                            placeholder='Enter name: '
                            {...register('name')}
                            extra='mb-4'
                            error={errors.name}                    

                        />

                        <Field
                            id='password'
                            label='Password'
                            placeholder='Enter password: '
                            type='password'
                            {...register('password')}
                            extra='mb-10'
                            error={errors.password}                    

                        />
                    </div>
                    <div>
                        <Field
                            id='workInterval'
                            label='Work interval (min.): '
                            placeholder='Enter Work interval (min.): '
                            isNumber
                            {...register('workInterval', {
                                valueAsNumber: true
                            })}
                            extra='mb-4'
                            error={errors.workInterval}                    

                        />


                        <Field
                            id='breakInterval'
                            label='Break interval (min.): '
                            placeholder='Enter break interval (min.): '
                            isNumber
                            {...register('breakInterval', {
                                valueAsNumber: true
                            })}
                            extra='mb-4'
                            error={errors.breakInterval}                    

                        />

                        <Field
                            id='intervalsCount'
                            label='Intervals count (max 10): '
                            placeholder='Enter intervals count (max 10.): '
                            isNumber
                            {...register('intervalsCount', {
                                valueAsNumber: true
                            })}
                            extra='mb-6'
                            error={errors.intervalsCount}                    

                        />
                    </div>
                </div>
                <Button type='submit'
                    disabled={isPending}
                >
                    Save
                </Button>
            </form>
        </div>
    )
}

export default Settings
