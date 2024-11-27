import {FullLogo} from "../Images/FullLogo/FullLogo.tsx";
import "./Navbar.scss";

export const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar_left">
                <div className="navbar_logo">
                    <FullLogo/>
                </div>
                <div className="navbar_links">

                </div>
            </div>
            <div className="navbar_right">
                <button className="navbar_exit">Выйти</button>
            </div>
        </div>
    );
};