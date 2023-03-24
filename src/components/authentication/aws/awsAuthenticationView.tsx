import React, { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { BLACK, BLUE0, WHITE } from '../../../constants';
import AppLogo from '../../../assets/images/app_logo.png';
import { AuthContext } from '../../../contexts/auth';
import { LoginButtonWithSpinner } from '../loginButtonWithSpinner';
import { useState } from 'react';
import { useContext } from 'react';
import { useTranslator } from '../../internationalization/translators';
import { AuthenticationViewProps } from './authenticationView';
import '../../css/authenticationView.css';

export const AWSAuthenticationView = (props: AuthenticationViewProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      style={{ width: '85%', height: '100%' }}
      className="mr-4 mt-4"
      onSubmit={submit}
    >
      <div className={'flex flex-column'}>
        <label className="inputLabel">{t('Email_address')}</label>
        <input
          value={email.valueOf()}
          onChange={(ev) => setEmail(ev.target.value)}
          name="email"
          type="email"
          className={'p-inputtext'}
          placeholder={t('Email_address')}
          required
          style={{ marginBottom: '1rem' }}
          autoFocus
        />
        <label className="inputLabel">{t('Password')}</label>
        <input
          value={password.valueOf()}
          onChange={(ev) => setPassword(ev.target.value)}
          name="password"
          type="password"
          className={'p-inputtext'}
          placeholder={t('Password')}
          required
          style={{ marginBottom: '1rem' }}
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
        height: '75px',
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
        height: '75px',
      }}
    >
      <div id="left-element" className={'flex align-items-center'}>
        {props.headerOptions?.reactElementLeft
          ? props.headerOptions?.reactElementLeft
          : appLogoDefault(props)}
      </div>
      <span
        style={{
          fontSize: '30px',
          marginLeft: 'auto',
          marginRight: '25px',
          color: props.colorOptions?.authViewColorSettings
            ?.letteringElementRightColor
            ? props.colorOptions?.authViewColorSettings
                ?.letteringElementRightColor
            : WHITE,
        }}
      >
        LOGIN
      </span>
    </div>
  );

  return (
    <div
      className="flex"
      style={{
        height: '100%',
        backgroundColor: props.colorOptions?.authViewColorSettings
          ?.fullBackground
          ? props.colorOptions?.authViewColorSettings?.fullBackground
          : WHITE,
      }}
    >
      <div
        className="flex flex-column shadow-6"
        style={{
          width: '500px',
          margin: 'auto',
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
        <div
          className="flex"
          style={{ justifyContent: 'center', marginBottom: '30px' }}
        >
          {authContext?.isNewPasswordRequired ? NewPasswordForm : LoginForm}
        </div>
        <Link
          style={{
            alignSelf: 'center',
            fontWeight: 'bolder',
            color: 'black',
            textDecoration: 'none',
          }}
          to="/documents"
          target="_blank"
        >
          {t(props.documentsLabelKey ? props.documentsLabelKey : 'Imprint')}
        </Link>
        <span
          style={{
            padding: '10px',
            alignSelf: 'center',
            color: props.colorOptions?.authViewColorSettings?.companyTextColor
              ? props.colorOptions.authViewColorSettings?.companyTextColor
              : BLACK,
          }}
        >
          &copy; {props.companyText ? props.companyText : 'IAV GmbH 2021'}
        </span>
      </div>
    </div>
  );
};
