import { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { CircularProgress, Progress } from "@heroui/react";

export default function ConfigLoading({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(0);
    const { error } = useUser();
    const { user } = useUser();

    useEffect(() => {
        const storage = localStorage.getItem('theme');

        if (storage === "true") {
            document.documentElement.dataset.theme = "dark";
        }

        if (!error) setIsLoading(25)

        if (storage) {
            setIsLoading(50)
        }
        if (user) setIsLoading(75)
        if (user === null) setIsLoading(75)
        setIsLoading(99)
        setTimeout(() => {
            setIsLoading(100)
        }, 500)
    }, []);

    if (isLoading !== 100) return (
        <div className="w-screen h-screen flex justify-center bg-(--background) z-9999" >
            <Progress
                aria-label="Loading"
                value={isLoading}
                radius="none"
                className="absolute top-0 left-0"
                classNames={{
                    indicator: ["bg-(--accent)"],
                    track: ["bg-(--background)"]
                }}
            />
        </div >
    )
    return (
        <>
            {children}
        </>
    )
}