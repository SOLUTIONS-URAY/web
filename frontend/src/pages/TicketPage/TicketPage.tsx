import {PropsWithChildren, useEffect, useLayoutEffect, useState} from "react";
import "./TicketPage.scss"
import {TicketEntity} from "../../types/TicketEntity.ts";
import {TicketEvent} from "../../types/TicketEvent.ts";
import {getTicket} from "../../api/getTicket.ts";
import {useParams} from "react-router-dom";

interface TicketPageProps {
}

export const TicketPage = (props: PropsWithChildren<TicketPageProps>) => {
    const { ticketId } = useParams();
    const [ticketInfo, setTicketInfo] = useState< TicketEntity | null>();
    const [ticketEvents, setTicketEvents] = useState<TicketEvent[]>([]);

    useLayoutEffect(() => {
        getTicket(Number(ticketId))
            .then((ticket)=> {
                setTicketInfo(ticket)
            })
    }, [ticketId]);
    return (
        <div className="ticket_page">
            <div className="ticket_title">
                <p>Тикет #{ticketInfo?.id}: {ticketInfo?.title}</p>
            </div>
            <div className="ticket_info">
                <div className="ticket_info_block">
                    <label>Приоритет</label>
                    <input type="text" value={ticketInfo?.priority}/>
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
            </div>
        </div>
    );
};