import { Configure } from "@/entities/configure/ui/configure.ui"
import { APP_ROUTE } from "@/lib/routes/app.route"
import { Skeleton, Tooltip } from "@heroui/react"
import { Cpu, Microchip, Zap } from "lucide-react"
import Link from "next/link"

interface Props {
    data: Configure
    isLoaded: boolean
}

export const ConfigureCard: React.FC<Props> = ({ data, isLoaded }) => {
    const tags = [
        {
            title: <Cpu />,
            count: data.socket,
            tooltip: "Socket Type",
            color: ""
        },
        {
            title: <Microchip />,
            count: data.ddr,
            tooltip: "Memory Type",
            color: ""
        },
        {
            title: <Zap />,
            count: data.watt,
            tooltip: "Power usage",
            color: ""
        },
    ];

    return (
        <li className="">
            <Skeleton className="py-2 px-4" isLoaded={isLoaded}>
                <Link href={APP_ROUTE.configure.show(String(data.id))}>
                    <Skeleton isLoaded={isLoaded}>
                        <h4 className="text-2xl mb-2">{data.name}</h4>
                    </Skeleton>
                    <div className="flex gap-4 text-gray-500">
                        {data.components.map((item, index) => (
                            <Skeleton
                                className=""
                                isLoaded={isLoaded}
                                key={index}
                            >
                                <div>
                                    {item.component.name}
                                </div>
                            </Skeleton>
                        ))}
                    </div>
                    <div className="flex gap-2 items-center mt-3">
                        {tags.map((tag, index) => (
                            <Tooltip content={tag.tooltip} className="bg-gray-600 text-gray-200" key={index}>
                                <div className="flex gap-2 py-1.5 px-3 rounded-full bg-amber-600/80 items-center text-gray-300">
                                    {tag.title}
                                    {tag.count}
                                </div>
                            </Tooltip>
                        ))}
                    </div>
                </Link>
            </Skeleton>
        </li>
    )
}