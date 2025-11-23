"use client";

import { useState } from "react";
import { upload } from "@/services/upload.service";
import { API_ROUTE } from "@/lib/routes/api.route";
import { getAuthHeaders } from "@/api/headers.api";
import api, { api_file } from "@/api/config.api";
import { useUser } from "@/components/providers/UserContext";

export default function FileUpload() {
    const { user } = useUser();
    const [file, setFile] = useState<File | null>(null);
    const [uploaded, setUploaded] = useState<any>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        if (file) {
            console.log("Sel fileasd:", file)
            formData.append('file', file);
            for (const [key, value] of formData.entries()) {
                console.log(key, value);
            }
        }

        try {
            console.log(formData) // Тут форм дата приходит пустой
            const response = await api_file.post(
                API_ROUTE.upload.upload('1'),
                formData,
                { headers: await getAuthHeaders() } // не трогай Content-Type, FormData сам его выставит
            );
            setUploaded(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    console.log(user)

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    onChange={(e) => {
                        const selectedFile = e.target.files?.[0];
                        console.log('Selected file:', selectedFile); // <-- добавь лог
                        setFile(selectedFile || null);
                    }}
                    required
                />
                <button type="submit">Загрузить</button>
            </form>

            {uploaded && <p>Файл загружен: {uploaded.filename}</p>}
        </div>
    );
}
