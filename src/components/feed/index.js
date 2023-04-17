import {useSelector} from "react-redux";
import FeedItem from "./feed-item";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

const Feed = () => {
    // Instead of this, we'd use a function to only show friends'
    // completed todos (in the form of feed items)
    //let todos = useSelector((state) => state.todos);

    return(
        <div>
            <ul className="list-group">
                This is where likes will go
                <div className="d-flex row">
                    <div className="d-flex align-items-top col">
                        <FontAwesomeIcon icon="fa-solid fa-user" className="fs-6"/>
                        <FontAwesomeIcon icon="fa-regular fa-user" className="fs-5"/>
                        <FontAwesomeIcon icon="fa-solid fa-user" className="fs-6"/>
                    </div>
                    <div className="d-flex align-items-top col">
                        <FontAwesomeIcon icon="fa-regular fa-user" className="fs-6"/>
                        <FontAwesomeIcon icon="fa-regular fa-user" className="fs-5"/>
                        <FontAwesomeIcon icon="fa-regular fa-user" className="fs-6"/>
                    </div>
                    <div className="d-flex align-items-top col">
                        Followers:
                        <FontAwesomeIcon icon="fa-regular fa-user" className="fs-6"/>
                        <FontAwesomeIcon icon="fa-solid fa-user" className="fs-5"/>
                        <FontAwesomeIcon icon="fa-regular fa-user" className="fs-6"/>
                    </div>
                    <div className="d-flex align-items-top col">
                        <FontAwesomeIcon icon="fa-solid fa-user" className="fs-5"/>
                        <FontAwesomeIcon icon="fa-regular fa-user" className="fs-6"/>
                        <FontAwesomeIcon icon="fa-solid fa-user" className="fs-5"/>
                    </div>
                    <div className="d-flex align-items-top col">
                        Following:
                        <FontAwesomeIcon icon="fa-regular fa-user" className="fs-5"/>
                        <FontAwesomeIcon icon="fa-solid fa-user" className="fs-6"/>
                        <FontAwesomeIcon icon="fa-regular fa-user" className="fs-5"/>
                    </div>
                    <div className="d-flex align-items-top col">
                        <FontAwesomeIcon icon="fa-regular fa-user" className="fs-5"/>
                        <FontAwesomeIcon icon="fa-regular fa-user" className="fs-6"/>
                        <FontAwesomeIcon icon="fa-regular fa-user" className="fs-5"/>
                    </div>
                    <div className="d-flex col justify-content-center bg-info">
                        <div className="d-flex position-absolute">
                            <FontAwesomeIcon icon="fa-regular fa-user" className="fs-6"/>
                        </div>
                        <div className="d-flex align-self-end position-absolute">
                            <FontAwesomeIcon icon="fa-regular fa-user" className="fs-6 me-2"/>
                            <FontAwesomeIcon icon="fa-regular fa-user" className="fs-6"/>
                        </div>
                    </div>
                    <div className="d-flex col justify-content-center bg-warning">
                        <div className="d-flex position-absolute">
                            <FontAwesomeIcon icon="fa-regular fa-user" className="fs-6"/>
                        </div>
                        <div className="d-flex align-self-end position-absolute">
                            <FontAwesomeIcon icon="fa-solid fa-user" className="fs-5 me-2"/>
                            <FontAwesomeIcon icon="fa-solid fa-user" className="fs-5"/>
                        </div>
                    </div>
                    <div className="d-flex col justify-content-center bg-warning">
                        <div className="d-flex position-absolute">
                            <FontAwesomeIcon icon="fa-solid fa-user" className="fs-6"/>
                        </div>
                        <div className="d-flex align-self-end position-absolute">
                            <FontAwesomeIcon icon="fa-regular fa-user" className="fs-5 me-2"/>
                            <FontAwesomeIcon icon="fa-regular fa-user" className="fs-5"/>
                        </div>
                    </div>
                    <div className="d-flex col justify-content-center bg-warning">
                        <div className="d-flex position-absolute">
                            <FontAwesomeIcon icon="fa-regular fa-user" className="fs-6 me-3"/>
                            <FontAwesomeIcon icon="fa-regular fa-user" className="fs-6"/>
                        </div>
                        <div className="d-flex align-self-end position-absolute">
                            <FontAwesomeIcon icon="fa-solid fa-user" className="fs-5"/>
                        </div>
                    </div>
                    <div className="d-flex col justify-content-center bg-warning">
                        <div className="d-flex position-absolute">
                            <FontAwesomeIcon icon="fa-regular fa-user" className="fs-6 me-2"/>
                            <FontAwesomeIcon icon="fa-regular fa-user" className="fs-6"/>
                        </div>
                        <div className="d-flex align-self-end position-absolute">
                            <FontAwesomeIcon icon="fa-regular fa-user" className="fs-6"/>
                        </div>
                    </div>
                </div>

                {/*                {
                    todos.map(todo => {
                        return (
                            <FeedItem key={todo._id}
                                  todo={todo}/>
                        );
                    })
                }*/}
            </ul>
        </div>
    )
}
export default Feed;