/**
 * Copyright © 2025 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import Page from "../../../common/page/page.tsx";
import Title from "../../../common/page/text/title.tsx";
import SubTitle from "../../../common/page/text/subTitle.tsx";
import Code from "../../../common/page/utils/code.tsx";
import PageLink from "../../../common/page/text/pageLink.tsx";
import SubSubTitle from "../../../common/page/text/subSubTitle.tsx";
import Text from "../../../common/page/text/text.tsx";

const PageGlobalDataLayer: React.FC = () => {
  return (
    <Page>
      <Title>
        GlobalDataLayer: Internationalization and Authentication system
      </Title>
      <SubTitle>Internationalization</SubTitle>
      <Text>
        The framework uses react-i18next for internationalization and provides a
        default initialization which automatically gets executed when the
        GlobalDataLayer component mounts. It also provides translations in
        english and german for texts of framework components. You are able to
        extend the translations for framework components with other languages by
        providing translations with the translation keys used by the
        framework&#39;s components.
      </Text>
      <Text>
        The GlobalDataLayer component provides the following interface for
        internationalization:
      </Text>
      <Code title={"PageInterface PageGlobalDataLayer"} language={"typescript"}>
        {`interface Props {
  modules: FFAllMandatoryModules<TState> & Record<string, FFModule>;
  store: EnhancedStore<TState>;
  languageOptions?: GlobalDataLayerLanguageOptions;
  translations?: Translations;
  initI18Next?: () => void;
  colorSettings?: ColorProviderProps;
}`}
      </Code>
      <Text>
        To define and use custom translations you have to define an object of
        the structure seen in the following code snippet. After defining the
        object you have to pass it to GlobalDataLayer.
      </Text>
      <Code title={"Internationalization Example"} language={"typescript"}>
        {`const translations = {
     en: {
         translation: importedJsonFileEnglish
    },
     de: {
         translation: importedJsonFileGerman
     }
}

...
return (
    ...
    <GlobalDataLayer
        modules={...}
        store={...}
        translations={translations}
    />
    ...
);`}
      </Code>
      <Text>
        The .json files have to include simple key value pairs like this:
      </Text>
      <Code title={"Language Object Example"} language={"json"}>
        {`{
    "optioName": "German",
    "greeting": "hello",
    "promoteProgramming": "Programming is fun!"
}`}
      </Code>
      <Text>
        When defining a new language you should define the following
        translations as the following keys are used by the framework's
        components:
      </Text>
      <Code title={"Mandatory keys"} language={"json"}>
        {`{
    "auth": {
        "invalidAccessConfiguration": "Invalid access configuration",
        "invalidUsernameOrPassword": "Invalid username or password",
        "passwordRequirementsNotMet": "Password did not meet the requirements",
        "serverError": "Server error"
    },
    "form": {
        "emailAddress": "Email address",
        "password": "Password",
        "newPassword": "New password",
        "replaceTemporaryPassword": "Please replace your temporary password with a new one. Your new password has to meet the following requirements:"
    },
    "passwordRequirements": {
        "atLeast8Characters": "At least 8 characters",
        "upperLowerCaseLetters": "Upper & lower cases letters",
        "atLeastOneSpecialCharacter": "At least one special character",
        "atLeastOneDigit": "At least one digit"
    },
    "cookieConsent": {
        "header": "This website uses cookies.",
        "disclaimer": "This website needs you to allow cookies for proper functionality.",
        "allowCookiesButton": "Allow cookies"
    },
    "company": {
        "date": "Date",
        "imprint": "Imprint",
        "germany": "Germany",
        "internet": "Internet",
        "headquarter": "Headquarter",
        "registerCourt": "Register court",
        "registrationNumber": "Registration number",
        "ustIdentNumber": "USt-Ident-Number",
        "managingDirectors": "Managing directors",
        "chairman": "Chairman",
        "chairmanSupervisoryBoard": "Chairman of the supervisory board"
    },
    "settings": {
        "language": "Language"
    }
}`}
      </Code>
      <Text>
        To specify dialects like the german dialect in Switzerland use the
        following name schema for the translations object (underscore is
        important):
      </Text>
      <Code language={"json"}>
        {`Key for german: "de"
Key for the german dialect in Switzerland: "de_CH"`}
      </Code>
      <Text>
        To get a translation by it&#39;s key you should use the useTranslator
        hook from .../iav-core/translators. This hook returns a function which
        generates the translation by passing the corresponding key. The hook
        returns a function in order to allow the user to translate text inside
        the whole component. If the hook itself generated the translation it
        would make things more complicated as hook calls have to be executed in
        the same order in every render. Translations in conditional renderings
        would be impossible. An example:
      </Text>
      <Code
        title={"Example use case in a functional component"}
        language={"typescript"}
      >
        {`const t = useTranslator();
...
return (
   <div>Example translation: {t("company.imprint")}</div>
)`}
      </Code>
      <Text>
        You can also use a HOC (higher order component) for translations in
        class components. The HOC will inject a translation function as a
        property. The following code snippet shows an example.
      </Text>
      <Code
        title={"Example use case in a class component"}
        language={"typescript"}
      >
        {`class FirstExampleComponentUnprocessed extends Component<AppliedTranslationProps, State> {
    // ...
    render() {
        return(
            <div>Translation: {t("company.imprint")}</div>
        );
    }
}

export const LayoutAndContextExampleComponent = applyTranslation(FirstExampleComponentUnprocessed);`}
      </Code>
      <Text>
        You may have seen that the component has the interface
        AppliedTranslationProps as it&#39;s properties type. This interface id
        provided by the framework. It&#39;s mandatory to use this interface in
        order to ensure that your components takes the translation function t.
        However, the property&#39;s type could also be a type which extends
        AppliedTranslationProps. This is necessary if there are other properties
        which should be passed to your component.
      </Text>
      <Text>
        If you want to initialize i18next your own way (for example to specify
        an interpolation function) you can define an initialization function and
        pass it to the GlobalDataLayer component by using the initI18Next
        property. If the user hasn&#39;t accepted cookies, i18next will be
        initialized by the framework although this property is specified. The
        initI18Next function will be executed when the user accepts cookies. The
        following code snippet shows an example of a custom i18next
        initialization function:
      </Text>
      <Code
        title={"Example configuration of the initFunction"}
        language={"typescript"}
      >
        {`const initFunction = () => {
    i18n
        .use(initReactI18next)
        .use(LanguageDetector)
        .init({
            debug: false,
            fallbackLng: "en",
            resources: resources,
            detection: {
                caches: ["cookie"],
                cookieMinutes: 525600
            }
        });
}`}
      </Code>
      <Text>
        You can find more information about I18next{" "}
        <PageLink
          to={"https://react.i18next.com/"}
          label={"here"}
          target={"_blank"}
        />
        .
      </Text>
      <SubSubTitle>GlobalDataLayerLanguageOptions</SubSubTitle>
      <Code language={"typescript"}>
        {`interface GlobalDataLayerLanguageOptions {
    fallbackLang?: string; // The key of the language which will be used for translations where no translation is defined. The default is en for english.
    initialLang?: string; // The key of the language which will be initially used if no language cookie is set yet. For example this option can be used to define the used language when the language selection is hidden.
}`}
      </Code>
      <SubTitle>Authentication System</SubTitle>
      <Text>
        The authentication system is separated into two parts: The so called
        Authenticators and Authentication Views. The Authentiatcors represent
        the authentication logic while the Authentication View gets rendered for
        authentication. Authenticators are part of the module system and thus
        can be replaced. For detailed information consult the modules section of
        this documentation.
      </Text>

      <SubSubTitle>AuthenticationViews</SubSubTitle>
      <Text>
        For basic authentication the Framework provides an Authentication View
        called <i>BasicAuthenticationView</i> which gets used by default. In
        order to change the authentication view you have to pass it to the
        <em>UILayer</em> component using the <em>authenticationView</em>{" "}
        property. You are also able to develop custom authentication views and
        pass it to UILayer using this property.
      </Text>
      <Text>
        The following code snippet shows an example for the implementation of an
        authentication view. It uses the Thunks of the configured Authenticator
        module.
      </Text>
      <Code language={"typescript"}>
        {`type BasicAuthenticatorAuthDispatch = ThunkDispatch<
  AuthState,
  unknown,
  Action<string>
>;
type BasicAuthenticatorStoreState = {
  [MandatoryModuleNames.Authenticator]: AuthState;
};

export const BasicAuthenticationView = (props: AuthenticationViewProps) => {
  const {modules} = useModuleContext();
  const authModule = modules[MandatoryModuleNames.Authenticator];

  const colorSettingsContext = useContext(ColorSettingsContext);

  const dispatch = useDispatch<BasicAuthenticatorAuthDispatch>();
  const useAuthSelector: TypedUseSelectorHook<BasicAuthenticatorStoreState> =
    useSelector;

  const isLoading = useAuthSelector(
    (state) => state[MandatoryModuleNames.Authenticator].isLoading,
  );

  const [triedToSubmit, setTriedToSubmit] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const langContext = useContext(LanguageContext);

  const t = useTranslator();

  const headerBackgroundColor =
    colorSettingsContext.currentColors.authenticationView.headerBackgroundColor;
  const fullScreenBackgroundColor =
    colorSettingsContext.currentColors.authenticationView
      .fullScreenBackgroundColor;
  const loginFormBackgroundColor =
    colorSettingsContext.currentColors.authenticationView
      .loginFormBackgroundColor;
  const inputFieldBackgroundColor =
    colorSettingsContext.currentColors.authenticationView
      .inputFieldBackgroundColor;
  const inputFieldTextColor =
    colorSettingsContext.currentColors.authenticationView.inputFieldTextColor;
  const legalNoticeIconColor =
    colorSettingsContext.currentColors.authenticationView.legalNoticeIconColor;
  const companyTextColor =
    colorSettingsContext.currentColors.authenticationView.companyTextColor;
  const themeTogglerColor =
    colorSettingsContext.currentColors.authenticationView.themeTogglerColor;
  const legalLinkColor =
    colorSettingsContext.currentColors.authenticationView.legalLinkColor;

  const {passwordErrorMessage} = props.authOptions?.errorMessages || {};

    const isAtLeastOneDocumentVisible = props.legalDocuments?.some(
    (document) => !document.isHidden,
  );
  // These two functions life on the class instance not on the prototype thanks to @babel/plugin-proposal-class-properties.
  const submit = (event: FormEvent<HTMLFormElement>) => {
    setTriedToSubmit(true);
    event.preventDefault();
    dispatch(
      authModule.login({credentials: {email: email, password: password}}),
    );
  };

  const companyLogoDefault = (props: AuthenticationViewProps) => (
    <div
      style={{
        display: props.headerOptions?.hideRight ? "none" : "flex",
        alignItems: "center",
        paddingRight: '{PADDING_GAB}px',
      }}
    >
      <CompanyLogo fill={colorSettingsContext?.darkmode ? BLUE3 : WHITE} />
    </div>
  );

  const header = (props: AuthenticationViewProps) => (
    <div
      className="flex justify-content-between"
      style={{
        backgroundColor: headerBackgroundColor,
        color: "white",
        alignItems: "center",
        height: "56px",
      }}
    >
      <div
        id="left-element-authentication"
        className="flex align-items-center default-app-logo-text-style"
      >
        {props.headerOptions?.reactElementLeft ? (
          props.headerOptions?.reactElementLeft
        ) : (
          <AppLogoPlaceholder
            appLogoPlaceholder={APPLICATION_LOGO_PLACEHOLDER}
          />
        )}
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
  const identifierLegal = "a" + identifier;
  const identifierWithDot = "." + identifierLegal;

  return (
    <div
      className="flex"
      style={{
        height: "100%",
        position: "relative",
        backgroundColor: fullScreenBackgroundColor,
      }}
    >
      {colorSettingsContext?.colorOptions.authenticationView
        ?.fullScreenBackgroundColor ? (
        <></>
      ) : (
        <img
          style={{
            inset: "0px",
            position: "absolute",
            zIndex: "-100",
            height: "100vh",
            width: "100vw",
            objectFit: "cover",
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
        className="flex flex-column shadow-6"
        style={{
          position: "relative",
          width: "620px",
          margin: "auto",
          backgroundColor: loginFormBackgroundColor,
        }}
      >
        <div>{header(props)}</div>
        <div
          className="flex flex-column justify-content-center align-items-center"
          style={{marginBottom: "30px"}}
        >
          <div
            style={{width: "100%", padding: "24px 24px 0px 0px"}}
            className="flex align-items-center justify-content-end"
          >
            {props.authOptions?.preventDarkmode === true ? (
              <React.Fragment />
            ) : (
              <>
                <i
                  onClick={() =>
                    colorSettingsContext?.setDarkmode(
                      !colorSettingsContext.darkmode,
                    )
                  }
                  style={{
                    color: themeTogglerColor,
                  }}
                  className={'switch-colormode-logos pi {
                    colorSettingsContext.darkmode ? "pi-moon" : "pi-sun"
                  }'}
                />
              </>
            )}

            {!props.hideLanguageSelection && (
              <Dropdown
                id="change-language-dropdown"
                style={{
                  width: "160px",
                  backgroundColor: inputFieldBackgroundColor,
                  color: inputFieldTextColor,
                }}
                placeholder={
                  langContext?.resources[langContext.activeLang].translation
                    .option_name
                }
                onChange={function (event: DropdownChangeEvent) {
                  langContext?.selectLanguage(event.value.key);
                }}
                options={parseLanguageResourcesIntoDropdownFormat(
                  langContext?.resources,
                )}
                optionLabel="label"
              />
            )}
          </div>

          <form
            style={{
              width: "100%",
              height: "100%",
            }}
            onSubmit={submit}
          >
            <div
              style={{margin: "40px 24px 0px 24px"}}
              className={"flex flex-column"}
            >
              <TextField
                style={{
                  marginBottom: "30px",
                  backgroundColor: inputFieldBackgroundColor,
                  color: inputFieldTextColor,
                }}
                label={t("Email_address")}
                id="email"
                name="email"
                required={true}
                autoFocus={true}
                value={email.valueOf()}
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                label={t("Password")}
                id="password"
                name="password"
                type="password"
                required={true}
                error={triedToSubmit && !isLoading}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                helperText={passwordErrorMessage || t("wrong_password")}
              />
              <div>
                <LoginButtonWithSpinner isLoading={isLoading} />
              </div>
            </div>
          </form>
        </div>

        {!props.hideLegalDocuments && (
          <Link
            style={{
              position: "absolute",
              bottom: "12px",
              left: '{PADDING_GAB}px',
              textDecoration: "none",
            }}
            to="/documents"
            target="_blank"
          >
            <span
              className={"pi pi-info-circle " + identifierLegal}
              style={{
                fontSize: "medium",
                fontWeight: "bold",
                color: legalNoticeIconColor,
              }}
            />
          </Link>
        )}

        <Tooltip
          content={t(
            props.authOptions?.documentsLabelKey
              ? props.authOptions?.documentsLabelKey
              : "Imprint",
          )}
          target={identifierWithDot}
          id="hover-image"
        />
        <span
          style={{
            alignSelf: "center",
            padding: "24px",
            fontSize: "11px",
            color: companyTextColor,
          }}
        >
          &copy;{" "}
          {props.authOptions?.companyText
            ? props.authOptions?.companyText
            : "Company 2025"}
        </span>

        {isAtLeastOneDocumentVisible && (
        <>
          <span style={{color: "var(--grey-2)"}}>|</span>
          <div
            className="flex"
            style={{
              alignItems: "center",
              gap: "5px",
            }}
          >
            {props.legalDocuments
              ?.filter((document) => !document.isHidden)
              .map((document) => (
                <Link
                  key={document.path}
                  className="legal-doc-link"
                  style={{color: legalLinkColor, fontSize: "12px"}}
                  to={document.path}
                  target="_blank"
                >
                  {t({key: document.titleTranslationKey})}
                </Link>
              ))}
          </div>
        </>
        )}
      </div>
    </div>
  );
};
`}
      </Code>
    </Page>
  );
};

export default PageGlobalDataLayer;
