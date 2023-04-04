import React, {useState} from "react";
import ToDos from "../todos";
import {createtodo} from "../reducers/todos-reducer";
import {useDispatch, useSelector} from "react-redux";

const MyToDosScreen = () => {
    // Instead of this, we'd use a function to only show profile-owner's todos
    let profile = useSelector((state) => state.profile);
    let todos = useSelector((state) => state.todos);
    let [newTodo, setNewTodo] = useState('');
    const dispatch = useDispatch();

    const todoAddHandler = () => {
        if (newTodo === '') {
            alert("I'm sure you have something to do!")
        } else {
            const newTodoObject = {
                todo: newTodo,
                userName: profile.userName,
                handle: profile.handle,
                time: '0h'
            }
            dispatch(createtodo(newTodoObject));
            setNewTodo('');
        }
    }

    return (
        <div>
            <div className="d-flex pb-2">
                <div className="pe-2 flex-grow-1">
                    <textarea value={newTodo} placeholder="What do you have to do?"
                              className="form-control border-0 flex-grow-1 bg-light"
                              onChange={(event) => setNewTodo(event.target.value)}>
                    </textarea>
                </div>
                <div>
                    <button className="rounded-pill btn btn-primary float-end mt-2 ps-3 pe-3 fw-bold"
                            onClick={todoAddHandler}>
                        Add To-Do
                    </button>
                </div>
            </div>
            <ToDos todos={todos}/>
        </div>

    )
}

export default MyToDosScreen;