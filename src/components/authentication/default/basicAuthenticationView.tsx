import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { BLUE0, WHITE, BLACK } from '../../../constants';
import AppLogo from '../../../assets/images/app_logo.png';
import { AuthContext } from '../../../contexts/auth';
import { LoginButtonWithSpinner } from '../loginButtonWithSpinner';
import { useContext } from 'react';
import { useTranslator } from '../../internationalization/translators';
import { AuthenticationViewProps } from '../aws/authenticationView';
import '../../css/authenticationView.css';
import { cognitoCompletePassword } from '../../../services/cognitoService';

export const BasicAuthenticationView = (props: AuthenticationViewProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authContext = useContext(AuthContext);
  const t = useTranslator();

  // These two functions life on the class instance not on the prototype thanks to @babel/plugin-proposal-class-properties.
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    authContext?.login({ email: email, password: password });
  };

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
                .letteringElementLeftColor
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
        backgroundColor:
          props.colorOptions?.authViewColorSettings?.fullBackground,
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
            ? props.headerOptions?.reactElementFullAuthenticationHeader
            : header(props)}
        </div>
        <div
          className="flex justify-content-center"
          style={{ marginBottom: '30px' }}
        >
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
                autoFocus
                style={{ marginBottom: '1rem' }}
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
            </div>
          </form>
        </div>
        <Link
          style={{
            alignSelf: 'center',
            color: props.colorOptions?.authViewColorSettings
              ?.legalDocumentsColor
              ? props.colorOptions?.authViewColorSettings?.legalDocumentsColor
              : 'black',
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
