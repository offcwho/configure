import { RegisterForm } from "@/entities/auth";
import { Container } from "@/components/ui/container";
import { APP_ROUTE } from "@/lib/routes/app.route";

export default function RegisterPage() {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <Container className="w-full">
                <RegisterForm label="Регистрация" loginUrl={APP_ROUTE.auth.login()} className="max-w-[500px] mx-auto px-10 py-5" />
            </Container>
        </div>
    )
}