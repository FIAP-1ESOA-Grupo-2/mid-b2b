import Image from "next/image";
import { useState, ChangeEvent } from "react";
import { FaEye, FaEyeSlash, FaFacebook, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const Cadastro = () => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [number, setNumber] = useState<string>('')
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const mainblueIcons = "#00ACFF"
    const mainblueFace = "#0163E0"

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.replace(/\D/g, '')
        let formattedInput = ''
    
        if (input.length <= 2) {
          formattedInput = `(${input}`
        } else if (input.length <= 6) {
          formattedInput = `(${input.slice(0, 2)}) ${input.slice(2)}`
        } else {
          formattedInput = `(${input.slice(0, 2)}) ${input.slice(2, 6)}-${input.slice(6)}`
        }
    
        setNumber(formattedInput);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const ddd = number.substring(0, 2);
        const phoneNumber = number.substring(2);
        console.log(name);
        console.log(email);
        console.log(number);
        console.log(password);
    }

    return (
        <section className="m-4 p-4 max-h-screen">
            <h1 className="text-3xl mb-5">Cadastro</h1>
            <form className="flex flex-col gap-5">
                <input 
                    placeholder="Nome completo" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    type="text" 
                    required 
                    className="w-full text-base bg-formbg rounded-lg text-forminput py-5 pl-6 outline-none pr-6"/>
                <input 
                    placeholder="E-mail" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    required className="w-full text-base bg-formbg rounded-lg text-forminput py-5 pl-6 outline-none  pr-6"/>
                <input
                    placeholder="Número de telefone" 
                    value={number} 
                    onChange={handlePhoneNumberChange} 
                    required
                    id="number"
                    type="text"  
                    maxLength={14}
                    className="w-full text-base bg-formbg rounded-lg text-forminput py-5 pl-6 outline-none  pr-6"/>
                <div className="flex bg-formbg rounded-lg">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        required
                        minLength={8}
                        maxLength={15}
                        pattern=".*[!@#$%^&*()_+{}\|;:'\,.<>?/\\[\]~-].*"
                        title="Pelo menos um caractere especial é necessário"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                            
                        placeholder="Senha"
                        className="w-full text-base bg-transparent text-forminput py-5 pl-6 outline-none"/>
                    <button
                        type="button"
                        className="mx-6"
                        onClick={handleTogglePassword}>
                        {showPassword ? <FaEye size={18} color={mainblueIcons}/> : <FaEyeSlash size={18} color={mainblueIcons}/>}
                    </button>
                </div>
                <div className="flex bg-formbg rounded-lg">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        required
                        minLength={8}
                        maxLength={15}
                        pattern=".*[!@#$%^&*()_+{}\|;:'\,.<>?/\\[\]~-].*"
                        title="Pelo menos um caractere especial é necessário"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirme sua senha"
                        className="w-full text-base bg-transparent text-forminput py-5 pl-6 outline-none"/>
                    <button
                        type="button"
                        className="mx-6"
                        onClick={handleToggleConfirmPassword}>
                        {showConfirmPassword ? <FaEye size={18} color={mainblueIcons}/> : <FaEyeSlash size={18} color={mainblueIcons}/>}
                    </button>
                </div>
                <button onSubmit={handleSubmit} type="submit" className="bg-mainblue text-formbg py-4 text-base rounded-lg shadow-xl hover:bg-mainbluehover duration-100 ease-in-out">Registrar</button>
            </form>
            <p className="text-center text-forminput my-7 text-base">ou continue com</p>
            <nav>
                <ul className="flex items-center justify-center gap-5 cursor-pointer mb-5">
                    <li><a href="#"><FaFacebook size={40} color={mainblueFace}/></a></li>
                    <li><a href="#"></a><FaApple size={40}/></li>
                    <li><a href="#"><FcGoogle size={40}/></a></li>
                </ul>
            </nav>
        </section>
    )
}