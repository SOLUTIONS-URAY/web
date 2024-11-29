import React, {FC, useState} from "react";
import "./TicketTable.scss";
import {TicketEntity} from "../../types/TicketEntity.ts";
import {useNavigate} from "react-router-dom";
import {TicketStatusBadge} from "../TicketStatusBadge/TicketStatusBadge.tsx";
import {TICKET_PRIORITY_CONF} from "../../types/TICKET_PRIORITY_NAMING.ts";
import {TicketTableTh} from "@/src/components/TicketTable/TicketTableTh/TicketTableTh.tsx";
import {PriorityIcon} from "@/src/components/PriorityIcon/PriorityIcon.tsx";

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
type TableHeaderType = {
    sort_key?: SupportSortKey;
    name: string
}

const tableHeader: TableHeaderType[] = [
    {
        sort_key: "id",
        name: "N-Заявки"
    },
    {
        sort_key: "priority",
        name: ""
    },
    {
        name: "Тема"
    },
    {
        sort_key: "type",
        name: "Тип заявки"
    },
    {
        name: "Пользователь"
    },
    {
        name: "Ответственный"
    },
    {
        sort_key: "created_at",
        name: "Дата заявки"
    },
    {
        sort_key: "status",
        name: "Статус заявки"
    },
];

export const TicketTable: FC<TicketTableProps> = ({tickets}) => {
    const navigate = useNavigate();

    const [sortKey, setSortKey] = useState<SupportSortKey>("id");
    const [sortDirection, setSortDirection] = useState<1 | -1>(1);

    const onSortRequest = (name: SupportSortKey) => {
        if (name === sortKey) {
            setSortDirection(prevState => prevState === -1 ? 1 : -1) // Если сделать через умножение - TS ругается на типы
        } else {
            setSortDirection(1);
            setSortKey(name);
        }
    }


    const resolvesTickets = tickets
        .sort((a, b) => {
            switch (sortKey) {
                case "created_at":
                    return sortDirection * ((new Date(a.created_at)).getTime() - (new Date(b.created_at)).getTime());
                case "status":
                    return sortDirection * (a.status - b.status);
                case "priority":
                    return sortDirection * (a.priority - b.priority);
                case "type":
                    return sortDirection * (a.type.id - b.type.id);
                default:
                    return sortDirection * (a.id - b.id);
            }
        })


    return (
        <div className="control_table">
            <table className="control" cellSpacing="0">
                <thead>
                <tr>
                    {tableHeader.map(collumn => (
                        <TicketTableTh
                            name={collumn.name}
                            sortKey={collumn.sort_key}
                            onSort={onSortRequest}
                            selectedSortKey={sortKey}
                            sortDirection={sortDirection}
                            key={collumn.name}
                        />
                    ))}
                </tr>
                </thead>
                <tbody>
                {resolvesTickets.map(ticket => {
                    const ticketDate = new Date(ticket.created_at);
                    return (
                        <tr key={ticket.id} onClick={() => navigate("/ticket/" + ticket.id)}>
                            <td>
                                {ticket.id}
                            </td>
                            <td>
                                <PriorityIcon type={ticket.priority}/>
                            </td>
                            <td>
                                {ticket.title}
                            </td>
                            <td>
                                {ticket.type.name}
                            </td>
                            <td>
                                {ticket.issuedUser.email}
                            </td>
                            <td>
                                {ticket.assignedUser?.fullName || "Не назначен"}
                            </td>
                            <td>
                                {ticketDate.toLocaleDateString("ru-RU")} (
                                {ticketDate.getHours() < 10 && "0"}{ticketDate.getHours()}
                                :
                                {ticketDate.getMinutes() < 10 && "0"}{ticketDate.getMinutes()}
                                )
                            </td>
                            <td>
                                <TicketStatusBadge status={ticket.status}/>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
};