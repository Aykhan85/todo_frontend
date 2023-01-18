import { useSelector } from "react-redux";
import { selectAllTodos, selectTodoIds, useGetTodosQuery } from "../features/todos/todosApiSlice";
import EditTodo from "./EditTodo";

const Main = () => {

    const { data: todos, isSuccess, isLoading } = useGetTodosQuery()
    const ids = useSelector(state => selectTodoIds(state))
    let content;

    if (isLoading) {
        content = <div>Loading...</div>
    } else if (isSuccess) {
        content = ids.map(id => (
            <EditTodo key={id} todo={todos.entities[id]} />
        ))

    }
    return (
        <main className='main'>
            {content}
        </main>
    )
}

export default Main