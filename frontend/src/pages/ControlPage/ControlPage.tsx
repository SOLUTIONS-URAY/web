import {FilterButton} from "../../components/FilterButton/FilterButton.tsx";
import {TicketTable} from "../../components/TicketTable/TicketTable.tsx";
import "./ControlPage.scss";
import useSWR from "swr";
import {TicketEntity} from "../../types/TicketEntity.ts";
import {useState} from "react";
import {TICKET_PRIORITY_CONF} from "../../types/TICKET_PRIORITY_NAMING.ts";
import {TICKET_STATUS_CONF} from "../../types/TICKET_STATUS_NAMING.ts";

export const ControlPage = () => {
    const {data, error, isLoading} = useSWR<TicketEntity[]>('/ticket')
    const {data: ticketTypes} = useSWR<{
        id: number,
        name: string
    }[]>('/ticket/types')

    const {data: profiList} = useSWR<{
        id: number,
        fullName: string
    }[]>('/user/profi')


    const [priorityIsVisible, setPriorityIsVisible] = useState(false);
    const priorityPossibleValues = Object
        .fromEntries(
            Array
                .from(new Set(data?.map(ticket => ticket.priority) || [])) // Уникальные значение
                .map((v) => [v + "", TICKET_PRIORITY_CONF[v].name]) // в ключ - значение
        )
    const [prioritySelectedValues, setPrioritySelectedValues] = useState<string[]>(Object.keys(priorityPossibleValues));

    const [ticketTypeIsVisible, setTicketTypeIsVisible] = useState(false);
    const ticketTypePossibleValues = Object
        .fromEntries(
            Array
                .from(new Set(data?.map(ticket => ticket.type.id) || [])) // Уникальные значение
                .map((v) => [v + "", (ticketTypes?.find(t => t.id === v)?.name) || ""]) // в ключ - значение
        )
    const [ticketTypeSelectedValues, setTicketTypeSelectedValues] = useState<string[]>(Object.keys(ticketTypePossibleValues));

    const [assignedUserIsVisible, setAssignedUserIsVisible] = useState(false);
    const assignedUserPossibleValues = Object
        .fromEntries(
            Array
                .from(new Set(data?.map(ticket => ticket.assignedUser?.id) || [])) // Уникальные значение
                .map((v) => [v + "", (profiList?.find(t => t.id === v)?.fullName) || ""]) // в ключ - значение
        )
    const [assignedUserSelectedValues, setAssignedUserSelectedValues] = useState<string[]>(Object.keys(assignedUserPossibleValues));

    const [ticketStatusIsVisible, setTicketStatusIsVisible] = useState(false);
    const ticketStatusPossibleValues = Object
        .fromEntries(
            Array
                .from(new Set(data?.map(ticket => ticket.status) || [])) // Уникальные значение
                .map((v) => [v + "", TICKET_STATUS_CONF[v].name]) // в ключ - значение
        )
    const [ticketStatusSelectedValues, setTicketStatusSelectedValues] = useState<string[]>(Object.keys(ticketStatusPossibleValues));



    const filteredData = data === undefined ? [] : (data
            .filter(ticket => prioritySelectedValues.includes(ticket.priority+"") || prioritySelectedValues.length === 0)
            .filter(ticket => ticketTypeSelectedValues.includes(ticket.type.id+"") || ticketTypeSelectedValues.length === 0)
            .filter(ticket => assignedUserSelectedValues.includes(ticket.assignedUser?.id+"") || assignedUserSelectedValues.length === 0)
            .filter(ticket => ticketStatusSelectedValues.includes(ticket.status+"") || ticketStatusSelectedValues.length === 0)
    );

    return (
        <div className="control_page">
            <div className="control_top_bar">
                <FilterButton
                    naming="Приоритет"
                    selectedValues={prioritySelectedValues}
                    possibleValues={priorityPossibleValues}
                    onChangeSelectedValue={setPrioritySelectedValues}
                    en_name="priority"
                    isVisible={priorityIsVisible}
                    onChangeVisible={setPriorityIsVisible}
                />
                <FilterButton
                    naming="Тип заявки"
                    selectedValues={ticketTypeSelectedValues}
                    possibleValues={ticketTypePossibleValues}
                    onChangeSelectedValue={setTicketTypeSelectedValues}
                    en_name="ticket_type"
                    isVisible={ticketTypeIsVisible}
                    onChangeVisible={setTicketTypeIsVisible}
                />
                <FilterButton
                    naming="Ответственный"
                    selectedValues={assignedUserSelectedValues}
                    possibleValues={assignedUserPossibleValues}
                    onChangeSelectedValue={setAssignedUserSelectedValues}
                    en_name="assigned_user"
                    isVisible={assignedUserIsVisible}
                    onChangeVisible={setAssignedUserIsVisible}
                />
                <FilterButton
                    naming="Статус заявки"
                    selectedValues={ticketStatusSelectedValues}
                    possibleValues={ticketStatusPossibleValues}
                    onChangeSelectedValue={setTicketStatusSelectedValues}
                    en_name="ticket_status"
                    isVisible={ticketStatusIsVisible}
                    onChangeVisible={setTicketStatusIsVisible}
                />
            </div>
            {(!error && !isLoading && data) && <TicketTable tickets={filteredData}/>}
            {error && <p>Ошибка</p>}
            {isLoading && <p>Загрузка</p>}
        </div>
    );
};