import React, {FC, PropsWithChildren} from "react";
import "./TicketTableTh.scss"
import {TicketEntity} from "@/src/types/TicketEntity.ts";
import direct_arrow_icon from "@/src/assets/down_arrow.svg";

interface TicketTableThProps {
    onSort: (name: keyof TicketEntity) => void,
    sortKey?: keyof TicketEntity,
    selectedSortKey: keyof TicketEntity,
    sortDirection: 1 | -1,
    name: string
}

export const TicketTableTh: FC<PropsWithChildren<TicketTableThProps>> = (props) => {
    const onClick = () => {
        if (props.sortKey)
            props.onSort(props.sortKey)
    }

    let className = "control_table ";
    if (props.sortKey === props.selectedSortKey) {
        className += "control_table_selected ";

        if (props.sortDirection === -1) {
            className += "control_table_inverted ";
        }
    }

    return (
        <th className={className} onClick={onClick}>
            <div className="control_table_container">
                {props.name &&
                    <p className="control_table_col_name">
                        {props.name}
                    </p>
                }
                {
                    props.sortKey &&
                    <img
                        src={direct_arrow_icon}
                        alt=""
                        className="control_table_col_sort_direction"
                    />
                }
            </div>
        </th>
    );
};