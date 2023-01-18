import { useState } from "react"
import { useAddNewTodoMutation } from "../features/todos/todosApiSlice"

const Header = () => {
    return (
        <header className="header">
            <h1 className="title">Todo List App</h1>
        </header>
    )
}

export default Header;