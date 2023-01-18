import { BsPlusLg } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import { useState } from 'react';
import { useAddNewTodoMutation } from '../features/todos/todosApiSlice'

const AddTodo = () => {
    const [modal, setModal] = useState(false)
    const [value, setValue] = useState('')
    const [addNewTodo] = useAddNewTodoMutation()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await addNewTodo({ content: value }).unwrap()
            setValue('')
            setModal(false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='plus_button' onClick={() => setModal(true)}>
            <BsPlusLg className='plus_icon' />
            {
                modal && (
                    <div className='modal' onClick={e => e.stopPropagation()}>
                        <div className="form_container">
                            <div className="close_icon" onClick={() => setModal(false)}>
                                <GrClose />
                            </div>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="addTodo">Add Todo</label>
                                <input type="text" id='addTodo' value={value} onChange={(e) => setValue(e.target.value)} />
                                <button className='add_button'>Submit</button>
                            </form>
                        </div>

                    </div>
                )
            }
        </div>
    )
}

export default AddTodo