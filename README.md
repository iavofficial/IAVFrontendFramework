**Important note: Developers which enhance the framework or the example project should read the chapter *Important notes* on [this wiki page](https://gitlab.iavgroup.local/td-d/educationlab/disa-frontend-framework/disa-framework/-/wikis/Devnotes).**

# Disa Framework (how to use it)
This react framework was created to speed up development in the disa front-end environment. To use this framework follow these steps and read the wiki pages for further information. You maybe want to inspect examples. For this you can look up the example in the *example* folder of this project.

## Installation
To install this package add a .npmrc file to your project. The content of this file depends on which GitLab you are using.

If you are using the **local GitLab** the .npmrc file the file should contain:

>@td-d:registry=https://gitlab.iavgroup.local/api/v4/projects/9609/packages/npm/

>'//gitlab.iavgroup.local/api/v4/projects/9609/packages/npm/:_authToken'="W85cyca3cPZUx9kf9WwZ"

If you are using the **external** GitLab the .npmrc file the file should contain:

>@td-d:registry=https://gitlab.iav.com/api/v4/projects/522/packages/npm/

>'//gitlab.iav.com/api/v4/projects/522/packages/npm/:_authToken'="Krqg94VSYzky3qmYiwH7"

After adding this file you are able to install the disa-framework package by using following command:\

If you are using the **local** GitLab:
`npm install @td-d/disa-framework`

If you are using the **external** GitLab:
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
// If you don't want to use the default login provider, the login provider would be rendered here. Login providers will get explained later on.
  <GlobalDataLayer ...properties...>
    // Your contexts or other components which need data of the framework's contexts go here.
      <DisaPage ...properties.../>
  </GlobalDataLayer>
```
You will see that this frameworks provides a login system and the basic frame of a disa web application.\
The UILayer component has the properties:
1. tabAndContentWrappers: Array of views and groups (and other wrappers) to provide in order to render tabs in the navigation bar and the associated component.
2. startingPoint: The "entry URL" of your application. This doesn't mean the login page but the path the user will be redirected after successfull authentication.
3. loginView (optional): This attribute will get explained later.

The GlobalDataLayer has the properties:
1. translations (optional): Translations for internationalization
2. initI18Next (optional): Custom function for initializing i18next. If the user hasn't accepted cookies, i18next will be initialized by the framework regardless whether this property is specified or not. In case the property is specified the function will be executed when the user accepts cookies.

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
The key *option_name* is mandatory. The corresponding value will be listed in the language selection menu. You can find the translation keys used by the framework [here](https://gitlab.iavgroup.local/td-d/educationlab/disa-frontend-framework/disa-framework/-/wikis/Internationalization-keys-used-by-the-framework). (You will need these to internationalize certain framework components like error messages of the *AWSLoginView*.)

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
      <div>Translation: {t("imprint")}</div>
    );
  }
}

export const FirstExampleComponent = applyTranslation(FirstExampleComponentUnprocessed);
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
To let the developer specify navigation tabs the class View is exported as a module. It encapsulates the element which is rendered in the navigation bar and the component which is rendered in the content section. In order to specify navigation tabs the developer has to **create an array of instances of this class**. The developer is also able to create instances of the class *Group*. This class let's the developer specify groups of navigation tabs with a specified label. The array has to be passed to the UILayer's *views* property. A special property is the *name* property. In order to make internationalization possible you can pass a function besides defining a simple string. This function takes a translation function which can be used to get a translation.\
An example:
```javascript
let views = [
    new View(<SimpleNavbarTab name={"Example without Translation"} to="/" disabled={false} selectedIcon={navDashboardSelected}
      deselectedIcon={navDashboardDeselected} />, FirstExampleComponent),
    new View(<SimpleNavbarTab name={(t: TranslateFunctionType) => t("example_component", { count: 2 })} to="/example2" disabled={false} selectedIcon={navFleetSelected}
      deselectedIcon={navFleetDeselected} />, SecondExampleComponent),
    new Group(
      "Test Gruppe", otaLogo,
      [
        new View(<SimpleNavbarTab name={(t: TranslateFunctionType) => t("example_component", { count: 2 })} to="/group-example1" disabled={false} selectedIcon={navFleetSelected}
          deselectedIcon={navFleetDeselected} />, SecondExampleComponent),
        new View(<SimpleNavbarTab name={(t: TranslateFunctionType) => t("example_component", { count: 2 })} to="/group-example2" disabled={true} selectedIcon={navFleetDetailSelected}
          deselectedIcon={navFleetDetailDeselected} />, FourthExampleComponent)
      ]
    ),
    new View(<PrivilegedNavbarTab name={(t: TranslateFunctionType) => t("example_component", { count: 2 })} to="/example4" disabled={true} selectedIcon={navExpertSelected}
      deselectedIcon={navExpertDeselected} permittedGroups={["ADMIN"]} />, FourthExampleComponent)
];
```
You can find a detailed explanation of the attributes [here](https://gitlab.iavgroup.local/td-d/educationlab/disa-frontend-framework/disa-framework/-/wikis/Views-and-Groups-in-Detail).

As you can see there are two types of navigation tabs. However you are free to implement your own. Further information can be found [here](https://gitlab.iavgroup.local/td-d/educationlab/disa-frontend-framework/disa-framework/-/wikis/How-to-implement-a-navigation-component).

#### Some notes for implementing a component bound to a view
The component should have the Content component as the root component in its render method. This component renders the so called *content bar* in the content section. You can pass an array of elements for the content bar using the content's component contentElements property.\
Example:
```javascript
<Content contentElements={[...this.context.contentTabs, ...this.state.contentTabs]}>
     <div>Example data <b>global</b> context: {this.context.exampleData}</div>
</Content>
```
A detailed explanation can be found [here](https://gitlab.iavgroup.local/td-d/educationlab/disa-frontend-framework/disa-framework/-/wikis/How-to-create-a-component-bound-to-a-view). (It is recommended to read this section.)

### Login system
The login system is seperated into two parts: The so called LoginProvider and the LoginView. The LoginProvider is the component which handles authentication (login, logout, ...). The LoginView is just the view shown to a user when logging in. Because the authentication provider and the view are seperated it's possible to mix login providers and views.

The disa framework already provides two login providers. These are the AWSLoginProvider and the DummyLoginProvider. The AWSLoginProvider uses Amplify and is able to handle authentication with AWS. To use this login provider you have to use Amplify and configure it. For configuration you have to define a configuration function and pass it to the *AWSLoginProvider* (further information [here](https://gitlab.iavgroup.local/td-d/educationlab/disa-frontend-framework/disa-framework/-/wikis/%5BExample-(TypeScript)%5D-Configuring-Amplify)). The *AWSLoginProvider* then has to wrap the *GlobalDataLayer* component inside your render method (as shown in *Getting started*). The *GlobalDataLayer* component detects that the login provider context has been initialized and will skip the default process. The dummy login provider is the default login provider (which will get used if nothing is specified) and authenticates every combination of email and password. This login provider is intended to be used while developing.

There are also two login views provided. One is the AWSLoginView which should be used with the AWSLoginProvider. There is also the BasicLoginView component which can be used in combination with the dummy login provider. The basic login view is the default login view.

In order to specify the login provider and the login view you can pass it to the *UILayer* component using the *loginView* property.

It is also possible to implement own login providers and login views and pass it to the UILayer component. Further information about implementing a custom login provider can be found [here](https://gitlab.iavgroup.local/td-d/educationlab/disa-frontend-framework/disa-framework/-/wikis/How-to-implement-a-login-provider). Further information about implementing a custom login view can be found [here](https://gitlab.iavgroup.local/td-d/educationlab/disa-frontend-framework/disa-framework/-/wikis/How-to-implement-a-login-view).

### Piecing everything together ###
To render your views and to do configuration you can follow the structure of this code snippet. This could be returned inside the body of the render method of your App.tsx.
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
    <AWSLoginProvider apiRoot={config.API_Root}>
      <GlobalDataLayer translations={...} initI18Next={optionalInitFunction}>
        <FirstExampleContextComponent>
          <SecondExampleContextComponent>
            <UILayer tabAndContentWrappers={views} startingPoint="/" loginView={AWSLoginView} />
          </SecondExampleContextComponent>
        </FirstExampleContextComponent>
      </GlobalDataLayer>
    </AWSLoginProvider>
  );
}
```

### Ensure a valid authentication when accessing protected resources
To access protected resources you have to ensure that the user is currently authenticated. For this purpose every login provider has to implement the execIfAuthed method. This method takes a function and tries to execute it. If it fails the method may refresh the session / token and retry the passed function (so does the AWSLoginProvider). The passed function has to return a JavaScript Promise. The execIfAuthed method also returns a Promise.\
The AWSLoginProvider tries to refresh the access token and retries your method if your method throws an error including the attribute code with it's value being *NotAuthedError*.
