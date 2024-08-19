import React, {useRef} from "react";
import {ContextMenu, ContextMenuProps} from "primereact/contextmenu";
import {IconWithContext} from "./iconWithContext";

interface Props extends ContextMenuProps {
    icon: string;
    iconClassName?: string;
    iconStyle?: React.CSSProperties;
    menuClassName?: string;
}

export const HeaderMenuElement: React.FC<Props> = (props) => {

    const {
        icon,
        iconClassName,
        iconStyle,
        menuClassName,
    } = props

    const ref = useRef<ContextMenu>(null);

    return (
        <>
            <IconWithContext
                icon={icon}
                iconClassName={iconClassName}
                style={iconStyle}
                onClick={(event) => ref.current?.show(event)}>
                <ContextMenu
                    {...props}
                    className={menuClassName}
                    ref={ref}>
                </ContextMenu>
            </IconWithContext>
        </>
    );
}