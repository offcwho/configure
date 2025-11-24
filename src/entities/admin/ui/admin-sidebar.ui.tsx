import Link from "next/link"
import { SIDEBAR_DATA } from "../module/sidebar.data"

interface Props {
    className?: string;
}

export const AdminSidebarUi: React.FC<Props> = ({ className }) => {
    return (
        <menu className={`${className} px-3 py-4 space-y-2`}>
            {SIDEBAR_DATA.map((item, index) => (
                <li key={index} className="flex">
                    <Link href={item.href} className="w-full bg-(--card-hover) rounded-2xl px-6 py-4 text-(--text-secondary) cursor-pointer">
                        {item.icon && item.icon}
                        {item.title}
                    </Link>
                </li>
            ))}
        </menu>
    )
}