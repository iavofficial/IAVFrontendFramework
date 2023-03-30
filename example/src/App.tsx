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
import { navbarTabPropsExtended } from 'disa-framework/components/navbar/tabs/navbarTab';
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

  // const views = [
  //   new BasicContentWrapper(
  //     (
  //       <SimpleNavbarTab
  //         name={'Example without Translation'}
  //         to="/"
  //         disabled={false}
  //         selectedIcon={navDashboardSelected}
  //         deselectedIcon={navDashboardDeselected}
  //       />
  //     ),
  //     LayoutAndContextExampleComponent
  //   ),
  //   new BasicContentWrapper(
  //     (
  //       <SimpleNavbarTab
  //         name={(t: TranslateFunctionType) =>
  //           t('example_component', { count: 1 })
  //         }
  //         to="/example2"
  //         disabled={false}
  //         selectedIcon={navFleetSelected}
  //         deselectedIcon={navFleetDeselected}
  //       />
  //     ),
  //     SecondExampleComponent
  //   ),
  //   new BasicContentWrapper(
  //     (
  //       <PrivilegedNavbarTab
  //         name={(t: TranslateFunctionType) =>
  //           t('example_component', { count: 2 })
  //         }
  //         to="/example3"
  //         disabled={false}
  //         selectedIcon={navDiagnosticsSelected}
  //         deselectedIcon={navDiagnosticsDeselected}
  //         permittedGroups={['USER', 'ADMIN']}
  //       />
  //     ),
  //     ThirdExampleComponent
  //   ),
  //   new Group(
  //     (t: TranslateFunctionType) => t('Test_group'),
  //     groupIcon,
  //     undefined,
  //     false,
  //     true,
  //     false,
  //     [
  //       new BasicContentWrapper(
  //         (
  //           <SimpleNavbarTab
  //             name={(t: TranslateFunctionType) =>
  //               t('example_component', { count: 3 })
  //             }
  //             to="/group-example1"
  //             disabled={false}
  //             selectedIcon={navFleetSelected}
  //             deselectedIcon={navFleetDeselected}
  //           />
  //         ),
  //         SecondExampleComponent
  //       ),
  //       new BasicContentWrapper(
  //         (
  //           <SimpleNavbarTab
  //             name={(t: TranslateFunctionType) =>
  //               t('example_component', { count: 4 })
  //             }
  //             to="/group-example2"
  //             disabled={true}
  //             selectedIcon={navFleetDetailSelected}
  //             deselectedIcon={navFleetDetailDeselected}
  //           />
  //         ),
  //         FourthExampleComponent
  //       ),
  //     ]
  //   ),
  //   new BasicContentWrapper(
  //     (
  //       <PrivilegedNavbarTab
  //         name={(t: TranslateFunctionType) =>
  //           t('example_component', { count: 5 })
  //         }
  //         to="/example4"
  //         disabled={true}
  //         selectedIcon={navExpertSelected}
  //         deselectedIcon={navExpertDeselected}
  //         permittedGroups={['ADMIN']}
  //       />
  //     ),
  //     FourthExampleComponent
  //   ),
  //   new BasicContentWrapper(
  //     (
  //       <SimpleNavbarTab
  //         name={(t: TranslateFunctionType) =>
  //           t('example_component', { count: 6 })
  //         }
  //         to="/example5"
  //         disabled={false}
  //         selectedIcon={navFleetDetailSelected}
  //         deselectedIcon={navFleetDetailDeselected}
  //       />
  //     ),
  //     FourthExampleComponent
  //   ),
  //   new BasicContentWrapper(
  //     (
  //       <SimpleNavbarTab
  //         name={(t: TranslateFunctionType) =>
  //           t('example_component', { count: 7 })
  //         }
  //         to="/example6"
  //         disabled={false}
  //         selectedIcon={navDashboardSelected}
  //         deselectedIcon={navDashboardDeselected}
  //       />
  //     ),
  //     ClassComponentContainer
  //   ),
  // ];

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

  let test: navbarTabPropsExtended[] = [
    {
      name: 'Example1',
      to: '/',
      disabled: false,
      selectedIcon: infoIconSelected,
      deselectedIcon: infoIconDeselcted,
      renderElement: <LayoutAndContextExampleComponent />,
      permittedGroups: [],
      navbarTabsSecondLayer: [
        {
          name: 'test',
          to: '/testPath/',
          renderElement: <TestComponent />,
          navbarTabsThirdLayer: [],
        },
      ],
    },
    {
      name: (t: TranslateFunctionType) => t('example_component', { count: 4 }),
      to: '/group-example2/',
      disabled: false,
      selectedIcon: infoIconSelected,
      deselectedIcon: infoIconDeselcted,
      renderElement: <SecondExampleComponent />,
      permittedGroups: [],
      navbarTabsSecondLayer: [
        {
          name: 'test2345',
          to: 'testPath/',
          renderElement: <LayoutAndContextExampleComponent />,
          navbarTabsThirdLayer: [
            {
              name: 'testlayer3',
              to: '/testPathlayer3/',
              renderElement: <TestComponent />,
            },
          ],
        },
      ],
    },
    {
      name: (t: TranslateFunctionType) => t('example_component', { count: 6 }),
      to: '/example6',
      disabled: false,
      selectedIcon: infoIconSelected,
      deselectedIcon: infoIconDeselcted,
      renderElement: <FourthExampleComponent />,
      permittedGroups: [],
      navbarTabsSecondLayer: [],
    },
    {
      name: 'Example565643',
      to: '/test/',
      disabled: false,
      selectedIcon: infoIconSelected,
      deselectedIcon: infoIconDeselcted,
      renderElement: <LayoutAndContextExampleComponent />,
      permittedGroups: [],
      navbarTabsSecondLayer: [
        {
          name: 'test',
          to: '/testPath2/',
          renderElement: <TestComponent />,
          navbarTabsThirdLayer: [],
        },
      ],
    },
    // {
    //   name: (t: TranslateFunctionType) =>
    //     t('example_component', { count: 434 }),
    //   to: '/group-example2rt/',
    //   disabled: false,
    //   selectedIcon: infoIconSelected,
    //   deselectedIcon: infoIconDeselcted,
    //   renderElement: <SecondExampleComponent />,
    //   permittedGroups: [],
    //   navbarTabsSecondLayer: [
    //     {
    //       name: 'test434213',
    //       to: 'testPathref/',
    //       renderElement: <LayoutAndContextExampleComponent />,
    //       navbarTabsThirdLayer: [
    //         {
    //           name: 'testlayer3',
    //           to: 'testPathlayer3asdf/',
    //           renderElement: <TestComponent />,
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   name: (t: TranslateFunctionType) => t('example_component', { count: 64 }),
    //   to: '/example5asdfasd43434',
    //   disabled: false,
    //   selectedIcon: infoIconSelected,
    //   deselectedIcon: infoIconDeselcted,
    //   renderElement: <FourthExampleComponent />,
    //   permittedGroups: [],
    //   navbarTabsSecondLayer: [],
    // },
    // {
    //   name: 'Example3412',
    //   to: '/asdfadfasdf',
    //   disabled: false,
    //   selectedIcon: infoIconSelected,
    //   deselectedIcon: infoIconDeselcted,
    //   renderElement: <LayoutAndContextExampleComponent />,
    //   permittedGroups: [],
    //   navbarTabsSecondLayer: [
    //     {
    //       name: 'test',
    //       to: 'testPath/',
    //       renderElement: <TestComponent />,
    //       navbarTabsThirdLayer: [],
    //     },
    //   ],
    // },
    // {
    //   name: (t: TranslateFunctionType) => t('example_component', { count: 12 }),
    //   to: '/group-example2sdfgsdfg/',
    //   disabled: false,
    //   selectedIcon: infoIconSelected,
    //   deselectedIcon: infoIconDeselcted,
    //   renderElement: <SecondExampleComponent />,
    //   permittedGroups: [],
    //   navbarTabsSecondLayer: [
    //     {
    //       name: 'test345345',
    //       to: 'testPathasdfadf/',
    //       renderElement: <LayoutAndContextExampleComponent />,
    //       navbarTabsThirdLayer: [
    //         {
    //           name: 'testlayer3',
    //           to: 'testPathlayer3sdfgsfg/',
    //           renderElement: <TestComponent />,
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   name: (t: TranslateFunctionType) => t('example_component', { count: 8 }),
    //   to: '/example5sdfgsdfgsrtwert',
    //   disabled: false,
    //   selectedIcon: infoIconSelected,
    //   deselectedIcon: infoIconDeselcted,
    //   renderElement: <FourthExampleComponent />,
    //   permittedGroups: [],
    //   navbarTabsSecondLayer: [],
    // },
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
