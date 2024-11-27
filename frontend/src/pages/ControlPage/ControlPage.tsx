import {FilterButton} from "../../components/FilterButton/FilterButton.tsx";
import {TicketEntity, TicketPriority, TicketStatus, TicketTable} from "../../components/TicketTable/TicketTable.tsx";
import "./ControlPage.scss";

const data: TicketEntity[] = [
    {
        id: 45622,
        priority: TicketPriority.HIGH,
        title: "Сервер не работает",
        type: {
            name: "Обслуживание"
        },
        issuedUser: {
            email: "3dwarka@gmail.com",
            fullName: "Кузьмин А.",
        },
        assignedUser: {
            email: "mimbol@yandex.ru",
            fullName: "Малыгин А.",
        },
        created_at: new Date(),
        status: TicketStatus.CLOSED,
    },
    {
        id: 44562,
        priority: TicketPriority.HIGH,
        title: "Сервер не работает",
        type: {
            name: "Обслуживание"
        },
        issuedUser: {
            email: "3dwarka@gmail.com",
            fullName: "Кузьмин А.",
        },
        assignedUser: {
            email: "mimbol@yandex.ru",
            fullName: "Малыгин А.",
        },
        created_at: new Date(),
        status: TicketStatus.CLOSED,
    },{
        id: 45626,
        priority: TicketPriority.HIGH,
        title: "Сервер не работает",
        type: {
            name: "Обслуживание"
        },
        issuedUser: {
            email: "3dwarka@gmail.com",
            fullName: "Кузьмин А.",
        },
        created_at: new Date(),
        status: TicketStatus.CLOSED,
    },
]


export const ControlPage = () => {


    return (
        <div className="control_page">
            <div className="control_top_bar">
                <FilterButton/>
                <FilterButton/>
                <FilterButton/>
            </div>
            <TicketTable tickets={data}/>
        </div>
    );
};