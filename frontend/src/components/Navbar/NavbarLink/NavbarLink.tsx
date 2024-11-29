import React, {FC} from "react";
import {useNavigate} from "react-router-dom";
import "./NavbarLink.scss";
import folder_icon from "@/src/assets/folder.svg";
import pencil_icon from "@/src/assets/pencil.svg";
import people_icon from "@/src/assets/people.svg";

const navbarIcons = {
    "folder": folder_icon,
    "pencil": pencil_icon,
    "people": people_icon
}

export type NavbarIcon = keyof typeof navbarIcons;

interface NavbarLinkProps {
    icon: NavbarIcon,
    name: string,
    uri: string,
    isActive?: boolean
}


export const NavbarLink: FC<NavbarLinkProps> = (props) => {
    const navigate = useNavigate();

    const onClick = () => {
        console.log("D")
        navigate(props.uri);
    }

    return (
        <div className={"navbar_link " + (props.isActive ? "navbar_link_active" : "")} onClick={onClick}>
            <div className="navbar_link_name">
                <p className="navbar_link_name">{props.name}</p>
            </div>
            <div className="navbar_link_icon">
                <img src={navbarIcons[props.icon]} alt=""/>
            </div>
        </div>
    )
}