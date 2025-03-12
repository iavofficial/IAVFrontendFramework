import{j as e,T as a,R as p,a as r,I as u}from"./index-C__vDxJ2.js";import{P as s,T as t,S as n,a as m,B as h,b as c,I as l,C as o,c as i}from"./subSubTitle-BjjY3Fwa.js";const g=()=>{const d=[{key:"Programming Language",value:"JavaScript"},{key:"Key dependencies",value:"React 18, ReactDOM 18, Typescript 5, AWS Amplify 6"},{key:"UI-Component libraries",value:"PrimeReact, PrimeIcons"},{key:"Requirements",value:"At least npm version 8 and node version 16"}];return e.jsxs(s,{children:[e.jsx(a,{children:"Quick Overview"}),e.jsx(t,{children:"The IAV Frontend Framework enhances the development and maintenance of multiple frontend applications by centralizing key functionalities. It tackles common issues like maintainability and extendability, while minimizing the risk of errors through consistent, reusable components. Built with React, TypeScript, and AWS Amplify, it allows for rapid deployment of updates across projects. Key features include AWS Cognito authentication, internationalization, customizable themes, and the ability to integrate different corporate designs. By leveraging GitHub for version control and collaboration, developers benefit from streamlined workflows, centralized support, and reduced redundancy across projects."}),e.jsxs(t,{children:["This is the official documentation of the IAV frontend framework. The job of the framework is to make your life way ",e.jsx("strong",{children:"easier"}),". It achieves maintainability, extendability, a lower risk of faults, and a greater developer experience by generalization. You want to maximize the speed of your development process? Just have a look."]}),e.jsx(a,{children:"Overview"}),e.jsx(n,{children:"Technical Overview"}),e.jsx(m,{data:d}),e.jsx(n,{children:"Key features"}),e.jsx(h,{bulletType:"bullet",items:["Standardized frontend layout (see more in the following general layout section)","Authentication service for AWS Cognito (other authentication services are possible)","Authorization with AWS","Default cookie banner","IAV corporate design","Internationalization (different languages can be configured)",'Navigation bar and "content bar" to navigate inside a navigation entry',"Individual coloring of components possible","Dark mode","Pre-created components for different use cases","Cookie banner for accepting the use of cookies"]}),e.jsx(n,{children:"Ongoing Maintenance and Support"}),e.jsxs(t,{children:["We manage bug reports and support requests through ",e.jsx(c,{to:"https://github.com/iavofficial/IAVFrontendFramework/issues",label:"GitHub Issues",target:"_blank"}),". For more details on how to contribute, please read our ",e.jsx(c,{to:"https://github.com/iavofficial/IAVFrontendFramework/blob/main/CONTRIBUTING.md",label:"Contributing Guidelines",target:"_blank"}),"."]}),e.jsx(n,{children:"Layout"}),e.jsx(l,{alt:"Login",src:"assets/index/login.png",fromGhPages:!0}),e.jsx(l,{alt:"Menu",src:"assets/index/menu.png",fromGhPages:!0})]})},f=()=>{const d=["Go to Project overview.","Click the drop-down Watch.","Select Custom.",'Tick "Release" and hit Apply.'];return e.jsxs(s,{children:[e.jsx(a,{children:"Important Information"}),e.jsx(n,{children:"Disclaimer"}),e.jsx(t,{children:"The Framework simplifies the development for the project using it. It does not substitute the basic knowledge of the large field of frontend development."}),e.jsx(n,{children:"Compatibility"}),e.jsx(t,{children:"Please ensure that you have at least installed Node version 16 and npm version 8."}),e.jsx(n,{children:"Subscribe to New Updates"}),e.jsx(t,{children:"Every time a new version is released, a GitHub release will be created. To receive an email notification for a new release, subscribe to the GitHub repository:"}),e.jsx(h,{items:d,bulletType:"bullet"}),e.jsx(n,{children:"TypeScript"}),e.jsx(t,{children:"The framework supports JavaScript and TypeScript. It is recommended to use TypeScript for type safety, which will greatly enhance your developer experience and development speed, especially for larger projects. One significant advantage of using TypeScript is the automatic checks for the definition of all mandatory properties of components."}),e.jsx(n,{children:"Imports"}),e.jsx(t,{children:"The framework uses ES6 import/export syntax. There are only named exports. The following snippet shows an example of an import using the framework:"}),e.jsx(o,{language:"javascript",children:'import { UILayer } from "@iavofficial/frontend-framework/uiLayer";'}),e.jsx(n,{children:"Support for class and function based components"}),e.jsx(t,{children:"The framework can be used with React functional components as well as with React class components."}),e.jsx(n,{children:"Cookies"}),e.jsx(t,{children:"The framework adds a banner for accepting the use of cookies out of the box. The banner is needed in web applications in order to be consistent with legal regulations. If the user accepts the use of cookies, the banner won't be rendered again."}),e.jsx(n,{children:"Layout of an application using the IAV frontend framework"}),e.jsx(t,{children:"The following image explains the terminology used in this documentation."}),e.jsx(l,{src:"assets/information/terminology-definition.png",fromGhPages:!0}),e.jsx(t,{children:"The following image show the appearance of the framework when the dark mode is activated."}),e.jsx(l,{src:"assets/information/iav-frontend-framework-darkmode.png",fromGhPages:!0}),e.jsx(n,{children:"Official IAV-Colors"}),e.jsx(t,{children:"The following image shows the standardized color spectrum of IAV."}),e.jsx(l,{src:"assets/information/styleguide.png",fromGhPages:!0}),e.jsx(n,{children:"Styleguide"}),e.jsx(t,{children:"The following image shows the style guide which is based on the IAV corporate design colors and the extension."}),e.jsx(l,{src:"assets/information/styleguide-additional-info.png",fromGhPages:!0})]})},y=()=>e.jsxs(s,{children:[e.jsx(a,{children:"Installation Guide"}),e.jsx(o,{title:"npm install",language:"bash",children:"npm install @iavofficial/frontend-framework"}),e.jsx(n,{children:"Add the framework to a new React application"}),e.jsx(t,{children:'If you want to add the framework by creating a new React app with "create-react-app" or using "vite", it works too. Just paste the following code snippets into the "App.tsx" file.'}),e.jsxs(t,{children:[e.jsx("strong",{children:"NOTE:"}),' If you use "vite" to create a new React app, the webview may look broken. After clearing the "index.css" file, the problem is solved.']}),e.jsx(o,{title:"Code Snippet App.tsx",language:"typescript",children:`import { GlobalDataLayer } from '@iavofficial/frontend-framework/globalDataLayer';
import { UILayer } from '@iavofficial/frontend-framework/uiLayer';

const App: React.FC = () => {
    return (
        <GlobalDataLayer>
            <UILayer startingPoint="/" tabAndContentWrappers={[]}/>
        </GlobalDataLayer>
    );
}

export default App;
`}),e.jsx(n,{children:"Using AWS Amplify"}),e.jsx(t,{children:'The IAV Frontend Framework is compatible with AWS Amplify, but you need to install it separately. You have to install at least the version "aws-amplify@^6.5.2".'}),e.jsx(o,{language:"bash",children:"npm install aws-amplify"})]}),b=()=>e.jsxs(s,{children:[e.jsx(a,{children:"Main Components"}),e.jsxs(t,{children:["The framework's main interfaces are the components ",e.jsx("code",{children:"GlobalDataLayer"})," and ",e.jsx("code",{children:"UILayer"}),".",e.jsx("code",{children:"GlobalDataLayer"})," contains all React contexts of the framework to share data across the whole component tree. The",e.jsx("code",{children:"UILayer"})," component contains the components which actually render the UI."]}),e.jsxs(t,{children:["The reason for the separation into two layers can be understood by the following example: Imagine developing a React context which needs the authentication information. The authentication information is stored inside the ",e.jsx("code",{children:"GlobalDataLayer"}),". Where to put your React context's provider? To pass your context to the ",e.jsx("code",{children:"UILayer"})," and then rendering the Provider seems inappropriate. Instead, you put the Provider between the ",e.jsx("code",{children:"GlobalDataLayer"})," and",e.jsx("code",{children:"UILayer"})," yourself. By doing this, your React context has access to all the framework's contexts, and the ",e.jsx("code",{children:"UILayer"}),"additionally has access to your context."]}),e.jsx(n,{children:"An example for this situation"}),e.jsx(o,{language:"typescript",children:`return (
// If you don't want to use the default authentication provider, you would have to render another authentication provider at this position. Authentication providers will be explained later on.
    <GlobalDataLayer ...properties...>
    // Your react contexts go here.
        <UILayer ...properties... />
    </GlobalDataLayer>
);
`})]}),x=()=>e.jsxs(s,{children:[e.jsx(a,{children:"GlobalDataLayer: Internationalization and Authentication system"}),e.jsx(n,{children:"Internationalization"}),e.jsx(t,{children:"The framework uses react-i18next for internationalization and provides a default initialization which automatically gets executed when the GlobalDataLayer component mounts. It also provides translations in english and german for texts of framework components. You are able to extend the translations for framework components with other languages by providing translations with the translation keys used by the framework's components."}),e.jsx(t,{children:"The GlobalDataLayer component provides the following interface for internationalization:"}),e.jsx(o,{title:"Interface GlobalDataLayer",language:"typescript",children:`interface Props {
    languageOptions?: GlobalDataLayerLanguageOptions;
    translations?: Translations;
    initI18Next?: () => void;
    colorSettings?: ColorProviderProps;
}`}),e.jsx(t,{children:"To define and use custom translations you have to define an object of the structure seen in the following code snippet. After defining the object you have to pass it to GlobalDataLayer."}),e.jsx(o,{title:"Internationalization Example",language:"typescript",children:`const translations = {
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
);`}),e.jsx(t,{children:"The .json files have to include simple key value pairs like this:"}),e.jsx(o,{title:"Language Object Example",language:"json",children:`{
    "optioName": "German",
    "greeting": "hello",
    "promoteProgramming": "Programming is fun!"
}`}),e.jsx(t,{children:"When defining a new language you should define the following translations as the following keys are used by the framework's components:"}),e.jsx(o,{title:"Mandatory keys",language:"json",children:`{
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
}`}),e.jsx(t,{children:"To specify dialects like the german dialect in Switzerland use the following name schema for the translations object (underscore is important):"}),e.jsx(o,{language:"json",children:`Key for german: "de"
Key for the german dialect in Switzerland: "de_CH"`}),e.jsx(t,{children:"To get a translation by it's key you should use the useTranslator hook from .../iav-core/translators. This hook returns a function which generates the translation by passing the corresponding key. The hook returns a function in order to allow the user to translate text inside the whole component. If the hook itself generated the translation it would make things more complicated as hook calls have to be executed in the same order in every render. Translations in conditional renderings would be impossible. An example:"}),e.jsx(o,{title:"Example use case in a functional component",language:"typescript",children:`const t = useTranslator();
...
return (
   <div>Example translation: {t("company.imprint")}</div>
)`}),e.jsx(t,{children:"You can also use a HOC (higher order component) for translations in class components. The HOC will inject a translation function as a property. The following code snippet shows an example."}),e.jsx(o,{title:"Example use case in a class component",language:"typescript",children:`class FirstExampleComponentUnprocessed extends Component<AppliedTranslationProps, State> {
    // ...
    render() {
        return(
            <div>Translation: {t("company.imprint")}</div>
        );
    }
}

export const LayoutAndContextExampleComponent = applyTranslation(FirstExampleComponentUnprocessed);`}),e.jsx(t,{children:"You may have seen that the component has the interface AppliedTranslationProps as it's properties type. This interface id provided by the framework. It's mandatory to use this interface in order to ensure that your components takes the translation function t. However, the property's type could also be a type which extends AppliedTranslationProps. This is necessary if there are other properties which should be passed to your component."}),e.jsx(t,{children:"If you want to initialize i18next your own way (for example to specify an interpolation function) you can define an initialization function and pass it to the GlobalDataLayer component by using the initI18Next property. If the user hasn't accepted cookies, i18next will be initialized by the framework although this property is specified. The initI18Next function will be executed when the user accepts cookies. The following code snippet shows an example of a custom i18next initialization function:"}),e.jsx(o,{title:"Example configuration of the initFunction",language:"typescript",children:`const initFunction = () => {
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
}`}),e.jsxs(t,{children:["You can find more information about I18next",e.jsx(c,{to:"https://react.i18next.com/",label:"here",target:"_blank"}),"."]}),e.jsx(i,{children:"GlobalDataLayerLanguageOptions"}),e.jsx(o,{language:"typescript",children:`interface GlobalDataLayerLanguageOptions {
    fallbackLang?: string; // The key of the language which will be used for translations where no translation is defined. The default is en for english.
    initialLang?: string; // The key of the language which will be initially used if no language cookie is set yet. For example this option can be used to define the used language when the language selection is hidden.
}`}),e.jsx(n,{children:"Authentication System"}),e.jsx(t,{children:"The authentication system is seperated into two parts: The so called AuthenticationProvider and the AuthenticationView. The AuthenticationProvider is the component which handles authentication (login, logout, ...). The AuthenticationView is the view shown to a user when logging in. Because the authentication provider and the view are seperated it's possible to mix authentication providers and views with each other. You are also able to just develop a new authentication provider without developing a new authentication view."}),e.jsx(t,{children:"The framework provides two authentication providers and two authentication views. However, you can implement custom authentication providers (for example for authentication with Microsoft Azure) and own authentication views."}),e.jsx(i,{children:"DummyAuthenticationProvider"}),e.jsxs(t,{children:[e.jsx("em",{children:"DummyAuthenticationProvider"})," is the default authentication provider (which will get used if nothing is specified by you) and allows every combination of email and password. This authentication provider is intended to be used while developing when there is no backend authentication service yet. This enables you to show a realistic workflow to your client. You are able to pass additional values and functions as an object of key-value pairs (for example ",e.jsx("code",{children:"{ getUserGroups: () => [] }"}),") to ",e.jsx("em",{children:"DummyAuthenticationProvider"})," by using the property ",e.jsx("em",{children:"additionalContextValues"}),". These values and functions will be shared using the auth context. To do this you have to include the ",e.jsx("em",{children:"DummyAuthenticationProvider"})," above the ",e.jsx("em",{children:"GlobalDataLayer"})," on your own (as shown in the beginning of this documentation). The ",e.jsx("em",{children:"GlobalDataLayer"})," component detects that the authentication provider has been changed and will skip the default process. The properties of the ",e.jsx("em",{children:"DummyAuthenticationProvider"})," are defined as follows:"]}),e.jsx(o,{title:"Interface AWSAuthenticationProvider",language:"typescript",children:`export interface Props {
    additionalContextValues?: { [key: string]: any }; // Optional object to share values and function via the context of the DummyAuthenticationProvider
}`}),e.jsx(i,{children:"AWSAuthenticationProvider"}),e.jsxs(t,{children:["The AWSAuthenticationProvider uses Amplify to authenticate with AWS Cognito. To use this authentication provider you have to configure Amplify first. To do this you have to define a configuration function and pass it to the AWSAuthenticationProvider . You do this by including the AWSAuthenticationProvider above the GlobalDatalayer (as shown in the beginning of this documentation). The ",e.jsx("em",{children:"GlobalDataLayer"})," component detects that the authentication provider has been changed and will skip the default process. The properties of the AWSAuthenticationProvider are the following:"]}),e.jsx(o,{title:"Interface AWSAuthenticationProvider",language:"typescript",children:`export interface Props {
    configureAmplify: () => void; // Mandatory function to configure Amplify
    failOnNoLegalGroup?: boolean; // (Optional) Fail authentication if the user is valid and authorized but is not assigned to a legal group yet.
    legalGroups?: string[]; // Optional parameter to define the legal groups
}`}),e.jsx(t,{children:"The AWS authentication Provider returns the following properties"}),e.jsx(o,{title:"Properties AWSAuthenticationProvider",language:"typescript",children:`<AuthContext.Provider
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
</AuthContext.Provider>`}),e.jsxs(t,{children:[e.jsx("strong",{children:"Note:"})," The IAV Frontend Framework is compatible with AWS Amplify, but you need to install it separately. You have to install at least the version 6.5.2."]}),e.jsx(o,{language:"typescript",children:`// example configuration for amplify 6
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
};`}),e.jsx(i,{children:"How to implement custom authentication providers"}),e.jsx(t,{children:"Hint: The process of implementing a custom authentication provider is content of the video tutorials."}),e.jsx(t,{children:"In the process of implementing an authentication provider you have to keep some aspects in mind:"}),e.jsx(h,{bulletType:"number",items:["You are able to provide methods and attributes using the AuthContext react context. Hence, you have to import the AuthContext and expose your methods and attributes to it (via the value property of the context's provider). In your render method you have to encapsulate the component's children in AuthContext.Provider in order to render the children below the provider inside the component tree.","An authentication provider has to implement the following methods as a minimum (if you use TypeScript you can import the LoginProvider and the Credentials interface to let the compiler check whether you implemented all methods):","isAuthenticated(): Returns a boolean which is true if a user is authenticated.","login(credentials): Takes the users credentials and handles the login process.","logout(): Handles the logout process.","getUsername(): Returns the username of the currently logged in user.","execIfAuthed(func): Takes a function and tries to execute it. If func fails this method should try to refresh the authentication and try to execute the passed function again. After that this method has to return a JavaScript Promise. The purpose of this method is to ensure that fetches do not fail because of an expired session.","Finally you have to wrap the GlobalDataLayer and all other components inside your authentication provider (for example in the render method of your App.tsx) (as shown in the beginning of this documentation)."]}),e.jsx(i,{children:"AuthenticationViews"}),e.jsxs(t,{children:["As mentioned the framework provides two authentication views. One is AWSAuthenticationView, which should be used in combination with",e.jsx("em",{children:"AWSAuthenticationProvider"}),". Furthermore, there is the",e.jsx("em",{children:"BasicAuthenticationView"}),"component which should be used in combination with",e.jsx("em",{children:"DummyAuthenticationProvider"}),". The BasicAuthenticationView is the default authentication view. The authentication views provided by the framework can be customized through the authOptions Interface in the framework (see chapter 5 UILayer)."]}),e.jsxs(t,{children:["In order to change the authentication view you have to pass it to the",e.jsx("em",{children:"UILayer"})," component using the ",e.jsx("em",{children:"authenticationView"}),"property. You are also able to develop custom authentication views and pass it to UILayer using this property."]}),e.jsx(t,{children:"Hint: The process of implementing a custom authentication view is content of the video tutorials."}),e.jsx(t,{children:"The following code snippet shows an example for the implementation of an authentication view. It should subscribe to the AuthContext react context in order to be able to trigger methods like the login method."}),e.jsx(o,{language:"typescript",children:`import React, { Component, FormEvent } from "react";
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

BasicLoginView.contextType = AuthContext;`})]}),w=()=>e.jsxs(s,{children:[e.jsx(a,{children:"UILayer: Navigation and Content Area Elements"}),e.jsx(n,{children:"Introduction"}),e.jsx(t,{children:"The UILayer provides the UI components and some basic logic for the application. The UILayer has the following properties, some of them are explained later on:"}),e.jsx(o,{title:"Interface UILayer",language:"typescript",children:`export interface Props {
    tabAndContentWrappers: TabAndContentWrapper[]; // Mandatory: Array of BasicContentWrappers and groups (or other wrappers) to provide in order to render tabs in the navigation bar and the associated component. This is explained in the following sections.
    startingPoint: string; // Mandatory: This is the "entry URL" of your application. The user will be redirected to this URL after successful authentication.
    settingsMenuOptions?: SettingsMenuOptions; // Optional object to configure the settings menu. The object will be explained later in this chapter.
    userMenuOptions?: // Optional object to configure the user menu. The object will be explained later in this chapter.
    authenticationView?: React.ComponentType<AuthenticationViewProps & any>; // Optional property to set a custom authentication view.
    documentsComponent?: React.ComponentType<any>; // Optional property to replace the default imprint with a custom component. This allows you to display a customized list of legal documents.
    headerOptions?: HeaderOptions; // Optional property to customize the header of the main view and the authentication view. The object will be explained later in this chapter.
    authOptions?: AuthOptions;  // Optional property to customize the authentication view. The object will be explained later in this chapter.
    documentsLabelKey?: string; // Optional parameter to replace the text for the legal documents which is shown when hovering over the info icon inside the authentication view and at the bottom of the navigation bar. You have to pass a string which is the key of corresponding translations in your translation files.
    hideLegalDocuments?: boolean; // Option to hide the link for the legal documents. This could be of use if you develop a desktop application like electron.
    navbarOptions?: NavbarOptions; // Option to configure the navigation bar. This is explained later.
    disableCookieBanner?: boolean; // Option to disable / hide the provided cookie banner / disclaimer.
    disableLogin?: boolean; // Option to disable the login and logout.
}`}),e.jsx(n,{children:"TabAndContentWrappers: Navigation tabs and content"}),e.jsx(t,{children:"A core feature of the framework is the navigation bar and the automatic rendering of content when a navigation tab is selected."}),e.jsx(t,{children:"The framework provides two tab components which can be rendered in the navigation bar. However, you are able to implement custom navigation tabs. All navigation tabs have to have the properties of the following interface:"}),e.jsx(o,{language:"typescript",children:`export interface NavbarTabProps<OptionType> {
    name: string | ((t: TranslateFunctionType) => string);
    disabled: boolean;
    frameworkInjectedOptions: OptionType; // These are options which are injected to a navigation tab component by the framework. You will understand how to use it by reading the following content of this section.
    hidden?: boolean; // Option to hide the navigation tab.
    icon?: ReactElement;
    collapsed?: boolean;
    active?: boolean;
}`}),e.jsx(t,{children:"The main navigation tab component provided by the framework is SimpleNavbarTab. This is the simplest and most used navigation tab component. It's properties are just the navbarTabProps interface. The second navigation tab component is the PrivilegedNavbarTab component. This component allows acces if the user belongs to the passed array of groups. The user's group is retrieved using the authentication provider. PrivilegedNavbarTab has the properties of navbarTabprops and extends them by the following interface:"}),e.jsx(o,{language:"typescript",children:`interface Props {
    permittedGroups: string[]; // Mandatory array of groups which should have access to the content associated with this navigation tab.
}`}),e.jsx(i,{children:"Implementing custom navigation tabs"}),e.jsx(t,{children:"To implement custom navigation tabs you should follow the structure of the following code snippet:"}),e.jsx(o,{title:"PrivilegedNavbarTab",language:"typescript",children:`// Properties which should be added to the properties of the  navbarTabProps interface.
export interface Props {
    permittedGroups: string[];
}

export const PrivilegedNavbarTab: GroupableNavbarTab<Props> = (props) => {
    const authContext = useContext(AuthContext);
    const permitted = containsOneOrMoreGroups(
        authContext?.getUserGroups(),
        props.permittedGroups
    );
    return permitted ? (
        <SimpleNavbarTab
            icon={props.icon}
            disabled={props.disabled}
            name={props.name}
            frameworkInjectedOptions={props.frameworkInjectedOptions}
         />
    ) : (
        <></>
    );
};`}),e.jsx(t,{children:"As you may have noticed PrivilegedNavbarTab is of type GroupableNavbarTab<Props>. The result of this is that PrivilegedNavbarTab has all the properties of the interface NavbarTabProps and additionally all properties of the interface Props. This is because the navbarTab type is defined as follows:"}),e.jsx(o,{title:"navbarTab interface",language:"typescript",children:`export type GroupableNavbarTab<additional = {}> = React.FunctionComponent<
    NavbarTabProps<InjectedOptionsGroupableByWrapperToTab> & additional
 >;`}),e.jsxs(t,{children:["Furthermore, you may have noticed that the SimpleNavbarTab component is reused and ",e.jsx("em",{children:"frameworkInjectedOptions"})," is passed to the component. If you implement your component in this way there is nothing more you have to do regarding ",e.jsx("em",{children:"frameworkInjectedOptions"}),". However, if you want to implement your component without using SimpleNavbarTab you should do research on the use of ",e.jsx("em",{children:"frameworkInjectedOptions"})," in SimpleNavbarTab. Additionally you will have to implement a factory for your navigation tab component. You will understand why in the following section. To implement such a factory you can examine the ones provided by the Framework."]}),e.jsx(i,{children:"Using navigation tab components"}),e.jsx(t,{children:"You've learned how to use existing navigation tabs and how to develop custom ones. But how do you pass navigation tabs to the framework and connect them to a specific component for the content area which should be rendered if the tab is selected?"}),e.jsxs(t,{children:["For this purpose the framework provides the wrapper class",e.jsx("em",{children:"BasicContentWrapper"}),". It wrapps a factory for the element which is rendered in the navigation bar (the navigation tab) and the component which is rendered in the content area. By wrapping these two elements inside an instance of BasicContentWrapper the framework is able to assign each navigation tab to a content area element. In order to specify all your navigation tabs and the corresponding content area elements you have to",e.jsx("strong",{children:"create an array of instances of this BasicContentWrapper"}),". The class has the following parameters:"]}),e.jsx(o,{title:"BasicContentWrapper",language:"typescript",children:`constructor(
    protected _path: string,                                            // URL for which the content area element will be rendered -> dont use "/" as route!
    protected _navbarTab: ComponentTypeMinProps<
        InjectedOptionsObject<InjectedOptionsGroupableByWrapperToTab>
    >,                                                                   // Component of the navigation tab (you will have to generate it as shown later by using a factory).
    protected _component: React.ComponentType                           // The element which will be rendered inside the content area.
)`}),e.jsxs(t,{children:["Furthermore, the framework provides the ",e.jsx("em",{children:"Group"})," wrapper class. This class allows you to specify groups of navigation tabs with a specified label. To create a group you have to pass the corresponding array of BasicContentWrapper instances to the Group instance as a parameter. The Group class has the following parameters:"]}),e.jsx(o,{title:"GroupObject constructor",language:"typescript",children:`constructor(
    private _name: string | ((t: TranslateFunctionType) => string), // Mandatory property that defines the name of the tab.
    private _logo: ReactElement, // Property to set the icon. Ensure to fit the requirements described below.
    private _collapsible: boolean, // Property that defines if the group should be collapsible.
    private _contentWrappers: TabAndContentWrapper[] // Array which contains all BasicContentWrapper instances which are part of the group.
)`}),e.jsx(t,{children:"As you may have noticed the name attribute can be of type string or a function which takes a translation function and returns a string. The purpose of this is to let you translate group names as easy as possible. The following code snippet contains an example of this."}),e.jsx(t,{children:'Furthermore, you have to use svgs as icons so that the dark mode works. The "fill" property within the svg should be set to "current". The color of the svg will be set programatically.'}),e.jsx(t,{children:"The following code snippet shows an example for defining navigation tabs, a group and the corresponding content:"}),e.jsx(o,{title:"Example Navbartab Array",language:"typescript",children:`import { ReactComponent as InfoIcon } from './assets/infoIcon.svg'; // Import .svg icons as React Components -> For issues in combination with vite see the FAQ section

const views = [
    new BasicContentWrapper(
        "/example1/",
    // Pass a SimpleNavbarTab, PrivilegedNavbarTab or a custom NavbarTab element.
        simpleNavbarTabFactory({
            disabled: false,
            name: "Example without Translation"
        }),
        ExampleComponent1 // This component of your own will be rendered if the corresponding navigation tab is selected.
    ),

    new Group(
        (t: TranslateFunctionType) => t('Test_group_not_collapsible'),
        <InfoIcon />,
        false,
        [
            new BasicContentWrapper(
                "/group-example1/",
                simpleNavbarTabFactory({
                    name: (t: TranslateFunctionType) => t("example_component"),
                    disabled: false,
                    icon: <InfoIcon />
                }),
                ExampleComponent2
            )
        ]
    ),
];`}),e.jsx(t,{children:"You may have noticed the use of factories. The framework provides two factories: One for SimpleNavbarTab, one for PrivilegedNavbarTab. These are simpleNavbarTabFactory and privilegedNavbarTabFactory. You have to pass them the properties which will be passed to the navigation tab component (for example SimpleNavbarTab) itself."}),e.jsx(i,{children:"Icons"}),e.jsx(t,{children:'Please make sure that the .svg icons fit the following structure. The colors of the .svg icons are set programmatically from the framework. Because of this the property "fill", which represents the color has to be set to the value "current". The width and height of the icons should be set to 24px. The following code snippet shows an example svg element.'}),e.jsxs(t,{children:[e.jsx("strong",{children:"hint1:"}),' We recommend to use the UI/UX Tool Figma for Prototyping. Figma offers the functionality to export icons. The framework supports the exported figma icons after the setting of the "current" value in svg files.']}),e.jsxs(t,{children:[e.jsx("strong",{children:"hint2:"})," If you encounter issues to import SVGs as ReactComponents while using vite, see the FAQ section."]}),e.jsx(o,{title:"*Examplefile of an .svg",language:"typescript",children:`<svg id="info-icon" fill="current" data-name="info-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <rect id="Rechteck_308" data-name="Rechteck 308" width="24" height="24" fill="none"/>
    <path id="info_FILL0_wght300_GRAD0_opsz24" d="M11.25,16.75h1.5V11h-1.5ZM12,9.3a.757.757,0,0,0,.575-.238.82.82,0,0,0,.225-.587.792.792,0,0,0-.225-.563.816.816,0,0,0-1.15,0,.792.792,0,0,0-.225.563.82.82,0,0,0,.225.587A.757.757,0,0,0,12,9.3Zm0,12.2a9.263,9.263,0,0,1-3.712-.75A9.432,9.432,0,0,1,3.25,15.712a9.563,9.563,0,0,1,0-7.425A9.435,9.435,0,0,1,8.288,3.25a9.563,9.563,0,0,1,7.425,0A9.437,9.437,0,0,1,20.75,8.287a9.563,9.563,0,0,1,0,7.425,9.435,9.435,0,0,1-5.037,5.038A9.27,9.27,0,0,1,12,21.5ZM12,20a7.721,7.721,0,0,0,5.675-2.325A7.721,7.721,0,0,0,20,12a7.721,7.721,0,0,0-2.325-5.675A7.721,7.721,0,0,0,12,4,7.721,7.721,0,0,0,6.325,6.325,7.721,7.721,0,0,0,4,12a7.721,7.721,0,0,0,2.325,5.675A7.721,7.721,0,0,0,12,20ZM12,12Z" transform="translate(-0.5 0.5)" fill="current"/>
</svg>`}),e.jsx(n,{children:"Interfaces"}),e.jsx(i,{children:"SettingsMenuOptions: How to configure the settings menu?"}),e.jsx(t,{children:"These options (property of the UILayer component) allow you to configure the settings menu."}),e.jsx(o,{title:"SettingsMenuOptions",language:"typescript",children:`interface SettingsMenuOptions {
    additionalItems?: MenuItem[]; // Additional menu items (defined as desribed in the PrimeReact menu documentation) to be rendered inside the settings menu.
    hideLanguageSelection?: boolean; // Option to hide the selection of languages.
    hideColorThemeToggler?: boolean; // Option to hide the toggle component for changing the theme (light and dark mode).
}`}),e.jsx(i,{children:"UserMenuOptions: How to configure the user menu?"}),e.jsx(o,{language:"typescript",children:`export interface UserMenuOptions {
    hideLogoutButton?: boolean; // Option to hide the logout button.
    additionalItems?: MenuItem[]; // Additional user menu items (defined as desribed in the PrimeReact menu documentation) to be rendered inside the settings menu.
}`}),e.jsx(i,{children:"HeaderOptions: How to configure the header?"}),e.jsx(t,{children:"These options (property of the UILayer component) allow you to configure the header of the main view. Note, that since Version 12.0.2 there is no default IAV-Company-Logo set, due to legal requirements, as the IAV Frontend Framework will be Open Source."}),e.jsx(o,{title:"Interface HeaderOptions",language:"typescript",children:`interface HeaderOptions {
    reactElementRight?: ReactElement; // Using this option you can set a custom react element with your logo (200x56 pixels).
    reactElementLeft?: ReactElement;// Using this option you can set a custom react element with your logo (420x56 pixels).
    hideLeft?: boolean; // Using this option you can hide the left application logo.
    hideRight?: boolean; // Using this option you can hide the right company logo.
    hideUserIcon?: boolean; // Using this option you can hide the user icon inside the header.
    headerElements?: ReactElement[]; // User can add their own elements to the header
}`}),e.jsxs(t,{children:["If the user wants to add their own elements in the header, they can either use their own React elements or fall back on the",e.jsx("strong",{children:"HeaderMenuElement"})," for a menu or",e.jsx("strong",{children:"HeaderPanelElement"})," for an overlay panel provided by the IAV Frontend Framework."]}),e.jsx(i,{children:"AuthOptions: How to configure the authentication view?"}),e.jsx(t,{children:"These options (property of the UILayer component) allow you to configure the authentication view."}),e.jsx(o,{title:"Interface AuthOptions",language:"typescript",children:`interface AuthOptions {
    backgroundImage?: string; // Optional parameter to set the backgroundimag. Ensure to import images using ES6 syntax like this: import applogo from './assets/App-Logo.png';
    companyText?: string; // Optional parameter to set the company's name for the copyright at the front.  
    preventDarkmode?: boolean; // Optional parameter to hide the button for toggling between dark and light mode inside the authentication view.
}

export interface AuthenticationViewProps {
    authOptions?: {
        backgroundImage?: string;
        companyText?: string;
        documentsLabelKey?: string;
        preventDarkmode?: boolean;
    };
    headerOptions?: {
        reactElementLeft?: ReactElement;
        reactElementRight?: ReactElement;
        hideLeft?: boolean;
        hideRight?: boolean;
    };
    hideLanguageSelection?: boolean;
    hideLegalDocuments?: boolean;
}`}),e.jsx(i,{children:"NavbarOptions: How to configure the navigation bar?"}),e.jsx(o,{language:"typescript",children:`export interface NavbarOptions {
    staticCollapsedState?: StaticCollapsedState; // Option to disable the feature to collapse the navigation bar. By setting a value of the StaticCollapsedState you set the navigation bar into a static state in which it is either collapsed or unfolded.
}

enum StaticCollapsedState {
    Collapsed,
    Unfolded
}`})]}),v=()=>e.jsxs(s,{children:[e.jsx(a,{children:"Content Area"}),e.jsx(n,{children:"Style, Layout and embedding the Content Bar"}),e.jsx(t,{children:"As shown in UILayer you are free to pass every component for the content area. However, the framework provides three higher order components for your content area components. Their purposes are styling (ContentStyle), layout (ContentLayout) and embedding the content bar (ContentWithBar). If you use ContentLayout, ContentStyle will be applied automatically. If you use ContentWithBar, ContentLayout (and because of this also ContentStyle) will be applied."}),e.jsx(i,{children:"The ContentStyle component"}),e.jsx(t,{children:"The ContentStyle components adds the current background color and other styles to your content area component. This allows you to easily embed a frame (in light mode it is grey, as shown in some screenshots in this documentation) for your content area component. ContentStyle has the following properties:"}),e.jsx(o,{language:"language",children:`export interface ContentStyleProps {
    appliedStyles?: StylesArray<typeof ContentStyleStyles>;
}`}),e.jsx(t,{children:"This means that you are able to pass an array of predefined styles to the component which should be activated. The predefined styles are the following:"}),e.jsx(o,{language:"language",children:`export const ContentStyleStyles = {
    WRAPPER_FULL_WIDTH: "WRAPPER_FULL_WIDTH",
    WRAPPER_FULL_HEIGHT: "WRAPPER_FULL_HEIGHT",
    SPACING: "SPACING",
    SET_SPACING_COLOR: "SET_SPACING_COLOR",
};`}),e.jsx(t,{children:"The framework also exports templates. These are just predefined arrays of styles. These are the following:"}),e.jsx(h,{bulletType:"bullet",items:["DEFAULT: This template should be used for simple content areas (for example it sets a colored gap).","CONTENT_CELLS: This template should be used if you want to use the ContentCell component."]}),e.jsx(o,{title:"First Example",language:"typescript",children:`<ContentStyle
    appliedStyles={[ContentStyleStyles.FULL_WIDTH, ContentStyleStyles.SPACING, ContentStyleStyles.SET_SPACING_COLOR]}
/>`}),e.jsx(o,{title:"Second Example",language:"typescript",children:`<ContentStyle
    appliedStyles={ContentStyleTemplates.DEFAULT}
/>`}),e.jsx(i,{children:"The ContentLayout component"}),e.jsx(t,{children:"Using the ContentLayout component you are able to specify a content layout for your content area component. Furthermore, the ContentLayout component uses the ContentStyle component. To use ContentStyle with ContentLayout you have to pass an object containing the appliedStyles array to ContentLayout."}),e.jsx(o,{language:"typescript",children:`interface Props {
    contentStyle?: ContentStyleProps; // An object of the following format: {appliedStyles: [...]}
    layoutBehaviour?: LayoutBehaviour; // Option to specify the layout which is one option of the following enum.
}`}),e.jsx(t,{children:"The LayoutBehaviour enum is defined like this:"}),e.jsx(o,{language:"typescript",children:`export enum LayoutBehaviour {
    // Parent div of content will have no specific layout class
    NONE = "",
    // Parent div will be PrimeFlex grid
    GRID = "grid grid-nogutter",
    // Parent will be  PrimeFlex flexbox
    FLEX = "flex",
    // Parent will be  PrimeFlex flexbox column
    FLEX_COL = "flex flex-column",
}`}),e.jsx(t,{children:"The following code block shows an example of using ContentLayout:"}),e.jsx(o,{language:"typescript",children:`import { CellPaddings, ContentCell } from '@iavofficial/frontend-framework/contentCell';
import { ContentLayout, LayoutBehaviour } from '@iavofficial/frontend-framework/contentLayout';

export const ExampleComponent = () => {
  return (
    <ContentLayout layoutBehaviour={LayoutBehaviour.GRID} contentStyle={appliedStyles: ContentStyleTemplates.CONTENT_CELLS}>
      <ContentCell colWidth={12} paddings={CellPaddings.FULL}>
        <h1>
          Example component
        </h1>
      </ContentCell>
    </ContentLayout>
  );
};`}),e.jsx(t,{children:"The ContentCell component will be explained later on."}),e.jsx(i,{children:"The ContentWithBar component"}),e.jsx(t,{children:'This HOC can be used for implementing a content area component containing a Content Bar. To embed the Content Bar you just have to pass a wrapper array containing your components to the ContentWithBar component using it`s "contentWrappers" property. The ContentWithBar component will render the Content Bar and underneath it will render your content area UI which is the child of this component.'}),e.jsx(t,{children:"To define the tabs for the Content Bar and the corresponding components which will be shown inside the content area, you have to define a wrapper object array similarly to the array for the navigation bar. This time you have to create an array of instances of the class BasicContentbarWrapper or CustomContentbarWrapper. BasicContentbarWrapper renders the simplest and mainly used content tab. CustomContentbarWrapper allows you to define a custom component which will be rendered inside the content bar. The array is then passed to the Content component using the contentWrappers property."}),e.jsx(t,{children:"Furthermore, the framework will render buttons for sliding to the left and right inside the content bar. While the navigation bar isn't collapsed, this will happen if there are more than 5 elements inside the content bar. If the navigation bar is collapsed, the buttons will render if there are more than 6 elements in the content bar."}),e.jsx(t,{children:"ContentWithBar uses ContentLayout and ContentStyle. Because of this the functionality of these components will be added by default. The following code snippet shows the properties of the Content component."}),e.jsx(o,{title:"Interface Content",language:"typescript",children:`export interface Props {
    contentStyle?: ContentStyleProps; // An object of the following format: {appliedStyles: [...]} 
    layoutBehaviour?: LayoutBehaviour; // Option to specify the layout which is one option of the following enum.
    contentWrappers: BasicContentbarWrapper[] | CustomContentbarWrapper[]; // Array of elements to show inside the content bar.
    selectedId: string; // The id of the currently selected content area component.
    addable?: boolean; // This optional property defines if the add button will be rendered.
    jumpToEndOfBar?: boolean; // Determines if the content bar should set a newly created tab to active.
    onClickAddButton?: () => any; // Using this optional property you can pass a function that will be triggerd if the add button is clicked.
    onClickLeftSlideButton?: () => any; // Using this property you cann pass a function that will be triggerd if the slide left Button is clicked.
    onClickRightSlideButton?: () => any;// Using this property you can pass a function that will be triggerd if the slide right Button is clicked.
}`}),e.jsx(t,{children:"The following code snippet shows the attributes of the BasicContentbarWrapper class:"}),e.jsx(o,{title:"Constructor BasicContentbarWrapper",language:"typescript",children:`constructor({
    id: string, // Identifier of the tab element.
    displayName: string | TranslationFunction, // Display name of the tab element.
    onClick: (id: string) => any, // Function to set the id of the clicked element.
    contentAreaElement: React.ReactElement // Defines which custom component should be connected with the content bar tab element.
    onClose?: (id: string) => void, // Optional function to handle the deletion of a content tab / contentbar wrapper.
    closable?: boolean, // Property to define if a closing icon will be rendered.
}) {}`}),e.jsx(t,{children:"The following code snippet shows the attributes of the CustomContentbarWrapper class:"}),e.jsx(o,{title:"Constructor CustomContentbarWrapper",language:"typescript",children:`constructor({
  id: string, // Identifier of the tab element
  renderElement: ReactElement, // The custom tab element that should be rendered within the content bar.
  contentAreaElement: React.ReactElement // Defines which custom component should be rendered when selecting a content bar tab.
}) {}`}),e.jsx(t,{children:"The following code snippet shows an example for creating a component containing a content bar:"}),e.jsx(o,{title:"Example Content Component Implementation",language:"typescript",children:`export const ExampleComponent1 = () => {
  const [selectedId, setSelectedId] = useState<string>(WrapperIds.Test1);

  // Array containing wrapper objects to bind elements to corresponding contentbar tabs.
  let exampleArray = [
    new BasicContentbarWrapper({
      id: WrapperIds.Test1,
      displayName: (t: TranslateFunctionType) => t("component", { count: 1 }),
      closable: false,
      onClick: setSelectedId,
      contentAreaElement: (
        <ContentbarExample
          exampleText={"your_component simple usecase "}
          backgroundColor={GREEN}
          identifierNumber="1"
        />
      ),
    }),
    new BasicContentbarWrapper({
      id: WrapperIds.Test2,
      displayName: (t: TranslateFunctionType) => t("component", { count: 2 }),
      closable: false,
      onClick: setSelectedId,
      contentAreaElement: (
        <ContentbarExample
          exampleText="your_component simple usecase "
          backgroundColor={RED}
          identifierNumber="2"
        />
      ),
    }),
    new BasicContentbarWrapper({
      id: WrapperIds.Test3,
      displayName: (t: TranslateFunctionType) => t("component", { count: 3 }),
      onClick: setSelectedId,
      closable: false,
      contentAreaElement: (
        <ContentbarExample
          exampleText={"your_component simple usecase "}
          backgroundColor={YELLOW}
          identifierNumber="3"
        />
      ),
    }),
  ];

  return (
    <ContentWithBar
      contentWrappers={exampleArray}
      selectedId={selectedId}
      layoutBehaviour={LayoutBehaviour.GRID}
      contentStyle={ContentStyleTemplates.CONTENT_CELLS}
    />
  );
};`}),e.jsxs(t,{children:[e.jsx("strong",{children:"Hint:"})," see further integration with different use cases and React State Management hooks in the Example-Project and TemplateProject"]}),e.jsx(n,{children:"ContentCell"}),e.jsx(t,{children:"The framework provides a grid system to structure the content area. For this purpose the framework provides the ContentCell component. The component has to be embedded inside ContentLayout (or ContentWithBar as it uses ContentLayout) with your desired content area layout. The following code snippet shows it's properties."}),e.jsx(o,{title:"Interface ContentCell and CellPaddings ENUM",language:"typescript",children:`export enum CellPaddings {
  FULL,
  VERT_RIGHT,
  BOT_HOR,
  BOT_RIGHT,
  NONE,
}

export interface Props {
  colWidth?: number; // Set the column width between 1-12 based on PrimeFlex (spacing of PrimeReact).
  clearStyle?: boolean; // Clears the background color of the contentcell.
  paddings: CellPaddings; // Definition of the element's padding.
}`}),e.jsx(t,{children:"The following code snippet shows an example implementation of a content area using the grid system."}),e.jsxs(t,{children:[e.jsx("strong",{children:"Important hint:"})," This component has to be embedded inside ContentLayout (or ContentWithBar) with the layout set to GRID."]}),e.jsx(o,{title:"Example implementation with the ContentCell components",language:"typescript",children:`import { ContentCell } from '@iavofficial/frontend-framework/contentCell';
import React from 'react';

export interface Props {
  exampleText: string;
}

export const ContentbarExampleWithText = (props: Props) => {
  return (
    <>
      <div className={'col-8 grid grid-nogutter'}>// the classnames are importend from primereact - feel free use your own styling library instead
        <ContentCell colWidth={6} paddings={CellPaddings.FULL}>
          <span>First row left</span>
          <h2>{props.exampleText}</h2>
          <h3>Contentbar with default tabelements</h3>
          <div></div>
        </ContentCell>
        <ContentCell colWidth={6} paddings={CellPaddings.VERT_RIGHT}>
          <span>First row center</span>
        </ContentCell>
        <ContentCell paddings={CellPaddings.BOT_HOR}>
          <span>Second row left</span>
        </ContentCell>
        <ContentCell paddings={CellPaddings.BOT_RIGHT}>
          <span>Second row center left</span>
        </ContentCell>
        <ContentCell paddings={CellPaddings.BOT_RIGHT}>
          <span>Second row center</span>
        </ContentCell>
        <ContentCell paddings={CellPaddings.BOT_RIGHT}>
          <span>Second row center right</span>
        </ContentCell>
        <ContentCell paddings={CellPaddings.BOT_RIGHT}>
          <span>Second row right</span>
        </ContentCell>
        <ContentCell colWidth={12} paddings={CellPaddings.BOT_HOR}>
          <span>Third row</span>
        </ContentCell>
      </div>
      <ContentCell
        paddings={CellPaddings.VERT_RIGHT}
        colWidth={4}
        clearStyle={true}
      >
        <span>Right with cleared style</span>
      </ContentCell>
    </>
  );
};`}),e.jsx(t,{children:"The resulting content area looks like this:"}),e.jsx(l,{src:"assets/content-area/content-area.png",fromGhPages:!0})]}),C=()=>e.jsxs(s,{children:[e.jsx(a,{children:"Color Settings and Dark Mode"}),e.jsx(n,{children:"Introduction"}),e.jsxs(t,{children:["Color and theme (dark / light mode) information is stored and provided by the React context called ",e.jsx("strong",{children:"ColorSettings"}),"context. The ColorSettings context`s provider component is embedded inside the ColorProvider component. The ColorProvider itself is contained in GlobalDataLayer. Your interface to the ColorProvider component is the colorSettings property of the GlobalDataLayer component. This property will be explained later on."]}),e.jsx(t,{children:"Using these options you are able to set custom colors (especially for framework components). Furthermore, the ColorSettings context provides you the information whether the dark mode is activated. This allows you to implement a dark mode four your components."}),e.jsx(t,{children:"All colors are exported by the framework's constants file. The following code snippet shows you how to import these colors:"}),e.jsx(o,{title:"Example exported color",language:"typescript",children:'import {BLUE0} from "@iavofficial/frontend-framework/constants";'}),e.jsx(a,{children:"Overwrite default colors"}),e.jsx(n,{children:"CSS"}),e.jsx(t,{children:"Besides providing the colors as JS constants, all colors are defined as CSS constants within the root and can be used within the css files of the project. The following code snippet shows you how to use these colors inside css files:"}),e.jsx(o,{title:"Example exported css constants and variables definition",language:"typescript",children:`// Example for exported color by the framework:
:root {
   --blue-0: #001a54;
}

.your-class {
   color: var(--blue-0);
}`}),e.jsx(t,{children:"The framework provides CSS classes for styling your components. This is inspired by PrimeReact. The classes are defined in the globalColors.css file and globally exported. The following code snippet illustrates the structure of these classe's names."}),e.jsx(o,{title:"Global CSS colors",language:"typescript",children:`/* BACKGROUND CLASSES*/
.bg-white-1{ // because of name conflicts with primereact this name is an execption
  background-color: var(--white);
}

.bg-blue-0{
  background-color: var(--blue-0);
}

/* COLOR CLASSES*/
.color-white{
  color: var(--white);
}

.color-blue-0{
  color: var(--blue-0);
}`}),e.jsx(n,{children:"colorSettings property of GlobalDataLayer"}),e.jsx(t,{children:"Using the colorSettings property you can pass an object of the following structure:"}),e.jsx(o,{language:"typescript",children:`export interface ColorProviderProps {
    colorOptions?: ColorOptions; // Options to overwrite the default framework component's default colors.
    disableCustomColorsForLightMode?: boolean; // Option to disable your color settings for the light mode.
    disableCustomColorsForDarkMode?: boolean; // Option to disable your color settings for the dark mode.
}`}),e.jsx(t,{children:"If you want to overwrite the colors of framework components you can do so using GlobalDataLayer's colorSettings property. The colors should be defined in HEX representation. The following code snippet shows the options object to overwrite the default colors. The specific interfaces are listed later on."}),e.jsx(o,{title:"Interface colorObject",language:"typescript",children:`export interface ColorOptions {
    header?: HeaderColorOptions;
    navbar?: NavbarColorOptions;
    contentArea?: ContentAreaColorOptions;
    contentbar?: ContentbarColorOptions;
    contentCell?: ContentCellColorOptions;
    authenticationView?: AuthenticationViewColorOptions;
}`}),e.jsx(t,{children:"The following interfaces show that most settings are divided by the state of the corresponding element: default, hovering and active."}),e.jsx(i,{children:"Color options of the header"}),e.jsx(t,{children:"Using these options you can define the colors of the main view's header."}),e.jsx(o,{title:"Interface HeaderColorType",language:"typescript",children:`export interface HeaderColorOptions {
    backgroundColor?: string;
    settingsIconColor?: string;
    userIconColor?: string;
}`}),e.jsx(i,{children:"Color options of the navigation bar (including the navigation tabs)"}),e.jsx(t,{children:"Using these options you can define the colors of the main view's navigation bar."}),e.jsx(o,{title:"Interface NavbarColorType",language:"typescript",children:`export interface NavbarColorOptions {
    backgroundColor?: string;
    navbarCollapseArrowColor?: string;
    legalDocumentsIconColor?: string;
    scrollbarColor?: string;
    content?: TabColorOptionsOptional; // Color settings for the navigation tabs
}`}),e.jsx(o,{language:"typescript",children:`export interface TabColorOptionsOptional {
    insideActiveGroupColor?: string;
    default?: {
        tabBackgroundDefaultColor?: string;
        tabFontDefaultColor?: string;
        tabIconDefaultColor?: string;
        groupBackgroundDefaultColor?: string;
        groupFontDefaultColor?: string;
        groupIconDefaultColor?: string;
        groupArrowDefaultColor?: string;
    };
    hover?: {
        tabBackgroundHoverColor?: string;
        tabFontHoverColor?: string;
        tabIconHoverColor?: string;
        groupBackgroundHoverColor?: string;
        groupFontHoverColor?: string;
        groupIconHoverColor?: string;
        groupArrowHoverColor?: string;
    };
    active?: {
        tabBackgroundActiveColor?: string;
        tabFontActiveColor?: string;
        tabIconActiveColor?: string;
        groupBackgroundActiveColor?: string;
        groupFontActiveColor?: string;
        groupIconActiveColor?: string;
        groupArrowActiveColor?: string;
    };
}`}),e.jsx(i,{children:"Color options of the content area"}),e.jsx(t,{children:"Using these options you can set the colors of the content area:"}),e.jsx(o,{title:"ContentColorType",language:"typescript",children:`export interface ContentAreaColorOptions {
    backgroundColor?: string;
}`}),e.jsx(i,{children:"Color options of the content bar (including tabs)"}),e.jsx(t,{children:"Using these options you can set the colors of the tabs of the content bar:"}),e.jsx(o,{title:"ContentbarTabColorOptions",language:"typescript",children:`export interface ContentbarColorOptions {
    backgroundColor?: string;
    iconDefaultColor?: string;
    iconHoverColor?: string;
    buttonDefaultColor?: string;
    buttonHoverColor?: string;
    tabs?: ContentbarTabColorType; // Color settings of the tabs
}`}),e.jsx(o,{title:"ContentbarTabColorType",language:"typescript",children:`export interface ContentbarTabColorType {
    backgroundDefaultColor?: string;
    backgroundHoverColor?: string;
    backgroundActiveColor?: string;
    textDefaultColor?: string;
    textHoverColor?: string;
    textActiveColor?: string;
    iconDefaultColor?: string;
    iconHoverColor?: string;
    iconActiveColor?: string;
}`}),e.jsx(i,{children:"Color options for content cells"}),e.jsx(t,{children:"Using these options you can set the colors of content cells:"}),e.jsx(o,{language:"typescript",children:`export interface ContentCellColorOptions {
    backgroundColor?: string;
}`}),e.jsx(i,{children:"Color options for the authentication view"}),e.jsx(t,{children:"Using these options you can set the colors of the authentication view:"}),e.jsx(o,{title:"Interfaces ContentElements",language:"typescript",children:`export interface AuthenticationViewColorOptions {
    headerBackgroundColor?: string;
    loginButtonBackgroundColor?: string;
    loginButtonTextColor?: string;
    legalNoticeIconColor?: string;
    loginFormBackgroundColor?: string;
    fullScreenBackgroundColor?: string; // If fullscreenBackgroundcolor is defined, this color will replace the background image inside the authentication view.
    companyTextColor?: string;
    inputFieldDescriptionTextColor?: string;
    inputFieldBackgroundColor?: string;
    inputFieldTextColor?: string;
    passwortRequirementsTextColor?: string; // Defines the color of the text for the requirements to set a new password of the AWS authentication view.
    themeTogglerColor?: string;
}
export interface AuthenticationColorType {
    headerBackgroundColor?: string;
    loginButtonBackgroundColor?: string;
    loginButtonTextColor?: string;
    legalNoticeIconColor?: string;
    loginFormBackgroundColor?: string;
    fullScreenBackgroundColor?: string;
    companyTextColor?: string;
    inputFieldDescriptionTextColor?: string;
    inputFieldBackgroundColor?: string;
    inputFieldTextColor?: string;
    passwortRequirementsTextColor?: string; // Defines the color of the text for the requirements to set a new password of the AWS authentication view.
}`}),e.jsx(a,{children:"Other color options"}),e.jsx(t,{children:"To change the color of the PrimeReact components DropDown and ContextMenu you have to overwrite the following css variables:"}),e.jsx(o,{title:"CSS Properties",language:"css",children:`:root {
    --contextmenubgmaincolor: ... // Background color of the contextsubmenu (settingsmenu and loginmenu).
    --highlightcolor: ... // Background color of the contextsubmenu if hovered or selected (settingsmenu and loginmenu).
    --textAndIconMainColor: ... // Main text and icon color.
    --textAndIconHighlightColor: ... // Text and icon color if hovered or selected.
    --dropdownBg: ... // Background of the DropDown component.
    --dropdownBgHighlight: ... // Color of the texts highlighting if hovered of selected.
}`}),e.jsx(a,{children:"Example for using custom colors"}),e.jsx(t,{children:"Using these options you can for example create a view like the following."}),e.jsx(l,{src:"assets/color-settings/custom-coloring.png",fromGhPages:!0}),e.jsx(a,{children:"How to implement a dark mode in custom components"}),e.jsx(n,{children:"Implement dark mode using the ColorSettings context"}),e.jsx(t,{children:"If you want to implement a component including a dark mode you will have to know whether the dark mode is activated at first. You are able to get this information by reading the darkmode attribute of the ColorSettings context. The following code snippet shows an example:"}),e.jsx(o,{title:"Interfaces ContentElements",language:"typescript",children:`import React, { useContext } from 'react';
import { ColorSettingsContext } from 'disa-framework/colorSettingsContext';
import '@iavofficial/frontend-framework/globalColors.css';

export const ExampleComponent = () => {
    const colorSettingsContext = useContext(ColorSettingsContext);

    return (
        <div style={{ width: '100%' }}
            className={colorSettingsContext?.darkmode ? 'color-white bg-black' : 'color-black bg-white'}>
            ExampleComponent
        </div>
    );
};`}),e.jsx(t,{children:"However, deciding which colors should be used regarding the theme inside your components is a bad practice. Instead you should maintain the currently used colors in a central place like the framework does. Consult the framework implementation (especially the ColorProvider component) for further details."}),e.jsx(i,{children:"Implement dark mode using the color-theme html attribute"}),e.jsx(t,{children:'If the user activates the dark mode the "color-theme" html attribute will be set (at html body). This enables you to style your components for the light and dark mode using CSS attribute selectors like so:'}),e.jsx(o,{language:"typescript",children:`.example {
    background-color: white;
}

[color-theme="dark"] .example {
    background-color: black;
}`}),e.jsx(t,{children:'This CSS will set a white background for the class "example" if the color-theme is not "dark" (light mode is activated). If the color-theme is set to "dark" (dark mode is activated) it will set the background to black.'}),e.jsx(a,{children:"How to disable the dark mode"}),e.jsxs(t,{children:["To disable the dark mode use the ",e.jsx("em",{children:"hideColorThemeToggler"})," option inside ",e.jsx("em",{children:"settingsMenuOptions"}),"of the UILayer component. This will prevent the user from changing the theme."]})]}),j=()=>e.jsxs(s,{children:[e.jsx(a,{children:"Starting the Example Project"}),e.jsx(t,{children:"The framework's repository contains an example project which is used for development purposes and to present a basic example for framework usage. If you want to start the example project, first you have to clone the framework's repository."}),e.jsx(t,{children:"You can start the example project by executing the command inside the repository's root folder."}),e.jsx(o,{language:"bash",children:"npm run run-example"}),e.jsx(t,{children:"The example project does not use a pulled version of the framework. Instead it uses a locally build version of the framework. The mentioned command triggers a new build of the framework and starts the example project using this build. However, changes you make to the framework itself won't have any effect since the build is just executed once. If you want to play with the framework and see the consequences of your changes in the example project this page is of interest for you."})]}),T=()=>e.jsxs(s,{children:[e.jsx(n,{children:"Cloning the Repository"}),e.jsx(t,{children:"If you want to play with the framework and the contained example project, you have to clone the framework's Git repository first."}),e.jsx(n,{children:"The Example Project"}),e.jsx(t,{children:"As mentioned, the repository contains the framework and an example project. As the framework isn't a UI by itself, you cannot see the consequences of framework changes without a project using the framework. This is where the example project comes into use. The example project uses the locally built framework as a file dependency in order to visualize the consequences of framework changes."}),e.jsx(i,{children:"Setting Up and Running the Example Project"}),e.jsxs(t,{children:["To start the example project you have to execute npm run setup_and_build inside the root folder of the ",e.jsx("strong",{children:"repository"}),". This will setup the environment and start the development server at port 3000."]}),e.jsx(i,{children:"Making Real-Time Changes to the Framework"}),e.jsx(t,{children:"If you want to make changes to the framework and see the consequences of these changes in real time you have to execute the following steps by yourself"}),e.jsx(o,{language:"bash",children:"npm run dev"})]}),k=()=>e.jsxs(s,{children:[e.jsx(a,{children:"FAQ"}),e.jsx(t,{children:"This page lists common questions and problems and links corresponding issues."}),e.jsx(n,{children:"Problems using the SVG format as React Component with Vite"}),e.jsx(t,{children:"In a few scenarios, the framework requires the use of SVG Files (e.g., Icons). To be able to set the color of the SVG inside the Framework, the Icons must be imported as React Components."}),e.jsx(t,{children:"Use the following steps to solve issues regarding the SVG import as React Components:"}),e.jsxs(t,{children:['Install the vite-plugin-svgr with the command "npm i vite-plugin-svgr" and configure it as shown ',e.jsx(c,{label:"here",to:"https://www.npmjs.com/package/vite-plugin-svgr"}),". If this doesn’t help, further possible solutions can be found ",e.jsx(c,{to:"https://stackoverflow.com/questions/74720726/type-definition-for-vite-plugin-svgr",label:"here"}),"."]}),e.jsx(n,{children:"Can the IAV Frontend Framework be used with Angular?"}),e.jsx(t,{children:"No, the IAV Frontend Framework only supports React Components and is therefore only suitable for React-based projects."})]}),S=()=>e.jsxs(p,{children:[e.jsx(r,{path:"/overview",element:e.jsx(g,{})}),e.jsx(r,{path:"/information",element:e.jsx(f,{})}),e.jsx(r,{path:"/installation-guide",element:e.jsx(y,{})}),e.jsx(r,{path:"/interface",element:e.jsx(b,{})}),e.jsx(r,{path:"/globaldatalayer",element:e.jsx(x,{})}),e.jsx(r,{path:"/uilayer",element:e.jsx(w,{})}),e.jsx(r,{path:"/content-area",element:e.jsx(v,{})}),e.jsx(r,{path:"/color-settings-and-dark-mode",element:e.jsx(C,{})}),e.jsx(r,{path:"/example-project",element:e.jsx(j,{})}),e.jsx(r,{path:"/playground",element:e.jsx(T,{})}),e.jsx(r,{path:"/faq",element:e.jsx(k,{})}),e.jsx(r,{path:"/imprint",element:e.jsx(u,{})})]});export{S as default};
