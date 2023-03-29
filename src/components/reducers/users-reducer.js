import { createSlice } from "@reduxjs/toolkit";
import users from '../data/users.json';

const usersSlice = createSlice({
                                   name: 'users',
                                   initialState: users,
                                   reducers: {
                                   }
                               });
export default usersSlice.reducer;