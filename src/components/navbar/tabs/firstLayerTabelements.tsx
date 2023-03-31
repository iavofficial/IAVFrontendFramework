import React, { useState } from 'react';
import { useTranslator } from '../../internationalization/translators';
import './tabs.scss';
import {
  groupPropsBasicFirstLayer,
  NavbarPropsForTabTypeFirstLayer,
  navbarTabProps,
} from './navbarTabTypes';
import { isNavbarTabType } from '../../mainView';
import { NavbarTab } from './navbarTab';
import { PrivilegedNavbarTab } from './privilegedNavbarTab';
import { GroupFirstLayer } from './groupFirstLayer';

export interface Props {
  navbarCollabsed: boolean;
}

export const FirstLayerTabelements: NavbarPropsForTabTypeFirstLayer<Props> = (
  props
) => {
  const t = useTranslator();
  let renderElement = null;

  if (isNavbarTabType(props.tabOrGroupElement)) {
    const navbarElementFirstLayer = props.tabOrGroupElement as navbarTabProps;

    renderElement =
      navbarElementFirstLayer.permittedGroups.length > 0 ? (
        <PrivilegedNavbarTab
          name={navbarElementFirstLayer.name}
          disabled={navbarElementFirstLayer.disabled}
          selectedIcon={navbarElementFirstLayer.selectedIcon}
          deselectedIcon={navbarElementFirstLayer.deselectedIcon}
          permittedGroups={navbarElementFirstLayer.permittedGroups}
          renderElement={navbarElementFirstLayer.renderElement}
          to={navbarElementFirstLayer.to}
          navbarCollabsed={props.navbarCollabsed}
          firstLayerCollabsed={false}
          secondLayerCollabsed={false}
        />
      ) : (
        <NavbarTab
          name={navbarElementFirstLayer.name}
          disabled={navbarElementFirstLayer.disabled}
          selectedIcon={navbarElementFirstLayer.selectedIcon}
          deselectedIcon={navbarElementFirstLayer.deselectedIcon}
          permittedGroups={navbarElementFirstLayer.permittedGroups}
          renderElement={navbarElementFirstLayer.renderElement}
          to={navbarElementFirstLayer.to}
          navbarCollabsed={props.navbarCollabsed}
          firstLayerCollabsed={false}
          secondLayerCollabsed={false}
        />
      );
  } else {
    const groupElementFirstLayer =
      props.tabOrGroupElement as groupPropsBasicFirstLayer;

    renderElement = (
      <GroupFirstLayer
        name={groupElementFirstLayer.name}
        selectedIcon={groupElementFirstLayer.selectedIcon}
        deselectedIcon={groupElementFirstLayer.deselectedIcon}
        tabAndContent={groupElementFirstLayer.tabAndContent}
        navbarCollabsed={props.navbarCollabsed}
      />
    );
  }

  return <>{renderElement}</>;
};
