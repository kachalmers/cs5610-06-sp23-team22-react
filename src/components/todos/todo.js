import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {useDispatch} from "react-redux";
import {completeToggle} from "../reducers/todos-reducer"

const ToDo = ({todo}) => {
    const dispatch = useDispatch();
    const toggleCompleteHandler = (id) => {
        dispatch(completeToggle(id));
    }
    return (
        <div className="list-group-item">
            <div className="d-flex align-items-center">
                <div className="fs-1 me-2">
                    {
                        todo.completed &&
                        <div    className="text-success"
                                onClick={() => toggleCompleteHandler(todo._id)}
                        >
                            <FontAwesomeIcon icon="fa-regular fa-circle-check"/>
                        </div>
                    }
                    {
                        !todo.completed &&
                        <div    className="text-danger"
                                onClick={() => toggleCompleteHandler(todo._id)}
                        >
                            <FontAwesomeIcon icon="fa-regular fa-circle text-danger"/>
                        </div>
                    }
                </div>

                <div className="d-flex col">
                    {todo.todo}
                </div>
            </div>
        </div>
    )
}
export default ToDo;