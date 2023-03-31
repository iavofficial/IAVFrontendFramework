import 'primeflex/primeflex.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { SelectButton } from 'primereact/selectbutton';
import translationES from './assets/translations/es.json';
import { UILayer } from 'disa-framework/uiLayer';
import { GlobalDataLayer } from 'disa-framework/globalDataLayer';
import { DummyAuthenticationProvider } from 'disa-framework/dummyAuthenticationProvider';
import { TranslateFunctionType } from 'disa-framework/language';
import { BasicAuthenticationView } from 'disa-framework/basicAuthenticationView';
import translationEN from './assets/translations/en.json';
import translationDE from './assets/translations/de.json';
import translationDECH from './assets/translations/de-CH.json';
import navDashboardSelected from './assets/nav_dashboard_selected.png';
import navDashboardDeselected from './assets/nav_dashboard_deselected.png';
import navDiagnosticsSelected from './assets/nav_diagnostics_selected.png';
import navDiagnosticsDeselected from './assets/nav_diagnostics_deselected.png';
import navExpertSelected from './assets/nav_expert_selected.png';
import navExpertDeselected from './assets/nav_expert_deselected.png';
import navFleetSelected from './assets/nav_fleet_selected.png';
import navFleetDeselected from './assets/nav_fleet_deselected.png';
import infoIconSelected from './assets/infoIcon_selected.svg';
import infoIconDeselcted from './assets/infoIcon_deselected.svg';
import navFleetDetailSelected from './assets/nav_fleet_detail_selected.png';
import navFleetDetailDeselected from './assets/nav_fleet_detail_deselected.png';
import groupIcon from './assets/ota_logo.png';
import { FirstExampleContextComponent } from './contexts/FirstExampleContext';
import { SecondExampleContextComponent } from './contexts/SecondExampleContext';
import { LayoutAndContextExampleComponent } from './components/layoutAndContextExampleComponent';
import { ThirdExampleComponent } from './components/thirdExampleComponent';
import { FourthExampleComponent } from './components/fourthExampleComponent';
import { SecondExampleComponent } from './components/secondExampleComponent';
import { useState } from 'react';
import { ClassComponentContainer } from './components/classComponentContainer';
import { LegalDocuments } from './components/legalDocuments';
import { TestComponent } from './components/testComponent';

//TODO: Generate unique key for every tabelement
function App() {
  const [selectedButtonOption, setSelectedButtonOption] = useState('Simulated');

  const menuOptions = {
    additionalItems: [
      {
        template: (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SelectButton
              options={['Simulated', 'Real']}
              value={selectedButtonOption}
              onChange={(ev) => setSelectedButtonOption(ev.value)}
            />
          </div>
        ),
      },
    ],
    options: [
      {
        identifier: 'logout',
        hidden: true,
      },
    ],
  };

  const translations = {
    es: {
      translation: translationES,
    },
    en: {
      translation: translationEN,
    },
    de: {
      translation: translationDE,
    },
    de_CH: {
      translation: translationDECH,
    },
  };

  let test = [
    {
      name: 'Example1',
      to: '/test1',
      disabled: false,
      selectedIcon: infoIconSelected,
      deselectedIcon: infoIconDeselcted,
      renderElement: <TestComponent />,
      permittedGroups: [],
    },
    {
      name: 'Example2',
      selectedIcon: infoIconSelected,
      deselectedIcon: infoIconDeselcted,
      tabAndContent: [
        {
          name: 'Example21',
          selectedIcon: infoIconSelected,
          deselectedIcon: infoIconDeselcted,
          tabAndContent: [
            {
              name: 'Example211',
              to: '/test123',
              disabled: false,
              selectedIcon: infoIconSelected,
              deselectedIcon: infoIconDeselcted,
              renderElement: <LayoutAndContextExampleComponent />,
              permittedGroups: [],
            },
          ],
        },
        {
          name: 'Example22',
          to: '/test',
          disabled: false,
          selectedIcon: infoIconSelected,
          deselectedIcon: infoIconDeselcted,
          renderElement: <LayoutAndContextExampleComponent />,
          permittedGroups: [],
        },
      ],
    },
  ];

  return (
    <DummyAuthenticationProvider
      additionalContextValues={{ getUserGroups: () => [] }}
    >
      <GlobalDataLayer translations={translations}>
        <FirstExampleContextComponent>
          <SecondExampleContextComponent>
            <UILayer
              tabsAndContent={test}
              startingPoint="/"
              authenticationView={BasicAuthenticationView}
              menuOptions={menuOptions}
              collabsible={true}
              documentsLabelKey="Legal_documents"
              documentsComponent={LegalDocuments}
            />
          </SecondExampleContextComponent>
        </FirstExampleContextComponent>
      </GlobalDataLayer>
    </DummyAuthenticationProvider>
  );
}

export default App;
