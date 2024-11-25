import React, {FC} from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { getRoutes } from "./RouterList";

export const AppRoutes: FC = () => {
    const userInfo = null;
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