import { Cpu, Fan, Gpu, HardDrive, MemoryStick, Microchip, PcCase, SmartphoneCharging } from "lucide-react";

export interface ConfigureDataBtnType {
    data: {
        title: string;
        type: string;
    }[];
}

export const CONFIGURE_DATA_BTN = [
    {
        icon: <Microchip />,
        title: "Материнская плата",
        type: "MOTHERBOARD"
    },
    {
        icon: <Cpu />,
        title: "Процессор",
        type: "CPU"
    },
    {
        icon: <Gpu />,
        title: "Видеокарта",
        type: "GPU"
    },
    {
        icon: <MemoryStick />,
        title: "Оперативная память",
        type: "MEMORY"
    },
    {
        icon: <Fan />,
        title: "Кулер для процессора",
        type: "COOLING"
    },
    {
        icon: <HardDrive />,
        title: "Диск",
        type: "DISK"
    },
    {
        icon: <SmartphoneCharging />,
        title: "Блок Питания",
        type: "POWER"
    },
    {
        icon: <PcCase />,
        title: "Корпус",
        type: "CASE",
    },
];