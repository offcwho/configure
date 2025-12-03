import React from "react";

interface Props {
    className?: string;
    children?: React.ReactNode;
}


export const Container:React.FC<Props> = ( {className, children}) => {
    return (
        <div className={`${className} max-w-[1440px] w-full mx-auto md:px-4 sm:px-2 z-0`}>
            {children}
        </div>
    );
}