import { createSlice } from "@reduxjs/toolkit";
import todos from '../data/todos.json';

const currentUser = {
    "userName": "NASA",
    "handle": "@nasa",
    "image": "nasa.png",
};

const templatetodo = {
    ...currentUser,
    "time": "2h",
    "congrats": 0,
    "userName": "Default Username",
    "handle": "@defaultHandle",
    "todo": "Default todo",
    "completed": false
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
                                       completeToggle(state, action) {
                                           const post = state.find((post) => post._id === action.payload)
                                           if (post.completed) {
                                               post.completed = false   // mark incomplete
                                           } else {
                                               post.completed = true    // mark complete
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
export const {likeToggle,createtodo,deletetodo,updatetodo,completeToggle} = todosSlice.actions;
export default todosSlice.reducer;