import Image from "next/image"

interface TypeListProps {
    icon: string;
    alt: string;
    title: string;
    paragraph: string;
}

export const TypeList: React.FC<TypeListProps> = ({ icon, alt, title, paragraph }) => {
    return (
        <li className="flex gap-3">
            <Image src={icon} alt={alt} className="justify-start h-8 w-8 md:h-12 md:w-12"/>
            <div className="flex flex-col gap-3">
                <h2 className="text-gray-950 text-base md:text-2xl">{title}</h2>
                <p className="text-xs text-gray-500 md:text-base">{paragraph}</p>
            </div>
        </li>
    )
}