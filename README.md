**Important note: Developers which enhance the framework or the example project should read the chapter *Important notes* on [this wiki page](https://gitlab.iavgroup.local/td-d/educationlab/disa-frontend-framework/disa-framework/-/wikis/Devnotes).**

# Requirements
- **You should install at least npm version 7.7.5 when using or enhancing the framework.**

# Disa Framework (how to use it)
This react framework was created to speed up development in the disa front-end environment. To use this framework follow these steps and read the wiki pages for further information. You maybe want to inspect examples. For this you can look up the example in the *example* folder of this project.

## Installation
To install this package you can either set the required key value pairs globally (recommended) or you can set the key value pairs in a .npmrc file in the root of your project. The key value pairs differ by whether you are using the **local** or the **external** GitLab. If you don't own a token for authentication you have to apply for it.

If you are using the **local GitLab** you should execute these commands to set the config globally:
>npm config --global set @disa:registry https://gitlab.iavgroup.local/api/v4/projects/9609/packages/npm/ \
>npm config --global set //gitlab.iavgroup.local/api/v4/projects/9609/packages/npm/:_authToken <YOUR_TOKEN>

Or if you want to use a project specific .npmrc file you have to set these lines in it:
>@disa:registry=https://gitlab.iavgroup.local/api/v4/projects/9609/packages/npm/ \
>'//gitlab.iavgroup.local/api/v4/projects/9609/packages/npm/:_authToken'="<YOUR_TOKEN>"

If you are using the **external** GitLab you should execute these commands to set the config globally:
>npm config --global set @disa:registry https://gitlab.iav.com/api/v4/projects/522/packages/npm/ \
>npm config --global set //gitlab.iav.com/api/v4/projects/522/packages/npm/:_authToken <YOUR_TOKEN>

Or if you want to use a project specific .npmrc file you have to set these lines:
>@disa:registry=https://gitlab.iav.com/api/v4/projects/522/packages/npm/ \
>'//gitlab.iav.com/api/v4/projects/522/packages/npm/:_authToken'="<YOUR_TOKEN>"

After configuration you are able to install the disa-framework package by using the following command:\
`npm install @disa/disa-framework`

Congratulations. You have installed the latest disa-framework package.

## Basics
### Subscribe to new updates
Every time a package with a new version is released a gitlab release will be created. To get an email if this happens you have to execute the following steps:\
Go to *Project overview* --> Click the drop down icon next to the notification bell --> Select *Custom* --> Close the drop down menu --> Click the bell --> Tick *New release* and hit the *OK* button

### TypeScript
This framework supports TypeScript although you can also use it with JavaScript.

It is recommended to use TypeScript. If you develop own implementations with framework given contexts you have to pass certain properties to the contexts's provider. If you forget to pass this properties the TypeScript compiler will remind you.

### Imports
This framework uses ES-6 import/export syntax. All exports are named exports. To import a module just type the name of the npm package and add the component you want to import. For example:
```javascript
import { UILayer } from "@td-d/disa-framework/uiLayer"
```

### Cookies
This framework adds a banner for cookies **by itself without any action of the developer**. Cookies have to be accepted for proper functionality. Without accepting the user can't use the web application. When accepting a **cookie with the expiration time of one year will be set** in order to save the decision. If this cookie is found, the cookie banner won't render again.\
The cookie banner component is **conditionally rendered by the *UILayer* component**. The code can be found in *src/lib/components/cookie/cookieBanner.tsx* Rendering of the cookie banner doesn't depend on whether the user is logged in or not.

### Layout
![Here should be a diagram describing the layout.](./doc/diagrams/layout.png?raw=true)

## Getting started
The main components of this framework are the *GlobalDataLayer* and *UILayer* component. To do the basic setup you have to render these components in the render method of your application. The Framework is seperated in two layers in order to allow the developer to use data of the framework's contexts which are included in the *GlobalDataLayer* component.\
An explanation for using these components:
```javascript
// If you don't want to use the default authentication provider, the authentication provider would be rendered here. Authentication providers will get explained later on.
  <GlobalDataLayer ...properties...>
    // Your contexts or other components which need data of the framework's contexts go here.
      <DisaPage ...properties.../>
  </GlobalDataLayer>
```
You will see that this frameworks provides a authentication system and the basic frame of a disa web application.\
The UILayer component has the properties:
1. tabAndContentWrappers: Array of BasicContentWrappers and groups (and other wrappers) to provide in order to render tabs in the navigation bar and the associated component.
2. startingPoint: The "entry URL" of your application. This doesn't mean the authentication page but the path the user will be redirected after successfull authentication.
3. menuOptions (optional): An object which contains two arrays to configure the settings menu:
- additionalItems (optional): An array of items which will be rendered in the settings menu. You can inspect the example project or the documentation of the [MenuModel API](https://primefaces.org/primereact/showcase/#/menumodel) for further information.
- options: An array of objects which represent options. Options are identified by their identifier attribute. You can find a list of all options [here](https://gitlab.iavgroup.local/td-d/educationlab/disa-frontend-framework/disa-framework/-/wikis/List-of-all-options-for-the-settings-menu).
4. authenticationView (optional): This attribute will get explained later.
5. documentsComponent: By using this property you are able to replace the default imprint with an own component. This allows you to display a customized list of legal documents.
6. documentsLabelKey: By using this property you are able to replace the "Imprint" text at the bottom of the navigation bar. You have to pass a string which is the key of corresponding translations in your translation files.
7. headerOptions (optional): Here is the possibility to customize the header section. If you dont use this possibility the default header will be shown. The default header is with the new IAV Logo on the right side and the DISA Logo on the left side with the lettering "Remote Service Monitor". In the objekt headerOptions there are 5 attributes that you can modify but they are not required. You can just set the attributes you need:   

```javascript
let headerOptions = {
     reactElementRight: ReactElement; // Here you can set any React element you want to set on the space 300px x 75px on the right sight (its recommended to use the company logo here)
        reactElementLeft: ReactElement; // Here you can set any React element you want to set on the space 271px x 75px on the left sight (its recommended to use the app logo here)
        letteringElementLeft: string; // here you can set a lettering you want to use with the default app logo (DISA) 
        hideLeft: boolean; // if you set this boolean to "true" you can hide or show the left React element (default the DISA logo with the Remote Service Monitor lettering)
        hideRight: boolean; // if you set this boolean to "true" you can hide or show the React element (default the new IAV Logo)
}

The GlobalDataLayer has the properties:
1. translations (optional): Translations for internationalization
2. initI18Next (optional): Custom function for initializing i18next. If the user hasn't accepted cookies, i18next will be initialized by the framework regardless whether this property is specified or not. In case the property is specified the function will be executed when the user accepts cookies.

### Implementing content views ###

Typically, content views in a DiSA app follow a grid design with a gray background and a content bar with further context information.
To speed up development the coarse structure is already handled with the Content and the optional ContentCell component.
The children of the Content component are inserted according to the configured layout behaviour. There are four options to configure:
1. `NONE` - children of the root element have no specific layout class
2. `GRID` - parent div is a prime react grid 12 column grid
3. `FLEX` - parent div is a flexbox
4. `FLEX_COL` - parent div is a column flexbox

The ContentCell component provides the white cell characteristics with the possibility to configure cell paddings and column width. It should be used inside a 12 column grid.

```javascript
<Content layoutBehaviour={LayoutBehaviour.GRID} contentElements={[...this.context.contentTabs]}>
    <ContentCell colWidth={3} paddings={CellPaddings.FULL}>
        <h1>This is a 3 wide cell with full paddings</h1>
    </ContentCell>
    <ContentCell colWidth={9} paddings={CellPaddings.VERT_RIGHT}>
        <h1>This is a 9 wide cell with vertical and right paddings</h1>
    </ContentCell>
</Content>
```

### Internationalization ###
The framework uses I18next for internationalization. It provides a default initialization of I18next which automatically gets executed when the *GlobalDataLayer* component mounts. It also provides translations in english and german for texts of framework components. To setup i18next with custom translations and the default implementation of the framework you have to create an object with the following structure and pass it to the *GlobalDataLayer* component.
```javascript
let translations = {
  es: {
    translation: importedJsonFileEs
  },
  pt: {
    translation: importedJsonFilePt
  }
}

...
render() {
  ...
  <GlobalDataLayer translations={translations} .../>
  ...
}
```
The .json file has to include simple key value pairs like this:
```javascript
{
  "option_name": "German",
  "greeting": "hello",
  "promote_programming": "Programming is fun!"
}
```
The key *option_name* is mandatory. The corresponding value will be listed in the language selection menu. You can find the translation keys used by the framework [here](https://gitlab.iavgroup.local/td-d/educationlab/disa-frontend-framework/disa-framework/-/wikis/Internationalization-keys-used-by-the-framework). (You will need these to internationalize certain framework components like error messages of the *AWSAuthenticationView*.)

To specify dialects like the german dialect in Switzerland follow the following schema for keys (underscore is important):
>Key for german: "de"\
>Key for the german dialect in Switzerland: "de_CH"

To get a translation by it's key you should use the *useTranslator* hook from *...disa-framework/translators*. This hook returns a function which generates the translation.\
An example:
```javascript
const t = useTranslator();
const exampleTranslation = <div>Example translation: {t("Imprint")}</div>;
```
You can also use a HOC (higher order component) for class components like this:
```javascript
class FirstExampleComponentUnprocessed extends Component<AppliedTranslationProps, State> {
  // ...
  render() {
    return(
      <div>Translation: {t("Imprint")}</div>
    );
  }
}

export const LayoutAndContextExampleComponent = applyTranslation(FirstExampleComponentUnprocessed);
```
By using the *applyTranslation* hook the framework injects the translation function *t*. You may have seen that the component has the interface *AppliedTranslationProps* as it's properties type. This interfaces is provided by the framework. It's mandatory to use this interface in order to ensure that your components takes *t*.

If you want to initialize i18next your own way (for example to specify an interpolation function) you can define an initialization function and pass it to the *GlobalDataLayer* component by using the *initI18Next* property. If the user hasn't accepted cookies, i18next will be initialized by the framework regardless whether this property is specified or not. In case the *initI18Next* property is specified the function will be executed when the user accepts cookies.\
An example:
```javascript
const initFunction = () => {
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
}
```

You can find more information about I18next [here](https://react.i18next.com/).

### How to specify navigation tabs
To let the developer specify navigation tabs the class BasicContentWrapper is exported as a module. It encapsulates the element which is rendered in the navigation bar and the component which is rendered in the content section. In order to specify navigation tabs the developer has to **create an array of instances of this class**. The developer is also able to create instances of the class *Group*. This class let's the developer specify groups of navigation tabs with a specified label. The array has to be passed to the UILayer's *tabAndContentWrappers* property. A special property is the *name* property. In order to make internationalization possible you can pass a function besides defining a simple string. This function takes a translation function which can be used to get a translation. You are also able to define two booleans which allow you to define whether the UI element for the group is collapsible and whether the group should be collapsed at the beginning.\
An example:

```javascript
let wrappers = [
    new BasicContentWrapper(<SimpleNavbarTab name={"Example without Translation"} to="/" disabled={false}
                                             selectedIcon={navDashboardSelected}
                                             deselectedIcon={navDashboardDeselected}/>, LayoutAndContextExampleComponent),
    new BasicContentWrapper(<SimpleNavbarTab name={(t: TranslateFunctionType) => t("example_component", {count: 2})}
                                             to="/example2" disabled={false} selectedIcon={navFleetSelected}
                                             deselectedIcon={navFleetDeselected}/>, SecondExampleComponent),
    new Group(
        "Test Gruppe", otaLogo, true, false,
        [
            new BasicContentWrapper(<SimpleNavbarTab
                name={(t: TranslateFunctionType) => t("example_component", {count: 2})} to="/group-example1"
                disabled={false} selectedIcon={navFleetSelected}
                deselectedIcon={navFleetDeselected}/>, SecondExampleComponent),
            new BasicContentWrapper(<SimpleNavbarTab
                name={(t: TranslateFunctionType) => t("example_component", {count: 2})} to="/group-example2"
                disabled={true} selectedIcon={navFleetDetailSelected}
                deselectedIcon={navFleetDetailDeselected}/>, FourthExampleComponent)
        ]
    ),
    new BasicContentWrapper(<PrivilegedNavbarTab name={(t: TranslateFunctionType) => t("example_component", {count: 2})}
                                                 to="/example4" disabled={true} selectedIcon={navExpertSelected}
                                                 deselectedIcon={navExpertDeselected}
                                                 permittedGroups={["ADMIN"]}/>, FourthExampleComponent)
];
```
You can find a detailed explanation of the attributes [here](https://gitlab.iavgroup.local/td-d/educationlab/disa-frontend-framework/disa-framework/-/wikis/BasicContentWrappers-and-Groups-in-Detail).

As you can see there are two types of navigation tabs. However you are free to implement your own. Further information can be found [here](https://gitlab.iavgroup.local/td-d/educationlab/disa-frontend-framework/disa-framework/-/wikis/How-to-implement-a-navigation-component).

#### Some notes for implementing a component bound to a BasicContentWrapper
The component should have the Content component as the root component in its render method. This component renders the so called *content bar* in the content section. You can pass an array of elements for the content bar using the content's component contentElements property.\
Example:
```javascript
<Content contentElements={[...this.context.contentTabs, ...this.state.contentTabs]}>
     <div>Example data <b>global</b> context: {this.context.exampleData}</div>
</Content>
```
A detailed explanation can be found [here](https://gitlab.iavgroup.local/td-d/educationlab/disa-frontend-framework/disa-framework/-/wikis/How-to-create-a-component-bound-to-a-BasicContentWrapper). (It is recommended to read this section.)

### Authentication system
The authentication system is seperated into two parts: The so called AuthenticationProvider and the AuthenticationView. The AuthenticationProvider is the component which handles authentication (login, logout, ...). The AuthenticationView is just the view shown to a user when logging in. Because the authentication provider and the view are seperated it's possible to mix authentication providers and views.

The disa framework already provides two authentication provider. These are the AWSAuthenticationProvider and the DummyAuthenticationProvider. The AWSAuthenticationProvider uses Amplify and is able to handle authentication with AWS. To use this authentication provider you have to use Amplify and configure it. For configuration you have to define a configuration function and pass it to the *AWSAuthenticationProvider* (further information [here](https://gitlab.iavgroup.local/td-d/educationlab/disa-frontend-framework/disa-framework/-/wikis/%5BExample-(TypeScript)%5D-Configuring-Amplify)). The *AWSAuthenticationProvider* then has to wrap the *GlobalDataLayer* component inside your render method (as shown in *Getting started*). The *GlobalDataLayer* component detects that the authentication provider context has been initialized and will skip the default process. The DummyAuthenticationProvider provider is the default authentication provider (which will get used if nothing is specified) and authenticates every combination of email and password. This authentication provider is intended to be used while developing. You are able to pass additional values and functions as an object of key value pairs (for example { getUserGroups: () => [] }) to the DummyAuthenticationProvider by using the property *additionalContextValues*. These values and functions will be shared using the context *auth*.

There are also two authentiation views provided. One is the AWSAuthenticationView which should be used with the AWSAuthenticationProvider. There is also the BasicAuthenticationView component which can be used in combination with the DummyAuthenticationProvider. The BasicAuthenticationView is the DefaultAuthenticationView.

In order to specify the authentication provider and the authentication view you can pass it to the *UILayer* component using the *authenticationView* property.

It is also possible to implement own authentication providers and authentication views and pass it to the UILayer component. Further information about implementing a custom authentication provider can be found [here](https://gitlab.iavgroup.local/td-d/educationlab/disa-frontend-framework/disa-framework/-/wikis/How-to-implement-a-login-provider). Further information about implementing a custom authentication view can be found [here](https://gitlab.iavgroup.local/td-d/educationlab/disa-frontend-framework/disa-framework/-/wikis/How-to-implement-a-login-view).

### Piecing everything together ###
To render your components and to do configuration you can follow the structure of this code snippet. This could be returned inside the body of the render method of your App.tsx.
```javascript
const optionalInitFunction = () => {
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
}

render() {
  return (
    <AWSAuthenticationProvider apiRoot={config.API_Root}>
      <GlobalDataLayer translations={...} initI18Next={optionalInitFunction}>
        <FirstExampleContextComponent>
          <SecondExampleContextComponent>
            <UILayer tabAndContentWrappers={wrappers} startingPoint="/" authenticationView={AWSAuthenticationView} />
          </SecondExampleContextComponent>
        </FirstExampleContextComponent>
      </GlobalDataLayer>
    </AWSAuthenticationProvider>
  );
}
```

### Ensure a valid authentication when accessing protected resources
To access protected resources you have to ensure that the user is currently authenticated. For this purpose every authentication provider has to implement the fetchAuthed method. This function takes an url as a mandatory parameter and a settings object as an optional parameter. These parameters are used for a call of the fetch method. It returns a Promise which contains the response. The AWSAuthenticationProvider tries to refresh the access token if the response status is 401.\
The AWSAuthenticationProvider also adds the "Authorization" header to the request, containing the JWT token. If you want to override this header just specify the "Authorization" header in the headers attribute of your settings object.