import React from 'react';
import { Header } from './header/header';
import { Navbar } from './navbar/navbar';
import { DefaultImprint } from './imprint/defaultImprint';
import { MenuSettingsOptions } from './header/settingsMenu';
import { HeaderOptions } from './uiLayer';
import { Route, Routes, Outlet } from 'react-router-dom';
import { TabAndContentWrapper } from './navbar/wrapper/tabAndContentWrapper';

interface MainViewProps {
  menuOptions?: MenuSettingsOptions;
  documentsComponent?: React.ComponentType<any>;
  documentsLabelKey?: string;
  headerOptions?: HeaderOptions;
  tabAndContentWrappers: TabAndContentWrapper[];
  hideLegalDocuments?: boolean;
}

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
        <Header
          headerOptions={props.headerOptions}
          menuOptions={props.menuOptions}
        />
      </div>
      <div style={{ display: 'flex', flex: '1 1 auto', overflow: 'auto' }}>
        <Navbar
          tabAndContentWrappers={props.tabAndContentWrappers}
          documentsLabelKey={props.documentsLabelKey}
          hideLegalDocuments={props.hideLegalDocuments}
        />
        <Outlet />
        <Routes>
          {props.tabAndContentWrappers.map((wrapper) => wrapper.getRoutes())}

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
