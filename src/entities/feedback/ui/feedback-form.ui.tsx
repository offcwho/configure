import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { feedbackSchema } from "../schemas/feedback.schema"
import z from "zod"
import { create } from "@/services/feedback.service"
import { useToast } from "rdy-comp"

interface Props {
    productId: string;
}

export const FeedbackFormUi: React.FC<Props> = ({ productId }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(feedbackSchema)
    })

    const { showToast } = useToast();

    const onSubmit = async (data: z.infer<typeof feedbackSchema>) => {
        console.log("subbbb")
        try {
            await create(productId, data);

        } catch (err: any) {
            console.log(err);
        } finally {
            showToast({
                title: "Вы успешно оставили отзыв!",
                type: "success"
            })
        }
    }
    return (
        <form className="bg-(--card) p-3 flex rounded-2xl" onSubmit={handleSubmit(onSubmit)}>
            <div className="">
                <textarea
                    {...register('content')}
                    id="content"
                    className="w-full outline-none resize-none text-(--text) px-3 py-2 border rounded-xl border-(--border)"
                    placeholder="Напишите отзыв.."
                ></textarea>
                {errors.content && (
                    <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
                )}
            </div>
            <div>
                <input
                    {...register('rating', { valueAsNumber: true })}
                    type="number"
                    min="1"
                    max="5"
                    className="border rounded px-2 py-1"
                    placeholder="Рейтинг"
                />
                {errors.rating && (
                    <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
                )}
            </div>
            <button type="submit" onClick={() => console.log('CLick')}>Отправить</button>
        </form>
    )
}