import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    ref?: any
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { label, error, className, ...rest } = props;

    return (
        <div className="flex flex-col gap-2 w-full">
            {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
            <input
                ref={ref}
                className={`px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-500 transition-all ${error ? "border-red-500 focus:ring-red-200" : "border-gray-300"
                    } ${className || ""}`}
                {...rest}
            />
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
});

Input.displayName = "Input";
