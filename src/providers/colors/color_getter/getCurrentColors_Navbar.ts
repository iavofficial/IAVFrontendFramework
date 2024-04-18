import { NavbarColorOptions } from "../../../components/navbar/typesNavbarColor";
import {
  DARK_NAVBAR_BACKGROUND_INSIDE_ACTIVE_GROUP_COLOR,
  DARK_NAV_BACKGROUND_COLOR,
  DARK_NAV_COLLAPSE_ARROW_COLOR,
  DARK_NAV_GROUP_ARROW_ACTIVE_COLOR,
  DARK_NAV_GROUP_ARROW_HOVER_COLOR,
  DARK_NAV_GROUP_BACKGROUND_ACTIVE_COLOR,
  DARK_NAV_GROUP_BACKGROUND_HOVER_COLOR,
  DARK_NAV_GROUP_BACKGROUND_DEFAULT_COLOR,
  DARK_NAV_GROUP_FONT_ACTIVE_COLOR,
  DARK_NAV_GROUP_FONT_HOVER_COLOR,
  DARK_NAV_GROUP_FONT_DEFAULT_COLOR,
  DARK_NAV_GROUP_ICON_ACTIVE_COLOR,
  DARK_NAV_GROUP_ICON_HOVER_COLOR,
  DARK_NAV_GROUP_ICON_DEFAULT_COLOR,
  DARK_NAV_LEGAL_DOCS_ICON_COLOR,
  DARK_NAV_SCROLLBAR_COLOR,
  DARK_NAV_TAB_BACKGROUND_ACTIVE_COLOR,
  DARK_NAV_TAB_BACKGROUND_HOVER_COLOR,
  DARK_NAV_TAB_BACKGROUND_DEFAULT_COLOR,
  DARK_NAV_TAB_FONT_ACTIVE_COLOR,
  DARK_NAV_TAB_FONT_HOVER_COLOR,
  DARK_NAV_TAB_FONT_DEFAULT_COLOR,
  DARK_NAV_TAB_ICON_ACTIVE_COLOR,
  DARK_NAV_TAB_ICON_HOVER_COLOR,
  DARK_NAV_TAB_ICON_DEFAULT_COLOR,
  LIGHT_NAV_BACKGROUND_COLOR,
  LIGHT_NAV_BACKGROUND_INSIDE_ACTIVE_GROUP_COLOR,
  LIGHT_NAV_COLLAPSE_ARROW_COLOR,
  LIGHT_NAV_GROUP_ARROW_ACTIVE_COLOR,
  LIGHT_NAV_GROUP_ARROW_HOVER_COLOR,
  LIGHT_NAV_GROUP_BACKGROUND_ACTIVE_COLOR,
  LIGHT_NAV_GROUP_BACKGROUND_HOVER_COLOR,
  LIGHT_NAV_GROUP_BACKGROUND_DEFAULT_COLOR,
  LIGHT_NAV_GROUP_FONT_ACTIVE_COLOR,
  LIGHT_NAV_GROUP_FONT_HOVER_COLOR,
  LIGHT_NAV_GROUP_FONT_DEFAULT_COLOR,
  LIGHT_NAV_GROUP_ICON_ACTIVE_COLOR,
  LIGHT_NAV_GROUP_ICON_HOVER_COLOR,
  LIGHT_NAV_GROUP_ICON_DEFAULT_COLOR,
  LIGHT_NAV_LEGAL_DOCS_ICON_COLOR,
  LIGHT_NAV_SCROLLBAR_COLOR,
  LIGHT_NAV_TAB_BACKGROUND_ACTIVE_COLOR,
  LIGHT_NAV_TAB_BACKGROUND_HOVER_COLOR,
  LIGHT_NAV_TAB_BACKGROUND_DEFAULT_COLOR,
  LIGHT_NAV_TAB_FONT_ACTIVE_COLOR,
  LIGHT_NAV_TAB_FONT_HOVER_COLOR,
  LIGHT_NAV_TAB_FONT_DEFAULT_COLOR,
  LIGHT_NAV_TAB_ICON_ACTIVE_COLOR,
  LIGHT_NAV_TAB_ICON_HOVER_COLOR,
  LIGHT_NAV_TAB_ICON_DEFAULT_COLOR,
  LIGHT_NAV_GROUP_ARROW_DEFAULT_COLOR,
  DARK_NAV_GROUP_ARROW_DEFAULT_COLOR,
} from "../defaultColors";

export const getCurrentColors_Navbar = (
  darkmodeIsEnabled: boolean,
  customColorsDisabledInCurrentMode: boolean,
  navbarColorOptions: NavbarColorOptions
) => {
  // This function returns the color to be used.
  const determineColor = (lightDef: string, darkDef: string, custom?: string) => {
    if (custom && !customColorsDisabledInCurrentMode) {
      return custom;
    }
    if (darkmodeIsEnabled) {
      return darkDef;
    }
    return lightDef;
  };

  return {
    backgroundColor: determineColor(
      LIGHT_NAV_BACKGROUND_COLOR,
      DARK_NAV_BACKGROUND_COLOR,
      navbarColorOptions.navbarBackgroundColor
    ),
    legalDocumentsIconColor: determineColor(
      LIGHT_NAV_LEGAL_DOCS_ICON_COLOR,
      DARK_NAV_LEGAL_DOCS_ICON_COLOR,
      navbarColorOptions.legalDocumentsIconColor
    ),
    navbarCollapseArrowColor: determineColor(
      LIGHT_NAV_COLLAPSE_ARROW_COLOR,
      DARK_NAV_COLLAPSE_ARROW_COLOR,
      navbarColorOptions.navbarCollapseArrowColor
    ),
    scrollbarColor: determineColor(
      LIGHT_NAV_SCROLLBAR_COLOR,
      DARK_NAV_SCROLLBAR_COLOR,
      navbarColorOptions.navbarCollapseArrowColor
    ),
    content: {
      insideActiveGroupColor: determineColor(
        LIGHT_NAV_BACKGROUND_INSIDE_ACTIVE_GROUP_COLOR,
        DARK_NAVBAR_BACKGROUND_INSIDE_ACTIVE_GROUP_COLOR,
        navbarColorOptions.content?.insideActiveGroupColor
      ),
      default: {
        tabBackgroundDefaultColor: determineColor(
          LIGHT_NAV_TAB_BACKGROUND_DEFAULT_COLOR,
          DARK_NAV_TAB_BACKGROUND_DEFAULT_COLOR,
          navbarColorOptions.content?.default?.tabBackgroundDefaultColor
        ),
        tabFontDefaultColor: determineColor(
          LIGHT_NAV_TAB_FONT_DEFAULT_COLOR,
          DARK_NAV_TAB_FONT_DEFAULT_COLOR,
          navbarColorOptions.content?.default?.tabFontDefaultColor
        ),
        tabIconDefaultColor: determineColor(
          LIGHT_NAV_TAB_ICON_DEFAULT_COLOR,
          DARK_NAV_TAB_ICON_DEFAULT_COLOR,
          navbarColorOptions.content?.default?.tabIconDefaultColor
        ),
        groupBackgroundDefaultColor: determineColor(
          LIGHT_NAV_GROUP_BACKGROUND_DEFAULT_COLOR,
          DARK_NAV_GROUP_BACKGROUND_DEFAULT_COLOR,
          navbarColorOptions.content?.default?.groupBackgroundDefaultColor
        ),
        groupFontDefaultColor: determineColor(
          LIGHT_NAV_GROUP_FONT_DEFAULT_COLOR,
          DARK_NAV_GROUP_FONT_DEFAULT_COLOR,
          navbarColorOptions.content?.default?.groupFontDefaultColor
        ),
        groupIconDefaultColor: determineColor(
          LIGHT_NAV_GROUP_ICON_DEFAULT_COLOR,
          DARK_NAV_GROUP_ICON_DEFAULT_COLOR,
          navbarColorOptions.content?.default?.groupIconDefaultColor
        ),
        groupArrowDefaultColor: determineColor(
          LIGHT_NAV_GROUP_ARROW_DEFAULT_COLOR,
          DARK_NAV_GROUP_ARROW_DEFAULT_COLOR,
          navbarColorOptions.content?.default?.groupArrowDefaultColor
        ),
      },
      hover: {
        tabBackgroundHoverColor: determineColor(
          LIGHT_NAV_TAB_BACKGROUND_HOVER_COLOR,
          DARK_NAV_TAB_BACKGROUND_HOVER_COLOR,
          navbarColorOptions.content?.hover?.tabBackgroundHoverColor
        ),
        tabFontHoverColor: determineColor(
          LIGHT_NAV_TAB_FONT_HOVER_COLOR,
          DARK_NAV_TAB_FONT_HOVER_COLOR,
          navbarColorOptions.content?.hover?.tabFontHoverColor
        ),
        tabIconHoverColor: determineColor(
          LIGHT_NAV_TAB_ICON_HOVER_COLOR,
          DARK_NAV_TAB_ICON_HOVER_COLOR,
          navbarColorOptions.content?.hover?.tabIconHoverColor
        ),
        groupBackgroundHoverColor: determineColor(
          LIGHT_NAV_GROUP_BACKGROUND_HOVER_COLOR,
          DARK_NAV_GROUP_BACKGROUND_HOVER_COLOR,
          navbarColorOptions.content?.hover?.groupBackgroundHoverColor
        ),
        groupFontHoverColor: determineColor(
          LIGHT_NAV_GROUP_FONT_HOVER_COLOR,
          DARK_NAV_GROUP_FONT_HOVER_COLOR,
          navbarColorOptions.content?.hover?.groupFontHoverColor
        ),
        groupIconHoverColor: determineColor(
          LIGHT_NAV_GROUP_ICON_HOVER_COLOR,
          DARK_NAV_GROUP_ICON_HOVER_COLOR,
          navbarColorOptions.content?.hover?.groupIconHoverColor
        ),
        groupArrowHoverColor: determineColor(
          LIGHT_NAV_GROUP_ARROW_HOVER_COLOR,
          DARK_NAV_GROUP_ARROW_HOVER_COLOR,
          navbarColorOptions.content?.hover?.groupArrowHoverColor
        ),
      },
      active: {
        tabBackgroundActiveColor: determineColor(
          LIGHT_NAV_TAB_BACKGROUND_ACTIVE_COLOR,
          DARK_NAV_TAB_BACKGROUND_ACTIVE_COLOR,
          navbarColorOptions.content?.active?.tabBackgroundActiveColor
        ),
        tabFontActiveColor: determineColor(
          LIGHT_NAV_TAB_FONT_ACTIVE_COLOR,
          DARK_NAV_TAB_FONT_ACTIVE_COLOR,
          navbarColorOptions.content?.active?.tabFontActiveColor
        ),
        tabIconActiveColor: determineColor(
          LIGHT_NAV_TAB_ICON_ACTIVE_COLOR,
          DARK_NAV_TAB_ICON_ACTIVE_COLOR,
          navbarColorOptions.content?.active?.tabIconActiveColor
        ),
        groupBackgroundActiveColor: determineColor(
          LIGHT_NAV_GROUP_BACKGROUND_ACTIVE_COLOR,
          DARK_NAV_GROUP_BACKGROUND_ACTIVE_COLOR,
          navbarColorOptions.content?.active?.groupBackgroundActiveColor
        ),
        groupFontActiveColor: determineColor(
          LIGHT_NAV_GROUP_FONT_ACTIVE_COLOR,
          DARK_NAV_GROUP_FONT_ACTIVE_COLOR,
          navbarColorOptions.content?.active?.groupFontActiveColor
        ),
        groupIconActiveColor: determineColor(
          LIGHT_NAV_GROUP_ICON_ACTIVE_COLOR,
          DARK_NAV_GROUP_ICON_ACTIVE_COLOR,
          navbarColorOptions.content?.active?.groupIconActiveColor
        ),
        groupArrowActiveColor: determineColor(
          LIGHT_NAV_GROUP_ARROW_ACTIVE_COLOR,
          DARK_NAV_GROUP_ARROW_ACTIVE_COLOR,
          navbarColorOptions.content?.active?.groupArrowActiveColor
        ),
      }
    },
  };
};
