import ToDo from "./todo.js";
const ToDos = ({todos = []}) => {
        return(
        <div>
            <ul className="list-group">
                {
                    todos.map(todo => {
                        return (
                            <ToDo key={todo._id}
                                  todo={todo}/>
                        );
                    })
                }
            </ul>
        </div>
    )
}
export default ToDos;