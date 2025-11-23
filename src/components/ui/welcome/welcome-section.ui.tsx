'use client'

import Image from "next/image";
import { Container } from "../container";
import welcomeImage from '../../../../public/static/welcome.jpg';
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useModal } from "rdy-comp";

export default function Welcome() {
    const router = useRouter();
    const { openModal } = useModal();

    return (
        <section className="min-h-screen flex items-center justify-center bg-(--background)">
            <Container>
                <div className="flex flex-col items-center text-center pt-24">

                    {/* Заголовок */}
                    <h1 className="text-(--text) text-6xl font-semibold tracking-tight">
                        Создайте ПК нового уровня
                    </h1>

                    {/* Подзаголовок */}
                    <p className="text-(--text-secondary) text-xl max-w-2xl mt-5 leading-relaxed">
                        Соберите систему, в которой каждая деталь подобрана идеально —
                        производительность, тишина, эстетика. Только то, что вам действительно нужно.
                    </p>

                    {/* Кнопки */}
                    <div className="flex gap-4 mt-10">
                        <Button
                            className="px-7 py-5 text-lg rounded-xl bg-(--accent) text-(--text)!
                                       shadow-md hover:shadow-lg transition-all duration-200"
                            onPress={() => openModal('create-configure')}
                        >
                            Создать конфигурацию
                        </Button>

                        <Button
                            className="px-7 py-5 text-lg rounded-xl bg-(--card) text-(--text)!
                                       hover:bg-(--card-hover) transition duration-200"
                            onPress={() => router.push('#')}
                        >
                            Каталог комплектующих
                        </Button>
                    </div>

                    {/* Изображение */}
                    <div className="mt-20 max-w-3xl w-full rounded-3xl overflow-hidden shadow-xl">
                        <Image
                            src={welcomeImage}
                            alt="Рабочее место"
                            className="w-full h-auto object-cover"
                        />
                    </div>

                </div>
            </Container>
        </section>
    )
}
