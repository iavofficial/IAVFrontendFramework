import React, { Component } from "react";
import Amplify from "@aws-amplify/core";
import { DisaPage } from 'disa-framework/disaPage';
import { AWSLoginProvider } from "disa-framework/awsLoginProvider";
import { AWSLoginView } from "disa-framework/awsLoginView";

import { config } from "./config_disa-framework_test";
import navDashboardSelected from "./assets/nav_dashboard_selected.png";
import navDashboardDeselected from "./assets/nav_dashboard_deselected.png";
import navDiagnosticsSelected from "./assets/nav_diagnostics_selected.png";
import navDiagnosticsDeselected from "./assets/nav_diagnostics_deselected.png";
import navExpertSelected from "./assets/nav_expert_selected.png";
import navExpertDeselected from "./assets/nav_expert_deselected.png";
import navFleetSelected from './assets/nav_fleet_selected.png';
import navFleetDeselected from './assets/nav_fleet_deselected.png';
import navFleetDetailSelected from './assets/nav_fleet_detail_selected.png';
import navFleetDetailDeselected from './assets/nav_fleet_detail_deselected.png';
import otaLogo from "./assets/ota_logo.png";
import { FirstExampleContextComponent } from './contexts/FirstExampleContext';
import { SecondExampleContextComponent } from './contexts/SecondExampleContext';
import { View } from "disa-framework/view";
import { Group } from "disa-framework/group";
import { StandardNavbarTab } from "disa-framework/standardNavbarTab";
import { GroupCheckedNavbarTab } from "disa-framework/groupCheckedNavbarTab";
import { FirstExampleComponent } from "./components/firstExampleComponent";
import { ThirdExampleComponent } from "./components/thirdExampleComponent";
import { FourthExampleComponent } from "./components/fourthExampleComponent";
import { SecondExampleComponent } from "./components/secondExampleComponent";

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
      new View(<StandardNavbarTab name="1. Example" to="/" disabled={false} selectedIcon={navDashboardSelected}
        deselectedIcon={navDashboardDeselected} />, FirstExampleComponent),
      new View(<StandardNavbarTab name="2. Example" to="/example2" disabled={false} selectedIcon={navFleetSelected}
        deselectedIcon={navFleetDeselected} />, SecondExampleComponent),
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
        deselectedIcon={navExpertDeselected} permittedGroups={["ADMIN"]} />, FourthExampleComponent),
      new View(<StandardNavbarTab name="5. Example" to="/example5" disabled={true} selectedIcon={navFleetDetailSelected}
        deselectedIcon={navFleetDetailDeselected} />, FourthExampleComponent)
    ];
    return (
      <AWSLoginProvider apiRoot={config.API_Root}>
        <FirstExampleContextComponent>
          <SecondExampleContextComponent>
            <DisaPage tabAndContentWrappers={views} startingPoint="/" loginView={AWSLoginView} />
          </SecondExampleContextComponent>
        </FirstExampleContextComponent>
      </AWSLoginProvider>
    );
  }
}

export default App;
