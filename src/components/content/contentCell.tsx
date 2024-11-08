import React, {PropsWithChildren, useContext} from 'react';
import makeStyles from "./style_options/makeStyles";
import {classNames} from "primereact/utils";
import {ColorSettingsContext} from "../../contexts/colorsettings";
import If from "../helper/If";

interface Props {
    container?: boolean;
    size?: number;
    className?: string;
    style?: React.CSSProperties;
}

const useStyles = makeStyles(({props, darkMode}: { props: Props, darkMode: boolean }) => ({
    contentCellContainer: {
        width: "100%",
        display: 'flex',
        flexFlow: "wrap",
        minWidth: "0px",
        boxSizing: "border-box",
        padding: "8px",
    },
    contentCellItem: {
        flex: props.size ? `0 0 ${((props.size / 12) * 100)}%` : '1 1 0',
        padding: "8px",
    },
    content: {
        height: "100%",
        width: "100%",
        background: darkMode ? "black" : "white",
        ...(props.style || {}),
    }
}));

export const ContentCell: React.FC<PropsWithChildren<Props>> = (props) => {

    const colorSettingsContext = useContext(ColorSettingsContext);

    const {
        container,
        className,
        children,
    } = props;

    const {classes} = useStyles({props: props, darkMode: colorSettingsContext.darkmode});

    return (
        <div
            className={classNames(className, container ? classes.contentCellContainer : classes.contentCellItem)}>
            <If condition={container}>
                {children}
            </If>
            <If condition={!container}>
                <div className={classNames(classes.content)}>
                    {children}
                </div>
            </If>
        </div>
    );
};
