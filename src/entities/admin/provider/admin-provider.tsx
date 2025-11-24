"use client"

import { useUser } from "@/components/providers/UserContext"
import { useRouter } from "next/navigation";

interface Props {
    children: React.ReactNode;
}

export const AdminProvider = ({ children }: Props) => {
   
    return (
        <div className="">
            {children}
        </div>
    )
}