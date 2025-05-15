import React from "react";

export default function InputField({
    name,
    type = "text",
    required,
    placeholder,
    defaultValue,
    value,
    onChange,
    ...props
}) {
    return (
        <div className="relative">
            <input
                name={name}
                type={type}
                required={required}
                className="peer rounded-none border-b-2 border-blue-900 bg-transparent px-0 pt-6 pb-2 w-full text-zinc-200 focus:outline-none focus:border-blue-400 placeholder-transparent"
                placeholder={placeholder}
                defaultValue={defaultValue}
                value={value}
                onChange={onChange}
                {...props}
            />
            <label className="absolute left-0 top-2 text-sm text-blue-300 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-200 pointer-events-none">
                {placeholder}
            </label>
        </div>
    );
}
