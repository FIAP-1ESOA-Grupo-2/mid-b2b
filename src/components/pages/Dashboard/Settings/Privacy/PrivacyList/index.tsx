import React from "react";

interface PrivacyListProps {
    title: string;
    description?: string;
    sectitle?: string;
    subtitle1: string;
    subtitle2: string;
    subtitle3: string;
    para1: string;
    para2: string;
    para3: string;
}

export const PrivacyList: React.FC<PrivacyListProps> = ({ title, description, sectitle, subtitle1, subtitle2, subtitle3, para1, para2, para3 }) => {
    return (
        <section>
            <h1 className="text-xl text-mainblue">{title}</h1>
            <p className="my-3">{description}</p>
            <h2 className="text-mainblue font-semibold">{sectitle}</h2>
            <ol className="list-decimal w-full px-4 xl:px-7">
                <li className="text-slate-500"><strong className="text-slate-700">{subtitle1}</strong>: {para1}.</li>
                <li className="text-slate-500"><strong className="text-slate-700">{subtitle2}</strong>: {para2}.</li>
                <li className="text-slate-500"><strong className="text-slate-700">{subtitle3}</strong>: {para3}.</li>
            </ol>
        </section>
    )
}