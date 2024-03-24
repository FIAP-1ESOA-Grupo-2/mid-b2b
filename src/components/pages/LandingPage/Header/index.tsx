import Image from "next/image"
import LogoHeader from "@/assets/images/logo.svg"
import Link from "next/link"
import { IconButton, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, border } from "@chakra-ui/react"
import { HiOutlineMenuAlt4 } from "react-icons/hi";

export const HeaderLP = () => {

    const colorMainBlue = '#00ACFF'

    return (
        <header className="bg-white shadow-sm border-b border-b-slate-200 px-0 sm:px-7 h-24 fixed w-full">
            <nav className="flex justify-between items-center max-w-screen-xl sm:mx-auto h-full mx-7">
                <Image src={LogoHeader} alt="Logo"/>
                <nav className="hidden xl:block">
                    <ul className="flex gap-10 text-gray-900 text-lg">
                        <li><Link href="#inicio">Início</Link></li>
                        <li><Link href="#porqueusar">Por que nos escolher</Link></li>
                        <li><Link href="#comofunciona">Como funciona</Link></li>
                        <li><Link href="#depoimentos">Depoimentos</Link></li>
                    </ul>
                </nav>
                <nav className="hidden xl:block">
                    <ul className="flex gap-8">
                        <li><Link className="text-lg text-gray-600" href='/auth/signin'>Login</Link></li>
                        <li><Link className="text-white bg-mainblue rounded-full px-8 py-4" href='/auth/signup'>Cadastro</Link></li>
                    </ul>
                </nav>
                <section className="xl:hidden">
                    <Menu >
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            borderWidth='0px'
                            _hover={{bg:"transparent"}}
                            icon={<HiOutlineMenuAlt4 size={32} color="#00ACFF"/>}
            
                        />
                        <MenuList>
                            <MenuGroup title="Profile" color={colorMainBlue}>
                                <MenuItem as='a' href="/auth/signin">
                                    Login
                                </MenuItem>
                                <MenuItem as='a' href="/auth/signup">
                                    Cadastro
                                </MenuItem>
                            </MenuGroup>
                            <MenuDivider/>
                            <MenuGroup title="Help" color={colorMainBlue}>
                                <MenuItem as='a' href="#inicio">
                                    Início
                                </MenuItem>
                                <MenuItem as='a' href="#porqueusar">
                                    Por que nos escolher
                                </MenuItem>
                                <MenuItem as='a' href="#comofunciona">
                                    Como funciona
                                </MenuItem>
                                <MenuItem as='a' href="#depoimentos">
                                    Depoimentos
                                </MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                </section>
            </nav>
        </header>
    )
}