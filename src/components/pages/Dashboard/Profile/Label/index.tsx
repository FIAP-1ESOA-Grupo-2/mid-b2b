type Props = {
    htmlfor?: string;
    text: string,
    required?: boolean
}

export const Label = ({ htmlfor, text, required = false }: Props) => {
    return (
        <label
            htmlFor={htmlfor}
            className="text-md w-full text-slate-600 font-semibold"
        >
            {text}

            {required &&
                <span className="text-red-500">*</span>
            }
        </label>
    );
};