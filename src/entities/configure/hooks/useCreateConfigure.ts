"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { createConfigureSchema } from "../schemas/create-configure.schema";
import { create, createFindOne } from "@/services/configure.service";
import { useRouter } from "next/navigation";
import z from "zod";
import { APP_ROUTE } from "@/lib/routes/app.route";
import { useModal, useToast } from "rdy-comp";

export const useCreateConfigure = () => {
    const router = useRouter();
    const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(createConfigureSchema)
    });

    const { closeModal } = useModal();
    const { showToast } = useToast();

    const onSubmit = async (data: z.infer<typeof createConfigureSchema>) => {
        console.log("is sub")

        try {
            await create(data);

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
            const findOne = await createFindOne(data.name)
            closeModal('create-configure')
            router.push(APP_ROUTE.configure.show(findOne.id));
        }
    }

    return { register, handleSubmit, onSubmit, errors, isSubmitting, control }
}