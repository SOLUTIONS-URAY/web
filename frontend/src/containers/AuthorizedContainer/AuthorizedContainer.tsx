import {Navbar} from "../../components/Navbar/Navbar.tsx";

export const AuthorizedContainer = ({children}) => {
    return (
       <div className="authorized_container">
           <Navbar/>
           <div className="authorized_container_contenr">
               {children}
           </div>
       </div>
    );
};