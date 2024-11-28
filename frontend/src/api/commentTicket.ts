import {fetcher, HttpMethod} from "../fetcher.ts";
import {TicketEntityWithEvents} from "../types/TicketEntity.ts";

export const commantTicket = async (id: number, text: string): Promise<TicketEntityWithEvents> => {
    return await fetcher("/ticket/" + id + "/comment", {text}, HttpMethod.POST);
}