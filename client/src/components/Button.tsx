import React, { type ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
    size?: "sm" | "md" | "lg";
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    loading?: boolean;
}

const variantStyles = {
    primary: "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800",
    secondary: "bg-purple-200 text-purple-600 hover:bg-purple-300 active:bg-purple-400", // Adjusted for better visibility
};

const sizeStyles = {
    sm: "px-2 py-1 text-sm font-light",
    md: "px-4 py-2 text-md font-normal",
    lg: "px-6 py-4 text-xl font-bold",
};

const defaultStyles = "rounded-md flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

export const Button = (props: ButtonProps) => {
    const { variant = "primary", size = "md", startIcon, endIcon, loading, className, children, ...rest } = props;

    return (
        <button
            className={`${defaultStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className || ""}`}
            disabled={loading}
            {...rest}
        >
            {loading ? (
                <span className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></span>
            ) : (
                <>
                    {startIcon}
                    {children}
                    {endIcon}
                </>
            )}
        </button>
    );
};
