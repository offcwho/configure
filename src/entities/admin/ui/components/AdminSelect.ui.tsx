"use client"

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { SelectData } from "../../hooks/useAdmin";

interface AdminSelect {
    data: SelectData[]
    label?: string;
    name: string;
    classNames?: {
        bgSelect?: string;
        bgSelectMenu?: string;
        textColor?: string;
    }
    searchable?: boolean | false;
}

export const AdminSelectUi: React.FC<AdminSelect> = ({ data, name, classNames, searchable }) => {
    const [value, setValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const filteredOptions = useMemo(() => {
        if (!searchValue.trim()) {
            return data;
        }
        return data.filter(option =>
            option.title.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [searchValue, data]);

    useEffect(() => {
        if (!isOpen) {
            setSearchValue("");
        }
    }, [isOpen]);

    return (
        <div className={`relative ${classNames?.textColor ? `text-[${classNames.textColor}]` : `text-(--text)`} transition-all duration-300`}>
            <select
                name={name}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="hidden"
            >
                {data.map((item, index) => (
                    <option value={item.value} key={index}>{item.title}</option>
                ))}
            </select>

            {/* Select */}
            <motion.div
                layout
                initial={false}
                animate={{
                    backgroundColor: isOpen
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(255, 255, 255, 0.05)",
                    backdropFilter: isOpen ? "blur(10px)" : "blur(5px)",
                    borderColor: isOpen
                        ? "rgba(255, 255, 255, 0.3)"
                        : "rgba(255, 255, 255, 0.1)"
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeOut"
                }}
                className={`p-3 relative flex items-center justify-between cursor-pointer select-none rounded-xl backdrop-blur-sm border ${classNames?.bgSelect ? `` : 'bg-white/5'
                    } shadow-lg group overflow-hidden`}
                style={{
                    background: classNames?.bgSelect
                        ? isOpen
                            ? `${classNames.bgSelect}CC`
                            : classNames.bgSelect
                        : undefined
                }}
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
            >
                <motion.div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                />
                <motion.div
                    key={value || "placeholder"}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10 flex-1"
                >
                    <span className={`text-sm font-medium ${value ? "text-white" : "text-neutral-300/70"
                        }`}>
                        {value ? data.find(item => item.value === value)?.title || value : "Выберите..."}
                    </span>
                </motion.div>

                <div className="relative z-10 flex items-center">
                    {value && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full bg-red-500 mr-2"
                        />
                    )}
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        className="w-4 h-4"
                    >
                        <svg className="w-full h-full text-neutral-300" viewBox="0 0 24 24">
                            <motion.path
                                d="M7 10l5 5 5-5"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </svg>
                    </motion.div>
                </div>
            </motion.div>

            {/* SelectMenu */}
            <AnimatePresence mode="wait">
                {isOpen && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: -15,
                            scale: 0.95,
                            filter: "blur(10px)"
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            filter: "blur(0px)"
                        }}
                        exit={{
                            opacity: 0,
                            y: -15,
                            scale: 0.95,
                            filter: "blur(10px)"
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                            mass: 0.8,
                            duration: 0.3
                        }}
                        className="absolute top-full mt-2 z-50 bg-neutral-900/95 backdrop-blur-xl border border-neutral-700/50 shadow-2xl shadow-black/50 overflow-hidden rounded-2xl min-w-full"
                        style={{
                            background: classNames?.bgSelectMenu
                                ? `${classNames.bgSelectMenu}/95`
                                : 'rgba(23, 23, 23, 0.95)'
                        }}
                    >
                        <div className="absolute inset-0 rounded-2xl p-px bg-linear-to-br from-neutral-600/20 via-transparent to-transparent pointer-events-none" />

                        {/* Поле поиска */}
                        {searchable && (
                            <div className="relative p-3 border-b border-neutral-700/50">
                                <input
                                    type="text"
                                    value={searchValue}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                                    placeholder="Поиск..."
                                    className="w-full p-2 bg-neutral-800/50 text-white rounded-lg border border-neutral-700/50 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                                    autoFocus
                                />
                            </div>
                        )}

                        <motion.div
                            key={searchValue}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.03,
                                        delayChildren: 0.05
                                    }
                                }
                            }}
                            className="relative py-2 max-h-60 overflow-y-auto"
                        >
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((item, index) => (
                                    <motion.div
                                        key={`${item.value}-${index}`}
                                        variants={{
                                            hidden: {
                                                opacity: 0,
                                                x: -10,
                                                scale: 0.95
                                            },
                                            visible: {
                                                opacity: 1,
                                                x: 0,
                                                scale: 1
                                            }
                                        }}
                                        whileHover={{
                                            backgroundColor: "rgba(255, 255, 255, 0.08)",
                                            transition: { type: "spring", stiffness: 400 }
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 25
                                        }}
                                        className="relative py-2.5 px-6 cursor-pointer group mx-2 rounded-lg"
                                        onClick={() => {
                                            setValue(item.value);
                                            setIsOpen(false);
                                        }}
                                    >
                                        <motion.div
                                            className="absolute left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-500 rounded-full"
                                            animate={{
                                                opacity: value === item.value ? 1 : 0,
                                                scale: value === item.value ? 1 : 0
                                            }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        />
                                        <span className="relative text-neutral-200 group-hover:text-white transition-colors duration-200 font-medium pl-1">
                                            {item.title}
                                        </span>
                                        <motion.div
                                            className="absolute bottom-0 left-1/2 h-px bg-linear-to-r from-transparent via-white/50 to-transparent"
                                            initial={{ width: 0, x: "-50%" }}
                                            whileHover={{ width: "70%", x: "-50%" }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="py-4 text-center text-neutral-400"
                                >
                                    Ничего не найдено
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
