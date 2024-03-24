import Image from "next/image"

interface ListStepsProps {
    src: string;
    alt: string;
}

export const ListSteps: React.FC<ListStepsProps> = ({ src, alt }) => {
    return <li>
        <Image src={src} alt={alt}/>
    </li>
}