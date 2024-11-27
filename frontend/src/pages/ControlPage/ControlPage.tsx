import {FilterButton} from "../../components/FilterButton/FilterButton.tsx";
import {TicketEntity, TicketPriority, TicketStatus, TicketTable} from "../../components/TicketTable/TicketTable.tsx";
import "./ControlPage.scss";
import useSWR from "swr";

// const data: TicketEntity[] = [
//     {
//         id: 45622,
//         priority: TicketPriority.HIGH,
//         title: "Сервер не работает",
//         type: {
//             name: "Обслуживание"
//         },
//         issuedUser: {
//             email: "3dwarka@gmail.com",
//             fullName: "Кузьмин А.",
//         },
//         assignedUser: {
//             email: "mimbol@yandex.ru",
//             fullName: "Малыгин А.",
//         },
//         created_at: "",
//         status: TicketStatus.CLOSED,
//     },
//     {
//         id: 44562,
//         priority: TicketPriority.HIGH,
//         title: "Сервер не работает",
//         type: {
//             name: "Обслуживание"
//         },
//         issuedUser: {
//             email: "3dwarka@gmail.com",
//             fullName: "Кузьмин А.",
//         },
//         assignedUser: {
//             email: "mimbol@yandex.ru",
//             fullName: "Малыгин А.",
//         },
//         created_at: "2024-11-27T05:49:15.257Z",
//         status: TicketStatus.CLOSED,
//     },{
//         id: 45626,
//         priority: TicketPriority.HIGH,
//         title: "Сервер не работает",
//         type: {
//             name: "Обслуживание"
//         },
//         issuedUser: {
//             email: "3dwarka@gmail.com",
//             fullName: "Кузьмин А.",
//         },
//         created_at: "2024-11-27T05:49:15.257Z",
//         status: TicketStatus.CLOSED,
//     },
//
//     {
//         "id": 2,
//         "priority": TicketPriority.HIGH,
//         "title": "Сервер не отвечает",
//         "created_at": "2024-11-27T05:49:15.257Z",
//         "status": TicketStatus.CLOSED,
//         "issuedUser": {
//             "fullName": "Малыгин А.Е.",
//             "email": "mimbol@yandex.ru"
//         },
//         "assignedUser": {
//             "fullName": "Кузьмин А.П.",
//             "email": "3dwarka@gmail.com"
//         },
//         "type": {
//             "id": 1,
//             "name": "Обслуживание"
//         }
//     }
// ]


export const ControlPage = () => {
    const { data, error, isLoading } = useSWR<TicketEntity>('/ticket')

    console.log("ABOBA", data, error, isLoading)
    return (
        <div className="control_page">
            <div className="control_top_bar">
                <FilterButton/>
                <FilterButton/>
                <FilterButton/>
            </div>
            {(!error && !isLoading) && <TicketTable tickets={data}/>}
            {error && <p>Ошибка</p>}
            {isLoading && <p>Загрузка</p>}
        </div>
    );
};