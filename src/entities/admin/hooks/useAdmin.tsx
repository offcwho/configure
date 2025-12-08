"use client"

import { create, update } from "@/services/admin/admin.service";
import { Button } from "@heroui/react";
import { AnimatePresence, easeOut, motion } from "framer-motion";
import { Undo2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { RdyInput, RdyOption, RdySelect, useToast } from "rdy-comp"
import { useEffect, useMemo, useState } from "react";
import { AdminSelect } from "..";

interface useAdminProps {
    api: string;
    id?: string;
    method: "post" | "patch";
}

interface AdminTextInputProps {
    name: string;
    type: "number" | "search" | "text" | "password" | "email" | undefined;
    label?: string;
    placeholder?: string;
}

interface AdminFileInputProps {
    name: string;
    label?: string;
    placeholder?: string;
}

export interface SelectData {
    value: string;
    title: string;
}

interface AdminSelectInputProps {
    name: string;
    label?: string;
    data: SelectData[];
    searchable?: boolean | false;
}

interface AdminFormProps {
    children: React.ReactNode;
    button?: string | "Отправить";
}

export const useAdmin = ({
    api,
    id,
    method,
}: useAdminProps) => {
    const { showToast } = useToast();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {

            const formDataObj: Record<string, any> = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            console.log(formDataObj);
            if (method === "post")
                await create({
                    route: api,
                    data: formData,
                });
            if (method === "patch")
                await update({
                    route: api + "/" + id,
                    data: formData,
                });
        } catch (error) {
            showToast({
                title: "Ошибка: " + error,
                type: "error",
            });
            console.error(error);
        } finally {
            showToast({
                title: "Вы успешно создали запись",
                type: "success",
            });
            //router.back();
        }
    };

    const variants = {
        hidden: {
            padding: 0,
            height: 0,
            opacity: 0,
            y: 20,
        },
        visible: (i: number) => ({
            height: "auto",
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.4,
                ease: easeOut,
            },
        }),
    };

    const AdminForm: React.FC<AdminFormProps> = ({ children, button }) => {
        return (
            <div className="">
                <Button onPress={() => router.back()} className="flex gap-3 items-center bg-transparent text-(--text) mb-4 text-2xl">
                    <Undo2 size={30} />
                    Вернуться
                </Button>
                <form onSubmit={handleSubmit} className="p-6 bg-(--card) rounded-2xl">
                    <div className="flex flex-col gap-4">
                        {children}
                    </div>
                    <div className="mt-4">
                        <button className="py-3 bg-(--accent) text-(--text) px-8 rounded-2xl">{button}</button>
                    </div>
                </form>
            </div>
        )
    }

    const AdminTextInput: React.FC<AdminTextInputProps> = ({ name, type, label, placeholder }) => {
        return (
            <input
                id={name}
                type={type}
                name={name}
                placeholder={placeholder}
                className="rounded-xl py-4! bg-(--card-hover) w-full placeholder:text-(--text-secondary) px-4 focus:outline-none focus:bg-(--card-hover)/60"
            />
        )
    }

    const AdminFileInput: React.FC<AdminFileInputProps> = ({ name, label, placeholder }) => {
        const [fileName, setFileName] = useState("");
        const [previewUrl, setPreviewUrl] = useState<string | null>(null);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];

            if (file) {
                setFileName(file.name);
                setPreviewUrl(URL.createObjectURL(file));
            }
        };

        return (
            <div className="bg-(--card-hover) rounded-2xl border-3 border-(--border) overflow-auto">
                <label htmlFor={name} className="w-fit">
                    <div className="px-6 py-4 rounded-2xl bg-(--selected)">
                        <span className="text-(--text-secondary)">
                            {fileName || "Выберите файл"}
                        </span>
                    </div>
                </label>
                {previewUrl && (
                    <motion.div
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        custom={2}
                        className="p-4! bg-(--card-hover)"
                    >
                        <img
                            src={previewUrl}
                            alt="preview"
                            className="w-40 h-40 object-cover rounded-xl border border-(--border)"
                        />
                    </motion.div>
                )}
                <input
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                />
            </div>
        )
    }

    const AdminSelectInput: React.FC<AdminSelectInputProps> = ({ name, label, data, searchable }) => {
        return (
            <AdminSelect data={data} label={label} name={name} searchable={searchable}/>
        )
    }

    return { AdminForm, AdminTextInput, AdminFileInput, AdminSelectInput }
}