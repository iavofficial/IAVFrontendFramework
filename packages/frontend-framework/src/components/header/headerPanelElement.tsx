import React, {PropsWithChildren, useRef} from "react";
import {OverlayPanel, OverlayPanelProps} from "primereact/overlaypanel";
import {IconWithContext} from "./iconWithContext";

interface Props extends OverlayPanelProps {
  icon: string;
  iconClassName?: string;
  iconstyle?: React.CSSProperties;
  panelClassName?: string;
}

export const HeaderPanelElement: React.FC<PropsWithChildren<Props>> = (
  props,
) => {
  const {icon, iconClassName, iconstyle, panelClassName, children} = props;

  const ref = useRef<OverlayPanel>(null);

  return (
    <>
      <IconWithContext
        icon={icon}
        style={iconstyle}
        iconClassName={iconClassName}
        onClick={(event) => ref.current?.toggle(event)}
      >
        <OverlayPanel {...props} className={panelClassName} ref={ref}>
          {children}
        </OverlayPanel>
      </IconWithContext>
    </>
  );
};
