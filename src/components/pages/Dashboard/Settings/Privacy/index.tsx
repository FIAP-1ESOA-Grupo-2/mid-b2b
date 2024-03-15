import Link from "next/link"
import { HiArrowSmLeft } from "react-icons/hi"

export const DashboardSettingsPrivacyPage = () => {
    return (
        <div className="bg-white rounded-xl border shadow-sm border-slate-200">
            <div className="border-b border-slate-200 rounded-t-xl pt-5 pb-4 px-4 lg:px-8 flex gap-4 items-center">
                <Link className="" href="/dashboard/settings">
                    <HiArrowSmLeft className="text-slate-600 duration-200 cursor-pointer hover:text-mainblue" size={24} />
                </Link>

                <div>
                    <span className="text-xl font-bold text-slate-700">Politica de privacidade</span>
                    <p className="text-sm text-slate-500">
                        Saiba sobre nossa política de privacidade para os usuários!
                    </p>
                </div>
            </div>

            <div className="pt-5 pb-7 px-4 lg:px-8">
                <section className="flex flex-col gap-2">
                    <p className="text-sm text-gray-500 -mb-1">Data de atualização: 06 de março de 2024</p>
                    <p className="font-bold text-xs text-gray-500">Tempo de leitura: 20 minutos</p>
                </section>

                <section className="flex flex-col gap-5 mt-6">
                    <article>
                        <h1 className="text-xl text-mainblue">1. Cláusula</h1>
                        <p className="text-sm text-slate-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Tempore officiis, perferendis deserunt beatae harum exercitationem
                            minima veniam magni ea itaque architecto rerum soluta officia adipisci
                            laborum eligendi, repellendus, reprehenderit inventore?</p>
                    </article>
                    <article>
                        <h1 className="text-xl text-mainblue">2. Cláusula</h1>
                        <p className="text-sm text-slate-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Tempore officiis, perferendis deserunt beatae harum exercitationem
                            minima veniam magni ea itaque architecto rerum soluta officia adipisci
                            laborum eligendi, repellendus, reprehenderit inventore?</p>
                    </article>
                    <article>
                        <h1 className="text-xl text-mainblue">3. Cláusula</h1>
                        <p className="text-sm text-slate-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Tempore officiis, perferendis deserunt beatae harum exercitationem
                            minima veniam magni ea itaque architecto rerum soluta officia adipisci
                            laborum eligendi, repellendus, reprehenderit inventore?</p>
                    </article>
                    <article>
                        <h1 className="text-xl text-mainblue">4. Cláusula</h1>
                        <p className="text-sm text-slate-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Tempore officiis, perferendis deserunt beatae harum exercitationem
                            minima veniam magni ea itaque architecto rerum soluta officia adipisci
                            laborum eligendi, repellendus, reprehenderit inventore?</p>
                    </article>
                    <article>
                        <h1 className="text-xl text-mainblue">5. Cláusula</h1>
                        <p className="text-sm text-slate-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Tempore officiis, perferendis deserunt beatae harum exercitationem
                            minima veniam magni ea itaque architecto rerum soluta officia adipisci
                            laborum eligendi, repellendus, reprehenderit inventore?</p>
                    </article>
                </section>
            </div>
        </div>
    )
}