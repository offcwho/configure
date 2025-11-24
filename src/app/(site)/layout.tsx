import { Header, HeaderMenu } from "@/entities/header";
import { Search } from "@/entities/search";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header className="sm:hidden md:flex" />
            <Search className="sm:block md:hidden" />
            <main>
                {children}
            </main>
            <HeaderMenu className="md:hidden! sm:flex! rounded-t-2xl bg-(--card-hover) overflow-hidden" />
        </div>
    )
}