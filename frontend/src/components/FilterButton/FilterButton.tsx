import React, {Dispatch, FC, SetStateAction} from "react";
import "./FilterButton.scss";

type KeyValue = {
    [key: string]: string;
}

interface FilterButtonProps {
    possibleValues: KeyValue,
    selectedValues: string[],
    onChangeSelectedValue: Dispatch<SetStateAction<string[]>>;
    naming: string;
    en_name: string;
    isVisible: boolean;
    onChangeVisible: Dispatch<SetStateAction<boolean>>;
}

export const FilterButton: FC<FilterButtonProps> = (props) => {
    const possibleValuesKeys = Object.keys(props.possibleValues);

    const onChangeValue = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        console.log(target.value, target.checked)
        props.onChangeSelectedValue((prevState) => {
            if(target.checked)
                return [...prevState, target.value];
            else
                return prevState
                    .filter((v) => v === target.value ? target.checked : true);
        });
    }

    const onChangeVisible = () => {
        props.onChangeVisible(prevState => !prevState);
    }

    return (
        <>
            <div className={"filter_button_container filter_button_container_"+(props.isVisible && "visible")}>
                <button className="filter_button" onClick={onChangeVisible}>
                    {props.naming}
                </button>
            </div>
            <div className={"filter_button_menu filter_button_menu_"+(props.isVisible && "visible")}>
                <div className="filter_possible_values_container">
                    {possibleValuesKeys.map((key) => {
                        const value = props.possibleValues[key];
                        return (
                            <div className="filter_possible_value" key={key}>
                                <input
                                    type="checkbox"
                                    id={"filter_"+props.en_name+"_"+value}
                                    name={"filter_"+props.en_name}
                                    checked={props.selectedValues.includes(key)}
                                    value={key}
                                    onChange={onChangeValue}
                                />
                                <label htmlFor={"filter_"+props.en_name+"_"+value}>{value}</label>
                            </div>
                        )
                    })}
                </div>
                <div className="filter_button_menu_save_button">
                    <button className="filter_button_menu_save_button" onClick={onChangeVisible}>
                        Сохранить
                    </button>
                </div>
            </div>
        </>
    );
};