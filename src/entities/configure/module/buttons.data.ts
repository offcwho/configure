export interface ConfigureDataBtnType {
    data: {
        title: string;
        type: string;
    }[];
}

export const CONFIGURE_DATA_BTN = [
    {
        title: "Материнская плата",
        type: "MOTHERBOARD"
    },
    {
        title: "Процессор",
        type: "CPU"
    },
    {
        title: "Видеокарта",
        type: "GPU"
    },
    {
        title: "Оперативная память",
        type: "MEMORY"
    },
    {
        title: "Кулер для процессора",
        type: "COOLING"
    },
    {
        title: "Диск",
        type: "DISK"
    },
    {
        title: "Корпус",
        type: "CASE",
    },
];