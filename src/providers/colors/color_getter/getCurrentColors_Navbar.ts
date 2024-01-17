import { NavbarColorType } from "../../../components/navbar/navbarColorType";
import {
  DARK_LEGAL_DOCS_ICON_COLOR,
  DARK_NAVBAR_BACKGROUND_COLOR,
  DARK_NAVBAR_COLLAPSE_ARROW_COLOR,
  DARK_NAVBAR_HIGHLIGHT_COLOR,
  DARK_NAVBAR_SCROLLBAR_COLOR,
  DARK_NAVBAR_ARROW_HIGHLIGHT_COLOR,
  DARK_NAVBAR_ARROW_MAIN_COLOR,
  DARK_NAVBAR_ICON_HIGHLIGHT_COLOR,
  DARK_NAVBAR_ICON_MAIN_COLOR,
  DARK_NAVBAR_LETTERING_HIGHLIGHT_COLOR,
  DARK_NAVBAR_LETTERING_MAIN_COLOR,
  DARK_NAVBAR_MAIN_COLOR,
  LIGHT_NAVBAR_BACKGROUND_COLOR,
  LIGHT_LEGAL_DOCS_ICON_COLOR,
  LIGHT_NAVBAR_COLLAPSE_ARROW_COLOR,
  LIGHT_NAVBAR_SCROLLBAR_COLOR,
  LIGHT_NAVBAR_MAIN_COLOR,
  LIGHT_NAVBAR_HIGHLIGHT_COLOR,
  LIGHT_NAVBAR_LETTERING_MAIN_COLOR,
  LIGHT_NAVBAR_LETTERING_HIGHLIGHT_COLOR,
  LIGHT_NAVBAR_ICON_MAIN_COLOR,
  LIGHT_NAVBAR_ICON_HIGHLIGHT_COLOR,
  LIGHT_NAVBAR_ARROW_HIGHLIGHT_COLOR,
  LIGHT_NAVBAR_ARROW_MAIN_COLOR,
  DARK_NAVBAR_GROUPED_TABS_BACKGROUND_COLOR,
  LIGHT_NAVBAR_GROUPED_TABS_BACKGROUND_COLOR,
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
        highlightColor: DARK_NAVBAR_HIGHLIGHT_COLOR,
        letteringMainColor: DARK_NAVBAR_LETTERING_MAIN_COLOR,
        letteringHighlightColor: DARK_NAVBAR_LETTERING_HIGHLIGHT_COLOR,
        iconMainColor: DARK_NAVBAR_ICON_MAIN_COLOR,
        iconHighlightColor: DARK_NAVBAR_ICON_HIGHLIGHT_COLOR,
        arrowHighlightColor: DARK_NAVBAR_ARROW_HIGHLIGHT_COLOR,
        arrowMainColor: DARK_NAVBAR_ARROW_MAIN_COLOR,
        groupedTabsBackgroundColor: DARK_NAVBAR_GROUPED_TABS_BACKGROUND_COLOR,
      }
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
        highlightColor:
          navbarColorOptions.tabColorOptions?.highlightColor ??
          LIGHT_NAVBAR_HIGHLIGHT_COLOR,
        letteringMainColor:
          navbarColorOptions.tabColorOptions?.letteringMainColor ??
          LIGHT_NAVBAR_LETTERING_MAIN_COLOR,
        letteringHighlightColor:
          navbarColorOptions.tabColorOptions?.letteringHighlightColor ??
          LIGHT_NAVBAR_LETTERING_HIGHLIGHT_COLOR,
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
          LIGHT_NAVBAR_GROUPED_TABS_BACKGROUND_COLOR
      },
    };
  }

  return currentColors;
};
