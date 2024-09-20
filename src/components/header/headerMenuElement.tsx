import React, {useRef} from "react";
import {ContextMenu, ContextMenuProps} from "primereact/contextmenu";
import {IconWithContext} from "./iconWithContext";

interface Props extends ContextMenuProps {
  icon: string;
  iconClassName?: string;
  iconstyle?: React.CSSProperties;
  menuClassName?: string;
}

export const HeaderMenuElement: React.FC<Props> = (props) => {
  const {icon, iconClassName, iconstyle, menuClassName} = props;

  const ref = useRef<ContextMenu>(null);

  return (
    <>
      <IconWithContext
        icon={icon}
        iconClassName={iconClassName}
        style={iconstyle}
        onClick={(event) => ref.current?.show(event)}
      >
        <ContextMenu
          {...props}
          className={menuClassName}
          ref={ref}
        ></ContextMenu>
      </IconWithContext>
    </>
  );
};
