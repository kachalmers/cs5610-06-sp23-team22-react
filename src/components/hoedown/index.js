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
import store from "../../redux/store";
import CurrentUserContext from "./current-user-context";
import AlbumDetailsScreen from "../hoedown-search/AlbumDetailsScreen";
import ArtistDetailsScreen from "../hoedown-search/ArtistDetailsScreen";

function Hoedown() {
    return (
        <Provider store={store}>
            <CurrentUserContext>
                <BrowserRouter>
                    <div className="container mt-2 mb-2">
                        <div className="row">
                            <div className="col-2 col-lg-3 col-xl-2">
                                <NavigationSidebar/>
                            </div>
                            <div className="col-10 col-lg-9 col-xl-10">
                                <Routes>
                                    <Route index element={<Feed/>}/>
                                    <Route path="hoedown" element={<Feed/>}/>
                                    <Route path="home" element={<Feed/>}/>
                                    <Route path="login" element={<Login/>}/>
                                    <Route path="sign-up" element={<SignUp/>}/>
                                    <Route path="profile" element={<Profile/>}/>
                                    <Route path="profile/:userId/*" element={<Profile/>}/>
                                    <Route path="edit-profile" element={<EditProfile/>}/>
                                    <Route path="find-friends" element={<FindFriends/>}/>
                                    <Route path="search" element={<HoedownSearch/>}/>
                                    <Route path="search/:searchTerm" element={<HoedownSearch/>}/>
                                    <Route path="track/:spotifyID" element={<TrackDetailsScreen/>}/>
                                    <Route path="album/:spotifyID" element={<AlbumDetailsScreen/>}/>
                                    <Route path="artist/:spotifyID" element={<ArtistDetailsScreen/>}/>
                                </Routes>
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </CurrentUserContext>
        </Provider>
    )
}
export default Hoedown;