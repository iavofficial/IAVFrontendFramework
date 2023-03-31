import React, { useContext } from 'react';
import { NavbarPropsForTabType } from './navbarTabTypes';
import { AuthContext } from '../../../contexts/auth';
import { containsOneOrMoreGroups } from '../../../services/groupChecker';
import { NavbarTab } from './navbarTab';

export interface Props {
  navbarCollabsed: boolean;
  firstLayerCollabsed: boolean;
  secondLayerCollabsed: boolean;
  lastElementFirstLayer?: boolean;
  lastElementSecondLayer?: boolean;
}
export const PrivilegedNavbarTab: NavbarPropsForTabType<Props> = (props) => {
  const authContext = useContext(AuthContext);
  const permitted = containsOneOrMoreGroups(
    authContext?.getUserGroups(),
    props.permittedGroups
  );
  return permitted ? (
    <NavbarTab
      secondLayerCollabsed={props.secondLayerCollabsed}
      firstLayerCollabsed={props.firstLayerCollabsed}
      navbarCollabsed={props.navbarCollabsed}
      deselectedIcon={props.deselectedIcon}
      selectedIcon={props.selectedIcon}
      renderElement={props.renderElement}
      disabled={props.disabled}
      name={props.name}
      to={props.to}
      permittedGroups={props.permittedGroups}
      lastElementFirstLayer={props.lastElementFirstLayer}
      lastElementSecondLayer={props.lastElementSecondLayer}
    />
  ) : (
    <></>
  );
};
