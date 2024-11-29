import {Navbar} from "../../components/Navbar/Navbar.tsx";
import "./AuthorizedContainer.scss";
import {FC, PropsWithChildren} from "react";

export const AuthorizedContainer : FC<PropsWithChildren> = ({children}) => {
    return (
       <div className="authorized_container">
           <Navbar/>
           <div className="authorized_container_content">
               {children}
           </div>
       </div>
    );
};