'use client'
import { Banner } from "@/components/Auth/Banner"
import { useState } from "react";
import { FaEye, FaEyeSlash, FaFacebook, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [isToggled, setToggled] = useState(false);
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
        <div className='grid grid-cols-2'>
            <div className="col-span-1">
                <Banner/>
            </div>
            {/* Login */}
            <div className="flex flex-col items-center justify-center col-span-1">
                <h1 className="text-3xl mb-6 font-bold">Faça seu Login</h1>
                <form>
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Email" className="w-full mb-6 text-base rounded-lg bg-formbg px-8 py-5 outline-none"/>
                    <div className="w-full flex items-center bg-formbg mb-6 px-8 py-5 ">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full text-base rounded-lg bg-transparent outline-none mr-2"
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={handleTogglePassword}
                        >
                            {showPassword ? <FaEye color={mainblueIcons}/> : <FaEyeSlash color={mainblueIcons}/>}
                        </button>
                    </div>
                    <div className="flex text-xs text-textgrey justify-between mb-8">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="remember" checked={isToggled} onChange={handleToggle}/> 
                            <label htmlFor="remember">Lembrar senha</label>
                        </div>
                        <a href="#">Esqueceu sua senha?</a>
                    </div>
                    <button type="submit" onClick={handleSubmit} className="w-full text-base bg-mainblue rounded-lg text-white px-40 py-5 hover:bg-mainbluehover ease-in-out duration-100">
                        Login
                    </button>
                </form>
                <p className="font-base text-textgrey my-8">ou continue com</p>
                <div>
                    <ul className="flex gap-3">
                        <li><FaApple size={40}/></li>
                        <li><FaFacebook color={mainblueFace} size={40}/></li>
                        <li><FcGoogle size={40}/></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}