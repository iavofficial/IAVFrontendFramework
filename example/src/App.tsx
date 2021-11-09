import "primeflex/primeflex.css";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import Amplify from "@aws-amplify/core";
import { SelectButton } from 'primereact/selectbutton';
import { UILayer } from 'disa-framework/uiLayer';
import { GlobalDataLayer } from "disa-framework/globalDataLayer";
import { AWSAuthenticationProvider } from "disa-framework/awsAuthenticationProvider";
import { AWSAuthenticationView } from "disa-framework/awsAuthenticationView";
import { BasicContentWrapper } from "disa-framework/basicContentWrapper";
import { Group } from "disa-framework/group";
import translationES from "./assets/translations/es.json";
import translationEN from "./assets/translations/en.json";
import translationDE from "./assets/translations/de.json";
import translationDECH from "./assets/translations/de-CH.json";
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
import groupIcon from "./assets/test.png";
import { FirstExampleContextComponent } from './contexts/FirstExampleContext';
import { SecondExampleContextComponent } from './contexts/SecondExampleContext';
import { SimpleNavbarTab } from "disa-framework/simpleNavbarTab";
import { PrivilegedNavbarTab } from "disa-framework/privilegedNavbarTab";
import { FirstExampleComponent } from "./components/firstExampleComponent";
import { ThirdExampleComponent } from "./components/thirdExampleComponent";
import { FourthExampleComponent } from "./components/fourthExampleComponent";
import { SecondExampleComponent } from "./components/secondExampleComponent";
import { TranslateFunctionType } from "disa-framework/language";
import { useState } from "react";

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

function App() {

  const [selectedButtonOption, setSelectedButtonOption] = useState("Simulated");

  const settingsMenuItems = [
    {
      template: (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <SelectButton options={["Simulated", "Real"]} value={selectedButtonOption} onChange={(ev) => setSelectedButtonOption(ev.value)} />
        </div>
      )
    }
  ]

  const views = [
    new BasicContentWrapper(<SimpleNavbarTab name={"Example without Translation"} to="/" disabled={false} selectedIcon={navDashboardSelected}
      deselectedIcon={navDashboardDeselected} />, FirstExampleComponent),
    new BasicContentWrapper(<SimpleNavbarTab name={(t: TranslateFunctionType) => t("example_component", { count: 1 })} to="/example2" disabled={false}
      selectedIcon={navFleetSelected} deselectedIcon={navFleetDeselected} />, SecondExampleComponent),
    new BasicContentWrapper(<PrivilegedNavbarTab name={(t: TranslateFunctionType) => t("example_component", { count: 2 })} to="/example3" disabled={false}
      selectedIcon={navDiagnosticsSelected} deselectedIcon={navDiagnosticsDeselected} permittedGroups={["USER", "ADMIN"]} />, ThirdExampleComponent),
    new Group(
      (t: TranslateFunctionType) => t("Test_group"), groupIcon, false, false,
      [
        new BasicContentWrapper(<SimpleNavbarTab name={(t: TranslateFunctionType) => t("example_component", { count: 3 })} to="/group-example1" disabled={false}
          selectedIcon={navFleetSelected} deselectedIcon={navFleetDeselected} />, SecondExampleComponent),
        new BasicContentWrapper(<SimpleNavbarTab name={(t: TranslateFunctionType) => t("example_component", { count: 4 })} to="/group-example2" disabled={true}
          selectedIcon={navFleetDetailSelected} deselectedIcon={navFleetDetailDeselected} />, FourthExampleComponent)
      ]
    ),
    new BasicContentWrapper(<PrivilegedNavbarTab name={(t: TranslateFunctionType) => t("example_component", { count: 5 })} to="/example4" disabled={true}
      selectedIcon={navExpertSelected} deselectedIcon={navExpertDeselected} permittedGroups={["ADMIN"]} />, FourthExampleComponent),
    new BasicContentWrapper(<SimpleNavbarTab name={(t: TranslateFunctionType) => t("example_component", { count: 6 })} to="/example5" disabled={true}
      selectedIcon={navFleetDetailSelected} deselectedIcon={navFleetDetailDeselected} />, FourthExampleComponent)
  ];

  const translations = (
    {
      es: {
        translation: translationES
      },
      en: {
        translation: translationEN
      },
      de: {
        translation: translationDE
      },
      de_CH: {
        translation: translationDECH
      }
    }
  );

  return (
    <AWSAuthenticationProvider configureAmplify={() => { Amplify.configure(authConfig); }}>
      <GlobalDataLayer translations={translations} >
        <FirstExampleContextComponent>
          <SecondExampleContextComponent>
            <UILayer tabAndContentWrappers={views} startingPoint="/" loginView={AWSAuthenticationView} settingsMenuItems={settingsMenuItems} />
          </SecondExampleContextComponent>
        </FirstExampleContextComponent>
      </GlobalDataLayer>
    </AWSAuthenticationProvider>
  );
}

export default App;
