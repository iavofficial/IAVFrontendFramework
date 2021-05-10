# Disa Framework (how to use it)
This react framework was created to speed up development in the disa front-end environment. To use this framework follow these steps and read the wiki pages for further information. You maybe want to inspect examples. For this you can look up the example in the "example" folder of this project. There are also wiki pages containing examples.

## Installation
To install this package add a .npmrc file to your project. This file has to contain the following lines:

>@td-d:registry=https://gitlab.iavgroup.local/api/v4/projects/8537/packages/npm/
>'//gitlab.iavgroup.local/api/v4/projects/8537/packages/npm/:_authToken'="_rzbtzRRGvQ7HJx__mVw"

After adding this file you are able to install the disa-framework package by using following command:\
`npm install @td-d/disa-framework`

Congratulations. You have installed the latest disa-framework package.

## Basics
### Submit to new updates
Every time a package with a new version is released a gitlab release will be created. To get an email if this happens you have to execute the following steps:\
Go to "Project overview" --> Click the drop down icon next to the notification bell --> Select "Custom" --> Close the drop down menu --> Click the bell --> Tick "New release" and hit the "OK" button

### TypeScript
This framework supports TypeScript although you can also use it with JavaScript.

### Imports
This framework uses ES-6 import/export syntax. All exports are named exports. To import a module just type the name of the npm package and add the component you want to import. For example:
```javascript
import { DisaPage } from "@td-d/disa-framework/disaPage"
```

### Layout
![Here should be a diagram.](./doc/diagrams/layout.png?raw=true)

## Getting started
The main component of this framework is the DisaPage component. To do the basic setup you have to render this component in the render method of your application. You will see that this frameworks provides a login system and the basic frame of a disa web application.\
The DisaPage component has the properties:
1. views: Array of views (a specific class) to provide in order to render tabs in the navigation bar and the associated component.
2. startingPoint: The "entry URL" of your application. This doesn't mean the login page but the path the user will be redirected after successfull authentication.
3. loginProvider (optional): This attribute will get explained later
4. loginView (optional): This attribute will get explained later
5. loginProviderProps (optional): Object with attributes which will get passed to the login provider.

### Login system
The login system is seperated into two parts: The so called LoginProvider and the LoginView. The LoginProvider is the component which handles authentication (login, logout, ...). The LoginView is just the view shown to a user when logging in. Because the authentication provider and the view are seperated it's possible to mix login providers and views.\
The disa framework already provides two login providers. These are the AWSLoginProvider and the DummyLoginProvider. The AWSLoginProvider uses Amplify and is able to handle authentication with AWS. To use this login provider you have to use Amplify and configure it. You also have to provide the "loginProviderProps" with "apiRoot". The dummy login provider is the standard login provider (which will get used if nothing is specified) and authenticates every combination of email and password. This login provider is intended to be used while developing.\
There are also two login views provided. One is the AWSLoginView which should be used with the AWSLoginProvider. There is also the BasicLoginView component which can be used in combination with the dummy login provider. The basic login view is the default login view.\
In order to specify the login provider and the login view you can pass it to the DisaPage component using the "loginProvider" and "loginView" props.
It is also possible to implement own login providers and login views and pass it to the DisaPage component. For further information about this read the corresponding wiki page.

### How to specify navigation tabs
To let the developer specify navigation tabs the class View is exported as a module. In order to specify navigation tabs you have to create an array of instances of this class. This array has to be passed to the DisaPage's "views" property.  The view class has the following attributes:
1. navbarTab: This is the instance of the navigation component which gets rendered in the navigation bar. You can pass different navigation elements to the view including instances of components you have implemented on your own. The wiki provides you an example for implementing an own navigation component. The framework provides two types of navigation components:
	1. StandardNavbarTab: This is just a navigation component without any extra functionality. This component has the following properties:
		- selectedIcon: Icon to be shown if the tab is selected.
		- deselectedIcon: Icon to be shown if the tab is deselected.
		- to: Route (URL) on which the tab will be active.
		- disabled: Boolean which is true if the tab shouldn't be clickable.
	2. GroupCheckedNavbarTab: This navigation component adds the functionality of group checking. In addition to the previously explained properties it has the permittedGroups property. Only these usergroups are able to access the component bound to this navigation element. To be able to use this navigation component your login provider has to implement the method "getUserGroups: string[]" (also comes with AWSLoginProvider).
2. component: The component (type, not an instance) bound to this tab. It will get rendered in the so called content section if the tab is active.

#### Some notes for implementing a component bound to a view
The component should have the Content component as the root component in its render method. This component renders the so called "content bar" in the content section. You can pass an array of elements for the content bar using the content's component contentElements property.



# Disa Framework (devnotes)

## Available Scripts

In the project directory, you can run:

### `npm devmode`

This command builds the framework to the "build" folder. Tsc and babel will watch files in src/links and src/lib for changes and recompile it if necessary.

### `npm run build-linux`

This command executes the build script for linux environments / the ci / cd pipeline.

## Example project
To be able to view the results of code changes in the framework live there is an example project in the "example" folder. To develop properly you should use the "npm devmode" command in the frameworks root folder and the "npm start" command in the example project's root folder.