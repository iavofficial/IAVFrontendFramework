import { NavbarColorType } from "../../../components/navbar/typesNavbarColor";
import {
  DARK_LEGAL_DOCS_ICON_COLOR,
  DARK_NAVBAR_BACKGROUND_COLOR,
  DARK_NAVBAR_COLLAPSE_ARROW_COLOR,
  DARK_NAVBAR_GROUP_HIGHLIGHT_COLOR,
  DARK_NAVBAR_SCROLLBAR_COLOR,
  DARK_NAVBAR_ARROW_HIGHLIGHT_COLOR,
  DARK_NAVBAR_ARROW_MAIN_COLOR,
  DARK_NAVBAR_ICON_HIGHLIGHT_COLOR,
  DARK_NAVBAR_ICON_MAIN_COLOR,
  DARK_NAVBAR_GROUP_FONT_HIGHLIGHT_COLOR,
  DARK_NAVBAR_FONT_MAIN_COLOR,
  DARK_NAVBAR_MAIN_COLOR,
  LIGHT_NAVBAR_BACKGROUND_COLOR,
  LIGHT_LEGAL_DOCS_ICON_COLOR,
  LIGHT_NAVBAR_COLLAPSE_ARROW_COLOR,
  LIGHT_NAVBAR_SCROLLBAR_COLOR,
  LIGHT_NAVBAR_MAIN_COLOR,
  LIGHT_NAVBAR_GROUP_HIGHLIGHT_COLOR,
  LIGHT_NAVBAR_FONT_MAIN_COLOR,
  LIGHT_NAVBAR_GROUP_FONT_HIGHLIGHT_COLOR,
  LIGHT_NAVBAR_ICON_MAIN_COLOR,
  LIGHT_NAVBAR_ICON_HIGHLIGHT_COLOR,
  LIGHT_NAVBAR_ARROW_HIGHLIGHT_COLOR,
  LIGHT_NAVBAR_ARROW_MAIN_COLOR,
  DARK_NAVBAR_GROUPED_TABS_BACKGROUND_COLOR,
  LIGHT_NAVBAR_GROUPED_TABS_BACKGROUND_COLOR,
  DARK_NAVBAR_TAB_HIGHLIGHT_COLOR,
  LIGHT_NAVBAR_TAB_HIGHLIGHT_COLOR,
  LIGHT_NAVBAR_TAB_FONT_HIGHLIGHT_COLOR,
  DARK_NAVBAR_TAB_FONT_HIGHLIGHT_COLOR,
  DARK_NAVBAR_TAB_INSIDE_ACTIVE_GROUP_COLOR,
  LIGHT_NAVBAR_TAB_INSIDE_ACTIVE_GROUP_COLOR,
} from "../defaultColors";

export const getCurrentColors_Navbar = (
  darkmodeIsEnabled: boolean,
  navbarColorOptions: NavbarColorType
) => {
  let currentColors;
  if (darkmodeIsEnabled) {
    currentColors = {
      backgroundColor: DARK_NAVBAR_BACKGROUND_COLOR,
      legalDocumentsIconColor: DARK_LEGAL_DOCS_ICON_COLOR,
      navbarCollapseArrowColor: DARK_NAVBAR_COLLAPSE_ARROW_COLOR,
      scrollbarColor: DARK_NAVBAR_SCROLLBAR_COLOR,
      tabColors: {
        mainColor: DARK_NAVBAR_MAIN_COLOR,
        groupHighlightColor: DARK_NAVBAR_GROUP_HIGHLIGHT_COLOR,
        tabHighlightColor: DARK_NAVBAR_TAB_HIGHLIGHT_COLOR,
        groupFontMainColor: DARK_NAVBAR_FONT_MAIN_COLOR,
        tabFontMainColor: DARK_NAVBAR_FONT_MAIN_COLOR,
        groupFontHighlightColor: DARK_NAVBAR_GROUP_FONT_HIGHLIGHT_COLOR,
        tabFontHighlightColor: DARK_NAVBAR_TAB_FONT_HIGHLIGHT_COLOR,
        iconMainColor: DARK_NAVBAR_ICON_MAIN_COLOR,
        iconHighlightColor: DARK_NAVBAR_ICON_HIGHLIGHT_COLOR,
        arrowHighlightColor: DARK_NAVBAR_ARROW_HIGHLIGHT_COLOR,
        arrowMainColor: DARK_NAVBAR_ARROW_MAIN_COLOR,
        groupedTabsBackgroundColor: DARK_NAVBAR_GROUPED_TABS_BACKGROUND_COLOR,
        tabInsideActiveGroupColor: DARK_NAVBAR_TAB_INSIDE_ACTIVE_GROUP_COLOR,
      },
    };
  } else {
    currentColors = {
      backgroundColor:
        navbarColorOptions.backgroundColor ?? LIGHT_NAVBAR_BACKGROUND_COLOR,
      legalDocumentsIconColor:
        navbarColorOptions.legalDocumentsIconColor ??
        LIGHT_LEGAL_DOCS_ICON_COLOR,
      navbarCollapseArrowColor:
        navbarColorOptions.navbarCollapseArrowColor ??
        LIGHT_NAVBAR_COLLAPSE_ARROW_COLOR,
      scrollbarColor:
        navbarColorOptions.scrollbarColor ?? LIGHT_NAVBAR_SCROLLBAR_COLOR,
      tabColors: {
        mainColor:
          navbarColorOptions.tabColorOptions?.mainColor ??
          LIGHT_NAVBAR_MAIN_COLOR,
        groupHighlightColor:
          navbarColorOptions.tabColorOptions?.groupHighlightColor ??
          LIGHT_NAVBAR_GROUP_HIGHLIGHT_COLOR,
        tabHighlightColor:
          navbarColorOptions.tabColorOptions?.tabHighlightColor ??
          LIGHT_NAVBAR_TAB_HIGHLIGHT_COLOR,
        groupFontMainColor:
          navbarColorOptions.tabColorOptions?.groupFontMainColor ??
          LIGHT_NAVBAR_FONT_MAIN_COLOR,
        tabFontMainColor:
          navbarColorOptions.tabColorOptions?.tabFontMainColor ??
          LIGHT_NAVBAR_FONT_MAIN_COLOR,
        groupFontHighlightColor:
          navbarColorOptions.tabColorOptions?.groupFontHighlightColor ??
          LIGHT_NAVBAR_GROUP_FONT_HIGHLIGHT_COLOR,
        tabFontHighlightColor:
          navbarColorOptions.tabColorOptions?.tabFontHighlightColor ??
          LIGHT_NAVBAR_TAB_FONT_HIGHLIGHT_COLOR,
        iconMainColor:
          navbarColorOptions.tabColorOptions?.iconMainColor ??
          LIGHT_NAVBAR_ICON_MAIN_COLOR,
        iconHighlightColor:
          navbarColorOptions.tabColorOptions?.iconHighlightColor ??
          LIGHT_NAVBAR_ICON_HIGHLIGHT_COLOR,
        arrowHighlightColor:
          navbarColorOptions.tabColorOptions?.arrowHighlightColor ??
          LIGHT_NAVBAR_ARROW_HIGHLIGHT_COLOR,
        arrowMainColor:
          navbarColorOptions.tabColorOptions?.arrowMainColor ??
          LIGHT_NAVBAR_ARROW_MAIN_COLOR,
        groupedTabsBackgroundColor:
          navbarColorOptions.tabColorOptions?.groupedTabsBackgroundColor ??
          LIGHT_NAVBAR_GROUPED_TABS_BACKGROUND_COLOR,
        tabInsideActiveGroupColor:
          navbarColorOptions.tabColorOptions?.tabInsideActiveGroupColor ??
          LIGHT_NAVBAR_TAB_INSIDE_ACTIVE_GROUP_COLOR
      },
    };
  }

  return currentColors;
};
