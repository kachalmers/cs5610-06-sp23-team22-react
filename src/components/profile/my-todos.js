import ToDos from "../todos";
import {useSelector} from "react-redux";


const MyToDos = () => {
    let todos = useSelector((state) => state.todos);
    return (
        <ToDos todos={todos}/>
    )
}

export default MyToDos;