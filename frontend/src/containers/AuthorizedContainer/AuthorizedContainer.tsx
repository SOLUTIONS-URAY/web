import {Navbar} from "../../components/Navbar/Navbar.tsx";
import "./AuthorizedContainer.scss";

export const AuthorizedContainer = ({children}) => {
    return (
       <div className="authorized_container">
           <Navbar/>
           <div className="authorized_container_content">
               {children}
           </div>
       </div>
    );
};