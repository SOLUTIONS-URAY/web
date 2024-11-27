import {TicketPriority, TicketStatus} from "../components/TicketTable/TicketTable.tsx";
import {TicketEvent} from "./TicketEvent.ts";

export type TicketEntity = {
    id: number;
    priority: TicketPriority;
    title: string;
    type: {
        id?: number;
        name: string;
    };
    issuedUser: {
        id: number;
        email: string;
        fullName: string;
    };
    assignedUser?: {
        id: number;
        email: string;
        fullName: string;
    };
    created_at: string;
    status: TicketStatus;
}


export type TicketEntityWithEvents =  TicketEntity & {
    events: TicketEvent[];
};