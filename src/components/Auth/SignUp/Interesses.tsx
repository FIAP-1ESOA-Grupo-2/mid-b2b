import { FormEvent, useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Spinner, useToast } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import { Interest } from "@/types/Interest";
import { createInterest, getInterests, setUserInterests } from "@/server/services/interestService";
import { goToStep, resetSignUp, setData, setInterests, setInterestsSelected, setLoading } from "@/redux/reducers/signUpReducer";
import { createUser } from "@/server/services/authService";
import { createAccountProvider } from "@/server/services/authProvidersService";
import { signIn } from "next-auth/react";
import { useRouter } from "next13-progressbar";

export const Interesses = () => {
    const signUp = useAppSelector(state => state.signUp)
    const dispatch = useAppDispatch()

    const [searchQuery, setSearchQuery] = useState('')
    const [interestsLoaded, setInterestsLoaded] = useState(false)
    const [interestsFiltered, setInterestsFiltered] = useState<Interest[]>([])
    const [newTodo, setNewTodo] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)

    const toast = useToast()
    const router = useRouter()

    const handleGetInterests = async () => {
        setInterestsLoaded(false)
        const interests = await getInterests()

        dispatch(setInterests(interests))

        if (!searchQuery) {
            setInterestsFiltered(interests)
        }

        setInterestsLoaded(true)
    }

    const handleSearch = (query: string) => {
        setSearchQuery(query)

        const interestsFiltered = signUp.interests.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
        )

        setInterestsFiltered(interestsFiltered)
    }


    const handleCreateAccount = async () => {
        const { data, interestsSelected, provider, step } = signUp

        if (step == 3 && interestsSelected.length >= 3) {
            dispatch(setLoading({ title: 'Por favor aguarde, estamos criando sua conta...', isLoading: true }))

            const newUser = await createUser(data.name, data.email, data.cpf, data.sector, data.role, data.password, data.accountType, data.phone_number)
            if (newUser.error || !newUser.data) {
                toast({
                    title: 'Erro ao criar conta',
                    description: newUser.error,
                    status: 'error',
                    position: 'top-right',
                    duration: 3000,
                    isClosable: true
                })

                if (newUser.errorCode == 'EMAIL_ALREADY_IN_USE') {
                    dispatch(setData({ ...data, emailVerified: false, email: '' }))
                }

                dispatch(goToStep(1))
                dispatch(setLoading({ title: '', isLoading: false }))

                return;
            }

            if (provider.provider) {
                await createAccountProvider({ user_id: newUser.data.id, provider_id: provider.provider_id, provider: provider.provider })
            }

            await setUserInterests(newUser.data.id, signUp.interestsSelected)
            await signIn("credentials", { email_or_cpf: data.email, password: data.password, redirect: false })

            toast({
                title: 'Conta criada com sucesso!',
                description: 'Agora você pode iniciar a jornada de negócios',
                status: 'success',
                position: 'top-right',
                duration: 2000,
                isClosable: true
            })

            await router.push('/dashboard')

            dispatch(setLoading({ title: '', isLoading: false }))
            dispatch(resetSignUp())
        }
    }


    const handleAdd = async (e: FormEvent) => {
        e.preventDefault()

        if (!newTodo) {
            toast({
                title: 'Digite o título do novo interesse...',
                status: 'error',
                position: 'top-right',
                duration: 1000
            })
            return;
        }

        if (newTodo.length >= 50) {
            toast({
                title: 'O título deve ter no maximo 50 caracteres',
                status: 'error',
                position: 'top-right',
                duration: 2000
            })
            return;
        }

        setInterestsLoaded(false)
        const newInterest = await createInterest(newTodo)

        if (newInterest.action == 'interest_exists') {
            toast({
                title: 'Este interesse já existe',
                description: 'Adicionamos ele automaticamente no seu perfil!',
                status: 'info',
                position: 'top-right',
                duration: 3000,
                isClosable: true
            })
        }

        if (!signUp.interestsSelected.includes(newInterest.data.id)) {
            dispatch(setInterestsSelected([...signUp.interestsSelected, newInterest.data.id]))
        }

        if (newInterest.action == 'interest_created') {
            toast({
                title: 'Interesse adicionado com sucesso!',
                description: 'Adicionamos ele automaticamente no seu perfil!',
                status: 'success',
                position: 'top-right',
                duration: 3000,
                isClosable: true
            })
        }

        // Get with new interests
        await handleGetInterests()

        setDialogOpen(false)
        setNewTodo('')
        setInterestsLoaded(true)
    }

    const handleToggleInterestSelected = (id: number) => {
        const interestsSelected = signUp.interestsSelected
        if (interestsSelected.includes(id)) {
            dispatch(setInterestsSelected(interestsSelected.filter((item) => item !== id)))
        } else {
            dispatch(setInterestsSelected([...interestsSelected, id]))
        }
    }

    useEffect(() => {
        handleGetInterests()
    }, [])

    return (
        <section className="m-4 p-4 max-w-screen-md mx-auto">
            <h1 className="text-3xl font-bold text-center">Interesses</h1>
            <p className='mb-6 text-center text-slate-700 text-sm'>
                Escolha seus interesses ou adicione novos, e eles serão visíveis para todos os usuários.
            </p>

            <div className="flex gap-2 items-center bg-formbg py-3 px-5 mt-5 rounded-lg">
                <MdOutlineSearch size={26} className="text-neutral-500" />
                <input className="text-forminput w-full bg-transparent outline-none focus:text-zinc-600 "
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        handleSearch(e.target.value)
                    }}
                    placeholder="Procurar..." />
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    <button className="flex items-center bg-mainblue rounded-md w-full justify-center text-formbg text-md my-4 outline-none" >
                        <IoIosAdd size={30} />
                        <h3 className="py-2.5 font-semibold">Adicionar novo interesse</h3>
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Adicionar novo interesse</DialogTitle>
                        <DialogDescription>
                            Adicione um novo interesse. Este interesse será visível para todos os usuários.
                        </DialogDescription>
                    </DialogHeader>
                    <form className="grid gap-4 " onSubmit={handleAdd}>
                        <div className="flex items-center gap-4">
                            <Label htmlFor="name" className="text-right text-base">
                                Interesse:
                            </Label>
                            <input
                                placeholder="Digite seu novo interesse"
                                id="name"
                                value={newTodo}
                                className="w-full text-base border  bg-formbg rounded-lg text-forminput py-3 pl-4 outline-none pr-6"
                                onChange={(e) => setNewTodo(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="mt-6 bg-mainblue text-formbg px-6 py-3 rounded-lg text-base hover:bg-mainbluehover ease-in-out duration-100 outline-none">Adicionar</button>
                    </form>
                </DialogContent>
            </Dialog>

            <div className="pl-1">
                <p className="text-mainblue text-base">
                    {signUp.interestsSelected.length < 3 && 'Escolha pelo menos 3 interesses'}
                    {signUp.interestsSelected.length >= 3 && `${signUp.interestsSelected.length} interesses selecionados`}
                </p>

                {!interestsLoaded &&
                    <div className="h-72 flex items-center justify-center">
                        <Spinner color='blue.500' size='lg' thickness='3px' />
                    </div>
                }

                {interestsLoaded &&
                    <ul className="mx-auto rounded  flex flex-wrap gap-4 py-4 mb-10">
                        {interestsFiltered.map((item) => (
                            <li
                                key={item.id}
                                onClick={() => handleToggleInterestSelected(item.id)}
                                className={`select-none px-3 py-2 transition  text-lg rounded-lg flex items-center text-textgrey cursor-pointer max-w-fit ${signUp.interestsSelected.includes(item.id) ? "bg-[#007AB5]" : "bg-formbg"}`}
                            >
                                <FaPlus color={signUp.interestsSelected.includes(item.id) ? "white" : "#00ACFF"} className="mr-3" />
                                <span className={`text-forminput  ${signUp.interestsSelected.includes(item.id) && "text-white"}`}>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                }
            </div>

            <div className={`${signUp.step == 3 && signUp.interestsSelected.length >= 3 ? 'bottom-3 md:bottom-10' : '-bottom-20'} fixed mx-4 md:w-[750px] left-0 right-0 md:mx-auto duration-500 `}>
                <button
                    onClick={signUp.step == 3 && signUp.interestsSelected.length >= 3 ? handleCreateAccount : () => null}
                    className="bg-emerald-600  text-gray-50 py-3 font-semibold rounded-lg shadow-xl hover:bg-emerald-500  hover:scale-110 duration-300 ease-in-out w-full"
                >Criar conta</button>
            </div>
        </section >


    )
}