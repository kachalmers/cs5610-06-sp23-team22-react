import { createSlice } from "@reduxjs/toolkit";
import todo from '../data/feed.json';

const currentUser = {
    "userName": "Lisa",
    "image": ""
};

const templateTodo = {
    ...currentUser,
    "todo": "Eat breakfast",
    "feedLiked": true,
    "likes": 0
}

const todoSlice = createSlice({
    name: "todo",
    initialState: todo,
    reducers: {
        likeToggle(state, action) {
            const todo = state.find((todo) => todo._id === action.payload)
            if (todo.likes) {
                todo.likes = false   // unlike
                todo.likes--;
            } else {
                todo.likes = true    // like
                todo.likes++;
            }
        }

    }
});
export const {likeToggle} = todoSlice.actions;
export default todoSlice.reducer;