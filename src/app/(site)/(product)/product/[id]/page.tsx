import { Container } from "@/components/ui/container";
import { SingleProduct } from "@/entities/products";

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    return (
        <Container className="py-6">
            <SingleProduct id={id} />
        </Container>
    )
}