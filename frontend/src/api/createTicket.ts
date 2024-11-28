import {fetcher, HttpMethod} from "../fetcher.ts";
import {TicketEntity} from "../types/TicketEntity.ts";

export type TicketToCreate = {
    typeId: number;
    email: string;
    text: string;
    title: string;
}

export const updateTicket = async (ticketData: TicketToCreate): Promise<TicketEntity> => {
    return await fetcher("/ticket/create", ticketData, HttpMethod.POST);
}