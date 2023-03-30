import React, { useContext } from 'react';
import { NavbarPropsForTabType } from './navbarTab';
import { AuthContext } from '../../../contexts/auth';
import { containsOneOrMoreGroups } from '../../../services/groupChecker';
import { SimpleNavbarTab } from './simpleNavbarTab';

export interface Props {
  navbarCollabsed: boolean;
}
export const PrivilegedNavbarTab: NavbarPropsForTabType<Props> = (props) => {
  const authContext = useContext(AuthContext);
  const permitted = containsOneOrMoreGroups(
    authContext?.getUserGroups(),
    props.permittedGroups
  );
  return permitted ? (
    <SimpleNavbarTab
      navbarCollabsed={props.navbarCollabsed}
      navbarTabsSecondLayer={props.navbarTabsSecondLayer}
      deselectedIcon={props.deselectedIcon}
      selectedIcon={props.selectedIcon}
      disabled={props.disabled}
      name={props.name}
      to={props.to}
      permittedGroups={props.permittedGroups}
    />
  ) : (
    <></>
  );
};
