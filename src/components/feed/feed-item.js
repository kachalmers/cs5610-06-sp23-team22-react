import React from "react";
import FeedStats from "./feed-stats";
import { useDispatch } from "react-redux";

const FeedItem = ({todo}) => {
    return (
        <div>
            {todo.completed
                ?<div className="list-group-item p-2">
                    <div className="row ms-0 me-0">
                        <div className="col-1 p-0">
                            <img src={`../images/${todo.image}`}
                                 className="rounded-circle ms-1 mt-1" width="40px" alt="" />
                        </div>
                        <div className="col-11">
                            <b className="m-0">
                                <b className="m-0 me-2">
                                    {todo.userName}
                                </b>
                                <b>
                                    <b className="m-0 me-2">
                                        completed
                                    </b>
                                </b>
                                <span>
                            <span className="m-0 me-2">
                                {todo.todo}
                            </span>
                        </span>
                                <p>
                                    <FeedStats feed={todo} />
                                </p>
                            </b>
                        </div>
                    </div>
                </div>
                :<span></span>
            }
        </div>
        // <div className="list-group-item p-2">
        //     <div className="row ms-0 me-0">
        //         <div className="col-1 p-0">
        //             <img src={`../images/${todo.image}`}
        //                  className="rounded-circle ms-1 mt-1" width="40px" alt="" />
        //         </div>
        //         <div className="col-11">
        //             <b className="m-0">
        //                 <b className="m-0 me-2">
        //                     {todo.userName}
        //                 </b>
        //                 <b>
        //                     <b className="m-0 me-2">
        //                         completed
        //                     </b>
        //                 </b>
        //                 <span>
        //                     <span className="m-0 me-2">
        //                         {todo.todo}
        //                     </span>
        //                 </span>
        //                 <p>
        //                     <FeedStats feed={todo} />
        //                 </p>
        //             </b>
        //         </div>
        //     </div>
        // </div>
    )
}

// const FeedItem = ({
//                       feed = {
//
//                       }
//                   }) => {
//     const dispatch = useDispatch();
//
//     return (
//         <div className="list-group-item p-2">
//             <div className="row ms-0 me-0">
//                 <div className="col-1 p-0">
//                     <img src={`../images/${feed.image}`}
//                          className="rounded-circle ms-1 mt-1" width="40px" alt="" />
//                 </div>
//                 <div className="col-11">
//                     <p className="m-0">
//                         <b className="m-0 me-2">
//                             {feed.userName} <h1>completed</h1> {feed.todo}
//                         </b>
//                         <FeedStats feed={feed} />
//                     </p>
//
//
//                 </div>
//             </div>
//         </div>
//     );
// }

export default FeedItem;

