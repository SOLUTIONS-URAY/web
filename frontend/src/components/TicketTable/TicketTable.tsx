import React, {FC, useState} from "react";
import "./TicketTable.scss";
import {TicketEntity} from "../../types/TicketEntity.ts";
import {useNavigate} from "react-router-dom";
import {TicketStatusBadge} from "../TicketStatusBadge/TicketStatusBadge.tsx";
import {TICKET_PRIORITY_CONF} from "../../types/TICKET_PRIORITY_NAMING.ts";

export enum TicketPriority {
    NONE,
    LOW,
    MEDIUM,
    HIGH
}

export enum TicketStatus {
    PROCESSING,
    WORKING,
    WAITING_RESPONSE,
    CLOSED
}



interface TicketTableProps {
    tickets: TicketEntity[];
}

type SupportSortKey = keyof TicketEntity;

export const TicketTable : FC<TicketTableProps> = ({tickets}) => {
    const navigate = useNavigate();

    const [sortKey, setSortKey] = useState<SupportSortKey>("id");
    const [sortDirection, setSortDirection] = useState<1 | -1>(1);

    const onSortRequest = (name : SupportSortKey) => {
        if (name === sortKey) {
            setSortDirection(prevState => prevState === -1 ? 1 : -1) // Если сделать через умножение - TS ругается на типы
        } else {
            setSortDirection(1);
            setSortKey(name);
        }
    }


    const resolvesTickets = tickets
        .sort((a,b) => {
            switch (sortKey){
                case "created_at":
                    return sortDirection*((new Date(a.created_at)).getTime() - (new Date(b.created_at)).getTime());
                case "status":
                    return sortDirection*(a.status - b.status);
                case "priority":
                    return sortDirection*(a.priority - b.priority);
                case "type":
                    return sortDirection*(a.type.id - b.type.id);
                default:
                    return sortDirection*(a.id - b.id);
            }
        })

    return (
        <div className="control_table">
            <table className="control">
                <thead>
                <tr>
                    <th scope="col" onClick={()=>onSortRequest("id")}>ID</th>
                    <th scope="col" onClick={()=>onSortRequest("priority")}>Приоритет</th>
                    <th scope="col">Тема</th>
                    <th scope="col" onClick={()=>onSortRequest("type")}>Тип заявки</th>
                    <th scope="col">Пользователь</th>
                    <th scope="col">Ответственный</th>
                    <th scope="col" onClick={()=>onSortRequest("created_at")}>Дата заявки</th>
                    <th scope="col" onClick={()=>onSortRequest("status")}>Статус заявки</th>
                </tr>
                </thead>
                <tbody>
                    {resolvesTickets.map(ticket => (
                        <tr key={ticket.id} onClick={()=>navigate("/ticket/"+ticket.id)}>
                            <th scope="row">{ticket.id}</th>
                            <td>{TICKET_PRIORITY_CONF[ticket.priority].name}</td>
                            <td>{ticket.title}</td>
                            <td>{ticket.type.name}</td>
                            <th>{ticket.issuedUser.email}</th>
                            <td>{ticket.assignedUser?.fullName}</td>
                            <td>{(new Date(ticket.created_at)).toLocaleString("ru-RU")}</td>
                            <td>
                                <TicketStatusBadge status={ticket.status}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};