import React from 'react';
import { DisaHeader } from './header/disaHeader';
import { Navbar } from './navbar/navbar';
import { DefaultImprint } from './imprint/defaultImprint';
import { TabAndContentWrapper } from './navbar/wrapper/tabAndContentWrapper';
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
  navbarTabPropsBasic,
  navbarTabPropsExtended,
  navbarTabPropsSecondLayer,
} from './navbar/tabs/navbarTab';
import { generateHashForLength } from '../services/hash';

interface MainViewProps {
  menuOptions?: MenuOptions;
  collabsible?: boolean;
  documentsComponent?: React.ComponentType<any>;
  documentsLabelKey?: string;
  headerOptions?: HeaderOptions;
  colorOptions?: Coloroptions;
  tabsAndContent: navbarTabPropsExtended[];
}

//TODO: Refactor MainView
export const MainView = (props: MainViewProps) => {
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
          {props.tabsAndContent.map(
            (tabAndContentElement: navbarTabPropsExtended) => {
              const navbarTabsSecondLayer =
                tabAndContentElement.navbarTabsSecondLayer.map(
                  (navbarTabRoutesSecondLayer: navbarTabPropsSecondLayer) => {
                    const navbarTabsThirdLayer =
                      navbarTabRoutesSecondLayer.navbarTabsThirdLayer.map(
                        (navbarTabRoutesThirdLayer: navbarTabPropsBasic) => {
                          return (
                            <Route
                              key={generateHashForLength(4)}
                              path={navbarTabRoutesThirdLayer.to}
                              element={navbarTabRoutesThirdLayer.renderElement}
                            />
                          );
                        }
                      );

                    const returnElement = (
                      <>
                        {navbarTabRoutesSecondLayer.navbarTabsThirdLayer
                          .length > 0 ? (
                          navbarTabsThirdLayer
                        ) : (
                          <Route
                            key={generateHashForLength(4)}
                            path={navbarTabRoutesSecondLayer.to}
                            element={navbarTabRoutesSecondLayer.renderElement}
                          />
                        )}
                      </>
                    );
                    return returnElement;
                  }
                );

              return (
                <>
                  {tabAndContentElement.navbarTabsSecondLayer.length > 0 ? (
                    navbarTabsSecondLayer
                  ) : (
                    <Route
                      key={generateHashForLength(4)}
                      path={tabAndContentElement.to}
                      element={tabAndContentElement.renderElement}
                    />
                  )}
                </>
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
        </Routes>
      </div>
    </div>
  );
};
