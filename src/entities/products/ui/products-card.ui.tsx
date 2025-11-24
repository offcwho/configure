import { ProductType } from ".."
import { APP_ROUTE } from "@/lib/routes/app.route"
import { Button } from "@heroui/react"
import { useAddToCart } from "@/entities/cart/hooks/useAddToCart"
import { ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import { easeOut, motion } from "framer-motion"
import Image from "next/image"
import { BACKEND_IMAGE } from "@/lib/constants"

interface Props {
    data: ProductType;
    animate: number;
}

export const ProductsCard: React.FC<Props> = ({ data, animate }) => {
    const { handleAdd } = useAddToCart();
    const router = useRouter();

    const variants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.4,
                ease: easeOut,
            },
        }),
    };


    return (
        <motion.li
            variants={variants}
            initial="hidden"
            animate="visible"
            custom={animate}
            className="px-5 py-5 bg-(--card) text-(--text) rounded-2xl flex"
        >
            <div
                onClick={() => router.push(APP_ROUTE.products.show(String(data.id)))}
                className="w-full"
            >
                <img
                    src={`${BACKEND_IMAGE}${data.images}`}
                    alt={`${data.name} Image`}
                    className="w-full! mb-3 max-h-[300px] h-full rounded-xl"
                    loading="lazy"
                />
                <h3>{data.name}</h3>
                <p className="text-(--text-secondary)">{data.description}</p>
                <Button
                    onPress={() => handleAdd(String(data.id))}
                    className="bg-(--accent)! text-(--text) flex items-center mt-3 w-full justify-center"
                >
                    <ShoppingCart size={20} />
                    <span>{data.price} ₽</span>
                </Button>
            </div>
        </motion.li>
    )
}