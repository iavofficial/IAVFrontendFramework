import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContextMenu } from 'primereact/contextmenu';
import '../css/navbar.css';
import UserPic from '../../assets/images/user.png';
import Settings from '../../assets/images/settings.png';
import { Clock } from '../clock';
import { BLUE2, TAB_HEIGHT, WHITE } from '../../constants';
import { AuthContext } from '../../contexts/auth';
import { TabAndContentWrapper } from './wrapper/tabAndContentWrapper';
import { MenuOptions, SettingsMenu } from './menu';
import { useTranslator } from '../internationalization/translators';

interface Props {
  tabAndContentWrappers: TabAndContentWrapper[];
  menuOptions?: MenuOptions;
  documentsLabelKey?: string;
  imageLeft?: string;
  imageRight?: string;
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
  const menuRef = React.createRef<ContextMenu>();
  const authContext = useContext(AuthContext);
  const t = useTranslator();

  const hideMenu = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      menuRef.current?.hide(e);
    }
  };

  return (
    <div
      id="navbar"
      className="flex flex-column"
      style={{
        padding: '0px',
        backgroundColor: props.colorOptions?.navbarColorSettings
          ?.navbarBackground
          ? props.colorOptions.navbarColorSettings.navbarBackground
          : WHITE,
      }}
    >
      <SettingsMenu
        ref={menuRef}
        hideMenu={hideMenu}
        menuOptions={props.menuOptions}
      />
      <div
        className="flex align-items-center"
        style={{
          height: TAB_HEIGHT,
          backgroundColor: props.colorOptions?.navbarColorSettings
            ?.menuSettingsBackground
            ? props.colorOptions?.navbarColorSettings?.menuSettingsBackground
            : BLUE2,
        }}
      >
        <img
          src={props.imageLeft ? props.imageLeft : UserPic}
          style={{ marginLeft: '5%' }}
          alt=""
        />
        <span
          style={{
            color: props.colorOptions?.navbarColorSettings
              ?.menuSettingsTextColor
              ? props.colorOptions?.navbarColorSettings?.menuSettingsTextColor
              : 'white',
            marginLeft: '10px',
            marginRight: '10px',
            maxWidth: '60%',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {authContext?.getUsername()}
        </span>
        <a
          href="#"
          style={{ marginLeft: 'auto', marginRight: '20px', cursor: 'pointer' }}
          onClick={(e) => {
            if (menuRef.current) {
              menuRef.current.show(e);
            }
          }}
          onKeyDown={(e) => hideMenu(e)}
        >
          <img
            style={{ verticalAlign: 'top' }}
            src={props.imageRight ? props.imageRight : Settings}
            alt=""
          />
        </a>
      </div>

      {props.tabAndContentWrappers.map((wrapper) =>
        wrapper.getNavbarComponent()
      )}

      <div style={{ marginTop: 'auto' }}>
        <Clock
          style={{
            clockColor: props.colorOptions?.navbarColorSettings?.clockColor,
            dateColor: props.colorOptions?.navbarColorSettings?.dateTextColor,
          }}
        />
        <div
          className={'px-3 text-center'}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '16px',
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
            {t(props.documentsLabelKey ? props.documentsLabelKey : 'Imprint')}
          </Link>
        </div>
      </div>
    </div>
  );
};
