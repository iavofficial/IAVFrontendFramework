// TODO: Problem mit Content: Kein React.cloneElement(...) möglich. Normaler Methodenaufruf notwendig.
import { Component } from "react";
import "./App.css";
import RootComponent from "./develop/components/rootComponent"
import Test1Component from "./develop/components/test1Component"
import Test2Component from "./develop/components/test2Component"
import Test3Component from "./develop/components/test3Component"
import navFleetSelected from "./develop/assets/nav_fleet_selected.png";
import navFleetDeselected from "./develop/assets/nav_fleet_deselected.png";
import navFleetDetailSelected from "./develop/assets/nav_fleet_detail_selected.png";
import navFleetDetailDeselected from "./develop/assets/nav_fleet_detail_deselected.png";
import DisaPage from "./components/disaPage";
import FirstContextClass from "./develop/contexts/FirstContext";
import SecondContextClass from "./develop/contexts/SecondContext";
import AWSLoginProvider from "./components/login/awsLoginProvider"
import { config } from "./develop/config";
import Amplify from "@aws-amplify/core";
import AWSLoginView from "./components/login/awsLoginView";
import View from "./components/view";

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
          <DisaPage views={views} startingPoint="/" loginProvider={AWSLoginProvider}
            loginProviderProps={{ apiRoot: "https://tj25ai6jb4.execute-api.eu-central-1.amazonaws.com/stage/" }} loginView={AWSLoginView} />
        </SecondContextClass>
      </FirstContextClass>
    );
  }
}

export default App;