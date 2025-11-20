"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";


import { useLogin } from "@/entities/auth/hooks/useLogin";
import { APP_ROUTE } from "@/lib/routes/app.route";

import { RdyButton, RdyInput, useToast } from "rdy-comp";

interface Props {
    className?: string;
    label?: string;

}

export const loginFormUi: React.FC<Props> = ({ className, label }) => {
    const { register, handleSubmit, onSubmit, error, errors, isSubmitting } = useLogin()
    const { showToast } = useToast();

    useEffect(() => {
        if (error) {
            showToast({
                title: 'Что-то случилось!',
                message: error?.message || '',
                type: 'error'
            })
            console.log(error)
        }
    }, [error])


    return (
        <div className={`${className} flex items-stretch flex-col sm:flex-row overflow-hidden bg-zinc-800 rounded-lg`}>
            <form onSubmit={handleSubmit(onSubmit)} className="p-5 flex-1 grid gap-y-4 z-10">
                <div className="items-center sm:text-3xl text-xl text-white font-medium text-center" id='form-headering'>{label}</div>
                <div className="w-full grid gap-y-2 pt-5" id="form-group-1">
                    <RdyInput
                        {...register('email')}
                        label="E-mail"
                        id="email"
                        type="text"
                        error={errors.email?.message}
                        rounded="lg"
                        bordered={{
                            onBlur: 'transparent',
                            onFocus: '#353535'
                        }}
                        backgroundColor={{
                            onFocus: '#27272a',
                            onBlur: '#1e1e1fff'
                        }}
                    />
                </div>
                <div className="w-full grid gap-y-2 pt-3" id="form-group-2">
                    <RdyInput
                        {...register('password')}
                        label="Password"
                        id="password"
                        type="password"
                        error={errors.password?.message}
                        rounded="lg"
                        bordered={{
                            onBlur: 'transparent',
                            onFocus: '#353535'
                        }}
                        backgroundColor={{
                            onFocus: '#27272a',
                            onBlur: '#1e1e1fff'
                        }}
                    />
                </div>
                <div className="pt-5 w-full grid gap-y-4" id="form-group-3">
                    <button className="px-3 h-12 font-medium text-gray-500 bg-gray-100 rounded-full cursor-pointer">{isSubmitting ? "Ожидайте" : "Регистрация"}</button>
                    <Link href={String(APP_ROUTE.auth.register())} className="text-gray-400 transition-colors hover:text-white">Зарегистрироваться</Link>
                </div>
            </form>
        </div>
    );
}