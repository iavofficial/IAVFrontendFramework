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
import { AWSAuthenticationView } from 'disa-framework/awsAuthenticationView';
import { BasicContentWrapper } from 'disa-framework/basicContentWrapper';
import { SimpleNavbarTab } from 'disa-framework/simpleNavbarTab';
import { PrivilegedNavbarTab } from 'disa-framework/privilegedNavbarTab';
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
import { ReactComponent as InfoIcon } from './assets/infoIcon_selected.svg';
import applogo from './assets/App-Logo.png';

import { Group } from 'disa-framework/group';
import navFleetDetailSelected from './assets/nav_fleet_detail_selected.png';
import navFleetDetailDeselected from './assets/nav_fleet_detail_deselected.png';
import groupIcon from './assets/ota_logo.png';
import { FirstExampleContextComponent } from './contexts/FirstExampleContext';
import { SecondExampleContextComponent } from './contexts/SecondExampleContext';
import { ColorProvider } from 'disa-framework/colorProvider';

import { LayoutAndContextExampleComponent } from './components/layoutAndContextExampleComponent';
import { ThirdExampleComponent } from './components/thirdExampleComponent';
import { FourthExampleComponent } from './components/fourthExampleComponent';
import { SecondExampleComponent } from './components/secondExampleComponent';
import { useState } from 'react';
import { ClassComponentContainer } from './components/classComponentContainer';
import { LegalDocuments } from './components/legalDocuments';
import { TestComponent } from './components/testComponent';
import { BLACK, GREEN, RED, WHITE } from 'disa-framework/constants';

//TODO: Generate unique key for every tabelement
function App() {
  const [selectedButtonOption, setSelectedButtonOption] = useState('Simulated');

  const menuSettingsOptions = {
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
        hidden: false,
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

  const views = [
    new BasicContentWrapper(
      (
        <SimpleNavbarTab
          name={'Example without Translation'}
          to="/"
          icon={<InfoIcon />}
          disabled={false}
        />
      ),
      TestComponent
    ),
    new Group(
      (t: TranslateFunctionType) => t('Test_group'),
      <InfoIcon />,
      undefined,
      false,
      true,
      [
        new BasicContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t('example_component', { count: 3 })
              }
              to="/group-example1"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          SecondExampleComponent
        ),
        new BasicContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t('example_component', { count: 4 })
              }
              to="/group-example2"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          FourthExampleComponent
        ),
        new Group(
          (t: TranslateFunctionType) => t('Test_group'),
          <InfoIcon />,
          undefined,
          false,
          true,
          [
            new BasicContentWrapper(
              (
                <SimpleNavbarTab
                  name={(t: TranslateFunctionType) =>
                    t('example_component', { count: 12 })
                  }
                  to="/group-example12"
                  disabled={false}
                  icon={<InfoIcon />}
                />
              ),
              ClassComponentContainer
            ),
          ]
        ),
        new BasicContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t('example_component', { count: 43 })
              }
              to="/group-example22"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          FourthExampleComponent
        ),
      ]
    ),

    // new BasicContentWrapper(
    //   (
    //     <PrivilegedNavbarTab
    //       name={(t: TranslateFunctionType) =>
    //         t('example_component', { count: 5 })
    //       }
    //       to="/example4"
    //       disabled={true}
    //       selectedIcon={navExpertSelected}
    //       deselectedIcon={navExpertDeselected}
    //       permittedGroups={['ADMIN']}
    //     />
    //   ),
    //   FourthExampleComponent
    // ),
    // new BasicContentWrapper(
    //   (
    //     <SimpleNavbarTab
    //       name={(t: TranslateFunctionType) =>
    //         t('example_component', { count: 6 })
    //       }
    //       to="/example5"
    //       disabled={false}
    //       selectedIcon={navFleetDetailSelected}
    //       deselectedIcon={navFleetDetailDeselected}
    //     />
    //   ),
    //   FourthExampleComponent
    // ),
    // new BasicContentWrapper(
    //   (
    //     <SimpleNavbarTab
    //       name={(t: TranslateFunctionType) =>
    //         t('example_component', { count: 7 })
    //       }
    //       to="/example6"
    //       disabled={false}
    //       selectedIcon={navDashboardSelected}
    //       deselectedIcon={navDashboardDeselected}
    //     />
    //   ),
    //   ClassComponentContainer
    // ),
  ];

  const LIGHT = '#D3DBE5';
  const BACKGROUND = '#E6E9F1';
  const AUSWAHL = '#F2E4C9';
  const HIGHLIGHT = '#D4A64E';
  const HIGHLIGHT_DARK = '#805D1A';
  const DARK1 = '#162230';
  const DARK2 = '#273444';
  const DARK3 = '#455263';

  let colorOptions = {
    headerColorOptions: {
      backgroundColor: DARK1,
    },
    navbarColorOptions: {
      backgroundColor: DARK1,
      navbarCollapseArrowColor: WHITE,
      legalDocumentsIconColor: WHITE,
      tabColorOptions: {
        mainColor: DARK1,
        highlightColor: DARK3,
        letteringMainColor: LIGHT,
        letteringHighlightColor: HIGHLIGHT,
        iconMainColor: LIGHT,
        iconHighlightColor: HIGHLIGHT,
      },
    },
    contentColorOptions: {
      // contentBackground: GREEN,
      // contentCellBackground: RED,
    },
    contentbarColorOptions: {
      // backgroundColor: GREEN,
      buttonColorMain: LIGHT,
      buttonColorHighlight: HIGHLIGHT,
      iconMainColor: BLACK,
      iconHighlightColor: WHITE,
    },
    contentbarTabColorOptions: {
      highlightColor: HIGHLIGHT,
      mainColor: LIGHT,
      textMainColor: BLACK,
      textHighlightColor: WHITE,
      iconMainColor: BLACK,
      iconHighlightColor: WHITE,
    },
    authenticationColorOptions: {
      fullScreenBackgroundColor: WHITE,
      // loginFormBackgroundColor: GREEN,
      loginButtonBackgroundColor: HIGHLIGHT,
      // loginButtonTextColor: GREEN,
      headerBackgroundColor: DARK1,
      companyTextColor: DARK1,
      legalNoticeIconColor: DARK1,
      // inputFieldDescriptionTextColor: GREEN,
      // inputFieldBackgroundColor: GREEN,
      // inputFieldTextColor: WHITE,
      // passwortRequirementsTextColor: GREEN,
    },
  };

  let headerOptions = {
    hideRight: true,
    reactElementLeft: <img src={applogo} />,
  };

  return (
    <DummyAuthenticationProvider
      additionalContextValues={{ getUserGroups: () => [] }}
    >
      <GlobalDataLayer translations={translations}>
        <ColorProvider colorOptions={colorOptions}>
          <FirstExampleContextComponent>
            <SecondExampleContextComponent>
              <UILayer
                headerOptions={headerOptions}
                tabAndContentWrappers={views}
                startingPoint="/"
                authenticationView={AWSAuthenticationView}
                menuOptions={menuSettingsOptions}
                collabsible={true}
                documentsLabelKey="Legal_documents"
                documentsComponent={LegalDocuments}
              />
            </SecondExampleContextComponent>
          </FirstExampleContextComponent>
        </ColorProvider>
      </GlobalDataLayer>
    </DummyAuthenticationProvider>
  );
}

export default App;
