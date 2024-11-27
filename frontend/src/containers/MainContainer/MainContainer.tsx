import "./MainContainer.scss";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const MainContainer = ({children}) => {
    return (
        <>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
            />
        </>
    );
};