import React, {PropsWithChildren, useRef} from "react";
import {OverlayPanel, OverlayPanelProps} from "primereact/overlaypanel";
import {IconWithContext} from "./iconWithContext";

interface Props extends OverlayPanelProps {
    icon: string;
    iconClassName?: string;
    iconstyle?: React.CSSProperties;
    panelClassName?: string;
    badge?: {
        active: boolean;
        value?: any | null | undefined;
        severity?: 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' | null | undefined;
        style?: React.CSSProperties
    }
}

export const HeaderPanelElement: React.FC<PropsWithChildren<Props>> = (
    props,
) => {
    const {icon, iconClassName, iconstyle, panelClassName, children, badge} = props;

    const ref = useRef<OverlayPanel>(null);

    return (
        <>
            <IconWithContext
                icon={icon}
                style={iconstyle}
                iconClassName={iconClassName}
                badge={badge}
                onClick={(event) => ref.current?.toggle(event)}
            >
                <OverlayPanel {...props} className={panelClassName} ref={ref}>
                    {children}
                </OverlayPanel>
            </IconWithContext>
        </>
    );
};
