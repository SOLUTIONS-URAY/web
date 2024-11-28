import "./IndexPage.scss";
import React from "react";
import {useNavigate} from "react-router-dom";
import {PagePath} from "../../routing/RouterList.tsx";

export const IndexPage = () => {
    const navigate = useNavigate();

    const goToAuth = () => navigate(PagePath.auth);
    const goToCreateTicket = () => navigate(PagePath.ticket_create)

    return (
        <div className="index_page">
            <div className="index_page_container">
                <button className="index_page_auth" onClick={goToAuth}>
                    Войти
                </button>
                <p className="index_page_or">
                    или
                </p>
                <button className="index_page_create_ticket" onClick={goToCreateTicket}>
                    Оставить заявку
                </button>
            </div>
        </div>
    );
};