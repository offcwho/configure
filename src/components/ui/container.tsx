import React from "react";

interface Props {
    className?: string;
    children?: React.ReactNode;
}


export const Container:React.FC<Props> = ( {className, children}) => {
    return (
        <div className={`${className} max-w-[1440px] w-full mx-auto px-4 z-0`}>
            {children}
        </div>
    );
}