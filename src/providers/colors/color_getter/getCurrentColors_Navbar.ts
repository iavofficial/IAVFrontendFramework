import { NavbarColorType } from "../../../components/navbar/typesNavbarColor";
import {
  DARK_NAVBAR_BACKGROUND_INSIDE_ACTIVE_GROUP_COLOR,
  DARK_NAV_GROUP_ARROW_ACTIVE_COLOR,
  DARK_NAV_GROUP_ARROW_HOVER_COLOR,
  DARK_NAV_GROUP_BACKGROUND_ACTIVE_COLOR,
  DARK_NAV_GROUP_BACKGROUND_HOVER_COLOR,
  DARK_NAV_GROUP_BACKGROUND_MAIN_COLOR,
  DARK_NAV_GROUP_FONT_ACTIVE_COLOR,
  DARK_NAV_GROUP_FONT_HOVER_COLOR,
  DARK_NAV_GROUP_FONT_MAIN_COLOR,
  DARK_NAV_GROUP_ICON_ACTIVE_COLOR,
  DARK_NAV_GROUP_ICON_HOVER_COLOR,
  DARK_NAV_GROUP_ICON_MAIN_COLOR,
  DARK_NAV_TAB_BACKGROUND_ACTIVE_COLOR,
  DARK_NAV_TAB_BACKGROUND_HOVER_COLOR,
  DARK_NAV_TAB_BACKGROUND_MAIN_COLOR,
  DARK_NAV_TAB_FONT_ACTIVE_COLOR,
  DARK_NAV_TAB_FONT_HOVER_COLOR,
  DARK_NAV_TAB_FONT_MAIN_COLOR,
  DARK_NAV_TAB_ICON_ACTIVE_COLOR,
  DARK_NAV_TAB_ICON_HOVER_COLOR,
  DARK_NAV_TAB_ICON_MAIN_COLOR,
  LIGHT_NAV_BACKGROUND_INSIDE_ACTIVE_GROUP_COLOR,
  LIGHT_NAV_GROUP_ARROW_ACTIVE_COLOR,
  LIGHT_NAV_GROUP_ARROW_HOVER_COLOR,
  LIGHT_NAV_GROUP_BACKGROUND_ACTIVE_COLOR,
  LIGHT_NAV_GROUP_BACKGROUND_HOVER_COLOR,
  LIGHT_NAV_GROUP_BACKGROUND_MAIN_COLOR,
  LIGHT_NAV_GROUP_FONT_ACTIVE_COLOR,
  LIGHT_NAV_GROUP_FONT_HOVER_COLOR,
  LIGHT_NAV_GROUP_FONT_MAIN_COLOR,
  LIGHT_NAV_GROUP_ICON_ACTIVE_COLOR,
  LIGHT_NAV_GROUP_ICON_HOVER_COLOR,
  LIGHT_NAV_GROUP_ICON_MAIN_COLOR,
  LIGHT_NAV_TAB_BACKGROUND_ACTIVE_COLOR,
  LIGHT_NAV_TAB_BACKGROUND_HOVER_COLOR,
  LIGHT_NAV_TAB_BACKGROUND_MAIN_COLOR,
  LIGHT_NAV_TAB_FONT_ACTIVE_COLOR,
  LIGHT_NAV_TAB_FONT_HOVER_COLOR,
  LIGHT_NAV_TAB_FONT_MAIN_COLOR,
  LIGHT_NAV_TAB_ICON_ACTIVE_COLOR,
  LIGHT_NAV_TAB_ICON_HOVER_COLOR,
  LIGHT_NAV_TAB_ICON_MAIN_COLOR,
} from "../defaultColors";

export const getCurrentColors_Navbar = (
  darkmodeIsEnabled: boolean,
  navbarColorOptions: NavbarColorType
) => {
  // This function returns the color to be used.
  const calcColor = (lightDef: string, darkDef: string, custom?: string) => {
    if (custom) {
      return custom;
    }
    if (darkmodeIsEnabled) {
      return darkDef;
    }
    return lightDef;
  };

  return {
    main: {
      tabBackgroundMainColor: calcColor(
        LIGHT_NAV_TAB_BACKGROUND_MAIN_COLOR,
        DARK_NAV_TAB_BACKGROUND_MAIN_COLOR,
        navbarColorOptions.content?.main?.tabBackgroundMainColor
      ),
      tabFontMainColor: calcColor(
        LIGHT_NAV_TAB_FONT_MAIN_COLOR,
        DARK_NAV_TAB_FONT_MAIN_COLOR,
        navbarColorOptions.content?.main?.tabFontMainColor
      ),
      tabIconMainColor: calcColor(
        LIGHT_NAV_TAB_ICON_MAIN_COLOR,
        DARK_NAV_TAB_ICON_MAIN_COLOR,
        navbarColorOptions.content?.main?.tabIconMainColor
      ),
      groupBackgroundMainColor: calcColor(
        LIGHT_NAV_GROUP_BACKGROUND_MAIN_COLOR,
        DARK_NAV_GROUP_BACKGROUND_MAIN_COLOR,
        navbarColorOptions.content?.main?.groupBackgroundMainColor
      ),
      groupFontMainColor: calcColor(
        LIGHT_NAV_GROUP_FONT_MAIN_COLOR,
        DARK_NAV_GROUP_FONT_MAIN_COLOR,
        navbarColorOptions.content?.main?.groupFontMainColor
      ),
      groupIconMainColor: calcColor(
        LIGHT_NAV_GROUP_ICON_MAIN_COLOR,
        DARK_NAV_GROUP_ICON_MAIN_COLOR,
        navbarColorOptions.content?.main?.groupIconMainColor
      ),
      groupArrowMainColor: calcColor(
        LIGHT_NAV_BACKGROUND_INSIDE_ACTIVE_GROUP_COLOR,
        DARK_NAVBAR_BACKGROUND_INSIDE_ACTIVE_GROUP_COLOR,
        navbarColorOptions.content?.insideActiveGroupColor
      ),
    },
    hover: {
      tabBackgroundHoverColor: calcColor(
        LIGHT_NAV_TAB_BACKGROUND_HOVER_COLOR,
        DARK_NAV_TAB_BACKGROUND_HOVER_COLOR,
        navbarColorOptions.content?.hover?.tabBackgroundHoverColor
      ),
      tabFontHoverColor: calcColor(
        LIGHT_NAV_TAB_FONT_HOVER_COLOR,
        DARK_NAV_TAB_FONT_HOVER_COLOR,
        navbarColorOptions.content?.hover?.tabBackgroundHoverColor
      ),
      tabIconHoverColor: calcColor(
        LIGHT_NAV_TAB_ICON_HOVER_COLOR,
        DARK_NAV_TAB_ICON_HOVER_COLOR,
        navbarColorOptions.content?.hover?.tabIconHoverColor
      ),
      groupBackgroundHoverColor: calcColor(
        LIGHT_NAV_GROUP_BACKGROUND_HOVER_COLOR,
        DARK_NAV_GROUP_BACKGROUND_HOVER_COLOR,
        navbarColorOptions.content?.hover?.tabBackgroundHoverColor
      ),
      groupFontHoverColor: calcColor(
        LIGHT_NAV_GROUP_FONT_HOVER_COLOR,
        DARK_NAV_GROUP_FONT_HOVER_COLOR,
        navbarColorOptions.content?.hover?.tabBackgroundHoverColor
      ),
      groupIconHoverColor: calcColor(
        LIGHT_NAV_GROUP_ICON_HOVER_COLOR,
        DARK_NAV_GROUP_ICON_HOVER_COLOR,
        navbarColorOptions.content?.hover?.groupIconHoverColor
      ),
      groupArrowHoverColor: calcColor(
        LIGHT_NAV_GROUP_ARROW_HOVER_COLOR,
        DARK_NAV_GROUP_ARROW_HOVER_COLOR,
        navbarColorOptions.content?.hover?.groupArrowHoverColor
      ),
    },
    active: {
      tabBackgroundActiveColor: calcColor(
        LIGHT_NAV_TAB_BACKGROUND_ACTIVE_COLOR,
        DARK_NAV_TAB_BACKGROUND_ACTIVE_COLOR,
        navbarColorOptions.content?.hover?.tabBackgroundHoverColor
      ),
      tabFontActiveColor: calcColor(
        LIGHT_NAV_TAB_FONT_ACTIVE_COLOR,
        DARK_NAV_TAB_FONT_ACTIVE_COLOR,
        navbarColorOptions.content?.hover?.tabBackgroundHoverColor
      ),
      tabIconActiveColor: calcColor(
        LIGHT_NAV_TAB_ICON_ACTIVE_COLOR,
        DARK_NAV_TAB_ICON_ACTIVE_COLOR,
        navbarColorOptions.content?.hover?.tabIconHoverColor
      ),
      groupBackgroundActiveColor: calcColor(
        LIGHT_NAV_GROUP_BACKGROUND_ACTIVE_COLOR,
        DARK_NAV_GROUP_BACKGROUND_ACTIVE_COLOR,
        navbarColorOptions.content?.hover?.tabBackgroundHoverColor
      ),
      groupFontActiveColor: calcColor(
        LIGHT_NAV_GROUP_FONT_ACTIVE_COLOR,
        DARK_NAV_GROUP_FONT_ACTIVE_COLOR,
        navbarColorOptions.content?.hover?.tabBackgroundHoverColor
      ),
      groupIconActiveColor: calcColor(
        LIGHT_NAV_GROUP_ICON_ACTIVE_COLOR,
        DARK_NAV_GROUP_ICON_ACTIVE_COLOR,
        navbarColorOptions.content?.hover?.groupIconHoverColor
      ),
      groupArrowActiveColor: calcColor(
        LIGHT_NAV_GROUP_ARROW_ACTIVE_COLOR,
        DARK_NAV_GROUP_ARROW_ACTIVE_COLOR,
        navbarColorOptions.content?.hover?.groupArrowHoverColor
      ),
    },
    insideActiveGroupColor: calcColor(
      LIGHT_NAV_BACKGROUND_INSIDE_ACTIVE_GROUP_COLOR,
      DARK_NAVBAR_BACKGROUND_INSIDE_ACTIVE_GROUP_COLOR,
      navbarColorOptions.content?.insideActiveGroupColor
    ),
  };
};
