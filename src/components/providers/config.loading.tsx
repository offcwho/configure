import { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { Progress } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings } from "lucide-react";
import { useToast } from "rdy-comp";

export default function ConfigLoading({ children }: { children: React.ReactNode }) {
    const { user, error } = useUser();
    const [isLoading, setIsLoading] = useState(0);
    const [currentLine, setCurrentLine] = useState(0);
    const { showToast } = useToast();

    const lines = [
        "Инициализация...",
        "Получение информации...",
        "Загрузка настроек...",
        "Подготовка интерфейса..."
    ];

    useEffect(() => {
        const progressInterval: number = window.setInterval(() => {
            setIsLoading(prev => {
                if (prev >= 100) return 100;
                return prev + 0.5;
            });
        }, 20);

        return () => window.clearInterval(progressInterval);
    }, []);

    useEffect(() => {
        const lineInterval: number = window.setInterval(() => {
            setCurrentLine(prev => (prev + 1) % lines.length);
        }, 1500);

        return () => window.clearInterval(lineInterval);
    }, []);

    useEffect(() => {
        document.documentElement.dataset.theme = "dark";
    }, []);

    if (isLoading < 100) {
        return (
            <div className="w-screen h-screen flex justify-center items-center relative bg-(--background)">
                <Progress
                    aria-label="Loading"
                    value={isLoading}
                    radius="none"
                    className="absolute top-0 left-0 w-full"
                    classNames={{
                        indicator: ["bg-(--accent)"],
                        track: ["bg-(--background)"]
                    }}
                />

                <div className="max-w-[400px] text-center relative z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentLine}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="text-(--text) text-lg font-medium flex gap-3"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                    repeat: Infinity,
                                    ease: "linear",
                                    duration: 2,
                                }}
                            >
                                <Settings />
                            </motion.div>
                            {lines[currentLine]}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
