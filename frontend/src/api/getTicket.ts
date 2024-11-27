import {fetcher} from "../fetcher.ts";
import {TicketEntity, TicketEntityWithEvents} from "../types/TicketEntity.ts";

export const getTicket = async (id: number): Promise<TicketEntityWithEvents> => {
    return await fetcher("/ticket/" + id);
}