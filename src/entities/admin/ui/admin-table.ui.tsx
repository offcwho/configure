"use client";

import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    DropdownTrigger,
    Pagination,
    Selection,
} from "@heroui/react";
import { useRouter } from "next/navigation";

import { SearchIcon, ChevronDownIcon, PlusIcon } from "./icons";

export interface DataTableColumn<T> {
    uid: keyof T | "actions";
    name: string;
    sortable?: boolean;
    align?: "start" | "center" | "end";
}

export interface DataTableProps<T> {
    data: T[];
    columns: DataTableColumn<T>[];
    visibleColumnsDefault?: string[];
    filterableColumns?: (keyof T)[];
    statusOptions?: { name: string; uid: string }[];
    statusKey?: keyof T;
    renderCell: (item: T, columnKey: keyof T | "actions") => React.ReactNode;
    addNewButtonText?: string;
    onAddNew?: string;
    rowsPerPageDefault?: number;
}

export function DataTable<T extends { id: string | number }>({
    data,
    columns,
    renderCell,
    filterableColumns = [],
    visibleColumnsDefault = columns.map((c) => c.uid.toString()),
    rowsPerPageDefault = 20,
    addNewButtonText = "Add New",
    onAddNew,
    statusOptions,
    statusKey,
}: DataTableProps<T>) {
    const router = useRouter();
    const [search, setSearch] = React.useState("");
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
        new Set(visibleColumnsDefault)
    );
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageDefault);

    const filterActive = search.length > 0;

    const filtered = React.useMemo(() => {
        let items = [...data];

        // Поиск
        if (filterActive) {
            items = items.filter((item) =>
                filterableColumns.some((col) =>
                    String(item[col] ?? "").toLowerCase().includes(search.toLowerCase())
                )
            );
        }

        // Фильтр по статусу
        if (statusOptions && statusKey && statusFilter !== "all") {
            items = items.filter((item) =>
                Array.from(statusFilter as Set<string>).includes(item[statusKey] as string)
            );
        }

        return items;
    }, [data, search, filterActive, statusFilter]);

    const pages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));

    const paginated = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filtered.slice(start, start + rowsPerPage);
    }, [filtered, page, rowsPerPage]);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;
        return columns.filter((col) => Array.from(visibleColumns).includes(col.uid.toString()));
    }, [visibleColumns, columns]);

    return (
        <Table
            isHeaderSticky
            aria-label="DataTable"
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            topContentPlacement="outside"
            bottomContentPlacement="outside"
            classNames={{
                wrapper: ["bg-(--card)"],
                th: ["bg-(--card-hover)"],
                tr: ["group/tr:hover:bg-(--card-hover)", "data-group-[hover=true]:bg-(--card-hover)!"], // строка меняет фон при hover
                td: ["text-white", "data-[hover=true]:bg-(--card-hover)! data-group-[hover=true]:opacity-1"],
                base: ["data-group-[hover=true]:bg-(--card-hover)!"]
            }}
            topContent={
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between gap-3 items-end">
                        <Input
                            isClearable
                            placeholder="Search..."
                            startContent={<SearchIcon />}
                            value={search}
                            className="w-full sm:max-w-[40%]"
                            onClear={() => setSearch("")}
                            onValueChange={setSearch}
                        />
                        <div className="flex gap-3">
                            {statusOptions && (
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button endContent={<ChevronDownIcon />} variant="flat">
                                            Status
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        disallowEmptySelection
                                        selectionMode="multiple"
                                        selectedKeys={statusFilter}
                                        onSelectionChange={setStatusFilter}
                                    >
                                        {statusOptions.map((s) => (
                                            <DropdownItem key={s.uid} className="capitalize">
                                                {s.name}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                            )}
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button endContent={<ChevronDownIcon />} variant="flat">
                                        Columns
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    disallowEmptySelection
                                    selectionMode="multiple"
                                    selectedKeys={visibleColumns}
                                    onSelectionChange={setVisibleColumns}
                                >
                                    {columns.map((col) => (
                                        <DropdownItem key={col.uid.toString()}>{col.name}</DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                            {onAddNew && (
                                <Button
                                    color="primary"
                                    endContent={<PlusIcon />}
                                    onPress={() => router.push(onAddNew)}
                                >
                                    {addNewButtonText}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            }
            bottomContent={
                <div className="flex justify-between p-2">
                    <span className="text-small text-default-400">
                        {selectedKeys === "all"
                            ? "All selected"
                            : `${selectedKeys.size} selected`}
                    </span>
                    <Pagination color="primary" page={page} total={pages} onChange={setPage} />
                </div>
            }
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid.toString()}
                        align={column.align ?? "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>

            <TableBody items={paginated}>
                {(item) => (
                    <TableRow key={(item as T).id}>
                        {(columnKey) => (
                            <TableCell>
                                <div onClick={(e) => e.stopPropagation()}>
                                    {renderCell(item as T, columnKey as any)}
                                </div>
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
