import React, {FC} from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { getRoutes } from "./RouterList";
import {useUserData} from "../hooks/useUserData.tsx";

export const AppRoutes: FC = () => {
    const userInfo = useUserData();
    console.log("userInfo", userInfo);

    const routes = getRoutes(userInfo !== null);
    const router = createBrowserRouter(routes);

    console.log("routes", routes);

    return (
        <>
            <RouterProvider router={router} />
            <Outlet />
        </>
    );
};