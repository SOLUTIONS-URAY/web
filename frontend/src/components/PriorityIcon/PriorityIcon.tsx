import {PropsWithChildren} from "react";
import "./PriorityIcon.scss";
import hight_icon from "@/src/assets/priority/high.svg";
import medium_icon from "@/src/assets/priority/medium.svg";
import low_icon from "@/src/assets/priority/low.svg";
import none_icon from "@/src/assets/priority/none.svg";

const PRIORITY_ICONS = [
    hight_icon,
    medium_icon,
    low_icon,
    none_icon
]

interface PriorityIconProps {
    type: 0 | 1 | 2 | 3;
}

export const PriorityIcon = (props: PropsWithChildren<PriorityIconProps>) => {
    const type = (props.type > 3 || props.type < 0) ? 3 : props.type;

    return (
        <img src={PRIORITY_ICONS[type]} alt=""/>
    );
};