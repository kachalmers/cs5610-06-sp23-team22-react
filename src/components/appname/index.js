import {Routes, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import NavigationSidebar from "../navigationsidebar";
import Login from "../login";
import Profile from "../profile";
import ToDo from "../todos";
import Feed from "../feed";
import FindFriends from "../find-friends";
import todosReducer from "../reducers/todos-reducer";
import profileReducer from "../reducers/profile-reducer";
import { configureStore } from '@reduxjs/toolkit';
import {Provider} from "react-redux";
import EditProfile from "../profile/edit-profile";

const store = configureStore(
    {reducer: {todos: todosReducer, profile: profileReducer}});

function AppName() {
    return (
        <Provider store={store}>
        <BrowserRouter>
            <div className="container mt-2 mb-2">
                <div className="row">
                    <div className="col-2">
                        <NavigationSidebar/>
                    </div>
                    <div className="col-10">
                        <Routes>
                            <Route index element={<ToDo/>}/>
                            <Route path="appname" element={<ToDo/>}/>
                            <Route path="login" element={<Login/>}/>
                            <Route path="profile/*" element={<Profile/>}/>
                            <Route path="edit-profile" element={<EditProfile/>}/>
                            <Route path="to-do" element={<ToDo/>}/>
                            <Route path="feed" element={<Feed/>}/>
                            <Route path="find-friends" element={<FindFriends/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
        </Provider>
    )
}
export default AppName;