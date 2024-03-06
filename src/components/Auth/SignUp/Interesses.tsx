import { useState } from "react";
import { CiSearch } from "react-icons/ci";
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

interface Todo {
    id: number
    text: string
    completed: boolean
}

export const Interesses = () => {
    const initialTodos: Todo[] = [
        { id: 1, text: 'Tecnologia', completed: false },
        { id: 2, text: 'Financas', completed: false },
        { id: 3, text: 'Contabilidade', completed: false },
        { id: 4, text: 'ReactJS', completed: false },
        { id: 5, text: 'NextJS', completed: false },
        { id: 6, text: 'JavaScript', completed: false },
        { id: 7, text: 'TypeScript', completed: false },
        { id: 8, text: 'Java', completed: false },
        { id: 9, text: 'Spring', completed: false },
        { id: 10, text: 'DevOps', completed: false },
        { id: 11, text: 'Tecnologia2', completed: false },
        { id: 12, text: 'Financas2', completed: false },
        { id: 13, text: 'Contabilidade2', completed: false },
        { id: 14, text: 'ReactJS2', completed: false },
        { id: 15, text: 'NextJS2', completed: false },
        { id: 16, text: 'JavaScript2', completed: false },
        { id: 17, text: 'TypeScript2', completed: false },
        { id: 18, text: 'Java2', completed: false },
        { id: 19, text: 'Spring2', completed: false },
        { id: 20, text: 'DevOps2', completed: false },
    ]

    const [todos, setTodos] = useState<Todo[]>(initialTodos)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [newTodo, setNewTodo] = useState<string>('')

    const handleSearch = (query: string) => {
        setSearchQuery(query)
        const filteredTodos = initialTodos.filter((todo) =>
            todo.text.toLowerCase().includes(query.toLowerCase())
        )
        setTodos(filteredTodos)
    }

    const handleAdd = () => {
        if (newTodo.trim() === '') {
            return
        }

        const newTodoItem: Todo = { id: todos.length + 1, text: newTodo, completed: false }
        setTodos([...todos, newTodoItem])
        setNewTodo('')
    }
    return (
        <section className="m-4 p-4">
            <h1 className="text-3xl font-bold">Interesses</h1>
            <div className="flex items-center bg-formbg my-3 p-4 rounded-xl">
                <CiSearch size={30} color="formbg" className="mr-3" />
                <input className="text-xl text-slate-200 w-full bg-transparent outline-none focus:text-slate-500"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        handleSearch(e.target.value)
                    }}
                    placeholder="Procurar..." />
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <button className="flex items-center bg-mainblue rounded-lg w-full justify-center text-formbg text-lg my-4">
                        <IoIosAdd />
                        <h2 className="py-3">Adicionar novo interesse</h2>
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Adicionar novo interesse</DialogTitle>
                        <DialogDescription>
                            Adicione um novo interesse. Este interesse será visível para todos os usuários.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex items-center gap-4">
                            <Label htmlFor="name" className="text-right text-base">
                                Interesse:
                            </Label>
                            <input
                                placeholder="Digite seu novo interesse"
                                id="name"
                                value={newTodo}
                                className="w-full text-base border  bg-formbg rounded-lg text-forminput py-3 pl-4 outline-none pr-6"
                                onChange={(e) => setNewTodo(e.target.value)} />
                        </div>
                    </div>
                    <DialogFooter>
                        <button type="submit" className="bg-mainblue text-formbg px-6 py-3 rounded-lg text-base hover:bg-mainbluehover ease-in-out duration-100" onClick={handleAdd}>Adicionar</button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className=" overflow-auto max-h-[calc(100vh-400px)]  pl-1">
                <p className="text-mainblue text-base">Escolha mais de 3 interesses</p>
                <ul className="mx-auto rounded  flex flex-wrap gap-4 py-4 ">
                    {todos.map((todo) => (
                        <li key={todo.id}
                            className="px-5 py-4 bg-formbg text-xl rounded-lg flex items-center text-textgrey cursor-pointer max-w-fit">
                            <FaPlus color="#00ACFF" className="mr-3" />
                            {todo.text}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}