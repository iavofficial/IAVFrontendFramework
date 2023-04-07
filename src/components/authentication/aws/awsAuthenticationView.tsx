import React, { FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BLACK, BLUE0, BLUE3, RED, WHITE } from '../../../constants';
import AppLogo from '../../../assets/images/app_logo.png';
import { AuthContext } from '../../../contexts/auth';
import { LoginButtonWithSpinner } from '../loginButtonWithSpinner';
import { useState } from 'react';
import { useContext } from 'react';
import { useTranslator } from '../../internationalization/translators';
import { AuthenticationViewProps } from './authenticationView';
import '../../css/authenticationView.css';
import companyLogo from '../../../assets/images/company_logo.png';
import loginBackground from '../../../assets/images/login_background.png';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { LanguageContext } from '../../../contexts/language';
import {
  parseActiveLanguageKeyIntoLanguageName,
  parseLanguageRessourcesIntoDropdownFormat,
} from '../../../services/parseLanguageRessourcesIntoDropdownFormat';

export const AWSAuthenticationView = (props: AuthenticationViewProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [darkmode, setDarkmode] = useState(false);
  const langContext = useContext(LanguageContext);

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

  const NewPasswordForm = (
    <div style={{ width: '85%' }}>
      <div>
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
            className={
              'inputLabel ' + (authContext?.loginError ? 'invalid' : '')
            }
          >
            {t('New_password')}
          </label>
          <input
            name="password"
            type="password"
            id="inputPassword"
            style={{ width: '100%', marginTop: '5px', marginBottom: '10px' }}
            className={
              'form-control p-inputtext ' +
              (authContext?.loginError ? 'invalid' : '')
            }
            placeholder={t('New_password')}
            onChange={(ev) => setPassword(ev.target.value)}
            required
            autoFocus
          />
          <LoginButtonWithSpinner
            isLoading={authContext?.isLoading}
            style={{
              backGroundColor:
                props.colorOptions?.authViewColorSettings
                  ?.loginButtonBackground,
            }}
          />
          <div className="invalid">{getErrorText(authContext?.loginError)}</div>
        </div>
      </form>
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
          className={'p-inputtext'}
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
        <div style={{ marginTop: '20px' }} className="invalid">
          {getErrorText(authContext?.loginError)}
        </div>
      </div>
    </form>
  );

  const appLogoDefault = (props: AuthenticationViewProps) => (
    <div
      style={{
        display: props.headerOptions?.hideLeft ? 'none' : 'flex',
        alignItems: 'center',
        height: '56px',
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
                ?.letteringElementLeftColor
            : 'white',
          fontSize: '15px',
          width: '150px',
          fontWeight: 'lighter',
        }}
      >
        {props.headerOptions?.letteringElementLeft
          ? props.headerOptions.letteringElementLeft
          : 'Remote Service Monitor'}
      </h5>
    </div>
  );

  const header = (props: AuthenticationViewProps) => (
    <div
      className={'flex'}
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

  //TODO: Think of concept how to set backgroundcolor or backgroundimage

  return (
    <div
      className="flex"
      style={{
        height: '100%',
        background: '',
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
        className="flex flex-column shadow-6"
        style={{
          width: '620px',
          margin: 'auto',
          position: 'relative',
          backgroundColor: props.colorOptions?.authViewColorSettings
            ?.loginFormBackground
            ? props.colorOptions?.authViewColorSettings?.loginFormBackground
            : WHITE,
        }}
      >
        <div>
          {props.headerOptions?.reactElementFullAuthenticationHeader
            ? props.headerOptions.reactElementFullAuthenticationHeader
            : header(props)}
        </div>
        <div className="flex flex-column" style={{ justifyContent: 'center' }}>
          <div
            style={{ width: '100%', padding: '24px 24px 0px 0px' }}
            className="flex align-items-center justify-content-end"
          >
            {darkmode ? (
              <i
                onClick={() => setDarkmode(!darkmode)}
                className="pi pi-sun darkmode-logos"
              />
            ) : (
              <i
                onClick={() => setDarkmode(!darkmode)}
                className="pi pi-moon darkmode-logos"
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
          {authContext?.isNewPasswordRequired ? NewPasswordForm : LoginForm}
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
