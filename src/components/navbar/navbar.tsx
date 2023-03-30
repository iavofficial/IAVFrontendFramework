import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';
import { WHITE, BLUE3, GREEN, GRAY1 } from '../../constants';
import { TabAndContentWrapper } from './wrapper/tabAndContentWrapper';
import { useTranslator } from '../internationalization/translators';
import { navbarTabPropsExtended } from './tabs/navbarTab';
import { SimpleNavbarTab } from './tabs/simpleNavbarTab';
import { PrivilegedNavbarTab } from './tabs/privilegedNavbarTab';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

interface Props {
  // tabAndContentWrappers: TabAndContentWrapper[];
  tabsAndContent: navbarTabPropsExtended[];
  documentsLabelKey?: string;
  collabsible?: boolean;
  colorOptions?: {
    navbarColorSettings?: {
      menuSettingsBackground?: string;
      menuSettingsTextColor?: string;
      clockColor?: string;
      documentsColor?: string;
      dateTextColor?: string;
      navbarBackground?: string;
    };
  };
}

export const Navbar = (props: Props) => {
  const t = useTranslator();
  const [navbarCollapsed, setNavbarCollapsed] = useState<boolean>(false);

  return (
    <div
      id="navbar"
      className="flex flex-column"
      style={{
        padding: '16px 0px 0px 0px',
        backgroundColor: props.colorOptions?.navbarColorSettings
          ?.navbarBackground
          ? props.colorOptions.navbarColorSettings.navbarBackground
          : WHITE,
      }}
    >
      {/* {props.tabAndContentWrappers.map((wrapper) =>
        wrapper.getNavbarComponent()
      )} */}
      <SimpleBar
        style={{
          width: navbarCollapsed ? '40px' : '240px',
          height: navbarCollapsed ? '83vh' : '87vh',
          color: GRAY1,
          position: 'relative',
          overflowX: 'visible',
        }}
      >
        {props.tabsAndContent.map(
          (tabAndContentElement: navbarTabPropsExtended) => {
            if (tabAndContentElement.permittedGroups.length > 0) {
              return (
                <PrivilegedNavbarTab
                  navbarCollabsed={navbarCollapsed}
                  navbarTabsSecondLayer={
                    tabAndContentElement.navbarTabsSecondLayer
                  }
                  name={tabAndContentElement.name}
                  to={tabAndContentElement.to}
                  disabled={tabAndContentElement.disabled}
                  selectedIcon={tabAndContentElement.selectedIcon}
                  deselectedIcon={tabAndContentElement.deselectedIcon}
                  colorOptions={tabAndContentElement.colorOptions}
                  permittedGroups={tabAndContentElement.permittedGroups}
                />
              );
            } else {
              return (
                <SimpleNavbarTab
                  navbarCollabsed={navbarCollapsed}
                  name={tabAndContentElement.name}
                  navbarTabsSecondLayer={
                    tabAndContentElement.navbarTabsSecondLayer
                  }
                  to={tabAndContentElement.to}
                  disabled={tabAndContentElement.disabled}
                  selectedIcon={tabAndContentElement.selectedIcon}
                  deselectedIcon={tabAndContentElement.deselectedIcon}
                  colorOptions={tabAndContentElement.colorOptions}
                  permittedGroups={tabAndContentElement.permittedGroups}
                />
              );
            }
          }
        )}
      </SimpleBar>
      <div style={{ marginTop: 'auto' }}>
        <div
          className={
            'text-center flex ' + (navbarCollapsed ? 'flex-column' : 'px-3 ')
          }
          style={{
            justifyContent: navbarCollapsed ? 'center' : 'space-between',
            marginBottom: '8px',
          }}
        >
          <Link
            style={{
              fontSize: '13px',
              fontWeight: 'bolder',
              color: props.colorOptions?.navbarColorSettings?.documentsColor
                ? props.colorOptions?.navbarColorSettings?.documentsColor
                : 'black',
              textDecoration: 'none',
            }}
            to="/documents"
          >
            {/* {t(props.documentsLabelKey ? props.documentsLabelKey : 'Imprint')} */}
            <i
              style={{
                color: BLUE3,
                marginBottom: navbarCollapsed ? '16px' : '',
              }}
              className="pi pi-info-circle"
            />
          </Link>
          {props.collabsible && props.collabsible ? (
            <i
              onClick={() => setNavbarCollapsed(!navbarCollapsed)}
              style={{ cursor: 'pointer' }}
              className={
                navbarCollapsed ? 'pi pi-chevron-right' : 'pi pi-chevron-left'
              }
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
