"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { RdyInput, useToast } from "rdy-comp";
import Link from "next/link";

import { useRegister } from "@/entities/auth/hooks/useRegister";

import LoginBg from "../../../../public/static/gradient.png";

interface Props {
    className?: string;
    loginUrl?: string;
    label?: string;

}

export const RegisterFormUi: React.FC<Props> = ({ className, loginUrl, label = 'Заголовок' }) => {
    const { register, handleSubmit, onSubmit, error, errors, isSubmitting } = useRegister()
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
            <form onSubmit={handleSubmit(onSubmit)} className="p-5 flex-1 grid gap-y-3">
                <div className="items-center sm:text-3xl text-xl text-white font-medium text-center" id='form-headering'>{label}</div>
                <div className="w-full grid gap-y-2 pt-5" id="form-group-1">
                    <RdyInput
                        {...register('name')}
                        label="Name"
                        id="name"
                        type="text"
                        error={errors.name?.message}
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
                        {...register('phone')}
                        label="Phone"
                        id="phone"
                        type="text"
                        error={errors.phone?.message}
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
                <div className="w-full grid gap-y-2 pt-3" id="form-group-3">
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
                <div className="w-full grid gap-y-2 pt-3" id="form-group-4">
                    <RdyInput
                        {...register('confirmPassword')}
                        label="Confirm Password"
                        id="confirmPassword"
                        type="password"
                        error={errors.confirmPassword?.message}
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
                <div className="pt-5 w-full grid gap-y-4" id="form-group-4">
                    <button className="px-3 h-12 font-medium text-gray-500 bg-gray-100 rounded-full cursor-pointer">{isSubmitting ? "Ожидайте" : "Регистрация"}</button>
                    <Link href={String(loginUrl)} className="text-gray-400 transition-colors hover:text-white">Войти</Link>
                </div>
            </form>
        </div>
    );
}