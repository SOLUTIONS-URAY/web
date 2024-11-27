import {fetcher, HttpMethod} from "../fetcher.ts";
import {TicketEntity, TicketEntityWithEvents} from "../types/TicketEntity.ts";

export const updateTicket = async (id: number, newData: TicketEntity): Promise<TicketEntityWithEvents> => {
    return await fetcher("/ticket/" + id, newData, HttpMethod.PUT);
}