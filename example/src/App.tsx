import 'primeflex/primeflex.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { SelectButton } from 'primereact/selectbutton';
import { useState } from 'react';
import translationES from './assets/translations/es.json';
import { UILayer } from 'disa-framework/uiLayer';
import { GlobalDataLayer } from 'disa-framework/globalDataLayer';
import { DummyAuthenticationProvider } from 'disa-framework/dummyAuthenticationProvider';
import { TranslateFunctionType } from 'disa-framework/language';
import { SimpleNavbarTab } from 'disa-framework/simpleNavbarTab';
import { PrivilegedNavbarTab } from 'disa-framework/privilegedNavbarTab';
import { BasicAuthenticationView } from 'disa-framework/basicAuthenticationView';
import { AWSAuthenticationView } from 'disa-framework/awsAuthenticationView';
import { BasicContentWrapper } from 'disa-framework/basicContentWrapper';
import { Group } from 'disa-framework/group';
import { ColorProvider } from 'disa-framework/colorProvider';
import translationEN from './assets/translations/en.json';
import translationDE from './assets/translations/de.json';
import translationDECH from './assets/translations/de-CH.json';
import { ReactComponent as InfoIcon } from './assets/infoIcon_selected.svg';
import { LegalDocuments } from './components/legalDocuments';
import { ExampleComponent1 } from './components/exampleComponent1';
import { ExampleComponent2 } from './components/exampleComponent2';
import { ExampleComponent3 } from './components/exampleComponent3';
import { ExampleComponent4 } from './components/exampleComponent4';
import { ExampleComponent5 } from './components/exampleComponent5';

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
      ExampleComponent1
    ),
    new Group(
      (t: TranslateFunctionType) => t('Test_group_not_collapsible'),
      <InfoIcon />,
      false,
      [
        new BasicContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t('example_component', { count: 2 })
              }
              to="/group-example1"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent2
        ),
        new BasicContentWrapper(
          (
            <PrivilegedNavbarTab
              name={(t: TranslateFunctionType) =>
                t('example_component', { count: 3 })
              }
              to="/group-example3"
              disabled={false}
              permittedGroups={['ADMIN']}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent3
        ),
        new BasicContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t('example_component', { count: 4 })
              }
              to="/group-example4"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent4
        ),
        new Group(
          (t: TranslateFunctionType) => t('Test_group_collapsible'),
          <InfoIcon />,
          true,
          [
            new BasicContentWrapper(
              (
                <SimpleNavbarTab
                  name={(t: TranslateFunctionType) =>
                    t('example_component', { count: 5.1 })
                  }
                  to="/group-example51"
                  disabled={true}
                  icon={<InfoIcon />}
                />
              ),
              ExampleComponent3
            ),
            new BasicContentWrapper(
              (
                <SimpleNavbarTab
                  name={(t: TranslateFunctionType) =>
                    t('example_component', { count: 5.2 })
                  }
                  to="/group-example52"
                  disabled={false}
                  icon={<InfoIcon />}
                />
              ),
              ExampleComponent4
            ),
          ]
        ),
        new BasicContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t('example_component', { count: 6 })
              }
              to="/group-example6"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent5
        ),
      ]
    ),
  ];

  // const LIGHT = '#D3DBE5';
  // const BACKGROUND = '#E6E9F1';
  // const AUSWAHL = '#F2E4C9';
  // const HIGHLIGHT = '#D4A64E';
  // const HIGHLIGHT_DARK = '#805D1A';
  // const DARK1 = '#162230';
  // const DARK2 = '#273444';
  // const DARK3 = '#455263';

  // let colorOptions = {
  //   headerColorOptions: {
  //     backgroundColor: DARK1,
  //   },
  //   navbarColorOptions: {
  //     backgroundColor: DARK1,
  //     navbarCollapseArrowColor: WHITE,
  //     legalDocumentsIconColor: WHITE,
  //     tabColorOptions: {
  //       mainColor: DARK1,
  //       highlightColor: DARK3,
  //       letteringMainColor: LIGHT,
  //       letteringHighlightColor: HIGHLIGHT,
  //       iconMainColor: LIGHT,
  //       iconHighlightColor: HIGHLIGHT,
  //     },
  //   },
  //   contentColorOptions: {
  //     // contentBackground: GREEN,
  //     // contentCellBackground: RED,
  //   },
  //   contentbarColorOptions: {
  //     // backgroundColor: GREEN,
  //     buttonColorMain: LIGHT,
  //     buttonColorHighlight: HIGHLIGHT,
  //     iconMainColor: BLACK,
  //     iconHighlightColor: WHITE,
  //   },
  //   contentbarTabColorOptions: {
  //     highlightColor: HIGHLIGHT,
  //     mainColor: LIGHT,
  //     textMainColor: BLACK,
  //     textHighlightColor: WHITE,
  //     iconMainColor: BLACK,
  //     iconHighlightColor: WHITE,
  //   },
  //   authenticationColorOptions: {
  //     fullScreenBackgroundColor: WHITE,
  //     // loginFormBackgroundColor: GREEN,
  //     loginButtonBackgroundColor: HIGHLIGHT,
  //     // loginButtonTextColor: GREEN,
  //     headerBackgroundColor: DARK1,
  //     companyTextColor: DARK1,
  //     legalNoticeIconColor: DARK1,
  //     // inputFieldDescriptionTextColor: GREEN,
  //     // inputFieldBackgroundColor: GREEN,
  //     // inputFieldTextColor: WHITE,
  //     // passwortRequirementsTextColor: GREEN,
  //   },
  // };

  // let headerOptions = {
  //   hideRight: true,
  //   reactElementLeft: <img src={applogo} />,
  // };

  return (
    <DummyAuthenticationProvider
      additionalContextValues={{ getUserGroups: () => [] }}
    >
      <GlobalDataLayer translations={translations}>
        <ColorProvider>
          <UILayer
            tabAndContentWrappers={views}
            startingPoint="/"
            authenticationView={AWSAuthenticationView}
            menuOptions={menuSettingsOptions}
            collabsible={true}
            documentsLabelKey="Legal_documents"
            documentsComponent={LegalDocuments}
          />
        </ColorProvider>
      </GlobalDataLayer>
    </DummyAuthenticationProvider>
  );
}

export default App;
