import {Routes, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import NavigationSidebar from "../navigationsidebar";
import Login from "../login/login";
import Profile from "../profile";
import Feed from "../feed";
import FindFriends from "../find-friends";
import todosReducer from "../reducers/todos-reducer";
import profileReducer from "../reducers/profile-reducer";
import usersReducer from "../reducers/users-reducer";
import { configureStore } from '@reduxjs/toolkit';
import {Provider} from "react-redux";
import EditProfile from "../profile/edit-profile";
import React from "react";
import MyToDosScreen from "../my-todos-screen";
import feedReducer from "../reducers/feed-reducer";
import SignUp from "../signup/signup";
import HoedownSearch from "../hoedown-search";
import TrackDetailsScreen from "../hoedown-search/TrackDetailsScreen";

const store = configureStore(
    {reducer: {todos: todosReducer, profile: profileReducer, users: usersReducer, feed: feedReducer}});

function Hoedown() {

    return (
        <Provider store={store}>
        <BrowserRouter>
            <div className="container mt-2 mb-2">
                <div className="row">
                    <div className="col-2 col-lg-3 col-xl-2">
                        <NavigationSidebar/>
                    </div>
                    <div className="col-10 col-lg-9 col-xl-10">
                        <Routes>
                            <Route index element={<MyToDosScreen/>}/>
                            <Route path="hoedown" element={<Feed/>}/>
                            <Route path="login" element={<Login/>}/>
                            <Route path="sign-up" element={<SignUp/>}/>
                            <Route path="profile/*" element={<Profile/>}/>
                            <Route path="edit-profile" element={<EditProfile/>}/>
                            <Route path="todos" element={<MyToDosScreen/>}/>
                            <Route path="feed" element={<Feed/>}/>
                            <Route path="find-friends" element={<FindFriends/>}/>
                            <Route path="search" element={<HoedownSearch/>}/>
                            <Route path="search/:searchTerm" element={<HoedownSearch/>}/>
                            <Route path="track/:spotifyID" element={<TrackDetailsScreen/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
        </Provider>
    )
}
export default Hoedown;