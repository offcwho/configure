'use client'

import { ConfigureCard } from "@/components/ui/configure-card.ui";
import { Container } from "@/components/ui/container";
import { APP_ROUTE } from "@/lib/routes/app.route";
import { findUserConfigurations } from "@/services/configure.service";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface Configure {
    id: number
    name: string
    socket: string
    ddr: string
    watt: string
    components: [
        {
            component: {
                id: string,
                name: string,
                type: string,
            }
        }
    ]
}

export const ConfgiureUi = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState<Configure[]>();
    const fetchData = async () => {
        try {
            const response = await findUserConfigurations();
            setData(response);
            setIsLoaded(true)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="pt-4">
            <Container>
                <h1 className="text-3xl">Мои конфигурации:</h1>
                <ul className="py-4">
                    {data?.map((item, index) => (
                        <ConfigureCard data={item} key={index} isLoaded={isLoaded} />
                    ))}
                </ul>
            </Container>
        </div>
    )
}