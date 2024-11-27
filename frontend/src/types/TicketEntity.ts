import {TicketPriority, TicketStatus} from "../components/TicketTable/TicketTable.tsx";

export type TicketEntity = {
    id: number;
    priority: TicketPriority;
    title: string;
    type: {
        id?: number;
        name: string;
    };
    issuedUser: {
        email: string;
        fullName: string;
    };
    assignedUser?: {
        email: string;
        fullName: string;
    };
    created_at: string;
    status: TicketStatus;
}