import React, { FormEvent, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BLUE0, WHITE, BLACK, BLUE3 } from '../../../constants';
import { AuthContext } from '../../../contexts/auth';
import { LoginButtonWithSpinner } from '../loginButtonWithSpinner';
import { useTranslator } from '../../internationalization/translators';
import { AuthenticationViewProps } from '../aws/authenticationView';
import '../../css/authenticationView.css';
import '../../css/globalColors.css';
import loginBackgroundLightMode from '../../../assets/images/login_background_lightMode.png';
import loginBackgroundDarkMode from '../../../assets/images/login_background_darkMode.png';
import { ReactComponent as CompanyLogo } from '../../../assets/images/company_logo.svg';
import { ReactComponent as AppLogo } from '../../../assets/images/app_logo.svg';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { LanguageContext } from '../../../contexts/language';
import { parseLanguageRessourcesIntoDropdownFormat } from '../../../services/parseLanguageRessourcesIntoDropdownFormat';
import { ColorSettingsContext } from '../../../contexts/colorsettings';
import { generateHashOfLength } from '../../../services/hash';
import { Tooltip } from 'primereact/tooltip';

export const BasicAuthenticationView = (props: AuthenticationViewProps) => {
  const colorSettingsContext = useContext(ColorSettingsContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const langContext = useContext(LanguageContext);

  const authContext = useContext(AuthContext);
  const t = useTranslator();

  // These two functions life on the class instance not on the prototype thanks to @babel/plugin-proposal-class-properties.
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    authContext?.login({ email: email, password: password });
  };

  const companyLogoDefault = (props: AuthenticationViewProps) => (
    <div
      style={{
        display: props.headerOptions?.hideRight ? 'none' : 'flex',
        alignItems: 'center',
      }}
    >
      <CompanyLogo fill={colorSettingsContext?.darkmode ? BLUE3 : WHITE} />
    </div>
  );

  const appLogoDefault = (props: AuthenticationViewProps) => (
    <div
      style={{
        display: props.headerOptions?.hideLeft ? 'none' : 'flex',
        alignItems: 'center',
      }}
    >
      <AppLogo fill={colorSettingsContext?.darkmode ? BLUE3 : WHITE} />
    </div>
  );

  //TODO: bring the interface to the app.tsx file (for the rightelement)
  const header = (props: AuthenticationViewProps) => (
    <div
      className={
        (colorSettingsContext?.darkmode ? 'bg-grey-5' : 'bg-blue-0') +
        ' flex justify-content-between'
      }
      style={{
        backgroundColor:
          props.colorOptions?.authViewColorSettings?.headerBackground,
        color: 'white',
        alignItems: 'center',
        height: '56px',
      }}
    >
      <div
        id="left-element-authentication"
        className={'flex align-items-center'}
      >
        {props.headerOptions?.reactElementLeft
          ? props.headerOptions?.reactElementLeft
          : appLogoDefault(props)}
      </div>

      <div
        id="right-element-authentication"
        className="flex justify-content-end align-items-center"
      >
        {props.headerOptions?.reactElementRight
          ? props.headerOptions?.reactElementRight
          : companyLogoDefault(props)}
      </div>
    </div>
  );

  //TODO: Think of concept how to set backgroundcolor or backgroundimage

  const identifier = generateHashOfLength(4);
  const identifierLegal = 'a' + identifier;
  const identifierWithDot = '.' + identifierLegal;
  return (
    <div
      className="flex"
      style={{
        height: '100%',
        position: 'relative',
        backgroundColor:
          props.colorOptions?.authViewColorSettings?.fullBackground,
      }}
    >
      <img
        style={{
          inset: '0px',
          position: 'absolute',
          zIndex: '-100',
          height: '100vh',
          width: '100vw',
          objectFit: 'cover',
        }}
        src={
          colorSettingsContext?.darkmode
            ? loginBackgroundDarkMode
            : loginBackgroundLightMode
        }
      />
      <div
        className={
          (colorSettingsContext?.darkmode ? 'bg-grey-5' : 'bg-white') +
          ' flex flex-column shadow-6'
        }
        style={{
          position: 'relative',
          width: '620px',
          margin: 'auto',
          backgroundColor:
            props.colorOptions?.authViewColorSettings?.loginFormBackground,
        }}
      >
        <div>
          {props.headerOptions?.reactElementFullAuthenticationHeader
            ? props.headerOptions?.reactElementFullAuthenticationHeader
            : header(props)}
        </div>
        <div
          className="flex flex-column justify-content-center align-items-center"
          style={{ marginBottom: '30px' }}
        >
          <div
            style={{ width: '100%', padding: '24px 24px 0px 0px' }}
            className="flex align-items-center justify-content-end"
          >
            {colorSettingsContext?.darkmode ? (
              <i
                onClick={() =>
                  colorSettingsContext?.setDarkmode(
                    !colorSettingsContext.darkmode
                  )
                }
                className={'pi pi-sun switch-colormode-logos color-white'}
              />
            ) : (
              <i
                onClick={() =>
                  colorSettingsContext?.setDarkmode(
                    !colorSettingsContext.darkmode
                  )
                }
                className="pi pi-moon switch-colormode-logos"
              />
            )}
            <Dropdown
              id="change-language-dropdown"
              className={
                colorSettingsContext?.darkmode
                  ? 'bg-grey-5 color-white test'
                  : 'bg-white color-black test1'
              }
              placeholder={
                langContext?.resources[langContext.activeLang].translation
                  .option_name
              }
              onChange={function (event: DropdownChangeEvent) {
                langContext?.selectLanguage(event.value.key);
              }}
              options={parseLanguageRessourcesIntoDropdownFormat(
                langContext?.resources
              )}
              optionLabel="label"
              style={{ width: '160px' }}
            />
          </div>

          <form
            style={{
              width: '100%',
              height: '100%',
            }}
            onSubmit={submit}
          >
            <div
              style={{ margin: '40px 24px 0px 24px' }}
              className={'flex flex-column'}
            >
              <label
                style={{
                  fontWeight: 'normal',
                  marginBottom: '2px',
                  fontSize: '12px',
                }}
                className={
                  (colorSettingsContext?.darkmode
                    ? 'color-white'
                    : 'color-black') + ' inputLabel'
                }
              >
                {t('Email_address')}
              </label>
              <input
                value={email.valueOf()}
                onChange={(ev) => setEmail(ev.target.value)}
                name="email"
                type="email"
                className={
                  (colorSettingsContext?.darkmode
                    ? 'bg-grey-4 color-white'
                    : 'bg-white color-black') + ' p-inputtext'
                }
                required
                autoFocus
                style={{ marginBottom: '40px' }}
              />
              <label
                style={{
                  fontWeight: 'normal',
                  marginBottom: '2px',
                  fontSize: '12px',
                }}
                className={
                  (colorSettingsContext?.darkmode
                    ? 'color-white'
                    : 'color-black') + ' inputLabel'
                }
              >
                {t('Password')}
              </label>
              <input
                value={password.valueOf()}
                onChange={(ev) => setPassword(ev.target.value)}
                name="password"
                type="password"
                className={
                  (colorSettingsContext?.darkmode
                    ? 'bg-grey-4 color-white'
                    : 'bg-white color-black') + ' p-inputtext'
                }
                required
                style={{ marginBottom: '40px' }}
              />
              <div>
                <LoginButtonWithSpinner
                  isLoading={authContext?.isLoading}
                  style={{
                    backGroundColor:
                      props.colorOptions?.authViewColorSettings
                        ?.loginButtonBackground,
                  }}
                />
              </div>
            </div>
          </form>
        </div>

        <Link
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '16px',
            color: props.colorOptions?.authViewColorSettings
              ?.legalDocumentsColor
              ? props.colorOptions?.authViewColorSettings?.legalDocumentsColor
              : 'black',
            textDecoration: 'none',
          }}
          to="/documents"
          target="_blank"
        >
          <span
            className={'pi pi-info-circle ' + identifierLegal}
            style={{ fontSize: 'medium', fontWeight: 'bold', color: BLUE3 }}
          />
        </Link>
        <Tooltip
          content={t(
            props.documentsLabelKey ? props.documentsLabelKey : 'Imprint'
          )}
          target={identifierWithDot}
          id="hover-image"
        />
        <span
          className={
            colorSettingsContext?.darkmode ? 'color-white' : 'color-black'
          }
          style={{
            alignSelf: 'center',
            padding: '24px',
            fontSize: '11px',
            color: props.colorOptions?.authViewColorSettings?.companyTextColor,
          }}
        >
          &copy; {props.companyText ? props.companyText : 'IAV GmbH 2023'}
        </span>
      </div>
    </div>
  );
};
