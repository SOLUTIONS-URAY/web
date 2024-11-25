import  "react";
import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {AuthorizedContainer} from "../containers/AuthorizedContainer/AuthorizedContainer.tsx";
import {AuthPage} from "../pages/AuthPage/AuthPage.tsx";
import {ControlPage} from "../pages/ControlPage/ControlPage.tsx";

export const enum PagePath {
    home = "/",
    auth = "/auth",
    control = "/control",
}

export const Routes: Route[] = [
    {
        path: PagePath.auth,
        element: <AuthPage />,
        protected: false,
    },
    {
        path: PagePath.control,
        element: <ControlPage />,
        protected: true
    },
];

interface Route {
    path: PagePath;
    element?: React.ReactNode;
    protected?: boolean;
}

export const getRoutes = ( isAuthorized: boolean): RouteObject[] => {
    return Routes.map((route) => {
        let element = route.element;
        if (route.protected) {
            if (!isAuthorized) element = <Navigate to="/" />;
            else element = <AuthorizedContainer>{route.element}</AuthorizedContainer>;
        }

        return {
            ...route,
            element: element,
            errorElement: <></>,
        };
    });
};