import React, { useContext, useState } from "react";
import { ColorSettingsContext } from "../../contexts/colorsettings";
import { DEFAULT_ELEMENTSIZE } from "../../constants";

export interface Props {
  handleOnClickEvent: () => void;
  icon: string;
  isVisible?: boolean;
}

export const ContentBarButtonElement = ({
  handleOnClickEvent,
  icon,
  isVisible,
}: Props) => {
  const [hover, setHover] = useState(false);
  const colorSettingsContext = useContext(ColorSettingsContext);

  const buttonDefaultColor =
    colorSettingsContext.currentColors.contentbar.buttonDefaultColor;
  const buttonHoverColor =
    colorSettingsContext.currentColors.contentbar.buttonHoverColor;
  const iconDefaultColor =
    colorSettingsContext.currentColors.contentbar.iconDefaultColor;
  const iconHoverColor =
    colorSettingsContext.currentColors.contentbar.iconHoverColor;

  return isVisible === true ? (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleOnClickEvent}
      style={{
        height: `${DEFAULT_ELEMENTSIZE}px`,
        width: `${DEFAULT_ELEMENTSIZE}px`,
        cursor: "pointer",
        backgroundColor: hover ? buttonHoverColor : buttonDefaultColor,
      }}
      className="flex justify-content-center align-items-center"
    >
      <i
        className={icon}
        style={{
          color: hover ? iconHoverColor : iconDefaultColor,
        }}
      />
    </div>
  ) : (
    <></>
  );
};
