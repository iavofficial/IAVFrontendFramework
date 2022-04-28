import "primeflex/primeflex.css";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import { SelectButton } from 'primereact/selectbutton';import { UILayer } from 'disa-framework/uiLayer';import { GlobalDataLayer } from "disa-framework/globalDataLayer";
import { DummyAuthenticationProvider } from "disa-framework/dummyAuthenticationProvider";
import { Group } from "disa-framework/group";
import { TranslateFunctionType } from "disa-framework/language";
import { BasicAuthenticationView } from "disa-framework/basicAuthenticationView";
import { BasicContentWrapper } from "disa-framework/basicContentWrapper";
import { SimpleNavbarTab } from "disa-framework/simpleNavbarTab";
import { PrivilegedNavbarTab } from "disa-framework/privilegedNavbarTab";
import translationES from "./assets/translations/es.json";
import translationEN from "./assets/translations/en.json";
import translationDE from "./assets/translations/de.json";
import translationDECH from "./assets/translations/de-CH.json";
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
import groupIcon from "./assets/ota_logo.png";
import { FirstExampleContextComponent } from './contexts/FirstExampleContext';
import { SecondExampleContextComponent } from './contexts/SecondExampleContext';
import { LayoutAndContextExampleComponent } from "./components/layoutAndContextExampleComponent";
import { ThirdExampleComponent } from "./components/thirdExampleComponent";
import { FourthExampleComponent } from "./components/fourthExampleComponent";
import { SecondExampleComponent } from "./components/secondExampleComponent";
import { useState } from "react";
import { ClassComponentContainer } from "./components/classComponentContainer";
import { LegalDocuments } from "./components/legalDocuments";
import {AWSAuthenticationProvider} from "disa-framework/awsAuthenticationProvider";
import {AWSAuthenticationView} from "disa-framework/awsAuthenticationView";

function App() {

  const [selectedButtonOption, setSelectedButtonOption] = useState("Simulated");

  const test = ()=>(
    <div>ich funktioniere</div>
  )

  let headerOptions = {
    
  }

  const menuOptions = {
    additionalItems: [
      {
        template: (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SelectButton options={["Simulated", "Real"]} value={selectedButtonOption} onChange={(ev) => setSelectedButtonOption(ev.value)}/>
          </div>
        )
      }
    ],
    options: [
      {
        identifier: "logout",
        hidden: true
      }
    ]
  }
  
  const views = [
    new BasicContentWrapper(<SimpleNavbarTab name={"Example without Translation"} to="/" disabled={false} selectedIcon={navDashboardSelected}
      deselectedIcon={navDashboardDeselected} />, LayoutAndContextExampleComponent),
    new BasicContentWrapper(<SimpleNavbarTab name={(t: TranslateFunctionType) => t("example_component", { count: 1 })} to="/example2" disabled={false}
      selectedIcon={navFleetSelected} deselectedIcon={navFleetDeselected} />, SecondExampleComponent),
    new BasicContentWrapper(<PrivilegedNavbarTab name={(t: TranslateFunctionType) => t("example_component", { count: 2 })} to="/example3" disabled={false}
      selectedIcon={navDiagnosticsSelected} deselectedIcon={navDiagnosticsDeselected} permittedGroups={["USER", "ADMIN"]} />, ThirdExampleComponent),
    new Group(
      (t: TranslateFunctionType) => t("Test_group"), groupIcon, true, false,
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
      selectedIcon={navFleetDetailSelected} deselectedIcon={navFleetDetailDeselected} />, FourthExampleComponent),
    new BasicContentWrapper(<SimpleNavbarTab name={(t: TranslateFunctionType) => t("example_component", { count: 7 })} to="/example6" disabled={false}
      selectedIcon={navDashboardSelected} deselectedIcon={navDashboardDeselected} />, ClassComponentContainer),
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
    <DummyAuthenticationProvider additionalContextValues={{ getUserGroups: () => [] }}>
      <GlobalDataLayer translations={translations} >
        <FirstExampleContextComponent>
          <SecondExampleContextComponent>
            <UILayer tabAndContentWrappers={views} startingPoint="/" authenticationView={AWSAuthenticationView} menuOptions={menuOptions}
              documentsLabelKey="Legal_documents" documentsComponent={LegalDocuments} headerOptions={headerOptions}/>
          </SecondExampleContextComponent>
        </FirstExampleContextComponent>
      </GlobalDataLayer>
    </DummyAuthenticationProvider>
  );
}

export default App;
