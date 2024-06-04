import React from "react";
import { SelectButton } from "primereact/selectbutton";
import { useState } from "react";
import translationES from "./assets/translations/es.json";
import { UILayer } from "iav-frontend-framework/uiLayer";
import { GlobalDataLayer } from "iav-frontend-framework/globalDataLayer";
import { AWSAuthenticationProvider } from "iav-frontend-framework/awsAuthenticationProvider";
import { TranslateFunctionType } from "iav-frontend-framework/translationFunction";
import { AWSAuthenticationView } from "iav-frontend-framework/awsAuthenticationView";
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
import { simpleNavbarTabFactory } from "iav-frontend-framework/simpleNavbarTabFactory";
import { privilegedNavbarTabFactory } from "iav-frontend-framework/privilegedNavbarTabFactory";
import { ExampleComponent2 } from "./components/exampleComponent2";

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
      "/example1/",
      simpleNavbarTabFactory({
        disabled: false,
        name: "Example without Translation",
      }),
      ExampleComponent1
    ),
    new Group(
      (t: TranslateFunctionType) => t("Test_group_not_collapsible"),
      <InfoIcon />,
      false,
      [
        new BasicContentWrapper(
          "/group-example2/",
          simpleNavbarTabFactory({
            name: (t: TranslateFunctionType) =>
              t("example_component", { count: 2 }),
            disabled: false,
            icon: <InfoIcon />,
          }),
          ExampleComponent2
        ),
      ]
    ),
    new BasicContentWrapper(
      "/group-example3/",
      privilegedNavbarTabFactory({
        name: (t: TranslateFunctionType) =>
          t("example_component", { count: 3 }),
        disabled: false,
        permittedGroups: ["ADMIN"],
        icon: <InfoIcon />,
      }),
      ExampleComponent3
    ),
    new BasicContentWrapper(
      "/group-example4/",
      simpleNavbarTabFactory({
        name: (t: TranslateFunctionType) =>
          t("example_component", { count: 4 }),
        disabled: false,
        icon: <InfoIcon />,
      }),
      ExampleComponent4
    ),
    new Group(
      (t: TranslateFunctionType) => t("Test_group_collapsible"),
      <InfoIcon />,
      true,
      [
        new Group("Untergruppe", <InfoIcon />, true, [
          new BasicContentWrapper(
            "/group-example51/",
            simpleNavbarTabFactory({
              name: (t: TranslateFunctionType) =>
                t("example_component", { count: 5.1 }),
              disabled: false,
              icon: <InfoIcon />,
            }),
            ExampleComponent3
          ),
        ]),
        new BasicContentWrapper(
          "/group-example52/",
          simpleNavbarTabFactory({
            name: (t: TranslateFunctionType) =>
              t("example_component", { count: 5.2 }),
            disabled: false,
            icon: <InfoIcon />,
          }),
          ExampleComponent4
        ),
        new BasicContentWrapper(
          "/group-example53/",
          simpleNavbarTabFactory({
            name: (t: TranslateFunctionType) =>
              t("example_component", { count: 5.3 }),
            disabled: true,
            icon: <InfoIcon />,
          }),
          ExampleComponent3
        ),
      ]
    ),
    new BasicContentWrapper(
      "/group-example6/",
      simpleNavbarTabFactory({
        name: (t: TranslateFunctionType) =>
          t("example_component", { count: 6 }),
        disabled: false,
        icon: <InfoIcon />,
      }),
      ExampleComponent5
    ),
    new BasicContentWrapper(
      "/group-example7/",
      simpleNavbarTabFactory({
        name: (t: TranslateFunctionType) =>
          t("example_component", { count: 7 }),
        disabled: false,
        icon: <InfoIcon />,
      }),
      ExampleComponent6
    ),
    new BasicContentWrapper(
      "/nested-route-example/",
      simpleNavbarTabFactory({
        name: (t: TranslateFunctionType) =>
          t("example_component", { count: 8 }),
        disabled: false,
        icon: <InfoIcon />,
      }),
      ExampleComponent6
    ),
  ];

  const appLogo = <span className="ml-3">Example application</span>;

  return (
    <AWSAuthenticationProvider
      configureAmplify={() => {}}
      failOnNoLegalGroup={false}
    >
      <GlobalDataLayer
        translations={translations}
        colorSettings={{
          colorOptions: {},
        }}
      >
        <UILayer
          tabAndContentWrappers={views}
          startingPoint="/"
          authenticationView={AWSAuthenticationView}
          settingsMenuOptions={settingsMenuOptions}
          documentsLabelKey="Legal_documents"
          documentsComponent={LegalDocuments}
          headerOptions={{
            reactElementLeft: appLogo,
          }}
        />
      </GlobalDataLayer>
    </AWSAuthenticationProvider>
  );
}

export default App;
