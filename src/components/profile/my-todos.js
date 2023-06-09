import ToDos from "../todos";
import {useSelector} from "react-redux";


const MyToDos = () => {
    // Instead of this, we'd use a function to only show profile-owner's todos
    let todos = useSelector((state) => state.todos);

    return (
        <ToDos todos={todos}/>
    )
}

export default MyToDos;