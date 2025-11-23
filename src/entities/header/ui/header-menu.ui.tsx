"use client"

import { useUser } from "@/components/providers/UserContext";
import { APP_ROUTE } from "@/lib/routes/app.route";
import { logout } from "@/services/auth.service";
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Tooltip } from "@heroui/react";
import { Home, LogOut, Plus, ShoppingCart, User } from "lucide-react";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useModal, useToast } from "rdy-comp";
import { DROPDOWN_DATA } from "..";

interface Props {
    className?: string;
}

export const HeaderMenuUi: React.FC<Props> = ({ className }) => {
    const { user } = useUser();
    const { openModal } = useModal();
    const { showToast } = useToast();
    const router = useRouter();

    const handleLogOut = async () => {
        const LogOut = await logout();
        if (LogOut) {
            showToast({
                title: 'Вы успешно вышли из аккаунта',
                type: 'success',
            });
            window.location.reload();
        }
    }

    return (
        <menu className={`md:flex md:gap-5 sm:gap-0 sm:hidden ${className} sm:justify-between`}>
            {!user ? (
                <>
                    <li className="flex w-full h-full items-center justify-center">
                        <Link
                            href="/login"
                            className="text-white h-full w-full px-3 py-2 text-center font-medium cursor-pointer hover:bg-gray-800 flex items-center justify-center transition-colors duration-300"
                        >
                            Log in
                        </Link>
                    </li>
                    <li className="flex w-full h-full items-center justify-center">
                        <Link
                            href="/register"
                            className="text-white h-full w-full px-3 py-2 bg-gray-800 text-center font-medium cursor-pointer hover:bg-gray-600 flex items-center justify-center transition-colors duration-300"
                        >
                            Register
                        </Link>
                    </li>
                </>
            ) : (
                <>
                    <li className="md:hidden w-full ">
                        <Button
                            className="md:bg-(--accent) sm:bg-transparent text-(--text) md:px-2! rounded-full min-w-0 sm:w-full! sm:h-full! md:w-10! md:h-10! md:rounded-full! sm:rounded-none! sm:py-3 md:py-0"
                            onPress={() => router.push(APP_ROUTE.home())}
                        >
                            <Home />
                        </Button>
                    </li>
                    <li className="flex items-center w-full justify-center ">
                        <Tooltip content="Создать конфигурацию" className="bg-(--selected) text-(--text)">
                            <Button
                                className="md:bg-(--accent) sm:bg-transparent text-(--text) md:px-2! rounded-full min-w-0 sm:w-full! sm:h-full! md:w-10! md:h-10! md:rounded-full! sm:rounded-none! sm:py-3 md:py-0"
                                onPress={() => openModal('create-configure')}
                            >
                                <Plus />
                            </Button>
                        </Tooltip>
                    </li>
                    <li className="flex items-center w-full justify-center ">
                        <Button
                            className="bg-transparent text-(--text) px-2! py-2 rounded-full min-w-0 sm:w-full! sm:h-full! md:w-10! md:h-10! md:rounded-full! sm:rounded-none! sm:py-3 md:py-0"
                            onPress={() => router.push(APP_ROUTE.cart.index())}
                        >
                            <ShoppingCart size={22} />
                        </Button>
                    </li>
                    <li className="w-full flex justify-center ">
                        <Dropdown className="bg-(--selected)">
                            <DropdownTrigger>
                                <Button className="h-[50px] w-[50px] flex items-center justify-center sm:w-full! sm:h-full! md:w-12! md:h-12! sm:rounded-none md:rounded-full! sm:py-3 md:py-0 bg-transparent text-(--text) px-0 min-w-0">
                                    <Avatar name={user.name} className="h-full w-full bg-(--selected) text-(--text) md:block sm:hidden" />
                                    <User className="sm:block md:hidden text-(--text)" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownSection items={DROPDOWN_DATA} className="mb-3">
                                    {(item) => (
                                        <DropdownItem
                                            key={item.key}
                                            className="hover:bg-(--accent)! text-gray-100! transition-colors duration-300"
                                            href={`/${item.key}`}
                                        >
                                            <div className="flex items-center gap-4 py-1">
                                                {item.icon}{item.title}
                                            </div>
                                        </DropdownItem>
                                    )}
                                </DropdownSection>
                                <DropdownSection className="mb-0">
                                    <DropdownItem
                                        key={'logout'}
                                        className="py-1 px-3 text-red-500 hover:bg-red-500! hover:text-white! transition-colors duration-300"
                                        onClick={() => handleLogOut()}
                                    >
                                        <div className="flex items-center gap-4 py-1">
                                            <LogOut size={20} />
                                            <span> Выйти из аккаунта</span>
                                        </div>
                                    </DropdownItem>
                                </DropdownSection>
                            </DropdownMenu>
                        </Dropdown>
                    </li>
                </>
            )}
        </menu>
    )
}