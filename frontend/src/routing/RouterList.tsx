import  "react";
import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {AuthorizedContainer} from "../containers/AuthorizedContainer/AuthorizedContainer.tsx";
import {AuthPage} from "../pages/AuthPage/AuthPage.tsx";
import {ControlPage} from "../pages/ControlPage/ControlPage.tsx";
import {TicketPage} from "../pages/TicketPage/TicketPage.tsx";
import {IndexPage} from "../pages/IndexPage/IndexPage.tsx";
import {TicketCreatePage} from "../pages/TicketCreatePage/TicketCreatePage.tsx";

export const enum PagePath {
    home = "/",
    auth = "/auth",
    control = "/control",
    ticket = "/ticket/:ticketId",
    ticket_create = "/ticket/create"
}

export const Routes: Route[] = [
    {
        path: PagePath.home,
        element: <IndexPage />,
        protected: false,
    },
    {
        path: PagePath.auth,
        element: <AuthPage />,
        protected: false,
    },
    {
        path: PagePath.control,
        element: <ControlPage />,
        protected: true,
    },
    {
        path: PagePath.ticket_create,
        element: <TicketCreatePage/>,
        protected: false,
    },
    {
        path: PagePath.ticket,
        element: <TicketPage/>,
        protected: false,
    }
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