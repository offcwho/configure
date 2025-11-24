"use client"

import { DataTable } from "@/entities/admin/ui/admin-table.ui";
import { VerticalDotsIcon } from "@/entities/admin/ui/icons";
import { findAll } from "@/services/products.service";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Product = {
    id: number;
    name: string;
    description: string;
    content: string;
    price: string;
};

export default function AdminPage() {
    const [data, setData] = useState<Product[]>([]);
    const router = useRouter();

    const fetchData = async () => {
        const response = await findAll();
        setData(response)
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <DataTable
                data={data}
                columns={[
                    { uid: "id", name: "ID" },
                    { uid: "name", name: "Name" },
                    { uid: "description", name: "Description" },
                    { uid: "content", name: "Content" },
                    { uid: "price", name: "Price" },
                    { uid: "actions", name: "Actions" },
                ]}
                filterableColumns={["name", "id"]}
                statusOptions={[
                    { name: "Active", uid: "active" },
                    { name: "Paused", uid: "paused" },
                ]}
                statusKey="id"
                renderCell={(data, key) => {
                    if (key === "actions") {
                        return (
                            <div className="relative flex justify-end items-center gap-2">
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button isIconOnly size="sm" variant="light">
                                            <VerticalDotsIcon className="text-default-300" />
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu>
                                        <DropdownItem key="edit" onClick={() => router.push("/admin/products/" + data.id)}>Edit</DropdownItem>
                                        <DropdownItem key="delete" onClick={() => console.log("delete item")}>Delete</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        );
                    }
                    return data[key as keyof Product];
                }}
                onAddNew="/admin/products/create"
            />
        </>

    )
}