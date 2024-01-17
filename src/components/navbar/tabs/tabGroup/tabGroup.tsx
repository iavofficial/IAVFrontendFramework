import React, { ReactElement, useContext, useEffect, useState } from "react";
import "../../navbar.css";
import { useTranslator } from "../../../internationalization/translators";
import { navbarTabProps } from "../navbarTab";
import { ColorSettingsContext } from "../../../../contexts/colorsettings";
import { TranslateFunctionType } from "../../../../types/translationFunction";
import { TabGroupCollapsed } from "./tabGroupCollapsed";
import { TabGroupUnfolded } from "./tabGroupUnfolded";
import { groupCollapsed } from "console";

interface Props {
  name: string | ((t: TranslateFunctionType) => string);
  navbarCollapsed: boolean;
  logo?: ReactElement;
  collapsible?: boolean;
}

type PropsWithNavbarTabChildren<T> = T & {
  children: ReactElement<navbarTabProps>[];
};

export const TabGroup = (props: PropsWithNavbarTabChildren<Props>) => {
  const t = useTranslator();
  const colorSettingsContext = useContext(ColorSettingsContext);
  const [hovering, setHovering] = useState(false);
  const [groupTabCollapsed, setGroupTabCollapsed] = useState(false);

  const highlightColor =
    colorSettingsContext.currentColors.navbarColors.tabColors.highlightColor;
  const mainColor =
    colorSettingsContext?.currentColors.navbarColors.tabColors.mainColor;

  const letteringHighlightColor =
    colorSettingsContext.currentColors.navbarColors.tabColors
      .letteringHighlightColor;
  const letteringMainColor =
    colorSettingsContext.currentColors.navbarColors.tabColors
      .letteringMainColor;

  const collapsible =
    props.collapsible !== undefined ? props.collapsible : true;

  useEffect(() => {
    if (!collapsible) {
      setGroupTabCollapsed(true);
    }
  }, [collapsible]);

  const tabStyleDefault = {
    width: props.navbarCollapsed ? "40px" : "240px",
    backgroundColor: (hovering || groupTabCollapsed) ? highlightColor : mainColor,
    color: hovering ? letteringHighlightColor : letteringMainColor,
    padding: props.navbarCollapsed ? "0px" : "0px 16px 0px 0px"
  };

  const groupElement = props.navbarCollapsed ? (
    <TabGroupCollapsed
      name={props.name instanceof Function ? props.name(t) : props.name}
      style={tabStyleDefault}
      setHovering={setHovering}
      hovering={hovering}
      logo={props.logo}
    />
  ) : (
    <TabGroupUnfolded
      name={props.name instanceof Function ? props.name(t) : props.name}
      style={tabStyleDefault}
      setHovering={setHovering}
      hovering={hovering}
      logo={props.logo}
      collapsible={!!props.collapsible}
      groupTabCollapsed={groupTabCollapsed}
      setGroupTabCollapsed={setGroupTabCollapsed}
    />
  );

  return (
    <>
      {groupElement}
      {groupTabCollapsed ? (
        props.children.map((child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { collapsed: groupTabCollapsed });
          }
          return child;
        })
      ) : (
        <React.Fragment />
      )}
    </>
  );
};
