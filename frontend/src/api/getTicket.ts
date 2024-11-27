import {fetcher} from "../fetcher.ts";
import {TicketEntity} from "../types/TicketEntity.ts";

export const getTicket = async (id: number): Promise<TicketEntity> => {
    return await fetcher("/ticket/" + id);
}