import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDeleteTodoMutation, useUpdateTodoMutation } from "../features/todos/todosApiSlice";
import { useState } from 'react';


const EditTodo = ({ todo }) => {
    const [checked, setChecked] = useState(todo.completed)

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
                        <FontAwesomeIcon icon={faCheck} className='check_icon' />
                        : ''
                }
                </div>
                <label htmlFor="checkbox" className={todo.completed ? 'active' : 'todo_title'}>{todo.content}</label>
            </div>
            <div className="delete_section" onClick={() => deleteTodo({ id: todo.id })}>
                <FontAwesomeIcon icon={faTrash} />
            </div>
        </div>

    )
}

export default EditTodo

