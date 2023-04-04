import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/auth';
import { containsOneOrMoreGroups } from '../../../services/groupChecker';
import { SimpleNavbarTab } from './simpleNavbarTab';
import { navbarTab } from './navbarTab';

export interface Props {
  navbarCollabsed?: boolean;
  firstLayerCollabsed?: boolean;
  secondLayerCollabsed?: boolean;
  lastElementFirstLayer?: boolean;
  lastElementSecondLayer?: boolean;
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
      deselectedIcon={props.deselectedIcon}
      selectedIcon={props.selectedIcon}
      disabled={props.disabled}
      name={props.name}
      to={props.to}
      navbarCollabsed={props.navbarCollabsed}
      firstLayerCollabsed={props.firstLayerCollabsed}
      secondLayerCollabsed={props.secondLayerCollabsed}
      lastElementFirstLayer={props.lastElementFirstLayer}
      lastElementSecondLayer={props.lastElementSecondLayer}
    />
  ) : (
    <></>
  );
};
