import React, { ReactElement } from 'react';
import { Header, HeaderOptions } from './header/header';
import { Navbar } from './navbar/navbar';
import { DefaultImprint } from './imprint/defaultImprint';
import { SettingsMenuOptions } from './header/settingsMenu';
import { Route, Routes, Outlet } from 'react-router-dom';
import { TabAndContentWrapper } from './navbar/wrapper/tabAndContentWrapperTypes';
import { UserMenuOptions } from './header/userMenu';

interface MainViewProps {
  documentsComponent?: React.ComponentType<any>;
  documentsLabelKey?: string;
  tabAndContentWrappers: TabAndContentWrapper[];
  hideLegalDocuments?: boolean;
  headerOptions?: HeaderOptions;
  settingsMenuOptions?: SettingsMenuOptions;
  userMenuOptions?: UserMenuOptions;
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
          settingsMenuOptions={props.settingsMenuOptions}
          userMenuOptions={props.userMenuOptions}
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
