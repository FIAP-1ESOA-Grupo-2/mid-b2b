import Image from 'next/image'
import logoteste from '@/assets/images/logoteste.svg'
import imageMobile from '@/assets/images/Illustrationsignup.svg'
import Link from 'next/link';
import { UserAccountType } from '@/types/Auth';
import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import { goToNextStep, setData } from '@/redux/reducers/signUpReducer';


export const TipoConta = () => {
    const dispatch = useAppDispatch()
    const signUpData = useAppSelector(state => state.signUp.data)

    const handleButtonClick = (value: UserAccountType) => {
        dispatch(setData({ ...signUpData, accountType: value }));
        dispatch(goToNextStep())
    };

    return (
        <section className="sm:flex flex-col mx-auto  mt-12 justify-center">
            <section className="flex flex-col items-center justify-center p-4  ">
                <Image src={imageMobile} alt="Ilustração" className="mx-auto" />

                <section className='mt-6'>
                    <h1 className="text-3xl font-bold text-center">Selecione o tipo de conta</h1>
                    <p className=' mb-12 max-w-md text-center text-slate-700 text-sm'>
                        Escolha com qual tipo de conta deseja se registrar!  Você poderá alterar depois o tipo da sua conta a qualquer momento.
                    </p>

                    <div className="flex flex-col gap-6">
                        <button
                            onClick={() => handleButtonClick('buyer')}
                            className={`text-base py-4 px-16  border-2 border-mainblue transition-all  ${signUpData.accountType === 'buyer' ? 'bg-mainblue text-white' : 'text-mainblue hover:bg-mainblue hover:border-mainblue hover:text-white'}  rounded-lg  `} type="button">
                            Comprador
                        </button>
                        <button
                            onClick={() => handleButtonClick('seller')}
                            className={`text-base py-4 px-16  border-2 border-mainblue transition-all ${signUpData.accountType === 'seller' ? 'bg-mainblue text-white' : 'text-mainblue hover:bg-mainblue hover:border-mainblue hover:text-white'}  rounded-lg `} type="button">
                            Vendedor
                        </button>
                    </div>
                    <p className="text-center my-11">
                        Já tem uma conta?
                        <Link className="text-mainblue hover:text-mainbluehover hover:underline font-semibold" href="/auth/signin"> Faça login</Link>
                    </p>
                </section>
            </section>
        </section>
    )
}