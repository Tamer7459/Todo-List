import { createContext, useState, useEffect } from 'react'

export const TodoContext = createContext()

export default function TodoProvider({ children }) {
    // ✅ استرجاع من localStorage عند أول تحميل
    const [todosList, setTodosList] = useState(() => {
        const saved = localStorage.getItem('todos')
        return saved ? JSON.parse(saved) : []
    })

    // ✅ تحديث localStorage كلما تغيّرت todosList
    useEffect(() => {
        return () => {
            localStorage.setItem('todos', JSON.stringify(todosList))
        }
    }, [todosList])

    return (
        <TodoContext.Provider value={{ todosList, setTodosList }}>
            {children}
        </TodoContext.Provider>
    )
}
