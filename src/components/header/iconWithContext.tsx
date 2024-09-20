import React, { PropsWithChildren } from "react";
import { classNames } from "primereact/utils";

interface Props {
  icon: string;
  iconClassName?: string;
  style?: React.CSSProperties;
  onClick: (event: React.MouseEvent) => void;
}

export const IconWithContext: React.FC<PropsWithChildren<Props>> = (props) => {
  const { icon, iconClassName, style, onClick, children } = props;

  return (
    <>
      <i
        style={{ ...style, fontSize: 19, margin: "0 1rem", cursor: "pointer" }}
        className={classNames(icon, iconClassName)}
        onClick={onClick}
      />
      {children}
    </>
  );
};
