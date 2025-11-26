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

import React from "react";
import Page from "../../../common/page/page";
import Title from "../../../common/page/text/title";
import Text from "../../../common/page/text/text";
import SubTitle from "../../../common/page/text/subTitle";
import Code from "../../../common/page/utils/code";

const PageHowToMigrate: React.FC = () => (
  <Page>
    <Title>How to migrate to the modular frontend framework</Title>

    <Text>
      This page explains how to move from a setup where the framework is used in
      a non-modular way to the modular architecture based on modules with a
      shared store.
    </Text>

    <SubTitle>1. From configuration to composition</SubTitle>
    <Text>
      In a non-modular setup, it is common to pass translations, color options
      and sometimes authentication-related pieces directly into{" "}
      <code>GlobalDataLayer</code> and then render a layout component inside it.
      In the modular setup, <code>GlobalDataLayer</code> no longer receives
      these details. Instead, it only gets two things:
    </Text>
    <ul>
      <li>
        a Redux <code>store</code>
      </li>
      <li>
        a <code>modules</code> object that contains all configured modules
      </li>
    </ul>
    <Code
      title={"Non-modular usage (before) in App.tsx"}
      language="tsx"
    >{`<GlobalDataLayer
  translations={...}
  colorSettings={...}
>
  <Layout />
</GlobalDataLayer>`}</Code>
    <Code
      title={"Modular usage (after) in App.tsx"}
      language="tsx"
    >{`<GlobalDataLayer store={store} modules={modules.all}>
  <Layout />
</GlobalDataLayer>`}</Code>

    <SubTitle>2. Where responsibilities move to</SubTitle>
    <Text>
      In the modular architecture, the main framework responsibilities are
      distributed across dedicated modules:
    </Text>
    <ul>
      <li>
        The <b>Internationalizer module</b> manages translations and language
        switching instead of passing translation objects into{" "}
        <code>GlobalDataLayer</code>.
      </li>
      <li>
        The <b>Authenticator module</b> manages login state, tokens and related
        thunks instead of wrapping the application with an authentication
        provider component.
      </li>
      <li>
        The <b>UI module</b> wires header, navbar, content bar and cookie banner
        to the store and color settings and allows you to plug in your own UI
        components.
      </li>
      <li>
        The <b>Router module</b> provides routing components and hooks, such as
        the main router and link elements.
      </li>
    </ul>
    <Text>
      Your own application code becomes thinner: it configures modules once and
      then focuses on layout and domain-specific views.
    </Text>

    <SubTitle>3. Creating modules and the store</SubTitle>
    <Text>
      A modular application starts with creating a set of modules and building a
      store from them. At a high level, this looks as follows:
    </Text>

    <Code title={"store.ts"} language="ts">{`import {
  createModules,
  StoreBuilder,
} from "@iavofficial/frontend-framework/store";
import { configureStore } from "@reduxjs/toolkit";
import { MandatoryModuleNames } from "@iavofficial/frontend-framework/constants";
import { I18NextInternationalizer } from "@iavofficial/frontend-framework/defaultModules";
import { ReactRouterRouter } from "@iavofficial/frontend-framework-shared/reactRouterRouterModule";
import { UIModule } from "@iavofficial/frontend-framework-shared/uiModule";

const customModules = {
  [MandatoryModuleNames.Internationalizer]: new I18NextInternationalizer({
    translationResources: {/* your translations */},
  }),
  [MandatoryModuleNames.Router]: new ReactRouterRouter(),
  [MandatoryModuleNames.UI]: new UIModule({
    UILayerHeader: YourHeader,
    UILayerNavbar: YourNavbar,
    UILayerCookieBanner: YourCookieBanner,
    UILayerContentBar: YourContentBar,
  }),
  // optionally: Authenticator, additional user modules, ...
};

export const modules = createModules(customModules);

export const store = new StoreBuilder(modules.storeModules)
  .setFrameworkModuleProcessor(
    MandatoryModuleNames.UI,
    (module, storeConfigBuilder) => {
      storeConfigBuilder.setReducer(
        MandatoryModuleNames.UI,
        module.slice.reducer,
      );
    },
  )
  .setFrameworkModuleProcessor(
    MandatoryModuleNames.Internationalizer,
    (module, storeConfigBuilder) => {
      storeConfigBuilder.setReducer(
        MandatoryModuleNames.Internationalizer,
        module.slice.reducer,
      );
    },
  )
  .setStoreBuilder((storeConfig) =>
    configureStore({
      reducer: storeConfig.reducers,
      middleware: (getDefaultMiddleware: Function) =>
        getDefaultMiddleware().concat(storeConfig.middleware),
      enhancers: (getDefaultEnhancers: Function) =>
        getDefaultEnhancers().concat(storeConfig.enhancers),
    }),
  )
  .build();`}</Code>

    <Text>
      Once this is in place, the only thing left to do at the application
      boundary is to hand <code>store</code> and <code>modules.all</code> to{" "}
      <code>GlobalDataLayer</code>.
    </Text>

    <SubTitle>4. Layout and UILayer</SubTitle>
    <Text>
      The layout itself changes much less than the configuration around it. You
      still use <code>UILayer</code> to connect header, navbar, content bar and
      your content wrappers. The main conceptual change is in the props:
    </Text>
    <ul>
      <li>
        The initial route is now passed as <code>initialPath</code> instead of
        <code>startingPoint</code>.
      </li>
      <li>
        Legal documents are configured via a <code>legalDocuments</code> array
        instead of separate document label and component props.
      </li>
      <li>
        The cookie banner handling is driven by the UI module and its cookie
        banner component instead of a dedicated flag on the UILayer.
      </li>
    </ul>

    <Code
      title={"Layout.tsx"}
      language="tsx"
    >{`import { UILayer } from "@iavofficial/frontend-framework/uiLayer";
import { BasicContentWrapper } from "@iavofficial/frontend-framework/basicContentWrapper";
import { simpleNavbarTabFactory } from "@iavofficial/frontend-framework/simpleNavbarTabFactory";
import type { LegalDocument } from "@iavofficial/frontend-framework/legalDocument";

const views = [
  new BasicContentWrapper(
    "/",
    simpleNavbarTabFactory({ name: "Home", disabled: false }),
    HomeComponent,
  ),
  // more wrappers...
];

const legalDocuments: LegalDocument[] = [
  {
    path: "/imprint",
    titleTranslationKey: "Imprint",
    component: ImprintPage,
  },
];

const Layout = () => (
  <UILayer
    authOptions={{ errorMessages: { passwordErrorMessage: "..." } }}
    tabAndContentWrappers={views}
    initialPath="/"
    legalDocuments={legalDocuments}
    headerOptions={{
      reactElementLeft: <span>Application</span>,
      headerElements: [],
    }}
  />
);`}</Code>

    <Text>
      This means that most of your existing layout code can be kept. The
      migration work focuses on how translation, authentication and UI wiring
      are provided.
    </Text>

    <SubTitle>5. Step-by-step migration guide</SubTitle>
    <Text>
      A practical way to migrate an existing application is to follow these
      steps:
    </Text>
    <ol>
      <li>
        Introduce <code>createModules</code> and <code>StoreBuilder</code> and
        create a centralized <code>store</code> and <code>modules</code> object.
      </li>
      <li>
        Move translation configuration into an{" "}
        <code>I18NextInternationalizer</code> module and remove translation
        props from <code>GlobalDataLayer</code>.
      </li>
      <li>
        If you use authentication, move the logic into an Authenticator module
        and remove authentication provider components from around your app.
      </li>
      <li>
        Introduce a <code>UIModule</code> and provide your header, navbar,
        cookie banner and content bar components through its constructor instead
        of configuring them ad hoc.
      </li>
      <li>
        Replace the old <code>GlobalDataLayer</code> usage so that it receives{" "}
        <code>store</code> and <code>modules.all</code> and nothing else.
      </li>
      <li>
        Update <code>UILayer</code> props to the current names (
        <code>initialPath</code>, <code>legalDocuments</code>, etc.) and remove
        any props that have moved into modules.
      </li>
    </ol>

    <Text>
      After this migration, your application will still look and behave as
      before, but framework-related concerns are now modularized, testable and
      reusable across projects.
    </Text>
  </Page>
);

export default PageHowToMigrate;
