import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ContextMenu } from 'primereact/contextmenu';

import "../css/navbar.css";
import UserPic from "../../assets/user.png";
import Settings from "../../assets/settings.png";
import { Clock } from "../clock";
import { BLUE3, TAB_HEIGHT } from "../../constants";
import { AuthContext } from "../../contexts/auth";
import { TabAndContentWrapper } from "./wrapper/tabAndContentWrapper";
import { SettingsMenu } from "./menu";
import { useTranslator } from "../internationalization/internationalization_hooks";

interface Props {
    tabAndContentWrappers: TabAndContentWrapper[];
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
        <div className="p-d-flex p-dir-col p-lg-2" style={{ "padding": "0px" }}>

            <SettingsMenu ref={menuRef} hideMenu={hideMenu} />
            <div className="p-d-flex p-align-center" style={{ height: TAB_HEIGHT, backgroundColor: BLUE3 }}>
                <img src={UserPic} style={{ marginLeft: "5%" }} alt="" />
                <span style={{ fontWeight: "bold", color: "white", marginLeft: "10px", maxWidth: "60%", textOverflow: "ellipsis", overflow: "hidden" }}>
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
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Link style={{ fontWeight: "bolder", color: "black" }} to="/imprint">{t("Imprint")}</Link>
                </div>
                <Clock />
            </div>

        </div>
    );
};