import React, { useContext } from "react";

import { navbarTab } from "./navbarTab";
import { AuthContext } from "../../../contexts/auth";
import { containsOneOrMoreGroups } from "../../../services/groupChecker";
import { SimpleNavbarTab } from "./simpleNavbarTab";

export interface Props {
     permittedGroups: string[]
}
export const PrivilegedNavbarTab: navbarTab<Props> = (props) => {
     const authContext = useContext(AuthContext);
     const permitted = containsOneOrMoreGroups(authContext?.getUserGroups(), props.permittedGroups);
     return (
         permitted ?
             <SimpleNavbarTab deselectedIcon={props.deselectedIcon} selectedIcon={props.selectedIcon}
                 disabled={props.disabled} name={props.name} to={props.to}
                 /> :
             <></>
     );
 }