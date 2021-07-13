import React, { useContext } from "react";

import { navbarTab } from "./navbarTab";
import { AuthContext } from "../../../contexts/auth";
import { containsOneOrMoreGroups } from "../../../services/groupChecker";
import { StandardNavbarTab } from "./standardNavbarTab";

export interface Props {
    permittedGroups: string[]
}

export const GroupCheckedNavbarTab: navbarTab<Props> = (props) => {
    let { getUserGroups } = useContext(AuthContext);
    let permitted = getUserGroups ? containsOneOrMoreGroups(getUserGroups(), props.permittedGroups) : false;
    return (
        permitted ?
            <StandardNavbarTab deselectedIcon={props.deselectedIcon} selectedIcon={props.selectedIcon}
                disabled={props.disabled} name={props.name} to={props.to} active={props.active} /> :
            <></>
    );
}