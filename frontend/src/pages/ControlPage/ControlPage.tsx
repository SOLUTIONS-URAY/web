import {FilterButton} from "../../components/FilterButton/FilterButton.tsx";
import {TicketTable} from "../../components/TicketTable/TicketTable.tsx";
import "./ControlPage.scss";
import useSWR from "swr";
import {TicketEntity} from "../../types/TicketEntity.ts";

export const ControlPage = () => {
    const {data, error, isLoading} = useSWR<TicketEntity[]>('/ticket')

    return (
        <div className="control_page">
            <div className="control_top_bar">
                <FilterButton/>
                <FilterButton/>
                <FilterButton/>
            </div>
            {(!error && !isLoading && data) && <TicketTable tickets={data}/>}
            {error && <p>Ошибка</p>}
            {isLoading && <p>Загрузка</p>}
        </div>
    );
};