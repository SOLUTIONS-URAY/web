export enum TicketEventType {
    CHANGE_PRIORITY,
    CHANGE_TITLE,
    CHANGE_ISSUED_USER,
    CHANGE_ASSIGNED_USER,
    CHANGE_STATUS,
    ADD_COMMENTARY
}
export type TicketEvent = {
    uuid: string;
    type: TicketEventType;
    message: string;
    author: {
        fullName: string;
        id: number;
    }
}