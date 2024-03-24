import Image from "next/image"
import confirm from "@/assets/images/landingpage/lpcircleconfirm.svg"

interface ListConfirmProp {
    paragraph: string;
}

export const ListConfirm: React.FC<ListConfirmProp> = ({ paragraph }) => {
    return <li className="flex gap-3">
        <Image src={confirm} alt="Icone" className="justify-start h-6 w-6"/>
        <div className="flex flex-col gap-3">
            <p className="text-sm text-gray-900 lg:text-lg">{paragraph}</p>
        </div>
</li>
}