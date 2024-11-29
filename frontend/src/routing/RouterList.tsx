import  "react";
import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {AuthorizedContainer} from "../containers/AuthorizedContainer/AuthorizedContainer.tsx";
import {AuthPage} from "../pages/AuthPage/AuthPage.tsx";
import {ControlPage} from "../pages/ControlPage/ControlPage.tsx";
import {TicketPage} from "../pages/TicketPage/TicketPage.tsx";
import {IndexPage} from "../pages/IndexPage/IndexPage.tsx";
import {TicketCreatePage} from "../pages/TicketCreatePage/TicketCreatePage.tsx";
import {NavbarIcon} from "@/src/components/Navbar/NavbarLink/NavbarLink.tsx";
import {ErrorPage} from "@/src/pages/ErrorPage/ErrorPage.tsx";

export const enum PagePath {
    home = "/",
    auth = "/auth",
    ticket = "/tickets/:ticketId",
    ticket_create = "/tickets/create",
    tickets_list = "/tickets/list",
    tickets_my = "/tickets/my",
    personal = "/personal"
}


interface Route {
    path: PagePath;
    element?: React.ReactNode;
    protected?: boolean;
    name: string;
    hidden?: boolean;
    navbarIcon?: NavbarIcon;
}

export const routes: Route[] = [
    {
        path: PagePath.home,
        element: <IndexPage />,
        protected: false,
        name: "Главная",
        hidden: true,
    },
    {
        path: PagePath.auth,
        element: <AuthPage />,
        protected: false,
        name: "Авторизация",
        hidden: true,
    },
    {
        path: PagePath.ticket,
        element: <TicketPage/>,
        protected: true,
        name: "Главная",
        hidden: true,
    },
    {
        path: PagePath.ticket_create,
        element: <TicketCreatePage/>,
        protected: false,
        name: "Новый тикет",
        hidden: true,
        navbarIcon: "folder",
    },
    {
        path: PagePath.tickets_list,
        element: <ControlPage />,
        protected: true,
        name: "Все заявки",
        hidden: false,
        navbarIcon: "folder",
    },
    {
        path: PagePath.tickets_my,
        element: <ControlPage />,
        protected: true,
        name: "Мои заявки",
        hidden: false,
        navbarIcon: "pencil",
    },
    {
        path: PagePath.personal,
        element: <ControlPage />,
        protected: true,
        name: "Персонал",
        hidden: false,
        navbarIcon: "people",
    }
];

export const getRoutes = ( isAuthorized: boolean): (RouteObject & Route) [] => {
    return routes.map((route) => {
        let element = route.element;
        if (route.protected) {
            if (!isAuthorized) element = <Navigate to="/" />;
            else element = <AuthorizedContainer>{route.element}</AuthorizedContainer>;
        }

        return {
            ...route,
            element,
            errorElement: <ErrorPage/>,
        };
    });
};