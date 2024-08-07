import React, {CSSProperties, HTMLInputTypeAttribute, useContext, useMemo} from "react";
import {InputText} from "primereact/inputtext";
import {ColorSettingsContext} from "../../../contexts/colorsettings";
import {RED} from "../../../constants";

interface Props {
    className?: string | undefined;
    style?: CSSProperties | undefined;
    label?: string,
    id?: string;
    type?: HTMLInputTypeAttribute | undefined;
    name?: string;
    required?: boolean;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    error?: boolean;
    helperText?: string;
    autoFocus?: boolean;
}

const TextField: React.FC<Props> = (props) => {

    const {
        className,
        style,
        label,
        id,
        type,
        name,
        required,
        value,
        onChange,
        error,
        helperText,
        autoFocus
    } = props;

    const errorMessage = useMemo(() => {
        return error ? helperText : " ";
    }, [error, helperText]);

    const colorSettingsContext = useContext(ColorSettingsContext);

    const inputFieldDescriptionTextColor = useMemo(() => {
        return colorSettingsContext.currentColors.authenticationView
            .inputFieldDescriptionTextColor;
    }, [colorSettingsContext]);

    return (
        <div
            className={`${className} flex flex-column`}
            style={style}>
            <label
                htmlFor={id}
                style={{
                    fontWeight: "normal",
                    marginBottom: "2px",
                    fontSize: "12px",
                    color: inputFieldDescriptionTextColor,
                }}>
                {label}
            </label>
            <InputText
                id={id}
                type={type}
                name={name}
                required={required}
                value={value}
                onChange={onChange}
                autoFocus={autoFocus}
            />
            <small
                id={`${id}-help`}
                style={{height: "17px", color: RED}}>
                {errorMessage}
            </small>
        </div>
    );
}

export default TextField;