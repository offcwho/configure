import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { feedbackSchema, feedbackToUserSchema } from "../schemas/feedback.schema"
import z from "zod"
import { createToUser } from "@/services/feedback.service"
import { useToast } from "rdy-comp"

interface Props {
    feedbackId: string;
}

export const FeedbackToUserFormUi: React.FC<Props> = ({ feedbackId }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(feedbackToUserSchema)
    })

    const { showToast } = useToast();

    const onSubmit = async (data: z.infer<typeof feedbackToUserSchema>) => {
        try {
            await createToUser(feedbackId, data);
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
            <button type="submit" onClick={() => console.log('CLick')}>Отправить</button>
        </form>
    )
}