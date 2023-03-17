import {Routes, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import NavigationSidebar from "../navigationsidebar";
import Login from "../login";
import Profile from "../profile";
import ToDo from "../to-do";
import Feed from "../feed";
import FindFriends from "../find-friends";

function AppName() {
    return (
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
                            <Route path="profile" element={<Profile/>}/>
                            <Route path="to-do" element={<ToDo/>}/>
                            <Route path="feed" element={<Feed/>}/>
                            <Route path="find-friends" element={<FindFriends/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    )
}
export default AppName;