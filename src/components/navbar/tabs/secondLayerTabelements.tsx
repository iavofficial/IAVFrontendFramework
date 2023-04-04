export {};
// import React, { useEffect, useState } from 'react';

// import { useTranslator } from '../../internationalization/translators';
// import './tabs.scss';
// import {
//   NavbarPropsForTabTypeFirstLayer,
//   groupPropsBasicSecondLayer,
//   navbarTabProps,
// } from './navbarTabTypes';
// import { isNavbarTabType } from '../../mainView';
// import { NavbarTab } from './navbarTab';
// import { PrivilegedNavbarTab } from './privilegedNavbarTab';
// import { GroupSecondLayer } from './groupSecondLayer';

// export interface Props {
//   navbarCollabsed: boolean;
//   firstLayerCollabsed: boolean;
//   lastElementFirstLayer: boolean;
// }

// export const SecondLayerTabelements: NavbarPropsForTabTypeFirstLayer<Props> = (
//   props
// ) => {
//   const t = useTranslator();

//   useEffect(() => {
//     console.log('mounted secondlayer');
//   }, []);

//   return isNavbarTabType(props.tabOrGroupElement) ? (
//     <>
//       <NavbarTab
//         key={props.tabOrGroupElement.id}
//         secondLayerCollabsed={false}
//         id={props.tabOrGroupElement.id}
//         firstLayerCollabsed={props.firstLayerCollabsed}
//         name={props.tabOrGroupElement.name}
//         disabled={props.tabOrGroupElement.disabled}
//         selectedIcon={props.tabOrGroupElement.selectedIcon}
//         deselectedIcon={props.tabOrGroupElement.deselectedIcon}
//         permittedGroups={props.tabOrGroupElement.permittedGroups}
//         renderElement={props.tabOrGroupElement.renderElement}
//         to={props.tabOrGroupElement.to}
//         navbarCollabsed={props.navbarCollabsed}
//         lastElementFirstLayer={props.lastElementFirstLayer}
//       />
//     </>
//   ) : (
//     <>
//       <GroupSecondLayer
//         key={props.tabOrGroupElement.id}
//         id={props.tabOrGroupElement.id}
//         name={props.tabOrGroupElement.name}
//         selectedIcon={props.tabOrGroupElement.selectedIcon}
//         deselectedIcon={props.tabOrGroupElement.deselectedIcon}
//         tabAndContent={
//           props.tabOrGroupElement.tabAndContent as navbarTabProps[]
//         }
//         navbarCollabsed={props.navbarCollabsed}
//         firstLayerCollabsed={props.firstLayerCollabsed}
//       />
//     </>
//   );
// };
