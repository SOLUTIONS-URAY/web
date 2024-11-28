import {FullLogo} from "../Images/FullLogo/FullLogo.tsx";
import "./Navbar.scss";
import {useNavigate} from "react-router-dom";
import {useUserData} from "../../hooks/useUserData.tsx";
import {NavbarLink} from "./NavbarLink/NavbarLink.tsx";

export const Navbar = () => {
    const navigate = useNavigate();
    const userData = useUserData();

    const goToCreateTicket = () => {
        navigate("/ticket/create");
    };

    return (
        <div className="navbar">
            <div className="navbar_left">
                <div className="navbar_logo">
                    <FullLogo/>
                </div>
                <div className="navbar_links">
                    <NavbarLink
                        name="Все заявки"
                        icon="folder"
                        uri="/control"
                        isActive={true}
                    />
                    <NavbarLink
                        name="Текущая заявка"
                        icon="pencil"
                        uri="/control/my"
                    />
                    <NavbarLink
                        name="Персонал"
                        icon="people"
                        uri="/personal"
                    />
                </div>
            </div>
            <div className="navbar_right">
                <div className="navbar_create_ticket">
                    <button className="navbar_create_ticket" onClick={goToCreateTicket}>
                        Создать заявку
                    </button>
                </div>
                <div className="navbar_user">
                    <div className="navbar_username">{userData?.fullName}</div>
                    <button className="navbar_exit" onClick={() => navigate("/")}>Выйти</button>
                </div>
            </div>
        </div>
    );
};