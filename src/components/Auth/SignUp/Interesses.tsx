import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";

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
        { id: 4, text: 'Contrucao', completed: false },
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
        <section className="m-4 p-4 max-h-screen">
            <h1 className="text-4xl">Interesses</h1>
            <div className="flex items-center bg-formbg my-3 p-4 rounded-xl">
                <CiSearch size={30} color="formbg" className="mr-3"/>
                <input className="text-2xl text-textgrey w-full bg-transparent outline-none active:text-textgrey" type="text" placeholder="Search"/>
            </div>
            <p className="text-mainblue">Escolha mais de 3 interesses</p>
            <button className="flex items-center">
                <IoIosAdd />
                <h2>Adicionar novo interesse</h2>
            </button>
            <div>
                <h1>Todo List</h1>

                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                    setSearchQuery(e.target.value)
                    handleSearch(e.target.value)
                    }}
                    placeholder="Search todos..."/>

                <ul>
                    {todos.map((todo) => (
                    <li key={todo.id}>{todo.text}</li>
                    ))}
                </ul>

                <div>
                    <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add new todo..."/>
                    <button onClick={handleAdd}>Add</button>
                </div>
                </div>
        </section>
    )
}