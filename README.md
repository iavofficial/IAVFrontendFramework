**Important note: Developers which enhance the framework or the example project should read the "devnotes" chapter at the end of this file before developing.**

# Disa Framework (how to use it)
This react framework was created to speed up development in the disa front-end environment. To use this framework follow these steps and read the wiki pages for further information. You maybe want to inspect examples. For this you can look up the example in the "example" folder of this project.

## Installation
To install this package add a .npmrc file to your project. This file has to contain the following lines:

>@td-d:registry=https://gitlab.iavgroup.local/api/v4/projects/8537/packages/npm/
>'//gitlab.iavgroup.local/api/v4/projects/8537/packages/npm/:_authToken'="_rzbtzRRGvQ7HJx__mVw"

After adding this file you are able to install the disa-framework package by using following command:\
`npm install @td-d/disa-framework`

Congratulations. You have installed the latest disa-framework package.

## Basics
### Subscribe to new updates
Every time a package with a new version is released a gitlab release will be created. To get an email if this happens you have to execute the following steps:\
Go to "Project overview" --> Click the drop down icon next to the notification bell --> Select "Custom" --> Close the drop down menu --> Click the bell --> Tick "New release" and hit the "OK" button

### TypeScript
This framework supports TypeScript although you can also use it with JavaScript.

### Imports
This framework uses ES-6 import/export syntax. All exports are named exports. To import a module just type the name of the npm package and add the component you want to import. For example:
```javascript
import { DisaPage } from "@td-d/disa-framework/disaPage"
```

### Cookies
**Please remove if the text fit's the requirements: Please explain how the cookie banner works and where to find its integration in the project - make it easy for yourself by adding code snippets**

This framework adds a banner for cookies **by itself without any action of the developer**. Cookies have to be accepted for proper functionality. Without accepting the user can't use the web application. When accepting a **cookie with the expiration time of one year will be set** in order to save the decision. If this cookie is found, the cookie banner won't render again.\
The cookie banner component is **conditionally rendered by the *DisaPage* component**. The code can be found in *"src/lib/components/cookie/cookieBanner.tsx"* Rendering of the cookie banner doesn't depend on whether the user is logged in or not.

### Layout
![Here should be a diagram describing the layout.](./doc/diagrams/layout.png?raw=true)

## Getting started
The main component of this framework is the DisaPage component. To do the basic setup you have to render this component in the render method of your application. You will see that this frameworks provides a login system and the basic frame of a disa web application.\
The DisaPage component has the properties:
1. views: Array of views (a specific class) to provide in order to render tabs in the navigation bar and the associated component.
2. startingPoint: The "entry URL" of your application. This doesn't mean the login page but the path the user will be redirected after successfull authentication.
3. loginView (optional): This attribute will get explained later
4. translations (optional): Translations for internationalization
5. skipI18nextInit (optional): Flag that tells the framework it has to skip the initialization of I18next. This could be helpful if you have to add extra logic in the initialization process.

### How to specify navigation tabs
*Please remove if the text fit's the requirements: Try to reduce text by including sample code snippets*\
To let the developer specify navigation tabs the class View is exported as a module. It encapsulates the element which is rendered in the navigation bar and the component which is rendered in the content section. In order to specify navigation tabs the developer has to **create an array of instances of this class**. The developer is also able to create instances of the class "Group". This class let's the developer specify groups of navigation tabs with a specified label. The array has to be passed to the DisaPage's "views" property.\
An example:
```javascript
let views = [
  new View(<GroupCheckedNavbarTab name="3. Example" to="/example3" disabled={false} selectedIcon={navDiagnosticsSelected}
    deselectedIcon={navDiagnosticsDeselected} permittedGroups={["USER", "ADMIN"]} />, ThirdExampleComponent),
  new Group(
    "Test Gruppe", otaLogo,
    [
      new View(<StandardNavbarTab name="1. Group Example" to="/group-example1" disabled={false} selectedIcon={navFleetSelected}
        deselectedIcon={navFleetDeselected} />, SecondExampleComponent),
      new View(<StandardNavbarTab name="2. Group Example" to="/group-example2" disabled={true} selectedIcon={navFleetDetailSelected}
        deselectedIcon={navFleetDetailDeselected} />, FourthExampleComponent)
    ]
  ),
  new View(<GroupCheckedNavbarTab name="4. Example" to="/example4" disabled={true} selectedIcon={navExpertSelected}
    deselectedIcon={navExpertDeselected} permittedGroups={["ADMIN"]} />, FourthExampleComponent)
];
```
You can find a detailed explanation of the attributes [here](https://gitlab.iavgroup.local/td-d/educationlab/disa-frontend-framework/disa-framework/-/wikis/Views-and-Groups-in-Detail).

As you can see there are two types of navigation tabs. However you are free to implement your own. Further information can be found [here](https://gitlab.iavgroup.local/td-d/educationlab/disa-frontend-framework/disa-framework/-/wikis/How-to-implement-a-navigation-component).

#### Some notes for implementing a component bound to a view
The component should have the Content component as the root component in its render method. This component renders the so called "content bar" in the content section. You can pass an array of elements for the content bar using the content's component contentElements property.\
Example:
```javascript
<Content contentElements={[...this.context.contentTabs, ...this.state.contentTabs]}>
     <div>Example data <b>global</b> context: {this.context.exampleData}</div>
</Content>
```
A detailed explanation can be found [here](https://gitlab.iavgroup.local/td-d/educationlab/disa-frontend-framework/disa-framework/-/wikis/How-to-create-a-component-bound-to-a-view). (It is recommended to read this section.)

### Login system
The login system is seperated into two parts: The so called LoginProvider and the LoginView. The LoginProvider is the component which handles authentication (login, logout, ...). The LoginView is just the view shown to a user when logging in. Because the authentication provider and the view are seperated it's possible to mix login providers and views.

The disa framework already provides two login providers. These are the AWSLoginProvider and the DummyLoginProvider. The AWSLoginProvider uses Amplify and is able to handle authentication with AWS. To use this login provider you have to use Amplify and configure it (further information [here](https://gitlab.iavgroup.local/td-d/educationlab/disa-frontend-framework/disa-framework/-/wikis/%5BExample-(TypeScript)%5D-Configuring-Amplify)). You also have to provide the "loginProviderProps" with "apiRoot". The dummy login provider is the standard login provider (which will get used if nothing is specified) and authenticates every combination of email and password. This login provider is intended to be used while developing.

There are also two login views provided. One is the AWSLoginView which should be used with the AWSLoginProvider. There is also the BasicLoginView component which can be used in combination with the dummy login provider. The basic login view is the default login view.

In order to specify the login provider and the login view you can pass it to the DisaPage component using the "loginProvider" and "loginView" props.

It is also possible to implement own login providers and login views and pass it to the DisaPage component. Further information about implementing a custom login provider can be found [here](https://gitlab.iavgroup.local/td-d/educationlab/disa-frontend-framework/disa-framework/-/wikis/How-to-implement-a-login-provider). Further information about implementing a custom login view can be found [here](https://gitlab.iavgroup.local/td-d/educationlab/disa-frontend-framework/disa-framework/-/wikis/How-to-implement-a-login-view).

### Piecing everything together ###
To render your views and to do configuration you can follow the structure of this code snippet. This could be returned inside the body of the render method of your App.tsx.
```javascript
<AWSLoginProvider apiRoot={config.API_Root}>
  <FirstExampleContextComponent>
    <SecondExampleContextComponent>
      <DisaPage tabAndContentWrappers={views} startingPoint="/" loginView={AWSLoginView} />
    </SecondExampleContextComponent>
  </FirstExampleContextComponent>
</AWSLoginProvider>
```

### Internationalization ###
The framework uses I18next for internationalization. It provides a default initialization of I18next which automatically gets executed when the "DisaPage" component mounts. It also provides translations in english and german for texts of framework components. You can provide own translations by defining .json files and defining an object of the following structure:
```javascript
let translations = {
  es: {
    translation: importedJsonFileEs
  },
  pt: {
    translation: importedJsonFilePt
  }
}
```
This object then has to be passed to the "DisaPage" component. The .json file has to include simple key value pairs like this:
```javascript
{
  "greeting": "hello",
  "promote_programming": "Programming is fun!"
}
```

If you have to add extra logic in the initialization you can skip the default initialization by setting the "skipI18nextInit" flag.

You can find more information about I18next [here](https://react.i18next.com/).

### Ensure a valid authentication when accessing protected resources
To access protected resources you have to ensure that the user is currently authenticated. For this purpose every login provider has to implement the execIfAuthed method. This method takes a function and tries to execute it. If it fails the method may refresh the session / token and retry the passed function (so does the AWSLoginProvider). The passed function has to return a JavaScript Promise. The execIfAuthed method also returns a Promise.\
The AWSLoginProvider tries to refresh the access token and retries your method if your method throws an error including the attribute code with it's value being "NotAuthedError".


# Disa Framework (devnotes)

## Available Scripts

In the project directory, you can run:

### `npm devmode`

This command builds the framework to the "build" folder. Tsc and babel will watch files in src/links and src/lib for changes and recompile it if necessary.

### `npm run build-linux`

This command executes the build script for linux environments / the ci / cd pipeline.

## **IMPORTANT: NPM version** ##
Major release 17 of npm must be installed at least. Otherwise issues with typescript will occur.

## Example project
To be able to view the results of code changes in the framework live there is an example project in the "example" folder. To develop properly you should use the "npm devmode" command in the frameworks root folder and the "npm start" command in the example project's root folder.
