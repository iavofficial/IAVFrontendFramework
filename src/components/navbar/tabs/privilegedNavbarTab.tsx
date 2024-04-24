import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/auth';
import { containsOneOrMoreGroups } from '../../../utils/groupChecker';
import { SimpleNavbarTab } from './simpleNavbarTab/simpleNavbarTab';
import { GroupableNavbarTab } from './typesNavbarTab';

export interface Props {
  permittedGroups: string[];
}
export const PrivilegedNavbarTab: GroupableNavbarTab<Props> = (props) => {
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
      frameworkInjectedOptions={props.frameworkInjectedOptions}
    />
  ) : (
    <></>
  );
};
