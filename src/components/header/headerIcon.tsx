import React, {PropsWithChildren} from "react";
import makeStyles from "../content/style_options/makeStyles";
import {classNames} from "primereact/utils";

const useStyles = makeStyles(() => ({
    wrapper: {
        cursor: "pointer",
    },
}));

interface Props {
    onClick?: (event: React.SyntheticEvent) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    style?: React.CSSProperties
}

const HeaderIcon: React.FC<PropsWithChildren<Props>> = props => {

    const {
        onClick,
        onKeyDown,
        style,
        children
    } = props;

    const {classes} = useStyles()

    return (
        <div
            className={classNames("flex align-items-center justify-content-end", classes.wrapper)}
            style={style}
            onClick={onClick}
            onKeyDown={onKeyDown}>
            {children}
        </div>
    );
}

export default HeaderIcon;
