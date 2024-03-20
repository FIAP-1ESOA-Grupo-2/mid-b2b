"use client";

import { User } from "@/types/Auth"
import { FormEvent, useEffect, useState } from "react";
import { MdSearch } from "react-icons/md"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { IoIosAdd } from "react-icons/io";
import { Progress, Skeleton, useToast } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { createInterest, deleteUserInterests, getInterests, getUserInterests, setUserInterests } from "@/server/interestService";
import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import { setBtnVisible, setInitLoaded, setInterests, setInterestsFiltered, setInterestsSelected, setInterestsUserSelected } from "@/redux/reducers/interestsReducer";

type Props = {
    user: User
}

export const DashboardInterestsPage = ({ user }: Props) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchQueryFocused, setSearchQueryFocused] = useState(false)
    const [newInterest, setNewInterest] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    const { interests, interestsSelected, initLoaded, interestsUserSelected, interestsFiltered, btnVisible } = useAppSelector(state => state.interests)

    const toast = useToast()
    const dispatch = useAppDispatch()

    const handleGetInterests = async () => {
        setLoading(true)
        const [interestsData, userInterests] = await Promise.all([
            getInterests(),
            getUserInterests(user.id)
        ])
        setLoading(false)

        dispatch(setInterests(interestsData))
        dispatch(setInterestsUserSelected(userInterests.map((item) => item.id)))

        if (interestsSelected.length === 0) dispatch(setInterestsSelected(userInterests.map((item) => item.id)))

        if (!searchQuery) dispatch(setInterestsFiltered(interestsData))
    }

    const handleOnSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!newInterest) {
            toast({
                title: 'Digite o título do novo interesse...',
                status: 'error',
                position: 'top-right',
                duration: 1000
            })
            return;
        }

        if (newInterest.length >= 50) {
            toast({
                title: 'O título deve ter no maximo 50 caracteres',
                status: 'error',
                position: 'top-right',
                duration: 2000
            })
            return;
        }

        setLoading(true)
        const newInterestResponse = await createInterest(newInterest)

        if (newInterestResponse.action == 'interest_exists') {
            toast({
                title: 'Este interesse já existe e foi adicionado automaticamente',
                description: 'Clique em salvar para atualizar seus interesses!',
                status: 'info',
                position: 'top-right',
                duration: 3000,
                isClosable: true
            })
        }

        if (!interestsSelected.includes(newInterestResponse.data.id)) {
            dispatch(setInterestsSelected([...interestsSelected, newInterestResponse.data.id]))
        }

        if (newInterestResponse.action == 'interest_created') {
            toast({
                title: 'Interesse adicionado com sucesso!',
                description: 'Clique em salvar para atualizar seus interesses!',
                status: 'success',
                position: 'top-right',
                duration: 3000,
                isClosable: true
            })
        }

        // Get with new interests
        await handleGetInterests()

        setDialogOpen(false)
        setNewInterest('')
        setLoading(false)
    }

    const handleSearch = (query: string) => {
        setSearchQuery(query)

        const interestsFilteredData = interests.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
        )

        dispatch(setInterestsFiltered(interestsFilteredData))
    }

    const handleToggleInterestSelected = (id: number) => {
        if (interestsSelected.includes(id)) {
            dispatch(setInterestsSelected(interestsSelected.filter((item) => item !== id)))
        } else {
            dispatch(setInterestsSelected([...interestsSelected, id]))
        }
    }

    const handleUpdateUserInterests = async () => {
        setLoading(true)

        await deleteUserInterests(user.id)
        await setUserInterests(user.id, interestsSelected)
        dispatch(setInterestsUserSelected(interestsSelected))

        toast({
            title: 'Interesses atualizados com sucesso!',
            description: 'Eles serão visíveis para todos os usuários!',
            status: 'success',
            position: 'top-right',
            duration: 3000,
            isClosable: true
        })

        setLoading(false)
        dispatch(setBtnVisible(false))
    }

    useEffect(() => {
        if (!initLoaded) {
            handleGetInterests();
            dispatch(setInitLoaded(true));
        } else {
            if (interests.length >= 1) setLoading(false)
        }
    }, [initLoaded])

    useEffect(() => {
        dispatch(setBtnVisible(interestsSelected.length >= 3 && JSON.stringify(interestsSelected.toSorted()) !== JSON.stringify(interestsUserSelected.toSorted())))
    }, [interestsSelected, interestsUserSelected])

    return (
        <>
            <div className="border-b border-slate-200 rounded-t-xl pt-5 pb-4 px-4 lg:px-8">
                <span className="text-xl font-bold text-slate-700">Meu Interesses</span>
                <p className="text-sm text-slate-500">
                    Escolha seus interesses ou adicione novos, e eles serão visíveis para todos os usuários!
                </p>
            </div>

            {loading &&
                <Progress size='xs' isIndeterminate />
            }

            <div className="px-4 lg:px-8 flex flex-col relative">
                <div className="flex gap-2.5 items-center bg-formbg py-2.5 md:py-3 px-5 mt-5 rounded-lg border border-slate-200">
                    <MdSearch size={26} className={`duration-300 ${searchQueryFocused ? 'text-mainblue' : 'text-slate-600'}`} />

                    <input className="text-forminput w-full bg-transparent  outline-none  focus:text-slate-600 transition-all  mt-[1px]"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            handleSearch(e.target.value)
                        }}
                        onFocus={() => setSearchQueryFocused(true)}
                        onBlur={() => setSearchQueryFocused(false)}
                        placeholder="Procurar interesses..." />
                </div>

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Skeleton isLoaded={!loading} className="my-4" style={{ borderRadius: 5 }}>
                            <button className="flex items-center bg-mainblue rounded-md w-full justify-center text-formbg text-md  outline-none shadow-md hover:shadow-lg fo:bg-mainbluehover duration-300" >
                                <IoIosAdd size={30} />
                                <h3 className="py-2 md:py-2.5 font-semibold">Adicionar novo interesse</h3>
                            </button>
                        </Skeleton>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Adicionar novo interesse</DialogTitle>
                            <DialogDescription>
                                Adicione um novo interesse. Este interesse será visível para todos os usuários.
                            </DialogDescription>
                        </DialogHeader>
                        <form className="grid gap-4 " onSubmit={handleOnSubmit}>
                            <div className="flex items-center gap-4">
                                <Label htmlFor="name" className="text-right text-base">
                                    Interesse:
                                </Label>
                                <input
                                    placeholder="Digite seu novo interesse"
                                    id="name"
                                    value={newInterest}
                                    className="w-full text-base border  bg-formbg rounded-lg text-forminput py-3 pl-4 outline-none pr-6"
                                    onChange={(e) => setNewInterest(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="mt-6 bg-mainblue text-formbg px-6 py-3 rounded-lg text-base hover:bg-mainbluehover ease-in-out duration-100 outline-none">Adicionar</button>
                        </form>
                    </DialogContent>
                </Dialog>

                <div className="pl-1">
                    <p className="text-mainblue text-base">
                        {interestsSelected.length < 3 && 'Escolha pelo menos 3 interesses'}
                        {interestsSelected.length >= 3 && `${interestsSelected.length} interesses selecionados`}
                    </p>

                    <ul className="mx-auto rounded  flex flex-wrap gap-4 py-4 mb-10">
                        {interestsFiltered.map((item) => (
                            <li key={item.id}>
                                <Skeleton
                                    isLoaded={!loading}
                                    onClick={() => handleToggleInterestSelected(item.id)}
                                    style={{ borderRadius: 5 }}
                                    className={`select-none px-3 py-2 transition  text-md rounded-lg flex items-center text-textgrey cursor-pointer  max-w-fit ${interestsSelected.includes(item.id) ? "bg-[#007AB5]" : "bg-formbg"}`}
                                >
                                    <FaPlus color={interestsSelected.includes(item.id) ? "white" : "#00ACFF"} className="mr-3" />
                                    <span className={`text-forminput ${interestsSelected.includes(item.id) && "text-white"}`}>{item.title}</span>
                                </Skeleton>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="absolute left-0 w-full h-full flex items-center justify-center pointer-events-none">
                    <button
                        onClick={btnVisible && !loading ? handleUpdateUserInterests : () => null}
                        className={`${btnVisible && !loading ? 'bottom-20 px-5 sm:bottom-8' : '-bottom-20'}  max-[430px]:w-60 max-[490px]:w-80 w-96  bg-emerald-600 fixed  pointer-events-auto text-gray-50 py-3 font-semibold rounded-lg shadow-xl hover:bg-emerald-500 hover:shadow-2xl duration-300 ease-in-out md:w-full max-w-screen-sm outline-none`}
                    >Salvar interesses</button>
                </div>
            </div>
        </>
    )
}