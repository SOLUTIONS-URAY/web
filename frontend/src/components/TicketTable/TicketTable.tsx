import {FC} from "react";
import "./TicketTable.scss";
import {TicketEntity} from "../../types/TicketEntity.ts";
import {useNavigate} from "react-router-dom";

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

export const TicketTable : FC<TicketTableProps> = ({tickets}) => {
    const navigate = useNavigate();

    return (
        <div className="control_table">
            <table className="control">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Приоритет</th>
                    <th scope="col">Тема</th>
                    <th scope="col">Тип заявки</th>
                    <th scope="col">Пользователь</th>
                    <th scope="col">Ответственный</th>
                    <th scope="col">Дата заявки</th>
                    <th scope="col">Статус заявки</th>
                </tr>
                </thead>
                <tbody>
                    {tickets && tickets.map(ticket => (
                        <tr key={ticket.id} onClick={()=>navigate("/ticket/"+ticket.id)}>
                            <th scope="row">{ticket.id}</th>
                            <td>{ticket.priority}</td>
                            <td>{ticket.title}</td>
                            <td>{ticket.type.name}</td>
                            <th>{ticket.issuedUser.email}</th>
                            <td>{ticket.assignedUser?.fullName}</td>
                            <td>{ticket.created_at}</td>
                            <td>{ticket.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};