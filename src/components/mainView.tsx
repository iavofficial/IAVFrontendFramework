import React from 'react';
import { DisaHeader } from './header/disaHeader';
import { Navbar } from './navbar/navbar';
import { DefaultImprint } from './imprint/defaultImprint';

import { Coloroptions, HeaderOptions } from './uiLayer';
import { MenuOptions } from './navbar/menu';
import {
  BrowserRouter as Router,
  Route,
  useLocation,
  Routes,
  useNavigate,
  Outlet,
} from 'react-router-dom';
import {
  groupPropsBasicFirstLayer,
  navbarTabProps,
  groupPropsBasicSecondLayer,
} from './navbar/tabs/navbarTabTypes';
import { generateHashForLength } from '../services/hash';

interface MainViewProps {
  menuOptions?: MenuOptions;
  collabsible?: boolean;
  documentsComponent?: React.ComponentType<any>;
  documentsLabelKey?: string;
  headerOptions?: HeaderOptions;
  colorOptions?: Coloroptions;
  tabsAndContent: (navbarTabProps | groupPropsBasicFirstLayer)[];
}

//TODO: Refactor MainView
export const MainView = (props: MainViewProps) => {
  const filterNavbarTabElementFromArray = (
    tabsAndContent: (navbarTabProps | groupPropsBasicFirstLayer)[]
  ) => {
    let navbarTabElementsOnlyArray: navbarTabProps[] = [];
    tabsAndContent.map(
      (tabAndContentElement: navbarTabProps | groupPropsBasicFirstLayer) => {
        if (isNavbarTabType(tabAndContentElement)) {
          navbarTabElementsOnlyArray.push(tabAndContentElement);
        } else {
          let groupElementFirstLayer =
            tabAndContentElement as groupPropsBasicFirstLayer;

          groupElementFirstLayer.tabAndContent.map(
            (
              tabAndContentSecondLayer:
                | navbarTabProps
                | groupPropsBasicFirstLayer
            ) => {
              if (isNavbarTabType(tabAndContentSecondLayer)) {
                navbarTabElementsOnlyArray.push(tabAndContentSecondLayer);
              } else {
                let groupElementSecondLayer =
                  tabAndContentSecondLayer as groupPropsBasicSecondLayer;

                groupElementSecondLayer.tabAndContent.map(
                  (tabAndContentThirdLayer: navbarTabProps) => {
                    navbarTabElementsOnlyArray.push(tabAndContentThirdLayer);
                  }
                );
              }
            }
          );
        }
      }
    );
    return navbarTabElementsOnlyArray;
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bottom: '0',
      }}
    >
      <div style={{ flex: '0 0 auto' }}>
        <DisaHeader
          headerOptions={props.headerOptions}
          colorOptions={props.colorOptions}
        />
      </div>
      <div style={{ display: 'flex', flex: '1 1 auto', overflow: 'auto' }}>
        <Navbar
          tabsAndContent={props.tabsAndContent}
          collabsible={props.collabsible}
          documentsLabelKey={props.documentsLabelKey}
          colorOptions={props.colorOptions}
        />
        <Outlet />
        <Routes>
          <>
            {filterNavbarTabElementFromArray(props.tabsAndContent).map(
              (navbarTabElement: navbarTabProps) => {
                return (
                  <Route
                    path={navbarTabElement.to}
                    element={navbarTabElement.renderElement}
                  />
                );
              }
            )}

            <Route
              path="/documents"
              element={
                props.documentsComponent ? (
                  <props.documentsComponent />
                ) : (
                  <DefaultImprint />
                )
              }
            />
          </>
        </Routes>
      </div>
    </div>
  );
};

export function isNavbarTabType(
  tabAndContentElement: navbarTabProps | groupPropsBasicFirstLayer
): tabAndContentElement is navbarTabProps {
  return (tabAndContentElement as navbarTabProps).renderElement !== undefined;
}

// function isNavbarTabPropsBasicForElement(
//   tabAndContentElement: navbarTabPropsBasic | groupPropsBasicFirstLayer
// ): tabAndContentElement is navbarTabPropsBasic {
//   return (tabAndContentElement as navbarTabPropsBasic).to !== undefined;
// }
