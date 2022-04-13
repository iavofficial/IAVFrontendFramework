import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ContextMenu } from 'primereact/contextmenu';

import "../css/navbar.css";
import UserPic from "../../assets/images/user.png";
import Settings from "../../assets/images/settings.png";
import { Clock } from "../clock";
import { BLUE2NEW, TAB_HEIGHT } from "../../constants";
import { AuthContext } from "../../contexts/auth";
import { TabAndContentWrapper } from "./wrapper/tabAndContentWrapper";
import { MenuOptions, SettingsMenu } from "./menu";
import { useTranslator } from "../internationalization/translators";

interface Props {
    tabAndContentWrappers: TabAndContentWrapper[];
    menuOptions?: MenuOptions;
    documentsLabelKey?: string;
}

export const Navbar = (props: Props) => {
    const menuRef = React.createRef<ContextMenu>();
    const authContext = useContext(AuthContext);
    const t = useTranslator();

    const hideMenu = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            menuRef.current?.hide(e)
        }
    }

    return (
        <div id="navbar" className="p-d-flex p-dir-col p-col-fixed" style={{ "padding": "0px" }}>

            <SettingsMenu ref={menuRef} hideMenu={hideMenu} menuOptions={props.menuOptions} />
            <div className="p-d-flex p-align-center" style={{ height: TAB_HEIGHT, backgroundColor: BLUE2NEW }}>
                <img src={UserPic} style={{ marginLeft: "5%" }} alt="" />
                <span style={{
                    color: "white", marginLeft: "10px", marginRight: "10px", maxWidth: "60%",
                    textOverflow: "ellipsis", overflow: "hidden"
                }}>
                    {authContext?.getUsername()}
                </span>
                <a href="#" style={{ marginLeft: "auto", marginRight: "20px", cursor: "pointer" }}
                    onClick={(e) => { if (menuRef.current) { menuRef.current.show(e); } }}
                    onKeyDown={(e) => hideMenu(e)}>
                    <img style={{ verticalAlign: "top" }} src={Settings} alt="" />
                </a>
            </div>

            {props.tabAndContentWrappers.map(wrapper => wrapper.getNavbarComponent())}

            <div style={{ marginTop: "auto" }}>
                <Clock />
                <div className={"p-px-3 p-text-center"} style={{ display: "flex", justifyContent: "center", marginBottom:"16px"}}>
                    <Link style={{fontSize: "13px", fontWeight: "bolder", color: "black", textDecoration: "none" }} to="/documents">{t(props.documentsLabelKey ? props.documentsLabelKey : "Imprint")}</Link>
                </div>
                
            </div>

        </div>
    );
};