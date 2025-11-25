"use client"

import { DataTable } from "@/entities/admin/ui/admin-table.ui";
import { VerticalDotsIcon } from "@/entities/admin/ui/icons";
import { API_ADMIN_ROUTE } from "@/lib/routes/api.admin.route";
import { APP_ADMIN_ROUTE } from "@/lib/routes/app.admin.route";
import { findAll } from "@/services/admin/admin.service";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Component = {
    id: number;
    name: string;
    type: string;
    description: string;
    price: string;
    images: string;
    socket: string;
    ddr: string;
    watt: number;
    formFactor: string;
    rating: number;
    power: string;
};

export default function AdminPage() {
    const [data, setData] = useState<Component[]>([]);
    const router = useRouter();

    const fetchData = async () => {
        const response = await findAll({ route: API_ADMIN_ROUTE.component.index() });
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
                    { uid: "type", name: "Type" },
                    { uid: "description", name: "Description" },
                    { uid: "price", name: "Price" },
                    { uid: "images", name: "Images" },
                    { uid: "socket", name: "Socket" },
                    { uid: "ddr", name: "RAM" },
                    { uid: "watt", name: "WaTT" },
                    { uid: "formFactor", name: "FormFactor" },
                    { uid: "rating", name: "Rating" },
                    { uid: "power", name: "Power" },
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
                                        <DropdownItem key="edit" onClick={() => router.push(APP_ADMIN_ROUTE.component.edit(String(data.id)))}>Edit</DropdownItem>
                                        <DropdownItem key="delete" onClick={() => console.log("delete item")}>Delete</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        );
                    }
                    return data[key as keyof Component];
                }}
                onAddNew="/admin/component/create"
            />
        </>

    )
}