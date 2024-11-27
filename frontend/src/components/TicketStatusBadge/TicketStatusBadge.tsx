import {TicketStatus} from "../TicketTable/TicketTable.tsx";
import {FC} from "react";
import "./TicketStatusBadge.scss";
import {TICKET_STATUS_CONF} from "../../types/TICKET_STATUS_NAMING.ts";


interface TicketStatusBadgeProps {
    status: TicketStatus;
}

export const TicketStatusBadge: FC<TicketStatusBadgeProps> = ({status}) => {
    const status_conf = TICKET_STATUS_CONF[status];

    return (
        <div className={"ticket_status_badge ticket_status_badge_" + status_conf.style_name}>
            <p className="ticket_status_badge_text">{status_conf.name}</p>
        </div>
    );
};