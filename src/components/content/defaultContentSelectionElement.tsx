import React, { useContext, useState } from "react";
import { BLACK, BLUE0, GREY3, GREY5, WHITE } from "../../constants";
import { generateHashOfLength } from "../../utils/hash";
import { Tooltip } from "primereact/tooltip";
import "./contentbar.css";
import { ColorSettingsContext } from "../../contexts/colorsettings";
import { TranslationFunction } from "../../types/translationFunction";
import { useTranslator } from "../internationalization/translators";
import { determineCurrentColor } from "../../utils/determineCurrentColor";

export interface Props {
  displayName: string | TranslationFunction;
  width: number;
  id: string;
  selected?: boolean;
  closable?: boolean;
  onClose?: (value: string) => void;
  setSelectedId: (value: string) => any;
}

export const DefaultContentSelectionElement = (props: Props) => {
  const [hovering, setHovering] = useState(false);
  const translationFunction = useTranslator();
  const colorSettingsContext = useContext(ColorSettingsContext);

  const tabBackgroundDefaultColor =
    colorSettingsContext.currentColors.contentbar.tabs.backgroundDefaultColor;
  const tabBackgroundHoverColor =
    colorSettingsContext.currentColors.contentbar.tabs.backgroundHoverColor;
  const tabBackgroundActiveColor =
    colorSettingsContext.currentColors.contentbar.tabs.backgroundActiveColor;
  const textDefaultColor =
    colorSettingsContext.currentColors.contentbar.tabs.textDefaultColor;
  const textHoverColor =
    colorSettingsContext.currentColors.contentbar.tabs.textHoverColor;
  const textActiveColor =
    colorSettingsContext.currentColors.contentbar.tabs.textActiveColor;
  const iconDefaultColor =
    colorSettingsContext.currentColors.contentbar.tabs.iconDefaultColor;
  const iconHoverColor =
    colorSettingsContext.currentColors.contentbar.tabs.iconHoverColor;
  const iconActiveColor =
    colorSettingsContext.currentColors.contentbar.tabs.iconActiveColor;

  const tabState = {
    isActive: !!props.selected,
    isHovering: hovering,
    isDisabled: false,
  };

  const name =
    typeof props.displayName === "string"
      ? props.displayName
      : props.displayName(translationFunction);

  let widthvalue = props.width.toString() + "px";
  const tabStyle = {
    cursor: props.selected ? "default" : "pointer",
    backgroundColor: determineCurrentColor(tabState, {
      defaultColor: tabBackgroundDefaultColor,
      hoverColor: tabBackgroundHoverColor,
      activeColor: tabBackgroundActiveColor,
    }),
    color: determineCurrentColor(tabState, {
      defaultColor: textDefaultColor,
      hoverColor: textHoverColor,
      activeColor: textActiveColor,
    }),
    height: "40px",
    width: widthvalue,
    alignItems: "center",
    borderRight:
      "1px solid " + (colorSettingsContext?.darkmode ? GREY5 : WHITE),
  };

  const closingIconStyle = {
    color: determineCurrentColor(tabState, {
      defaultColor: iconDefaultColor,
      hoverColor: iconHoverColor,
      activeColor: iconActiveColor,
    }),
    marginRight: "8px",
  };

  const handleOnCloseEvent = (e: any) => {
    e.stopPropagation();
    if (props.onClose) {
      props.onClose(props.id!);
    }
  };

  const handleOnClickEvent = (value: string) => {
    if (props.setSelectedId) {
      props.setSelectedId(value);
    }
  };

  const identifier = generateHashOfLength(4);
  const identifierLegal = "a" + identifier;
  const identifierWithDot = "." + identifierLegal;

  return (
    <>
      <div
        className={"flex align-items-center element-hover"}
        style={tabStyle}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onClick={() => handleOnClickEvent(props.id!)}
      >
        {props.displayName.length >= 20 ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className={identifierLegal}
          >
            <span className={"m-auto font-semibold "}>
              {name.slice(0, 20) + "..."}
            </span>
            <Tooltip
              id="change-color"
              content={name}
              target={identifierWithDot}
            />
          </div>
        ) : (
          <div className={"m-auto font-semibold "}>{name}</div>
        )}
        {props.closable ? (
          <div style={{ position: "absolute", right: "5px" }}>
            <i
              onClick={(event) => handleOnCloseEvent(event)}
              style={closingIconStyle}
              className="pi pi-times tabelements-only"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
