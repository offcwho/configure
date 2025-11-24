"use client"

import { useUser } from "@/components/providers/UserContext";
import { AdminHeader, AdminSidebar } from "@/entities/admin"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user?.role !== "ADMIN") {
            return router.push("/");
        }
    }, []);

    console.log(user);

    return (
        <div className="">
            <AdminHeader />
            <div className="grid grid-cols-4">
                <AdminSidebar className="col-span-1" />
                <main className="col-span-3 p-4 py-8">
                    {children}
                </main>
            </div>
        </div>
    );
}