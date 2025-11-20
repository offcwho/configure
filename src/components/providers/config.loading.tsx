import { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { CircularProgress, Progress } from "@heroui/react";

export default function ConfigLoading({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(0);
    const { error } = useUser();

    useEffect(() => {
        const storage = localStorage.getItem('theme');

        if (storage === "true") {
            document.documentElement.dataset.theme = "dark";
        }

        if (!error) setIsLoading(25)

        if (storage) {
            setIsLoading(50)
        }
        setIsLoading(99)
        setTimeout(() => {
            setIsLoading(100)
        }, 500)
    }, []);

    if (isLoading !== 100) return (
        <div className="w-screen h-screen flex justify-center bg-[#101013] z-9999" >
            <Progress
                value={isLoading}
                radius="none"
                color="secondary"
                className="absolute bottom-0 left-0"
            />
            <CircularProgress
                value={isLoading}
                color="secondary"
            />
        </div >
    )

    return (
        <>
            {children}
        </>
    )
}