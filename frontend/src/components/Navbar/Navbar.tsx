import {FullLogo} from "../Images/FullLogo/FullLogo.tsx";
import "./Navbar.scss";
import {matchPath, useNavigate} from "react-router-dom";
import {useUserData} from "../../hooks/useUserData.tsx";
import {NavbarLink} from "./NavbarLink/NavbarLink.tsx";
import exit_icon from "@/src/assets/exit_icon.svg";
import plus_icon from "@/src/assets/plus.svg";
import {getRoutes, PagePath} from "@/src/routing/RouterList.tsx";
import {useCallback, useMemo} from "react";


export const Navbar = () => {
    const navigate = useNavigate();
    const userData = useUserData();
    const routes = getRoutes(userData !== null);

    const firstPage = useMemo(()=>{
        return routes.find(r => !r.hidden)
    }, [])

    const goToCreateTicket2 = useCallback(() => {
        if(firstPage?.path !== undefined){
            navigate(firstPage.path);
        }
    },[firstPage?.path]);

    const goToCreateTicket = () => {
        navigate(PagePath.ticket_create);
    };

    return (
        <div className="navbar">
            <div className="navbar_left">
                <div className="navbar_logo">
                    <FullLogo/>
                </div>
                <div className="navbar_links">
                    {
                        routes.map((route) => {
                            if(route.navbarIcon === undefined || route.hidden === true) return <></>;
                            const isActiveRoute = matchPath(window.location.pathname, route.path) !== null;
                            return (
                                <NavbarLink
                                    name={route.name}
                                    icon={route.navbarIcon}
                                    uri={route.path}
                                    isActive={isActiveRoute}
                                    key={route.path}
                                />
                            )
                        })
                    }
                </div>
            </div>
            <div className="navbar_right">
                <div className="navbar_create_ticket">
                    <button className="navbar_create_ticket" onClick={goToCreateTicket}>
                        <p className="navbar_create_ticket_text">Создать заявку</p>
                        <img className="navbar_exit_icon" src={plus_icon} alt=""/>
                    </button>
                </div>
                <div className="navbar_user">
                    <p className="navbar_username">{userData?.fullName}</p>
                    <button className="navbar_exit" onClick={() => navigate("/")}>
                        <img className="navbar_exit_icon" src={exit_icon} alt=""/>
                    </button>
                </div>
            </div>
        </div>
    );
};