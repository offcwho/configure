'use client'

import { LoginForm } from "@/entities/auth";
import { Container } from "@/components/ui/container";

export default function LoginPage() {
    return (
        <div className="h-screen flex items-center justify-center">
            <Container className="w-full">
                <LoginForm className="max-w-[500px] mx-auto px-10 py-5" label="Авторизация" />
            </Container>
        </div>
    );
}