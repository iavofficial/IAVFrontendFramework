import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import "../css/globalColors.css";
import { TabAndContentWrapper } from "./wrappers/typesWrappers";
import { useTranslator } from "../internationalization/translators";
import { Tooltip } from "primereact/tooltip";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { ColorSettingsContext } from "../../contexts/colorsettings";
import { calculateNavbarArrowFunctionColor } from "../../utils/calculateNavbarArrowColor";
import { generateHashOfLength } from "../../utils/hash";
import { NavbarSettingsContext } from "../../contexts/navbarContext";

interface Props {
  tabAndContentWrappers: TabAndContentWrapper[];
  documentsLabelKey?: string;
  hideLegalDocuments?: boolean;
}

export const Navbar = (props: Props) => {
  const t = useTranslator();
  const colorSettingsContext = useContext(ColorSettingsContext);
  const navbarSettingsContext = useContext(NavbarSettingsContext);

  const identifier = generateHashOfLength(4);
  const identifierLegal = "a" + identifier;
  const identifierWithDot = "." + identifierLegal;

  return (
    <div
      id="navbar"
      style={{
        backgroundColor:
          colorSettingsContext.currentColors.navbarColors.backgroundColor
      }}
    >
      <SimpleBar
        style={{
          width: navbarSettingsContext.navbarCollapsed ? "40px" : "240px",
          color: colorSettingsContext.currentColors.navbarColors.scrollbarColor,
          position: "relative",
          overflowX: "visible",
          marginBottom: "30px",
          flex: "0 1 auto",
          overflow: "clip",
        }}
      >
        <>
          {props.tabAndContentWrappers.map((wrapper: TabAndContentWrapper) =>
            wrapper.getNavbarComponent({
              navbarCollapsed: navbarSettingsContext.navbarCollapsed
            })
          )}
        </>
      </SimpleBar>
      <div
        id="navbar-bottom-wrapper"
        className={
          "text-center flex " +
          (navbarSettingsContext.navbarCollapsed ? "flex-column" : "px-3 ")
        }
        style={{
          justifyContent: navbarSettingsContext.navbarCollapsed
            ? "center"
            : "space-between",
        }}
      >
        {!props.hideLegalDocuments && (
          <Link
            style={{
              fontSize: "13px",
              fontWeight: "bolder",
              textDecoration: "none",
            }}
            to="/documents"
          >
            <i
              style={{
                color:
                  colorSettingsContext.currentColors.navbarColors
                    .legalDocumentsIconColor,
                fontWeight: "bold",
              }}
              className={"pi pi-info-circle " + identifierLegal}
            />
          </Link>
        )}

        <Tooltip
          content={t(
            props.documentsLabelKey ? props.documentsLabelKey : "Imprint"
          )}
          target={identifierWithDot}
        />

        {navbarSettingsContext.collapsible && (
          <i
            onClick={() =>
              navbarSettingsContext.setNavbarCollapsed(
                !navbarSettingsContext.navbarCollapsed
              )
            }
            style={{
              cursor: "pointer",
              color:
                colorSettingsContext.currentColors.navbarColors
                  .navbarCollapseArrowColor,
              marginTop: navbarSettingsContext.navbarCollapsed ? "8px" : "0px",
            }}
            className={calculateNavbarArrowFunctionColor(
              navbarSettingsContext.navbarCollapsed!
            )}
          />
        )}
      </div>
    </div>
  );
};
