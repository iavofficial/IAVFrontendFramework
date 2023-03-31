import React, { useState } from 'react';

import { useTranslator } from '../../internationalization/translators';
import './tabs.scss';
import {
  NavbarPropsForTabTypeFirstLayer,
  groupPropsBasicSecondLayer,
  navbarTabProps,
} from './navbarTabTypes';
import { isNavbarTabType } from '../../mainView';
import { NavbarTab } from './navbarTab';
import { PrivilegedNavbarTab } from './privilegedNavbarTab';
import { GroupSecondLayer } from './groupSecondLayer';

export interface Props {
  navbarCollabsed: boolean;
  firstLayerCollabsed: boolean;
  lastElementFirstLayer: boolean;
}

export const SecondLayerTabelements: NavbarPropsForTabTypeFirstLayer<Props> = (
  props
) => {
  const t = useTranslator();
  let renderElement = null;

  if (isNavbarTabType(props.tabOrGroupElement)) {
    const navbarElementFirstLayer = props.tabOrGroupElement as navbarTabProps;

    renderElement =
      navbarElementFirstLayer.permittedGroups.length > 0 ? (
        <PrivilegedNavbarTab
          secondLayerCollabsed={false}
          firstLayerCollabsed={props.firstLayerCollabsed}
          name={navbarElementFirstLayer.name}
          disabled={navbarElementFirstLayer.disabled}
          selectedIcon={navbarElementFirstLayer.selectedIcon}
          deselectedIcon={navbarElementFirstLayer.deselectedIcon}
          permittedGroups={navbarElementFirstLayer.permittedGroups}
          renderElement={navbarElementFirstLayer.renderElement}
          to={navbarElementFirstLayer.to}
          navbarCollabsed={props.navbarCollabsed}
          lastElementFirstLayer={props.lastElementFirstLayer}
        />
      ) : (
        <NavbarTab
          secondLayerCollabsed={false}
          firstLayerCollabsed={props.firstLayerCollabsed}
          name={navbarElementFirstLayer.name}
          disabled={navbarElementFirstLayer.disabled}
          selectedIcon={navbarElementFirstLayer.selectedIcon}
          deselectedIcon={navbarElementFirstLayer.deselectedIcon}
          permittedGroups={navbarElementFirstLayer.permittedGroups}
          renderElement={navbarElementFirstLayer.renderElement}
          to={navbarElementFirstLayer.to}
          navbarCollabsed={props.navbarCollabsed}
          lastElementFirstLayer={props.lastElementFirstLayer}
        />
      );
  } else {
    const groupElementFirstLayer =
      props.tabOrGroupElement as groupPropsBasicSecondLayer;

    renderElement = (
      <GroupSecondLayer
        name={groupElementFirstLayer.name}
        selectedIcon={groupElementFirstLayer.selectedIcon}
        deselectedIcon={groupElementFirstLayer.deselectedIcon}
        tabAndContent={groupElementFirstLayer.tabAndContent}
        navbarCollabsed={props.navbarCollabsed}
        firstLayerCollabsed={props.firstLayerCollabsed}
      />
    );
  }

  return <>{renderElement}</>;
};
