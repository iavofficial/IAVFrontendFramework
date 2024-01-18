import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import React from "react";
import { SelectButton } from "primereact/selectbutton";
import { useState } from "react";
import translationES from "./assets/translations/es.json";
import { UILayer } from "iav-frontend-framework/uiLayer";
import { GlobalDataLayer } from "iav-frontend-framework/globalDataLayer";
import { DummyAuthenticationProvider } from "iav-frontend-framework/dummyAuthenticationProvider";
import { TranslateFunctionType } from "iav-frontend-framework/translationFunction";
import { SimpleNavbarTab } from "iav-frontend-framework/simpleNavbarTab";
import { PrivilegedNavbarTab } from "iav-frontend-framework/privilegedNavbarTab";
import { BasicAuthenticationView } from "iav-frontend-framework/basicAuthenticationView";
import { BasicContentWrapper } from "iav-frontend-framework/basicContentWrapper";
import { Group } from "iav-frontend-framework/group";
import translationEN from "./assets/translations/en.json";
import translationDE from "./assets/translations/de.json";
import translationDECH from "./assets/translations/de-CH.json";
import { ReactComponent as InfoIcon } from "./assets/infoIcon.svg";
import { LegalDocuments } from "./components/legalDocuments";
import { ExampleComponent1 } from "./components/exampleComponent1";
import { ExampleComponent6 } from "./components/exampleComponent6";
import { ExampleComponent3 } from "./components/exampleComponent3";
import { ExampleComponent4 } from "./components/exampleComponent4";
import { ExampleComponent5 } from "./components/exampleComponent5";
import { ExampleComponent2 } from "./components/exampleComponent2";
import { GroupableContentWrapper } from "iav-frontend-framework/groupableContentWrapper";

function App() {
  const [selectedButtonOption, setSelectedButtonOption] = useState("Simulated");

  const settingsMenuOptions = {
    additionalItems: [
      {
        template: (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SelectButton
              options={["Simulated", "Real"]}
              value={selectedButtonOption}
              onChange={(ev) => setSelectedButtonOption(ev.value)}
            />
          </div>
        ),
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
          name={"Example without Translation"}
          to="/"
          icon={<InfoIcon />}
          disabled={false}
        />
      ),
      ExampleComponent1
    ),
    new Group(
      (t: TranslateFunctionType) => t("Test_group_not_collapsible"),
      <InfoIcon />,
      false,
      [
        new GroupableContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t("example_component", { count: 2 })
              }
              to="/group-example1"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent2
        ),
        new GroupableContentWrapper(
          (
            <PrivilegedNavbarTab
              name={(t: TranslateFunctionType) =>
                t("example_component", { count: 3 })
              }
              to="/group-example3"
              disabled={false}
              permittedGroups={["ADMIN"]}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent3
        ),
        new GroupableContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t("example_component", { count: 4 })
              }
              to="/group-example4"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent4
        ),
        new Group(
          (t: TranslateFunctionType) => t("Test_group_collapsible"),
          <InfoIcon />,
          true,
          [
            new GroupableContentWrapper(
              (
                <SimpleNavbarTab
                  name={(t: TranslateFunctionType) =>
                    t("example_component", { count: 5.1 })
                  }
                  to="/group-example51"
                  disabled={true}
                  icon={<InfoIcon />}
                />
              ),
              ExampleComponent3
            ),
            new GroupableContentWrapper(
              (
                <SimpleNavbarTab
                  name={(t: TranslateFunctionType) =>
                    t("example_component", { count: 5.2 })
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
        new GroupableContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t("example_component", { count: 6 })
              }
              to="/group-example6"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent5
        ),
        new GroupableContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t("example_component", { count: 7 })
              }
              to="/group-example7"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent6
        ),

        new GroupableContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t("example_component", { count: 7 })
              }
              to="/group-example7"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent6
        ),
        new GroupableContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t("example_component", { count: 7 })
              }
              to="/group-example7"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent6
        ),
        new GroupableContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t("example_component", { count: 7 })
              }
              to="/group-example7"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent6
        ),
        new GroupableContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t("example_component", { count: 7 })
              }
              to="/group-example7"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent6
        ),
        new GroupableContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t("example_component", { count: 7 })
              }
              to="/group-example7"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent6
        ),
        new GroupableContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t("example_component", { count: 7 })
              }
              to="/group-example7"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent6
        ),
        new GroupableContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t("example_component", { count: 7 })
              }
              to="/group-example7"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent6
        ),
        new GroupableContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t("example_component", { count: 7 })
              }
              to="/group-example7"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent6
        ),
        new GroupableContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t("example_component", { count: 7 })
              }
              to="/group-example7"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent6
        ),
        new GroupableContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t("example_component", { count: 7 })
              }
              to="/group-example7"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent6
        ),
        new GroupableContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t("example_component", { count: 7 })
              }
              to="/group-example7"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent6
        ),
        new GroupableContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t("example_component", { count: 7 })
              }
              to="/group-example7"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent6
        ),
        new GroupableContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t("example_component", { count: 7 })
              }
              to="/group-example7"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent6
        ),
        new GroupableContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t("example_component", { count: 7 })
              }
              to="/group-example7"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent6
        ),
        new GroupableContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t("example_component", { count: 7 })
              }
              to="/group-example7"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent6
        ),
        new GroupableContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t("example_component", { count: 7 })
              }
              to="/group-example7"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent6
        ),
        new GroupableContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t("example_component", { count: 7 })
              }
              to="/group-example7"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent6
        ),
        new GroupableContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t("example_component", { count: 7 })
              }
              to="/group-example7"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent6
        ),
        new GroupableContentWrapper(
          (
            <SimpleNavbarTab
              name={(t: TranslateFunctionType) =>
                t("example_component", { count: 7 })
              }
              to="/group-example7"
              disabled={false}
              icon={<InfoIcon />}
            />
          ),
          ExampleComponent6
        ),
      ]
    ),
  ];

  return (
    <DummyAuthenticationProvider
      additionalContextValues={{ getUserGroups: () => [] }}
    >
      <GlobalDataLayer translations={translations}>
        <UILayer
          tabAndContentWrappers={views}
          startingPoint="/"
          authenticationView={BasicAuthenticationView}
          settingsMenuOptions={settingsMenuOptions}
          documentsLabelKey="Legal_documents"
          documentsComponent={LegalDocuments}
        />
      </GlobalDataLayer>
    </DummyAuthenticationProvider>
  );
}

export default App;
