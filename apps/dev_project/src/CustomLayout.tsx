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

import React, { useMemo } from "react";
import InfoIcon from "./assets/infoIcon.svg?react";
import { UILayer } from "@iavofficial/frontend-framework/uiLayer";
import { BasicContentWrapper } from "@iavofficial/frontend-framework/basicContentWrapper";
import { simpleNavbarTabFactory } from "@iavofficial/frontend-framework/simpleNavbarTabFactory";
import { HeaderPanelElement } from "@iavofficial/frontend-framework/headerPanelElement";
import { HeaderMenuElement } from "@iavofficial/frontend-framework/headerMenuElement";
import { PrimeIcons } from "primereact/api";
import { WHITE } from "@iavofficial/frontend-framework/constants";
import { LegalDocument } from "@iavofficial/frontend-framework/legalDocument";
import { ExampleComponent1 } from "./components/exampleComponent1";
import { ExampleComponent2 } from "./components/exampleComponent2";
import { ExampleComponent3 } from "./components/exampleComponent3";
import { ExampleComponent4 } from "./components/exampleComponent4";
import { ExampleComponent5 } from "./components/exampleComponent5";
import { ExampleComponent6 } from "./components/exampleComponent6";
import { ExampleComponent7 } from "./components/exampleComponent7";
import CustomHeader from "./components/ui_test/CustomHeader";
import CustomNavbar from "./components/ui_test/CustomNavbar";
import CustomCookieBanner from "./components/ui_test/CustomCookieBanner";

const CustomLayout: React.FC = () => {
  const views = useMemo(
    () => [
      new BasicContentWrapper(
        "/",
        simpleNavbarTabFactory({
          disabled: false,
          name: "Example 1",
          icon: <InfoIcon />,
        }),
        ExampleComponent1,
      ),
      new BasicContentWrapper(
        "/two",
        simpleNavbarTabFactory({
          disabled: false,
          name: "Example 2",
          icon: <InfoIcon />,
        }),
        ExampleComponent2,
      ),
      new BasicContentWrapper(
        "/three",
        simpleNavbarTabFactory({
          disabled: false,
          name: "Example 3",
          icon: <InfoIcon />,
        }),
        ExampleComponent3,
      ),
      new BasicContentWrapper(
        "/four",
        simpleNavbarTabFactory({
          disabled: false,
          name: "Example 4",
          icon: <InfoIcon />,
        }),
        ExampleComponent4,
      ),
      new BasicContentWrapper(
        "/five",
        simpleNavbarTabFactory({
          disabled: false,
          name: "Example 5",
          icon: <InfoIcon />,
        }),
        ExampleComponent5,
      ),
      new BasicContentWrapper(
        "/six",
        simpleNavbarTabFactory({
          disabled: false,
          name: "Example 6",
          icon: <InfoIcon />,
        }),
        ExampleComponent6,
      ),
      new BasicContentWrapper(
        "/redux",
        simpleNavbarTabFactory({
          disabled: false,
          name: "Redux Store",
          icon: <InfoIcon />,
        }),
        ExampleComponent7,
      ),
    ],
    [],
  );

  const items = [
    { label: "Translate", icon: "pi pi-language" },
    {
      label: "Speech",
      icon: "pi pi-volume-up",
      items: [
        { label: "Start", icon: "pi pi-caret-right" },
        { label: "Stop", icon: "pi pi-pause" },
      ],
    },
    { separator: true },
    { label: "Print", icon: "pi pi-print" },
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
      path: "/imprint",
      titleTranslationKey: "Imprint",
      component: () => <div style={{ padding: 24 }}>Imprint</div>,
      isHidden: false,
    },
    {
      path: "/privacy-policy",
      titleTranslationKey: "Privacy_Policy",
      component: () => <div style={{ padding: 24 }}>Privacy Policy</div>,
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
      settingsMenuOptions={{}}
      legalDocuments={legalDocuments}
      headerOptions={{
        userIcon: <InfoIcon style={{ backgroundColor: WHITE }} />,
        reactElementLeft: <span className="ml-3">Dev application</span>,
        headerElements: headerElements,
        hideUserIcon: false,
      }}
      uiComponents={{
        UILayerHeader: CustomHeader,
        UILayerNavbar: CustomNavbar,
        UILayerCookieBanner: CustomCookieBanner,
      }}
    />
  );
};

export default CustomLayout;
