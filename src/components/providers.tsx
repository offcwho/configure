'use client'

import { ModalProvider, ToastProvider } from "rdy-comp";
import { UserProvider } from "./providers/UserContext";
import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "next/router";

export default function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <UserProvider>
            <HeroUIProvider navigate={router.push}>
                <ToastProvider>
                    <ModalProvider>
                        {children}
                    </ModalProvider>
                </ToastProvider>
            </HeroUIProvider>
        </UserProvider >
    )
}