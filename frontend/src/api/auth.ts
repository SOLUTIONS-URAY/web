import {CONSTANTS} from "../constants.ts";

export enum UserRole {
    SYS_ADMIN,
    ORG_OWNER,
    ORG_SUPPORT,
    ORG_MASTER,
    ORG_USER,
}

export type UserData = {
    id: number,
    userRole: UserRole,
    email: string
}

export interface AuthResp {
    access_token: string,
    user_data: UserData
}

export const auth = async (email: string, password: string): Promise<AuthResp> => {
    const apiResp = await fetch("/api/"+CONSTANTS.API_VERSION+"/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email, password
        })
    })
        .then(resp => resp.json());

    if(apiResp.error !== undefined) {
        console.error("AuthAPI error:", apiResp.error, apiResp.message);
        throw new Error("Неизвестная ошибка");
    }
    if (apiResp.message !== undefined) throw new Error(apiResp.message);
    if (apiResp.access_token === undefined) {
        console.error("AuthAPI error: Невалидный ответ, нет access_token");
        throw new Error("Неизвестная ошибка");
    }
    if (apiResp.user_data === undefined) {
        console.error("AuthAPI error: Невалидный ответ, нет user_data");
        throw new Error("Неизвестная ошибка");
    }
    return {
        access_token: (apiResp.access_token as string),
        user_data: apiResp.user_data
    };
}