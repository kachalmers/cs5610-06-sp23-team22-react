import ToDos from "../todos";
import {useSelector} from "react-redux";


const MyToDosScreen = () => {
    // Instead of this, we'd use a function to only show profile-owner's todos
    let todos = useSelector((state) => state.todos);

    return (
        <div>
            [create todo box]
            <ToDos todos={todos}/>
        </div>

    )
}

export default MyToDosScreen;