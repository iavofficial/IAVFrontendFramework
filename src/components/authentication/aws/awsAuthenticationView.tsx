import React, { FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BLACK, BLUE0, BLUE3, RED, WHITE } from '../../../constants';
import { AuthContext } from '../../../contexts/auth';
import { LoginButtonWithSpinner } from '../loginButtonWithSpinner';
import { useState } from 'react';
import { useContext } from 'react';
import { useTranslator } from '../../internationalization/translators';
import { AuthenticationViewProps } from './authenticationView';
import '../../css/authenticationView.css';
import '../../css/globalColors.css';
import '../../css/error.css';
import { ReactComponent as CompanyLogo } from '../../../assets/images/company_logo.svg';
import { ReactComponent as AppLogo } from '../../../assets/images/app_logo.svg';
import loginBackgroundLightMode from '../../../assets/images/login_background_lightMode.png';
import loginBackgroundDarkMode from '../../../assets/images/login_background_darkMode.png';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { LanguageContext } from '../../../contexts/language';
import {
  parseActiveLanguageKeyIntoLanguageName,
  parseLanguageRessourcesIntoDropdownFormat,
} from '../../../services/parseLanguageRessourcesIntoDropdownFormat';
import { ColorSettingsContext } from '../../../contexts/colorsettings';
import { generateHashOfLength } from '../../../services/hash';
import { Tooltip } from 'primereact/tooltip';

export const AWSAuthenticationView = (props: AuthenticationViewProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const langContext = useContext(LanguageContext);
  const colorSettingsContext = useContext(ColorSettingsContext);

  const authContext = useContext(AuthContext);
  const t = useTranslator();

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (authContext?.isNewPasswordRequired) {
      authContext?.completePassword(password);
    } else {
      authContext?.login({ email: email, password: password });
    }
  };

  const getErrorText = (error: undefined | { [key: string]: any } | string) => {
    if (error) {
      if (typeof error === 'object') {
        if (error.code) {
          if (error.code === 'UserGroupError') {
            return t('invalid_access_configuration'); // user was not added to a group
          } else if (error.code === 'NotAuthorizedException') {
            return t('invalid_username_or_password'); // invalid user credentials
          } else if (error.code === 'InvalidPasswordException') {
            return t('password_requirements_not_met'); // set password does not conform to password policy
          } else {
            return t('server_error');
          }
        } else if (error.message) {
          if (error.message === 'UserGroupError') {
            return t('invalid_access_configuration');
          }
          return error.message;
        }
      } else {
        return t('server_error');
      }
    }
    return '';
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

  const NewPasswordForm = (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        style={{ margin: '0px 24px 0px 24px' }}
        className={'flex flex-column'}
      >
        <div
          className={
            colorSettingsContext?.darkmode ? 'color-white' : 'color-black'
          }
          style={{
            color:
              colorSettingsContext?.authenticationColorOptions
                ?.passwortRequirementsTextColor,
          }}
        >
          <p>{t('replace_temporary_password')}</p>
          <ul>
            <li>{t('password_req_8_characters')}</li>
            <li>{t('password_req_upper_lower_case')}</li>
            <li>{t('password_req_special_character')}</li>
            <li>{t('password_req_one_digit')}</li>
          </ul>
        </div>
        <form autoComplete="off" onSubmit={submit}>
          <div>
            <label
              style={{
                fontWeight: 'normal',
                marginBottom: '2px',
                fontSize: '12px',
                color:
                  colorSettingsContext?.authenticationColorOptions
                    ?.inputFieldDescriptionTextColor,
              }}
              className={
                (colorSettingsContext?.darkmode
                  ? 'color-white'
                  : 'color-black') +
                ' inputLabel ' +
                (authContext?.loginError ? 'invalid' : '')
              }
            >
              {t('New_password')}
            </label>
            <input
              name="password"
              type="password"
              id="inputPassword"
              style={{
                marginBottom: '40px',
                width: '100%',
                backgroundColor:
                  colorSettingsContext?.authenticationColorOptions
                    ?.inputFieldBackgroundColor,
                color:
                  colorSettingsContext?.authenticationColorOptions
                    ?.inputFieldTextColor,
              }}
              className={
                (colorSettingsContext?.darkmode
                  ? 'bg-grey-4 color-white'
                  : 'bg-white-1 color-black') +
                'form-control p-inputtext ' +
                (authContext?.loginError ? 'invalid' : '')
              }
              onChange={(ev) => setPassword(ev.target.value)}
              required
              autoFocus
            />

            <LoginButtonWithSpinner isLoading={authContext?.isLoading} />
            <div className="invalid">
              {getErrorText(authContext?.loginError)}
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  const LoginForm = (
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
            color:
              colorSettingsContext?.authenticationColorOptions
                ?.inputFieldDescriptionTextColor,
          }}
          className={
            (colorSettingsContext?.darkmode ? 'color-white' : 'color-black') +
            ' inputLabel'
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
              : 'bg-white-1 color-black') + ' p-inputtext'
          }
          required
          autoFocus
          style={{
            marginBottom: '40px',
            backgroundColor:
              colorSettingsContext?.authenticationColorOptions
                ?.inputFieldBackgroundColor,
            color:
              colorSettingsContext?.authenticationColorOptions
                ?.inputFieldTextColor,
          }}
        />
        <label
          style={{
            fontWeight: 'normal',
            marginBottom: '2px',
            fontSize: '12px',
            color:
              colorSettingsContext?.authenticationColorOptions
                ?.inputFieldDescriptionTextColor,
          }}
          className={
            (colorSettingsContext?.darkmode ? 'color-white' : 'color-black') +
            ' inputLabel'
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
              : 'bg-white-1 color-black') + ' p-inputtext'
          }
          required
          style={{
            marginBottom: '40px',
            backgroundColor:
              colorSettingsContext?.authenticationColorOptions
                ?.inputFieldBackgroundColor,
            color:
              colorSettingsContext?.authenticationColorOptions
                ?.inputFieldTextColor,
          }}
        />
        <div>
          <LoginButtonWithSpinner isLoading={authContext?.isLoading} />
        </div>
        <div style={{ marginTop: '20px' }} className="invalid">
          {getErrorText(authContext?.loginError)}
        </div>
      </div>
    </form>
  );

  const header = (props: AuthenticationViewProps) => (
    <div
      className={
        (colorSettingsContext?.darkmode ? 'bg-grey-5' : 'bg-blue-0') +
        ' flex justify-content-between'
      }
      style={{
        backgroundColor:
          colorSettingsContext?.authenticationColorOptions
            ?.headerBackgroundColor,
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

  const identifier = generateHashOfLength(4);
  const identifierLegal = 'a' + identifier;
  const identifierWithDot = '.' + identifierLegal;
  return (
    <div
      className="flex"
      style={{
        height: '100%',
        background: '',
        backgroundColor:
          colorSettingsContext?.authenticationColorOptions
            ?.fullScreenBackgroundColor,
      }}
    >
      {colorSettingsContext?.authenticationColorOptions
        ?.fullScreenBackgroundColor ? (
        <></>
      ) : (
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
            props.authOptions?.backgroundImage
              ? props.authOptions?.backgroundImage
              : colorSettingsContext?.darkmode
              ? loginBackgroundDarkMode
              : loginBackgroundLightMode
          }
        />
      )}
      <div
        className={
          (colorSettingsContext?.darkmode ? 'bg-grey-5' : 'bg-white-1') +
          ' flex flex-column shadow-6'
        }
        style={{
          width: '620px',
          margin: 'auto',
          position: 'relative',
          backgroundColor:
            colorSettingsContext?.authenticationColorOptions
              ?.loginFormBackgroundColor,
        }}
      >
        <div>{header(props)}</div>
        <div className="flex flex-column" style={{ justifyContent: 'center' }}>
          <div
            style={{ width: '100%', padding: '24px 24px 0px 0px' }}
            className="flex align-items-center justify-content-end"
          >
            {props.authOptions?.preventDarkmode ? (
              <>
                colorSettingsContext?.darkmode ? (
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
                )
              </>
            ) : (
              <></>
            )}

            <Dropdown
              className={
                colorSettingsContext?.darkmode
                  ? 'bg-grey-5 color-white test'
                  : 'bg-white-1 color-black test1'
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
          {authContext?.isNewPasswordRequired ? NewPasswordForm : LoginForm}
        </div>
        <Link
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '16px',
            textDecoration: 'none',
          }}
          to="/documents"
          target="_blank"
        >
          <span
            className={'pi pi-info-circle ' + identifierLegal}
            style={{
              fontSize: 'medium',
              fontWeight: 'bold',
              color: colorSettingsContext?.authenticationColorOptions
                ?.legalNoticeIconColor
                ? colorSettingsContext?.authenticationColorOptions
                    ?.legalNoticeIconColor
                : BLUE3,
            }}
          />
        </Link>
        <Tooltip
          content={t(
            props.authOptions?.documentsLabelKey
              ? props.authOptions?.documentsLabelKey
              : 'Imprint'
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
            color:
              colorSettingsContext?.authenticationColorOptions
                ?.companyTextColor,
          }}
        >
          &copy;{' '}
          {props.authOptions?.companyText
            ? props.authOptions?.companyText
            : 'IAV GmbH 2023'}
        </span>
      </div>
    </div>
  );
};
