"use client"

import { ModalProvider, ToastProvider } from "rdy-comp";
import { UserProvider, useUser } from "./UserContext";
import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ConfigLoading from "./config.loading";
import { SearchProvider } from "./search.provider";

export default function ConfigProviders({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <UserProvider>
            <HeroUIProvider navigate={router.push}>
                <ToastProvider>
                    <ModalProvider>
                        <ConfigLoading>
                            <SearchProvider>
                                {children}
                            </SearchProvider>
                        </ConfigLoading>
                    </ModalProvider>
                </ToastProvider>
            </HeroUIProvider>
        </UserProvider>
    )
}