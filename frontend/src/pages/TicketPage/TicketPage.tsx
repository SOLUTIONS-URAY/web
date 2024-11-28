import React, {PropsWithChildren, useLayoutEffect, useState} from "react";
import "./TicketPage.scss"
import {TicketEntity} from "../../types/TicketEntity.ts";
import {TicketEvent} from "../../types/TicketEvent.ts";
import {getTicket} from "../../api/getTicket.ts";
import {useParams} from "react-router-dom";
import {updateTicket} from "../../api/updateTicket.ts";
import {toast} from "react-toastify";
import {TicketPriority, TicketStatus} from "../../components/TicketTable/TicketTable.tsx";
import {TICKET_STATUS_CONF} from "../../types/TICKET_STATUS_NAMING.ts";
import {useUserData} from "../../hooks/useUserData.tsx";
import {TICKET_PRIORITY_CONF} from "../../types/TICKET_PRIORITY_NAMING.ts";
import useSWR from "swr";
import {commantTicket} from "../../api/commentTicket.ts";


const TicketEventNaming = [
    "изменил (-а) приоритет",
    "изменил (-а) тему",
    "изменил (-а) пользователя, создавшего тикет",
    "изменил (-а) специалиста",
    "изменил (-а) статус",
    "изменил (-а) тип обращения",
    "добавил (-а) сообщение: ",
]

export const TicketPage = (props: PropsWithChildren) => {
    const [ticketInfo, setTicketInfo] = useState< TicketEntity | null>();
    const [ticketEvents, setTicketEvents] = useState<TicketEvent[]>([]);
    const [adderMsgText, setAdderMsgText] = useState("");

    const userInfo = useUserData();
    const {ticketId} = useParams();

    const {data: ticketTypes, error: ticketTypesError, isLoading: ticketTypesLoading} = useSWR<{
        id: number,
        name: string
    }[]>('/ticket/types')


    // Обновление информации о тикете
    const updateTicketInfo = () => {
        getTicket(Number(ticketId))
            .then((ticket)=> {
                setTicketInfo(ticket)
                setTicketEvents(ticket.events)
            })
    };
    useLayoutEffect(updateTicketInfo, [ticketId]);


    // Сохранение изменений
    const onSaveButtonClick = () => {
        if (!ticketInfo) return;
        updateTicket(Number(ticketId), ticketInfo)
            .then(()=> {
                toast.success("Успешно!")
                updateTicketInfo()
            })
    }


    // Изменение приоритета
    const onChangePriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTicketInfo((prevState) => {
            if(!prevState) return prevState;
            return {...prevState, priority: (Number(e.target.value) as TicketPriority)};
        });
    }
    // Изменение темы
    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTicketInfo((prevState) => {
            if (!prevState) return prevState;
            return {...prevState, title: e.target.value};
        });
    }
    // Изменение статуса
    const onChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTicketInfo((prevState) => {
            if (!prevState) return prevState;
            return {...prevState, status: (Number(e.target.value) as TicketStatus)};
        });
    }
    // Изменение типа
    const onChangeTicketType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTicketInfo((prevState) => {
            if (!prevState) return prevState;
            return {...prevState, type: {id: (Number(e.target.value) as TicketStatus)}};
        });
    }

    // Изменение текста сообщения
    const onChangeAdderMsgText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAdderMsgText(e.target.value);
    }
    // Отправка сообщения
    const onSendButtonClick = () => {
        if (!ticketInfo) return;
        if (adderMsgText.length < 4) {
            toast.error("Сообщение слишком короткое (минимум - 4 символа)")
            return;
        }

        commantTicket(Number(ticketId), adderMsgText)
            .then(() => {
                toast.success("Успешно!")
                updateTicketInfo()
                setAdderMsgText("");
            })
            .catch((e) => {
                console.log("Comment error:", e)
                toast.error("Ошибка")
            })
    }

    return (
        <div className="ticket_page">
            <div className="ticket_title">
                <p style={{fontWeight: 900}}> Тикет #{ticketInfo?.id}: {ticketInfo?.title}</p>
            </div>

            <div className="ticket_info">
                <div className="ticket_info_block">
                    <p className="ticket_info_title">Приоритет:</p>

                    <select onChange={onChangePriority} value={ticketInfo?.priority}
                            disabled={userInfo?.userRole !== 0}>
                        {TICKET_PRIORITY_CONF.map((priotity, key) => (
                            <option value={key} key={key}>{priotity.name}</option>
                        ))}
                    </select>
                </div>
                <div className="ticket_info_block">
                    <p className="ticket_info_title">Тема:</p>
                    <input type="text" value={ticketInfo?.title} onChange={onChangeTitle}/>
                </div>
                <div className="ticket_info_block">
                    <p className="ticket_info_title">Тип заявки:</p>
                    <select onChange={onChangeTicketType} value={ticketInfo?.type.id}>
                        {ticketTypes && ticketTypes.map((type, key) => (
                            <option value={type.id} key={type.id}>{type.name}</option>
                        ))}
                        {ticketTypesError && (
                            <option value={-1}>Ошибка загрузки</option>
                        )}
                        {ticketTypesLoading && (
                            <option value={-1}>Загрузка...</option>
                        )}
                    </select>
                </div>
                <div className="ticket_info_block">
                    <p className="ticket_info_title">Пользователь:</p>
                    <input type="text" value={ticketInfo?.issuedUser.email}/>
                </div>
                <div className="ticket_info_block">
                    <p className="ticket_info_title">Ответственный:</p>
                    <input type="text" value={ticketInfo?.assignedUser?.fullName}/>
                </div>
                <div className="ticket_info_block">
                    <p className="ticket_info_title">Статус заявки:</p>
                    <select onChange={onChangeStatus} value={ticketInfo?.status}>
                        {TICKET_STATUS_CONF.map((status, key) => (
                            <option value={key} key={key}>{status.name}</option>
                        ))}
                    </select>

                </div>
                <div className="ticket_info_block">
                    <button onClick={onSaveButtonClick}>Сохранить</button>
                </div>
            </div>

            <div className="ticket_events">
                <div className="ticket_events_title">
                    <p style={{fontWeight: 900}}>События (Отчёт по тикету):</p>
                </div>
                <div className="ticket_events_container">
                    {ticketEvents.length > 0 && ticketEvents.map(ticketEvent => (
                        <div className="ticket_event" key={ticketEvent.uuid}>
                            <p className="ticket_event_text">
                                В {(new Date(ticketEvent.created_at)).toLocaleString("ru-RU")} пользователь {ticketEvent.author.fullName} {TicketEventNaming[ticketEvent.type]} {ticketEvent.message}
                            </p>
                        </div>
                    ))}
                    {ticketEvents.length == 0 && <p>Отсутствуют</p>}
                </div>
            </div>

            <div className="ticket_add_message">
                <div className="ticket_add_message_title">
                    <p style={{fontWeight: 900}}>Добавить сообщение:</p>
                </div>
                <textarea
                    name=""
                    id=""
                    className="ticket_new_message"
                    placeholder="Сообщение"
                    value={adderMsgText}
                    onChange={onChangeAdderMsgText}
                >
                </textarea>
                <button className="send_message" onClick={onSendButtonClick}>Отправить!</button>
            </div>
        </div>
    );
};