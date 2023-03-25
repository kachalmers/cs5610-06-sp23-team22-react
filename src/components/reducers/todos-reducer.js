import { createSlice } from "@reduxjs/toolkit";
import todos from '../data/todos.json';

const currentUser = {
    "userName": "NASA",
    "handle": "@nasa",
    "image": "nasa.png",
};

const templatetodo = {
    ...currentUser,
    "topic": "Space",
    "time": "2h",
    "liked": false,
    "replies": 0,
    "likes": 0,
}

const todosSlice = createSlice({
                                   name: 'todos',
                                   initialState: todos,
                                   reducers: {
                                       likeToggle(state, action) {
                                           const post = state.find((post) => post._id === action.payload)
                                           if (post.liked) {
                                               post.liked = false   // unlike
                                               post.likes--;
                                           } else {
                                               post.liked = true    // like
                                               post.likes++;
                                           }
                                       },
                                       createtodo(state, action) {
                                           state.unshift({
                                                             ...templatetodo,
                                                             ...action.payload,
                                                             _id: (new Date()).getTime(),
                                                         })

                                       },
                                       deletetodo(state, action) {
                                           const index = state
                                               .findIndex(todo =>
                                                              todo._id === action.payload);
                                           state.splice(index, 1);
                                       },
                                       updatetodo(state, action) {
                                           const post = state.find((post) => post._id === action.payload._id);
                                           post.todo = action.payload.todo;
                                       }
                                   }
                               });
export const {likeToggle,createtodo,deletetodo,updatetodo} = todosSlice.actions;
export default todosSlice.reducer;