import {useLayoutEffect, useState} from "react";
import {UserData} from "../api/auth.ts";

interface LocalStorageEvent extends Event {
    detail?: {
        key: string,
        newval: string
    }
}

export const useUserData = () => {
    const [userData, setUserData] = useState<UserData | null>(localStorage.user_data ? JSON.parse(localStorage.user_data || "{}"): null)

    useLayoutEffect(() => {
        const observerLS = (e: LocalStorageEvent) => {
            setUserData(JSON.parse(e.detail?.newval || "{}"));
        }
        document.addEventListener("localDataStorage", observerLS , false);

        return () => {
            document.removeEventListener("localDataStorage", observerLS)
        }
    }, []);

    return userData;
};