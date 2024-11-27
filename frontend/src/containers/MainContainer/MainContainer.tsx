import "./MainContainer.scss";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {fetcher} from "../../fetcher.ts";
import {SWRConfig} from "swr";

export const MainContainer = ({children}) => {
    return (
        <>
            <SWRConfig value={{
                fetcher: fetcher,
                shouldRetryOnError: true,
                onErrorRetry: async (error, key, config, revalidate, {retryCount}) => {
                    // Повторить попытку до 10 раз.
                    if (retryCount >= 3) return

                    // Никогда не повторяйте попытку при 404.
                    if (error.status === 404) return
                    if (error.status === 403) return

                    // Повторить попытку через 5 секунд.
                    setTimeout(() => revalidate({retryCount}), 100)
                },
            }}>
                {children}
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                />
            </SWRConfig>
        </>
    );
};