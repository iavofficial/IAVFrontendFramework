import React, { ReactElement, useContext, useEffect, useState } from "react";
import "../../navbar.css";
import { useTranslator } from "../../../internationalization/translators";
import { InjectedOptionsGroupableByWrapperToTab } from "../../types/typesInjectedOptions";
import { ColorSettingsContext } from "../../../../contexts/colorsettings";
import { TranslateFunctionType } from "../../../../types/translationFunction";
import { TabGroupCollapsed } from "./tabGroupCollapsed";
import { TabGroupUnfolded } from "./tabGroupUnfolded";
import { GroupableTabAndContentWrapper } from "../../wrappers/typesWrappers";
import { InjectedOptionsByGroupToWrapper } from "../../types/typesInjectedOptions";

interface Props {
  name: string | ((t: TranslateFunctionType) => string);
  navbarCollapsed: boolean;
  wrappers: GroupableTabAndContentWrapper[];
  frameworkInjectedOptions: InjectedOptionsByGroupToWrapper;
  logo?: ReactElement;
  collapsible?: boolean;
}

export const TabGroup = (props: Props) => {
  const t = useTranslator();
  const colorSettingsContext = useContext(ColorSettingsContext);
  const [hovering, setHovering] = useState(false);
  const [groupTabCollapsed, setGroupTabCollapsed] = useState(true);

  const insideActiveGroup = props.frameworkInjectedOptions.groupActive;

  const highlightColor =
    colorSettingsContext.currentColors.navbarColors.tabColors
      .groupHighlightColor;
  const mainColor =
    colorSettingsContext?.currentColors.navbarColors.tabColors.mainColor;
  const insideActiveGroupColor =
    colorSettingsContext.currentColors.navbarColors.tabColors
      .tabInsideActiveGroupColor;

  let backgroundColor = mainColor;
  if (hovering || !groupTabCollapsed) {
    backgroundColor = highlightColor;
  } else if (insideActiveGroup) {
    backgroundColor = insideActiveGroupColor;
  }

  const fontHighlightColor =
    colorSettingsContext.currentColors.navbarColors.tabColors
      .groupFontHighlightColor;
  const fontMainColor =
    colorSettingsContext.currentColors.navbarColors.tabColors
      .groupFontMainColor;

  const collapsible =
    props.collapsible !== undefined ? props.collapsible : true;

  useEffect(() => {
    if (!collapsible) {
      setGroupTabCollapsed(false);
    }
  }, [collapsible]);

  const tabStyleDefault = {
    width: props.navbarCollapsed ? "40px" : "240px",
    backgroundColor: backgroundColor,
    color: hovering ? fontHighlightColor : fontMainColor,
  };

  const additionalClassNames = !insideActiveGroup ? "navbar-tab-space" : "";

  const groupElement = props.navbarCollapsed ? (
    <TabGroupCollapsed
      name={props.name instanceof Function ? props.name(t) : props.name}
      style={tabStyleDefault}
      setHovering={setHovering}
      hovering={hovering}
      logo={props.logo}
      additionalClassNames={additionalClassNames}
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
      additionalClassNames={additionalClassNames}
    />
  );

  return (
    <>
      {groupElement}
      {!groupTabCollapsed ? (
        props.wrappers.map((wrapper) =>
          wrapper.getNavbarComponent({
            groupActive: !groupTabCollapsed,
            navbarCollapsed: props.frameworkInjectedOptions.navbarCollapsed,
          })
        )
      ) : (
        <React.Fragment />
      )}
    </>
  );
};
