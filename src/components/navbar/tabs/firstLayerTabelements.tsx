export {};
// import React, { useEffect, useState } from 'react';
// import { useTranslator } from '../../internationalization/translators';
// import './tabs.scss';
// import {
//   groupPropsBasicFirstLayer,
//   NavbarPropsForTabTypeFirstLayer,
//   navbarTabProps,
// } from './navbarTabTypes';
// import { isNavbarTabType } from '../../mainView';
// import { NavbarTab } from './navbarTab';
// import { PrivilegedNavbarTab } from './privilegedNavbarTab';
// import { GroupFirstLayer } from './groupFirstLayer';
// import { generateHash } from '../../../services/hash';

// export interface Props {
//   navbarCollabsed: boolean;
// }

// export const FirstLayerTabelements: NavbarPropsForTabTypeFirstLayer<Props> = (
//   props
// ) => {
//   const t = useTranslator();
//   let renderElement = null;

//   useEffect(() => {
//     console.log('firstlayer mounted');
//   }, []);

//   if (isNavbarTabType(props.tabOrGroupElement)) {
//     const navbarElementFirstLayer = props.tabOrGroupElement as navbarTabProps;

//     renderElement =
//       navbarElementFirstLayer.permittedGroups.length > 0 ? (
//         <PrivilegedNavbarTab
//           id={navbarElementFirstLayer.id}
//           name={navbarElementFirstLayer.name}
//           disabled={navbarElementFirstLayer.disabled}
//           selectedIcon={navbarElementFirstLayer.selectedIcon}
//           deselectedIcon={navbarElementFirstLayer.deselectedIcon}
//           permittedGroups={navbarElementFirstLayer.permittedGroups}
//           renderElement={navbarElementFirstLayer.renderElement}
//           to={navbarElementFirstLayer.to}
//           navbarCollabsed={props.navbarCollabsed}
//           firstLayerCollabsed={false}
//           secondLayerCollabsed={false}
//         />
//       ) : (
//         <NavbarTab
//           id={navbarElementFirstLayer.id}
//           name={navbarElementFirstLayer.name}
//           disabled={navbarElementFirstLayer.disabled}
//           selectedIcon={navbarElementFirstLayer.selectedIcon}
//           deselectedIcon={navbarElementFirstLayer.deselectedIcon}
//           permittedGroups={navbarElementFirstLayer.permittedGroups}
//           renderElement={navbarElementFirstLayer.renderElement}
//           to={navbarElementFirstLayer.to}
//           navbarCollabsed={props.navbarCollabsed}
//           firstLayerCollabsed={false}
//           secondLayerCollabsed={false}
//         />
//       );
//   } else {
//     const groupElementFirstLayer =
//       props.tabOrGroupElement as groupPropsBasicFirstLayer;

//     renderElement = (
//       <GroupFirstLayer
//         id={groupElementFirstLayer.id}
//         name={groupElementFirstLayer.name}
//         selectedIcon={groupElementFirstLayer.selectedIcon}
//         deselectedIcon={groupElementFirstLayer.deselectedIcon}
//         tabAndContent={groupElementFirstLayer.tabAndContent}
//         navbarCollabsed={props.navbarCollabsed}
//       />
//     );
//   }

//   return <>{renderElement}</>;
// };
