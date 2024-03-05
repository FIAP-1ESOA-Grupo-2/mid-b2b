'use client'
import { Banner } from "@/components/Auth/Banner"
import { useState } from "react";
import { FaEye, FaEyeSlash, FaFacebook, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [isToggled, setToggled] = useState(true);
    const mainblueIcons = "#00ACFF"
    const mainblueFace = "#0163E0"

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleToggle = () => {
        setToggled(!isToggled);
      };

    const handleSubmit = (e: any) => {
        console.log(email);
        console.log(password);
        console.log(isToggled);
        e.preventDefault()
    }

    return (
        <div className='h-screen sm:flex flex-col items-center justify-center md:flex lg:grid grid-cols-2 w-screen overflow-hidden'>
            <div className="col-span-1 max-w-full">
                <Banner/>
            </div>
            <div className="h-screen flex flex-col items-center justify-center col-span-1 mx-10 my-auto sm:w-screen sm:mx-10 md:w-full sm:px-10 lg:m-auto">
                <h1 className="text-3xl lg:text-5xl mb-6 font-bold">Faça seu Login</h1>
                <form className="w-full">
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="E-mail" className="w-full mb-6 text-xl rounded-lg bg-formbg px-4 py-4 outline-none"/>
                    <div className="flex items-center bg-formbg mb-6 px-4 py-4 w-full">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Senha"
                            className="w-full text-xl rounded-lg bg-transparent outline-none mr-2"
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={handleTogglePassword}
                        >
                            {showPassword ? <FaEye color={mainblueIcons}/> : <FaEyeSlash color={mainblueIcons}/>}
                        </button>
                    </div>
                    <div className="flex flex-col md:flex-row text-xs text-textgrey justify-between mb-8">
                        <div className="fflex items-center gap-2 mb-4">
                            <input type="checkbox" id="remember" checked={isToggled} onChange={handleToggle} className="mr-2"/> 
                            <label htmlFor="remember" className="text-xl">Lembrar senha</label>
                        </div>
                        <a href="#" className="text-xl">Esqueceu sua senha?</a>
                    </div>
                    <button type="submit" onClick={handleSubmit} className="w-full text-xl bg-mainblue rounded-lg text-white px-6 py-4 hover:bg-mainbluehover ease-in-out duration-100">
                        Login
                    </button>
                </form>
                <p className="font-base text-textgrey my-8 text-base">ou continue com</p>
                <div>
                    <ul className="flex gap-3">
                        <li className="cursor-pointer"><FaApple size={40}/></li>
                        <li className="cursor-pointer"><FaFacebook color={mainblueFace} size={40}/></li>
                        <li className="cursor-pointer"><FcGoogle size={40}/></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}