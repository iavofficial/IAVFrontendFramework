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

  const iconHighlightColor =
    colorSettingsContext.currentColors.navbarColors.tabColors
      .iconHighlightColor;
  const iconMainColor =
    colorSettingsContext.currentColors.navbarColors.tabColors.iconMainColor;

  const arrowMainColor =
    colorSettingsContext.currentColors.navbarColors.tabColors.arrowMainColor;
  const arrowHighlightColor =
    colorSettingsContext.currentColors.navbarColors.tabColors
      .arrowHighlightColor;

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

  const groupBackgroundMainColor =
    colorSettingsContext.currentColors.navbarColors.tabColors
      .groupBackgroundMainColor;
  const groupBackgroundHoverColor =
    colorSettingsContext.currentColors.navbarColors.tabColors
      .groupBackgroundHoverColor;
  const groupBackgroundActiveColor =
    colorSettingsContext.currentColors.navbarColors.tabColors
      .groupBackgroundActiveColor;

  const collapsible =
    props.collapsible !== undefined ? props.collapsible : true;

  useEffect(() => {
    if (!collapsible) {
      setGroupTabCollapsed(false);
    }
  }, [collapsible]);

  const tabStyleDefault = {
    width: props.navbarCollapsed ? "40px" : "240px",
    backgroundColor: hovering
      ? groupBackgroundHoverColor
      : !groupTabCollapsed
      ? groupBackgroundActiveColor
      : groupBackgroundMainColor,
    color: hovering ? fontHighlightColor : fontMainColor,
  };

  let className = "default-nav-element-wrapper flex align-items-center";

  if (!insideActiveGroup) {
    className += " navbar-tab-space";
  }

  const tabComponentProperties = {
    name: props.name instanceof Function ? props.name(t) : props.name,
    hovering: hovering,
    logo: props.logo,
    groupTabCollapsed: groupTabCollapsed,
    colors: {
      iconMainColor,
      iconHighlightColor,
      arrowMainColor,
      arrowHighlightColor,
    },
  };

  const groupElement = props.navbarCollapsed ? (
    <TabGroupCollapsed {...tabComponentProperties} />
  ) : (
    <TabGroupUnfolded {...tabComponentProperties} />
  );

  return (
    <>
      <div
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className={className}
        style={tabStyleDefault}
        onClick={() => {
          if (props.collapsible) {
            setGroupTabCollapsed(
              (prevGroupTabCollapsed: boolean) => !prevGroupTabCollapsed
            );
          }
        }}
      >
        {groupElement}
      </div>
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
