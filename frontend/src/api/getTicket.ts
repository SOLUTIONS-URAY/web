import {fetcher} from "../fetcher.ts";
import {TicketEntityWithEvents} from "../types/TicketEntity.ts";

export const getTicket = async (id: number): Promise<TicketEntityWithEvents> => {
    return await fetcher("/ticket/" + id);
}