/**
 * Copyright © 2025 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SelectButton } from "primereact/selectbutton";
import { useState } from "react";
import { UILayer } from "@iavofficial/frontend-framework/uiLayer";
import { BasicContentWrapper } from "@iavofficial/frontend-framework/basicContentWrapper";
import { Group } from "@iavofficial/frontend-framework/group";
import InfoIcon from "./assets/infoIcon.svg?react";
import { ImprintDocument } from "./components/imprintDocument";
import { PrivacyPolicyDocument } from "./components/privacyPolicyDocument";
import { ExampleComponent1 } from "./components/exampleComponent1";
import { ExampleComponent6 } from "./components/exampleComponent6";
import { ExampleComponent3 } from "./components/exampleComponent3";
import { ExampleComponent4 } from "./components/exampleComponent4";
import { ExampleComponent5 } from "./components/exampleComponent5";
import { simpleNavbarTabFactory } from "@iavofficial/frontend-framework/simpleNavbarTabFactory";
import { privilegedNavbarTabFactory } from "@iavofficial/frontend-framework/privilegedNavbarTabFactory";
import { ExampleComponent2 } from "./components/exampleComponent2";
import { HeaderPanelElement } from "@iavofficial/frontend-framework/headerPanelElement";
import { PrimeIcons } from "primereact/api";
import { WHITE } from "@iavofficial/frontend-framework/constants";
import { HeaderMenuElement } from "@iavofficial/frontend-framework/headerMenuElement";
import { ExampleComponent7 } from "./components/exampleComponent7";
import { LegalDocument } from "@iavofficial/frontend-framework/legalDocument";
import { ExampleComponent8 } from "./components/exampleComponent8";
import { ExampleComponent9 } from "./components/exampleComponent9";
import { ExampleComponent10 } from "./components/exampleComponent10.tsx";

interface Props {
  authenticationView?: React.ComponentType;
}

const bellIcon = (
  <path d="M12 2a4 4 0 0 0-4 4v1.2c0 1.9-.7 3.7-2 5.1L4.5 14h15l-1.5-1.7a7.7 7.7 0 0 1-2-5.1V6a4 4 0 0 0-4-4Zm-2 15h4a2 2 0 0 1-4 0Z" />
);

const Layout = (props: Props) => {
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

  const colorExampleGroup = new Group(
    "Color example group",
    <InfoIcon />,
    true,
    [
      new BasicContentWrapper(
        "/color-example-1/",
        simpleNavbarTabFactory({
          name: "Color example tab 1",
          disabled: false,
          icon: <InfoIcon />,
        }),
        ExampleComponent1,
      ),
      new BasicContentWrapper(
        "/color-example-2/",
        simpleNavbarTabFactory({
          name: "Color example tab 2",
          disabled: false,
          icon: <InfoIcon />,
        }),
        ExampleComponent2,
      ),
    ],
    {
      collapsedLogo: <InfoIcon />,
      colors: {
        group: {
          defaultBackgroundColor: "#f3e8ff",
          hoverBackgroundColor: "#e9d5ff",
          activeBackgroundColor: "#c084fc",
        },
        tabs: {
          defaultBackgroundColor: "#faf5ff",
          hoverBackgroundColor: "#f3e8ff",
          activeBackgroundColor: "#d8b4fe",
          insideGroupBackgroundColor: "#faf5ff",
        },
      },
    },
  );

  const views = [
    new BasicContentWrapper(
      "/",
      simpleNavbarTabFactory({
        disabled: false,
        name: "Example without Translation",
        icon: <InfoIcon />,
      }),
      ExampleComponent1,
    ),
    new BasicContentWrapper(
      "/2",
      simpleNavbarTabFactory({
        disabled: false,
        name: "Example for Redux Store",
        icon: <InfoIcon />,
      }),
      ExampleComponent7,
    ),
    new BasicContentWrapper(
      "/notifications",
      simpleNavbarTabFactory({
        disabled: false,
        name: "Notifications",
        icon: bellIcon,
        animation: {
          type: "pulse",
          color: "#fff3a3",
          duration: 1800,
        },
      }),
      ExampleComponent7,
    ),
    new Group(
      (t) => t({ key: "Test_group_not_collapsible" }),
      <InfoIcon />,
      false,
      [
        new BasicContentWrapper(
          "/group-example2/",
          simpleNavbarTabFactory({
            name: (t) => t({ key: "example_component", options: { count: 2 } }),
            disabled: false,
            icon: <InfoIcon />,
          }),
          ExampleComponent2,
        ),
      ],
      {
        collapsedLogo: <InfoIcon />,
      },
    ),
    colorExampleGroup,
    new BasicContentWrapper(
      "/group-example3/",
      privilegedNavbarTabFactory({
        name: (t) => t({ key: "example_component", options: { count: 3 } }),
        disabled: false,
        permittedGroups: ["ADMIN"],
        icon: <InfoIcon />,
      }),
      ExampleComponent3,
    ),
    new BasicContentWrapper(
      "/group-example4/",
      simpleNavbarTabFactory({
        name: (t) => t({ key: "example_component", options: { count: 4 } }),
        disabled: false,
        icon: <InfoIcon />,
      }),
      ExampleComponent4,
    ),
    new Group(
      (t) => t({ key: "Test_group_collapsible" }),
      <InfoIcon />,
      true,
      [
        new Group("Untergruppe", <InfoIcon />, true, [
          new BasicContentWrapper(
            "/group-example51/",
            simpleNavbarTabFactory({
              name: (t) =>
                t({ key: "example_component", options: { count: 5.1 } }),
              disabled: false,
              icon: <InfoIcon />,
            }),
            ExampleComponent3,
          ),
        ]),
        new BasicContentWrapper(
          "/group-example52/",
          simpleNavbarTabFactory({
            name: (t) =>
              t({ key: "example_component", options: { count: 5.2 } }),
            disabled: false,
            icon: <InfoIcon />,
          }),
          ExampleComponent4,
        ),
        new BasicContentWrapper(
          "/group-example53/",
          simpleNavbarTabFactory({
            name: (t) =>
              t({ key: "example_component", options: { count: 5.3 } }),
            disabled: true,
            icon: <InfoIcon />,
          }),
          ExampleComponent3,
        ),
      ],
      {
        collapsedLogo: <InfoIcon />,
        colors: {
          group: {
            defaultBackgroundColor: "#f4f7fb",
            hoverBackgroundColor: "#dce8f5",
            activeBackgroundColor: "#b7cee6",
          },
          tabs: {
            defaultBackgroundColor: "#eef4fa",
            hoverBackgroundColor: "#dce8f5",
            activeBackgroundColor: "#b7cee6",
            insideGroupBackgroundColor: "#eef4fa",
          },
        },
      },
    ),
    new BasicContentWrapper(
      "/group-example6/",
      simpleNavbarTabFactory({
        name: (t) => t({ key: "example_component", options: { count: 6 } }),
        disabled: false,
        icon: <InfoIcon />,
      }),
      ExampleComponent5,
    ),
    new BasicContentWrapper(
      "/group-example7/",
      simpleNavbarTabFactory({
        name: (t) => t({ key: "example_component", options: { count: 7 } }),
        disabled: false,
        icon: <InfoIcon />,
      }),
      ExampleComponent6,
    ),
    new BasicContentWrapper(
      "/nested-route/example1/",
      simpleNavbarTabFactory({
        name: (t) => t({ key: "example_component", options: { count: 8 } }),
        disabled: false,
        icon: <InfoIcon />,
      }),
      ExampleComponent6,
    ),
    new Group((t) => t({ key: "modules" }), <InfoIcon />, true, [
      new BasicContentWrapper(
        "/content-with-bar-example-1/",
        simpleNavbarTabFactory({
          name: (t) => t({ key: "example_component", options: { count: 9 } }),
          disabled: false,
          icon: <InfoIcon />,
        }),
        ExampleComponent8,
      ),
      new BasicContentWrapper(
        "/content-with-bar-example-2/",
        simpleNavbarTabFactory({
          name: (t) => t({ key: "example_component", options: { count: 10 } }),
          disabled: false,
          icon: <InfoIcon />,
        }),
        ExampleComponent9,
      ),
      new BasicContentWrapper(
        "/header-example-1/",
        simpleNavbarTabFactory({
          name: (t) => t({ key: "example_component", options: { count: 11 } }),
          disabled: false,
          icon: <InfoIcon />,
        }),
        ExampleComponent10,
      ),
    ]),
  ];

  const items = [
    {
      label: "Translate",
      icon: "pi pi-language",
    },
    {
      label: "Speech",
      icon: "pi pi-volume-up",
      items: [
        {
          label: "Start",
          icon: "pi pi-caret-right",
        },
        {
          label: "Stop",
          icon: "pi pi-pause",
        },
      ],
    },
    {
      separator: true,
    },
    {
      label: "Print",
      icon: "pi pi-print",
    },
  ];

  const headerElements = [
    <HeaderPanelElement icon={PrimeIcons.BELL} iconstyle={{ color: WHITE }}>
      <ExampleComponent4 />
    </HeaderPanelElement>,
    <HeaderMenuElement
      icon={PrimeIcons.HEART}
      model={items}
      iconstyle={{ color: WHITE }}
    />,
  ];

  const legalDocuments: LegalDocument[] = [
    {
      type: "callback",
      id: "callback-example",
      titleTranslationKey: "callback_example",
      callback: () => {
        window.alert("Callback executed");
      },
    },
    {
      path: "/imprint",
      titleTranslationKey: "Imprint",
      component: ImprintDocument,
      isHidden: false,
      target: "_self",
    },
    {
      path: "/privacy-policy",
      titleTranslationKey: "Privacy_Policy",
      component: PrivacyPolicyDocument,
      isHidden: false,
    },
  ];

  return (
    <UILayer
      authOptions={{
        errorMessages: {
          passwordErrorMessage: "Invalid password. Please try again.",
        },
      }}
      tabAndContentWrappers={views}
      initialPath="/"
      navbarOptions={{ breakAfterIndex: 5 }}
      authenticationView={props.authenticationView}
      settingsMenuOptions={settingsMenuOptions}
      legalDocuments={legalDocuments}
      headerOptions={{
        userIcon: <InfoIcon style={{ backgroundColor: WHITE }} />,
        reactElementLeft: <span className="ml-3">Dev application</span>,
        headerElements: headerElements,
        hideUserIcon: false,
      }}
    />
  );
};

export default Layout;
