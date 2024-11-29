import React from "react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import "./ErrorPage.scss";
import {PagePath} from "@/src/routing/RouterList.tsx";

interface RouterError {
    status: number;
}

interface DescriptionList {
    [key: number]: string[];
}

interface ErrorPageProps {
    code?: number;
}

const descriptionList: DescriptionList = {
    404: ["Такой страницы нет", "Но есть много других"]
};

export const ErrorPage = ({ code }: ErrorPageProps) => {
    const error = useRouteError() as RouterError;
    console.error("Ошибка:", error);

    let errorCode = code || 267;
    if (!code && isRouteErrorResponse(error)) {
        errorCode = error.status;
    }

    let description = ["Неизвестная ошибка", "Скоро всё починим"];
    if (Object.keys(descriptionList).includes(errorCode + "")) {
        description = descriptionList[errorCode];
    }

    return (
        <div className="error_page">
            <div className="error_container">
                <div className="error_code">
                    <p className="error_code">{errorCode}</p>
                </div>
                <div className="error_description">
                    <p className="description_title">{description[0]}</p>
                    <p className="description_subtitle">{description[1]}</p>
                </div>
                <div className="link_to_main">
                    <Link to={PagePath.home}>Главная страница</Link>
                </div>
            </div>
        </div>
    );
};
