import { addToCart } from "@/services/cart.service"
import { useToast } from "rdy-comp";

export const useAddToCart = () => {
    const { showToast } = useToast();

    const handleAdd = async (id: string) => {
        try {
            await addToCart(id);
        } catch (err: any) {
            if (err) {
                showToast({
                    title: "Error!",
                    message: err.message,
                    type: "error"
                })
            } else {
                showToast({
                    title: "Error!",
                    message: "Server error",
                    type: "error"
                })
            }
        } finally {
            showToast({
                title: "Продукт успешно добавлен в корзину",
                type: "success",
            })
        }
    }
    return { handleAdd }
}