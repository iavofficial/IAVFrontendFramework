import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/auth';
import { containsOneOrMoreGroups } from '../../../utils/groupChecker';
import { SimpleNavbarTab } from './simpleNavbarTab';
import { navbarTab } from './navbarTabTypes';

export interface Props {
  permittedGroups: string[];
}
export const PrivilegedNavbarTab: navbarTab<Props> = (props) => {
  const authContext = useContext(AuthContext);
  const permitted = containsOneOrMoreGroups(
    authContext?.getUserGroups(),
    props.permittedGroups
  );
  return permitted ? (
    <SimpleNavbarTab
      icon={props.icon}
      disabled={props.disabled}
      name={props.name}
      to={props.to}
      navbarCollapsed={props.navbarCollapsed}
    />
  ) : (
    <></>
  );
};
