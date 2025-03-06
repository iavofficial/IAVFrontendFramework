import React from "react";
import Page from "../components/page/page.tsx";
import Title from "../components/page/text/title.tsx";
import SubTitle from "../components/page/text/subTitle.tsx";
import Typography from "../components/page/utils/typography.tsx";
import Code from "../components/page/utils/code.tsx";
import PageLink from "../components/page/text/pageLink.tsx";
import SubSubTitle from "../components/page/text/subSubTitle.tsx";
import BulletList from "../components/page/text/bulletList.tsx";

const GlobalDataLayer: React.FC = () => {

    return (
        <Page>
            <Title>GlobalDataLayer: Internationalization and Authentication system</Title>
            <SubTitle>Internationalization</SubTitle>
            <Typography variant={"p"}>
                The framework uses react-i18next for internationalization and provides a
                default initialization which automatically gets executed when the
                GlobalDataLayer component mounts. It also provides translations in english
                and german for texts of framework components. You are able to extend the
                translations for framework components with other languages by providing
                translations with the translation keys used by the framework&#39;s
                components.
            </Typography>
            <Typography variant={"p"}>
                The GlobalDataLayer component provides the following interface for
                internationalization:
            </Typography>
            <Typography variant={"p"}>
                <strong>Interface GlobalDataLayer</strong>
            </Typography>
            <Code language={"typescript"}>
                {`interface Props {
    languageOptions?: GlobalDataLayerLanguageOptions;
    translations?: Translations;
    initI18Next?: () => void;
    colorSettings?: ColorProviderProps;
}`}
            </Code>
            <Typography variant={"p"}>
                To define and use custom translations you have to define an object of the
                structure seen in the following code snippet. After defining the object
                you have to pass it to GlobalDataLayer.
            </Typography>
            <Typography variant={"p"}>
                <strong>Internationalization Example</strong>
            </Typography>
            <Code language={"typescript"}>
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
    <GlobalDataLayer translations={translations}/>
    ...
);`}
            </Code>
            <Typography variant={"p"}>
                The .json files have to include simple key value pairs like this:
            </Typography>
            <Typography variant={"p"}>
                <strong>Language Object Example</strong>
            </Typography>
            <Code language={"json"}>
                {`{
    "optioName": "German",
    "greeting": "hello",
    "promoteProgramming": "Programming is fun!"
}`}
            </Code>
            <Typography variant={"p"}>
                When defining a new language you should define the following translations as the following keys are used
                by the framework's components:
            </Typography>
            <Typography variant={"p"}>
                <strong>Mandatory keys</strong>
            </Typography>
            <Code language={"json"}>
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
            <Typography variant={"p"}>
                To specify dialects like the german dialect in Switzerland use the
                following name schema for the translations object (underscore is
                important):
            </Typography>
            <Code language={"json"}>
                {`Key for german: "de"
Key for the german dialect in Switzerland: "de_CH"`}</Code>
            <Typography variant={"p"}>
                To get a translation by it&#39;s key you should use the useTranslator hook
                from .../iav-core/translators. This hook returns a function
                which generates the translation by passing the corresponding key. The hook
                returns a function in order to allow the user to translate text inside the
                whole component. If the hook itself generated the translation it would
                make things more complicated as hook calls have to be executed in the same
                order in every render. Translations in conditional renderings would be
                impossible. An example:
            </Typography>
            <Typography variant={"p"}>
                <strong>Example use case in a functional component</strong>
            </Typography>
            <Code language={"typescript"}>
                {`const t = useTranslator();
...
return (
   <div>Example translation: {t("company.imprint")}</div>
)`}
            </Code>
            <Typography variant={"p"}>
                You can also use a HOC (higher order component) for translations in class
                components. The HOC will inject a translation function as a property. The
                following code snippet shows an example.
            </Typography>
            <Typography variant={"p"}>
                <strong>Example use case in a class component</strong>
            </Typography>
            <Code language={"typescript"}>
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
            <Typography variant={"p"}>
                You may have seen that the component has the interface
                AppliedTranslationProps as it&#39;s properties type. This interface id
                provided by the framework. It&#39;s mandatory to use this interface in
                order to ensure that your components takes the translation function t.
                However, the property&#39;s type could also be a type which extends
                AppliedTranslationProps. This is necessary if there are other properties
                which should be passed to your component.
            </Typography>
            <Typography variant={"p"}>
                If you want to initialize i18next your own way (for example to specify an
                interpolation function) you can define an initialization function and pass
                it to the GlobalDataLayer component by using the initI18Next property. If
                the user hasn&#39;t accepted cookies, i18next will be initialized by the
                framework although this property is specified. The initI18Next function
                will be executed when the user accepts cookies. The following code snippet
                shows an example of a custom i18next initialization function:
            </Typography>
            <Typography variant={"p"}>
                <strong>Example configuration of the initFunction</strong>
            </Typography>
            <Code language={"typescript"}>
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
            <Typography variant={"p"}>
                You can find more information about I18next
                <PageLink to={"https://react.i18next.com/"} label={"here"} target={"_blank"}/>.
            </Typography>
            <SubSubTitle>GlobalDataLayerLanguageOptions</SubSubTitle>
            <Code language={"typescript"}>
                {`interface GlobalDataLayerLanguageOptions {
    fallbackLang?: string; // The key of the language which will be used for translations where no translation is defined. The default is en for english.
    initialLang?: string; // The key of the language which will be initially used if no language cookie is set yet. For example this option can be used to define the used language when the language selection is hidden.
}`}
            </Code>
            <SubTitle>Authentication System</SubTitle>
            <Typography variant={"p"}>
                The authentication system is seperated into two parts: The so called
                AuthenticationProvider and the AuthenticationView. The
                AuthenticationProvider is the component which handles authentication
                (login, logout, ...). The AuthenticationView is the view shown to a user
                when logging in. Because the authentication provider and the view are
                seperated it&#39;s possible to mix authentication providers and views with
                each other. You are also able to just develop a new authentication
                provider without developing a new authentication view.
            </Typography>
            <Typography variant={"p"}>
                The framework provides two authentication providers and two authentication
                views. However, you can implement custom authentication providers (for
                example for authentication with Microsoft Azure) and own authentication
                views.
            </Typography>
            <SubSubTitle>DummyAuthenticationProvider</SubSubTitle>
            <Typography variant="p">
                <em>DummyAuthenticationProvider</em> is the default authentication provider (which will get used if
                nothing is specified by you) and allows every combination of email and password. This authentication
                provider is intended to be used while developing when there is no backend authentication service yet.
                This enables you to show a realistic workflow to your client. You are able to pass additional values and
                functions as an object of key-value pairs (for example <code>{`{ getUserGroups: () => [] }`}</code>)
                to <em>DummyAuthenticationProvider</em> by using the property <em>additionalContextValues</em>. These
                values and functions will be shared using the auth context. To do this you have to include
                the <em>DummyAuthenticationProvider</em> above the <em>GlobalDataLayer</em> on your own (as shown in the
                beginning of this documentation). The <em>GlobalDataLayer</em> component detects that the authentication
                provider has been changed and will skip the default process. The properties of
                the <em>DummyAuthenticationProvider</em> are defined as follows:
            </Typography>
            <Typography variant={"p"}>
                <strong>Interface AWSAuthenticationProvider</strong>
            </Typography>
            <Code language={"typescript"}>
                {`export interface Props {
    additionalContextValues?: { [key: string]: any }; // Optional object to share values and function via the context of the DummyAuthenticationProvider
}`}
            </Code>
            <SubSubTitle>AWSAuthenticationProvider</SubSubTitle>
            <Typography variant={"p"}>
                The AWSAuthenticationProvider uses Amplify to authenticate with AWS
                Cognito. To use this authentication provider you have to configure Amplify
                first. To do this you have to define a configuration function and pass it
                to the AWSAuthenticationProvider . You do this by including the
                AWSAuthenticationProvider above the GlobalDatalayer (as shown in the
                beginning of this documentation). The <em>GlobalDataLayer</em> component
                detects that the authentication provider has been changed and will skip
                the default process. The properties of the AWSAuthenticationProvider are
                the following:
            </Typography>
            <Typography variant={"p"}>
                <strong>Interface AWSAuthenticationProvider</strong>
            </Typography>
            <Code language={"typescript"}>
                {`export interface Props {
    configureAmplify: () => void; // Mandatory function to configure Amplify
    failOnNoLegalGroup?: boolean; // (Optional) Fail authentication if the user is valid and authorized but is not assigned to a legal group yet.
    legalGroups?: string[]; // Optional parameter to define the legal groups
}`}
            </Code>
            <Typography variant={"p"}>
                The AWS authentication Provider returns the following properties
            </Typography>
            <Typography variant={"p"}>
                <strong>Properties AWSAuthenticationProvider</strong>
            </Typography>
            <Code language={"typescript"}>
                {`<AuthContext.Provider
    value={{
        ...this.state,
        login: this.login, //reference to trigger the login function
        completePassword: this.completePassword,  //boolean to set new password
        logout: this.logout, //reference to trigger the logout function 
        getUserData: this.getUserData, //returns the userData
        getUserGroups: this.getUserGroups, //returns the userGroups the user is associated
        refreshSession: this.refreshSession,//reference to trigger session refresh
        hasAuthenticated: this.hasAuthenticated,//boolean if the user is successfully authenticated
        fetchAuthed: this.fetchAuthed,//reference to the helper function to execute authenticated API calls
       }}
>
    {this.props.children}
</AuthContext.Provider>`}
            </Code>
            <Typography variant={"p"}>
                <strong>Note:</strong> The IAV Frontend Framework is compatible with AWS
                Amplify, but you need to install it separately. You have to install at
                least the version 6.5.2.
            </Typography>
            <Code language={"typescript"}>
                {`//example configuration for amplify 6
Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: config?.cognitoPool!,
          userPoolClientId: config?.cognitoAppId!,
        },
      },
    });

    cognitoUserPoolsTokenProvider.setKeyValueStorage(
      new CookieStorage({
        domain: config?.domain!,
        path: "/",
        expires: 365,
        secure: config?.domain !== "localhost",
        sameSite: "lax",
      })
    );

function App  {
  // ...
  return(
  <AWSAuthenticationProvider configureAmplify={() => { Amplify.configure(authConfig); }}>
    <GlobalDataLayer ...>
      <UILayer/>
    <GlobalDataLayer .../>
  </AWSAuthenticationProvider>
};`}
            </Code>
            <SubSubTitle>How to implement custom authentication providers</SubSubTitle>
            <Typography variant={"p"}>
                Hint: The process of implementing a custom authentication provider is
                content of the video tutorials.
            </Typography>
            <Typography variant={"p"}>
                In the process of implementing an authentication provider you have to keep
                some aspects in mind:
            </Typography>
            <BulletList
                bulletType="number"
                items={[
                    "You are able to provide methods and attributes using the AuthContext react context. Hence, you have to import the AuthContext and expose your methods and attributes to it (via the value property of the context's provider). In your render method you have to encapsulate the component's children in AuthContext.Provider in order to render the children below the provider inside the component tree.",
                    "An authentication provider has to implement the following methods as a minimum (if you use TypeScript you can import the LoginProvider and the Credentials interface to let the compiler check whether you implemented all methods):",
                    "isAuthenticated(): Returns a boolean which is true if a user is authenticated.",
                    "login(credentials): Takes the users credentials and handles the login process.",
                    "logout(): Handles the logout process.",
                    "getUsername(): Returns the username of the currently logged in user.",
                    "execIfAuthed(func): Takes a function and tries to execute it. If func fails this method should try to refresh the authentication and try to execute the passed function again. After that this method has to return a JavaScript Promise. The purpose of this method is to ensure that fetches do not fail because of an expired session.",
                    "Finally you have to wrap the GlobalDataLayer and all other components inside your authentication provider (for example in the render method of your App.tsx) (as shown in the beginning of this documentation)."
                ]}/>
            <SubSubTitle>AuthenticationViews</SubSubTitle>
            <Typography variant={"p"}>
                As mentioned the framework provides two authentication views. One is
                AWSAuthenticationView, which should be used in combination with
                <em>AWSAuthenticationProvider</em>. Furthermore, there is the
                <em>BasicAuthenticationView</em>
                component which should be used in combination with
                <em>DummyAuthenticationProvider</em>. The BasicAuthenticationView is the
                default authentication view. The authentication views provided by the
                framework can be customized through the authOptions Interface in the
                framework (see chapter 5 UILayer).
            </Typography>
            <Typography variant={"p"}>
                In order to change the authentication view you have to pass it to the
                <em>UILayer</em> component using the <em>authenticationView</em>property.
                You are also able to develop custom authentication views and pass it to
                UILayer using this property.
            </Typography>
            <Typography variant={"p"}>
                Hint: The process of implementing a custom authentication view is content
                of the video tutorials.
            </Typography>
            <Typography variant={"p"}>
                The following code snippet shows an example for the implementation of an
                authentication view. It should subscribe to the AuthContext react context
                in order to be able to trigger methods like the login method.
            </Typography>
            <Code language={"typescript"}>
                {`import React, { Component, FormEvent } from "react";
import { Link } from "react-router-dom";

import { BLUE4 } from "../constants";
import AppLogo from "../../assets/app_logo.png";
import { AuthContext } from "../../contexts/auth";
import { LoginButtonWithSpinner } from "./loginButtonWithSpinner";
            
export interface State {
    email: string;
    password: string;
}

export class BasicLoginView extends Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    // These two functions life on the class instance not on the prototype thanks to @babel/plugin-proposal-class-properties.
    submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.context.login({ email: this.state.email, password: this.state.password });
    }

    handleChange = ({ target: { name, value } }: { target: { name: string, value: any } }) => {
        let newState = { [name]: value } as Pick<State, keyof State>;
        this.setState(newState);
    }

    render() {
        return (
            <div className="p-d-flex" style={{ height: "100%" }}>
                <div className="p-d-flex p-flex-column p-shadow-10" style={{ width: "500px", margin: "auto" }}>
                    <div className={"p-d-flex"} style={{ backgroundColor: BLUE4, color: "white", alignItems: "center" }}>
                        <img src={AppLogo} alt={""} />
                        <span style={{ fontSize: "xx-large", marginLeft: "auto", marginRight: "20px" }}>LOGIN</span>
                    </div>
                    <div className="p-d-flex" style={{ justifyContent: "center", marginBottom: "30px" }}>
                        <form style={{ width: "85%", height: "100%" }} className="p-mr-4 p-mt-4" onSubmit={this.submit}>
                            <div className={"p-d-flex p-flex-column"}>
                                <label className="inputLabel">Email address</label>
                                <input value={this.state.email.valueOf()} onChange={this.handleChange} name="email" type="email"
                                    className={"p-inputtext"} placeholder="Email address" required autoFocus style={{ marginBottom: "1rem" }} />
                                <label className="inputLabel">Password</label>
                                <input value={this.state.password.valueOf()} onChange={this.handleChange} name="password" type="password"
                                    className={"p-inputtext"} placeholder="Password" required style={{ marginBottom: "1rem" }} />
                                <div>
                                    <LoginButtonWithSpinner isLoading={this.context.isLoading} />
                                </div>
                            </div>
                        </form>
                    </div>
                    <Link style={{ alignSelf: "center", fontWeight: "bolder", color: "black" }} to="/imprint">Imprint</Link>
                    <span style={{ padding: "10px", alignSelf: "center" }}>© IAV GmbH 2020</span>
                </div>
            </div >
        );
    }
};

BasicLoginView.contextType = AuthContext;`}
            </Code>
        </Page>
    )
};

export default GlobalDataLayer;