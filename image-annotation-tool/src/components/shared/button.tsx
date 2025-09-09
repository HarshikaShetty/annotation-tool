import React, { memo, type FC } from "react";

interface IButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
}

const Button: FC<IButtonProps> = ({ children, onClick, className }) => {
    return (
        <button className={`cursor-pointer p-4 ${className}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default memo(Button);
