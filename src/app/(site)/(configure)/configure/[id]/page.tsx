import { Container } from "@/components/ui/container";
import { Configure } from "@/entities/configure";

export default async function ConfigurePage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    return (
        <Container className="h-full">
            <Configure configureId={id} />
        </Container>
    )
}