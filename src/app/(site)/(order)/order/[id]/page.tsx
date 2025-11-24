import { Container } from "@/components/ui/container";

export default async function OrderPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    return (
        <Container>
            <div className="text-(--text)">
                Заказ: {id} успешно создан!
            </div>
        </Container>
    )
}