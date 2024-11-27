import React, {PropsWithChildren, useEffect, useLayoutEffect, useState} from "react";
import "./TicketPage.scss"
import {TicketEntity} from "../../types/TicketEntity.ts";
import {TicketEvent} from "../../types/TicketEvent.ts";
import {getTicket} from "../../api/getTicket.ts";
import {useParams} from "react-router-dom";
import {updateTicket} from "../../api/updateTicket.ts";
import {toast} from "react-toastify";
import {constants} from "os";
import priority = module
import {TicketPriority} from "../../components/TicketTable/TicketTable.tsx";

interface TicketPageProps {
}


const TicketEventNaming = [
    "Изменение приоритета",
    "Изменение темы",
    "Изменение пользователя, создавшего тикет",
    "Изменение специалиста",
    "Изменение статуса",
    "Добавление сообщения",
]

export const TicketPage = (props: PropsWithChildren<TicketPageProps>) => {
    const { ticketId } = useParams();
    const [ticketInfo, setTicketInfo] = useState< TicketEntity | null>();
    const [ticketEvents, setTicketEvents] = useState<TicketEvent[]>([]);

    const updateTicketInfo = () => {
        getTicket(Number(ticketId))
            .then((ticket)=> {
                setTicketInfo(ticket)
                setTicketEvents(ticket.events)
            })
    };

    useLayoutEffect(updateTicketInfo, [ticketId]);

    const onSaveButtonClick = () => {
        if (!ticketInfo) return;
        updateTicket(Number(ticketId), ticketInfo)
            .then(()=> {
                toast.success("Успешно!")
                updateTicketInfo()
            })
    }

    const onChangePriority = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTicketInfo((prevState) => {
            if(!prevState) return prevState;
            return {...prevState, priority: (Number(e.target.value) as TicketPriority)};
        });
    }

    return (
        <div className="ticket_page">
            <div className="ticket_title">
                <p style={{fontWeight: 900}}> Тикет #{ticketInfo?.id}: {ticketInfo?.title}</p>
            </div>
            <div className="ticket_info">
                <div className="ticket_info_block">
                    <label>Приоритет</label>
                    <input type="text" value={ticketInfo?.priority} onChange={onChangePriority}/>
                </div>
                <div className="ticket_info_block">
                    <label>Тема</label>
                    <input type="text" value={ticketInfo?.title}/>
                </div>
                <div className="ticket_info_block">
                    <label>Тип заявки</label>
                    <input type="text" value={ticketInfo?.type.name}/>
                </div>
                <div className="ticket_info_block">
                    <label>Пользователь</label>
                    <input type="text" value={ticketInfo?.issuedUser.email}/>
                </div>
                <div className="ticket_info_block">
                    <label>Ответственный</label>
                    <input type="text" value={ticketInfo?.assignedUser?.fullName}/>
                </div>
                <div className="ticket_info_block">
                    <label>Статус заявки</label>
                    <input type="text" value={ticketInfo?.status}/>
                </div>
                <div className="ticket_info_block">
                    <button onClick={onSaveButtonClick}>Сохранить</button>
                </div>
            </div>
            <div className="ticket_events">
                <div className="ticket_events_title">
                    <p style={{fontWeight: 900}}>События:</p>
                </div>
                <div className="ticket_events_container">
                    {ticketEvents.length > 0 && ticketEvents.map(ticketEvent => (
                        <div className="ticket_event" key={ticketEvent.uuid}>
                            Автор: {ticketEvent.author.fullName}, Тип ивента: {TicketEventNaming[ticketEvent.type]}, {ticketEvent.message && "сообщение:"} {ticketEvent.message}
                        </div>
                    ))}
                    {ticketEvents.length == 0 && <p>Отсутствуют</p>}
                </div>
            </div>
            <div className="ticket_add_message">
                <div className="ticket_add_message_title">
                    <p style={{fontWeight: 900}}>Добавить сообщение:</p>
                </div>
                <textarea
                    name=""
                    id=""
                    cols="30" rows="10"
                    className="ticket_new_message"
                    placeholder="Сообщение"
                >
                </textarea>
                <button className="send_message">Отправить!</button>
            </div>
        </div>
    );
};