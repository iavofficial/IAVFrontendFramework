import React, { useContext } from "react";

import { navbarTab } from "./navbarTab";
import { AuthContext } from "../../contexts/auth";
import { containsOneOrMoreGroups } from "../../services/groupChecker";
import { StandardNavbarTab } from "./standardNavbarTab";

export interface Props {
    permittedGroups: string[]
}

export const GroupCheckedNavbarTab: navbarTab<Props> = (props) => {
    let { getUserGroups } = useContext(AuthContext);
    return (
        containsOneOrMoreGroups(getUserGroups(), props.permittedGroups) ?
            <StandardNavbarTab deselectedIcon={props.deselectedIcon} selectedIcon={props.selectedIcon}
                disabled={props.disabled} name={props.name} to={props.to} active={props.active} /> :
            <></>
    );
}