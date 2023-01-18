import { useDeleteTodoMutation, useUpdateTodoMutation } from "../features/todos/todosApiSlice";
import { useState } from 'react';
import { BsCheckLg } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'

const EditTodo = ({ todo }) => {

    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation()
    const handleCheck = async () => {

        try {
            await updateTodo({ ...todo, completed: !todo.completed }).unwrap()
        } catch (error) {
            console.log(error)
        } finally {
            setChecked(check => !check)
        }
    }

    return (
        <div className="main__section">
            <div className='main__content'>
                <div className="circle" onClick={() => handleCheck()}>{
                    todo.completed ?
                        <BsCheckLg className='check_icon' />
                        : ''
                }
                </div>
                <label htmlFor="checkbox" className={todo.completed ? 'active' : 'todo_title'}>{todo.content}</label>
            </div>
            <div className="delete_section" onClick={() => deleteTodo({ id: todo.id })}>
                <FaTrash />
            </div>
        </div>

    )
}

export default EditTodo

