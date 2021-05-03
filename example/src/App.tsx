import React, { Component } from "react";
import Amplify from "@aws-amplify/core";
import { DisaPage } from 'disa-framework/disaPage';
import { AWSLoginProvider } from "disa-framework/awsLoginProvider";
import { AWSLoginView } from "disa-framework/awsLoginView";

import { config } from "./config_disa-framework_test";
import { RootComponent } from './components/rootComponent'
import { Test1Component } from './components/test1Component'
import { Test2Component } from './components/test2Component'
import { Test3Component } from './components/test3Component'
import navFleetSelected from './assets/nav_fleet_selected.png';
import navFleetDeselected from './assets/nav_fleet_deselected.png';
import navFleetDetailSelected from './assets/nav_fleet_detail_selected.png';
import navFleetDetailDeselected from './assets/nav_fleet_detail_deselected.png';
import { FirstContextClass } from './contexts/FirstContext';
import { SecondContextClass } from './contexts/SecondContext';
import { View } from "disa-framework/view";

const authConfig = {
  // REQUIRED - Amazon Cognito Region
  region: config.REGION,

  // OPTIONAL - Amazon Cognito User Pool ID
  userPoolId: config.COGNITO_POOL_ID,

  // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
  userPoolWebClientId: config.COGNITO_APP_CLIENT_ID,

  // OPTIONAL - Configuration for cookie storage
  // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
  cookieStorage: {
    // REQUIRED - Cookie domain (only required if cookieStorage is provided)
    domain: config.DOMAIN,
    // OPTIONAL - Cookie path
    path: '/',
    // OPTIONAL - Cookie expiration in days
    expires: 365,
    // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
    sameSite: "lax",
    // OPTIONAL - Cookie secure flag
    // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
    secure: config.DOMAIN !== "localhost"
  },

  // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
  authenticationFlowType: 'USER_SRP_AUTH',
};

class App extends Component<any> {
  constructor(props: any) {
    super(props);
    Amplify.configure(authConfig);
  }

  render() {
    let views = [
      new View(navFleetSelected, navFleetDeselected, "/", "Root", false, RootComponent),
      new View(navFleetSelected, navFleetDeselected, "/test1", "Test1", false, Test1Component),
      new View(navFleetSelected, navFleetDeselected, "/test2", "Test2", false, Test2Component),
      new View(navFleetDetailSelected, navFleetDetailDeselected, "/test3", "Test3", true, Test3Component)
    ];
    return (
      <FirstContextClass>
        <SecondContextClass>
          <DisaPage views={views} startingPoint="/" loginView={AWSLoginView} loginProvider={AWSLoginProvider}
            loginProviderProps={{ apiRoot: config.API_Root }} />
        </SecondContextClass>
      </FirstContextClass>
    );
  }
}

export default App;
