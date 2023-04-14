import React from "react";
import {Link} from "react-router-dom";
import {useLocation,useNavigate} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {logoutThunk} from "../../services/users/users-thunks";


const NavigationSidebar = () => {
    const { currentUser } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const paths = pathname.split('/')
    const active = paths[1];
    const screenChoices = [
        {
            label: 'Hoedown',
            link: '/hoedown',
            activePaths: [],
            iconClassName: "fa-solid fa-hat-cowboy"
        },
        {
            label: 'Feed',
            link: '/feed',
            activePaths: ['feed','hoedown','',undefined],
            iconClassName: "fa-solid fa-house"
        },
/*        {
            label: 'Register',
            link: '/sign-up',
            activePaths: ['sign-up'],
            iconClassName: "fa-solid fa-user"
        },
        {
            label: 'Login',
            link: '/login',
            activePaths: ['login'],
            iconClassName: "fa-solid fa-door-open"
        },*/
        {
            label: 'Profile',
            link: '/profile',
            activePaths: ['profile','edit-profile'],
            iconClassName: "fa-solid fa-user"
        },
/*        {
            label: 'To-do',
            link: '/todos',
            activePaths: ['todos'],
            iconClassName: "fa-solid fa-list"
        },*/
        {
            label: 'Find friends',
            link: '/find-friends',
            activePaths: ['find-friends'],
            iconClassName: "fa-solid fa-users"
        },
        {
            label: 'Search',
            link: '/search',
            activePaths: ['search'],
            iconClassName: "fa-solid fa-music"
        }
    ]
    return (
        <div>
            <div className="list-group">
                {
                    screenChoices.map((screenChoice,index) =>
                        <Link   to={screenChoice.link}
                                className={`list-group-item ${screenChoice.activePaths.includes(active)?'active':''}`}
                                key={index}
                        >
                            <div className="row align-items-center">
                                {
                                    screenChoice.iconClassName !== '' &&
                                    <div className="d-flex col col-lg-3 justify-content-center">
                                        <FontAwesomeIcon icon={screenChoice.iconClassName}/>
                                    </div>
                                }
                                <div className="d-none d-lg-block col">{screenChoice.label}</div>
                            </div>
                        </Link>
                    )
                }
            </div>
            {
                currentUser===null || currentUser===undefined ?
                <div>
                    <div>
                        <Link className="rounded-pill btn btn-dark mt-2 fw-bold w-100"
                              to="/sign-up">
                            <span className="d-none d-md-block">Sign Up</span>
                            <span className="d-block d-md-none"><FontAwesomeIcon
                                icon="fa-regular fa-user"/></span>
                        </Link>
                    </div>
                    <div>
                        <Link className="rounded-pill btn btn-primary mt-2 fw-bold w-100"
                              to="/login">
                            <span className="d-none d-md-block">Log In</span>
                            <span className="d-block d-md-none"><FontAwesomeIcon
                                icon="fa-solid fa-user"/></span>
                        </Link>
                    </div>
                </div>
                :
                <div>
                    <button className="rounded-pill btn btn-dark mt-2 fw-bold w-100"
                            onClick={() => {
                                dispatch(logoutThunk());
                                navigate("/login");
                            }}
                    >
                        <span className="d-none d-md-block">Log Out</span>
                        <span className="d-block d-md-none"><FontAwesomeIcon
                            icon="fa-regular fa-user"/></span>
                    </button>
                </div>
            }
        </div>
    );
};
export default NavigationSidebar;