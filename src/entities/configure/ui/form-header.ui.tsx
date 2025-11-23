"use client"

import { RdyButton, RdyInput } from "rdy-comp"
import { Controller } from "react-hook-form"
import { useCreateConfigure } from "../hooks/useCreateConfigure"

export const ConfigureHeaderForm = () => {
    const { register, handleSubmit, onSubmit, errors, control } = useCreateConfigure();

    return (
        <div className="">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <Controller
                        name="name"
                        control={control}
                        defaultValue={''}
                        render={({ field }) => (
                            <RdyInput
                                {...field}
                                id="name"
                                label="Название"
                                error={errors.name?.message}
                                rounded="2xl"
                                className="border-0! bg-(--card-hover)! text-(--text-secondary)"
                                backgroundColor={{
                                    onBlur: '#3f3f47',
                                    onFocus: '#52525c',
                                }}
                                labelColor={{
                                    onBlur: '#6a7282',
                                    onFocus: '#99a1af',
                                }}
                            />
                        )}
                    />
                </div>
                <RdyButton className="bg-(--accent)! text-(--text)! w-full">Создать конфигурацию</RdyButton>
            </form>
        </div>
    )
}