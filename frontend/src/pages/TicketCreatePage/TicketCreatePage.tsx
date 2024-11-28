import React, {PropsWithChildren, useEffect, useState} from "react";
import "./TicketCreatePage.scss"
import {useUserData} from "../../hooks/useUserData.tsx";
import useSWR from "swr";
import {TicketStatus} from "../../components/TicketTable/TicketTable.tsx";
import {updateTicket} from "../../api/createTicket.ts";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

interface TicketCreatePageProps {
}

export const TicketCreatePage = (props: PropsWithChildren<TicketCreatePageProps>) => {
    const userData = useUserData();
    const navigate = useNavigate();

    const {data: ticketTypes, error: ticketTypesError, isLoading: ticketTypesLoading} = useSWR<{
        id: number,
        name: string
    }[]>('/ticket/types');

    const [ticketTypeId, setTicketTypeId] = useState<number>(-1);
    const [email, setEmail] = useState(userData?.email);
    const [ticketText, setTicketText] = useState("");
    const [ticketTitle, setTicketTitle] = useState("");

    useEffect(() => {
        if(ticketTypes == undefined) return;
        setTicketTypeId(ticketTypes[0].id)
    }, [ticketTypes]);

    const onChangeTicketType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTicketTypeId(Number(e.target.value));
    }
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const onChangeTicketText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTicketText(e.target.value);
    }
    const onChangeTicketTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTicketTitle(e.target.value);
    }

    const onSubmit = () => {
        if (!email || email === "") {
            toast.error("Укажите почту");
            return;
        }
        if (!ticketText || ticketText === "") {
            toast.error("Укажите сообщение");
            return;
        }
        if (!ticketTitle || ticketTitle === "") {
            toast.error("Укажите название обращения");
            return;
        }
        if (!ticketTypeId) {
            toast.error("Укажите тип");
            return;
        }

        updateTicket({
            typeId: ticketTypeId,
            email,
            text: ticketText,
            title: ticketTitle
        })
            .then((ticket) => {
                navigate("/ticket/" + ticket.id)
            })
            .catch((err) => {
                console.error("Ошибка создания тикета:", err);
                toast.error("Ошибка")
            })
    }

    return (
        <div className="ticket_create_page">
            <div className="ticket_create_container">
                <div className="ticket_create_title">
                    <p className="ticket_create_title">
                        Cоздание тикета
                    </p>
                </div>
                <div className="ticket_create_input_container">
                    <div className="ticket_create_input">
                        <input
                            type="text"
                            placeholder="Название обращения"
                            value={ticketTitle}
                            onChange={onChangeTicketTitle}
                        />
                    </div>
                    <div className="ticket_create_input">
                        <select onChange={onChangeTicketType} value={ticketTypeId}>
                            {ticketTypes && ticketTypes.map((type, key) => (
                                <option value={type.id} key={type.id}>{type.name}</option>
                            ))}
                            {ticketTypesError && (
                                <option value={-1}>Ошибка загрузки</option>
                            )}
                            {ticketTypesLoading && (
                                <option value={-1}>Загрузка...</option>
                            )}
                        </select>
                    </div>
                    <div className="ticket_create_input">
                        <input
                            type="email"
                            value={email}
                            onChange={onChangeEmail}
                            disabled={userData?.userRole === undefined ? false : (userData.userRole > 3)}
                            placeholder="Email пользователя"
                        />
                    </div>
                    <div className="ticket_create_input">
                        <textarea
                            placeholder="Текст сообщения"
                            value={ticketText}
                            onChange={onChangeTicketText}
                        >
                        </textarea>
                    </div>
                    <div className="ticket_create_input">
                        <button onClick={onSubmit}>Отправить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};