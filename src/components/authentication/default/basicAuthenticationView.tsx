import React, { FormEvent, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BLUE0, WHITE, BLACK, BLUE3 } from '../../../constants';
import AppLogo from '../../../assets/images/app_logo.png';
import { AuthContext } from '../../../contexts/auth';
import { LoginButtonWithSpinner } from '../loginButtonWithSpinner';
import { useTranslator } from '../../internationalization/translators';
import { AuthenticationViewProps } from '../aws/authenticationView';
import '../../css/authenticationView.css';
import loginBackground from '../../../assets/images/login_background.png';
import companyLogo from '../../../assets/images/company_logo.png';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { LanguageContext } from '../../../contexts/language';
import { parseLanguageRessourcesIntoDropdownFormat } from '../../../services/parseLanguageRessourcesIntoDropdownFormat';
import { ColorSettingsContext } from '../../../contexts/colorsettings';

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
    <img
      src={companyLogo}
      alt="Company Logo"
      style={{
        display: props.headerOptions?.hideRight ? 'none' : 'flex',
        height: '25px',
        marginRight: '24px',
      }}
    />
  );

  const appLogoDefault = (props: AuthenticationViewProps) => (
    <div
      style={{
        display: props.headerOptions?.hideLeft ? 'none' : 'flex',
        alignItems: 'center',
        padding: '6px 0px 6px 0px',
      }}
    >
      <img
        id="iav-logo"
        src={AppLogo}
        alt="DISA Logo"
        style={{
          height: '40px',
          width: '125px',
          marginLeft: '25px',
          marginRight: '12px',
          backgroundColor: BLUE0,
        }}
      />
      <h5
        style={{
          color: props.colorOptions?.authViewColorSettings
            ?.letteringElementLeftColor
            ? props.colorOptions?.authViewColorSettings
                .letteringElementLeftColor
            : 'white',
          fontSize: '15px',
          width: '150px',
          height: '40px',
          fontWeight: 'lighter',
        }}
      >
        {props.headerOptions?.letteringElementLeft
          ? props.headerOptions.letteringElementLeft
          : 'Remote Service Monitor'}
      </h5>
    </div>
  );

  //TODO: bring the interface to the app.tsx file (for the rightelement)
  const header = (props: AuthenticationViewProps) => (
    <div
      className={'flex justify-content-between'}
      style={{
        backgroundColor: props.colorOptions?.authViewColorSettings
          ?.headerBackground
          ? props.colorOptions?.authViewColorSettings?.headerBackground
          : BLUE0,
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

  //TODO clarify how to handle the imprint topic
  //TODO: Think of concept how to set backgroundcolor or backgroundimage
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
        src={loginBackground}
      />
      <div
        className={
          (colorSettingsContext?.darkmode ? 'bg-gray-4' : 'bg-white') +
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
                className="pi pi-sun switch-colormode-logos"
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
                className="inputLabel"
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
                    ? 'bg-gray-4 color-white'
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
                className="inputLabel"
              >
                {t('Password')}
              </label>
              <input
                value={password.valueOf()}
                onChange={(ev) => setPassword(ev.target.value)}
                name="password"
                type="password"
                className={'p-inputtext'}
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
          {/* {t(props.documentsLabelKey ? props.documentsLabelKey : 'Imprint')} */}
          <span
            className={'pi pi-info-circle'}
            style={{ fontSize: 'medium', fontWeight: 'bold', color: BLUE3 }}
          />
        </Link>
        <span
          style={{
            alignSelf: 'center',
            padding: '24px',
            fontSize: '11px',
            color: props.colorOptions?.authViewColorSettings?.companyTextColor
              ? props.colorOptions.authViewColorSettings?.companyTextColor
              : BLACK,
          }}
        >
          &copy; {props.companyText ? props.companyText : 'IAV GmbH 2023'}
        </span>
      </div>
    </div>
  );
};
