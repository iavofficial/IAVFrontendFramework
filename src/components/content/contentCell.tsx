import React, {PropsWithChildren, useContext} from 'react';
import makeStyles from "./style_options/makeStyles";
import {classNames} from "primereact/utils";
import {ColorSettingsContext} from "../../contexts/colorsettings";
import If from "../helper/If";

interface Props {
    container?: boolean;
    size?: number | 'auto' | 'grow';
    spacing?: number;
    rowSpacing?: number;
    className?: string;
    style?: React.CSSProperties;
}

const useStyles = makeStyles(({props, darkMode}: { props: Props, darkMode: boolean }) => ({
    gridContainer: {
        width: "100%",
        display: 'flex',
        flexFlow: "wrap",
        minWidth: "0px",
        boxSizing: "border-box",
        gap: props.spacing || 0,
        ...(props.style || {}),
    },
    gridItem: {
        flexGrow: 1,
        width: props.size === 'grow' ? '100%' : props.size ? `${((props.size / 12) * 100)}%` : 'auto ',
        padding: "8px",
        ...(props.style || {}),
    },
    content: {
        height: "100%",
        width: "100%",
        background: darkMode ? "black" : "white"
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
            className={classNames(className, container ? classes.gridContainer : classes.gridItem)}>
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
