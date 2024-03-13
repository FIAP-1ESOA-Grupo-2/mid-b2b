"use client";

import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import { Inputs } from "..";

type Props = {
    id: keyof Inputs,
    placeholder?: string,
    errorMessage?: string,
    defaultValue?: string,
    register: UseFormRegister<Inputs>
}

export const Input = ({ id, placeholder, errorMessage, defaultValue, register }: Props) => {
    const [focused, setFocused] = useState(false);

    return (
        <>
            <div className="flex bg-formbg rounded-lg items-center"  >
                <input
                    {...register(id)}
                    defaultValue={defaultValue}
                    id={id}
                    placeholder={placeholder}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className={`w-full  transition-all border-2 bg-formbg rounded-lg text-forminput py-2 px-4 outline-none focus:text-zinc-600 border-slate-100 focus:border-mainblue`}
                />

                <div className="px-3 border-mainblue">
                    <MdEdit size={18} className={`${focused ? "text-mainblue" : "text-slate-500"} duration-300`} />
                </div>
            </div>

            {errorMessage && (
                <small className="ml-1 mt-1 text-red-600 font-semibold -mb-2">
                    {errorMessage}
                </small>
            )}
        </>

    );
};