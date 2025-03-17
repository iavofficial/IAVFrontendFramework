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
 **/

import Page from "../../../common/page/page";
import BulletList from "../../../common/page/text/bulletList";
import SubSubTitle from "../../../common/page/text/subSubTitle";
import SubTitle from "../../../common/page/text/subTitle";
import Text from "../../../common/page/text/text";
import Title from "../../../common/page/text/title";
import Code from "../../../common/page/utils/code";
import Table from "../../../common/page/utils/table";

export const ModulesInDepth = () => (
  <Page>
    <Title>Modules in Depth</Title>
    <Text>
      This page describes advanced functionalities of the module orchestration
      system.
    </Text>
    <SubTitle>
      The different kinds of modules and the method createModulesSeparately
    </SubTitle>
    <Text>
      For precise typing and other processing reasons the Framework splits the
      modules into framework modules and user modules. Furthermore, it splits
      all modules into so called store modules and non store modules. Store
      modules are modules that provide a Slice which should be included inside
      the Redux Store. Non store modules don't provide a Slice. By combining
      these two distinctions you get four types of modules:
    </Text>
    <BulletList
      bulletType="bullet"
      items={[
        `frameworkStoreModules: These are all modules which have default implementations
        and provide a Slice for the Redux store. You can override the default implementations
        with other existing modules (like AWSAuthenticator for authentication) or with custom
        ones.`,
        `userStoreModules: These modules are modules that don't have default implementations
        and because of this aren't relevant for the Framework itself. Furthermore, they are
        relevant for the store and because of that provide a Slice.`,
        `frameworkNonStoreModules: These are modules which have default implementations but
        aren't relevant for the store. Like with frameworkStoreModules you can override them.`,
        `userNonStoreModules: These are modules which don't have a default implementation and
        aren't relevant for the store.`,
      ]}
    />
    <Text>
      For most use cases the <i>createModules</i> method will do just fine.
      Because internally the framework works with the described distinctions of
      module types <i>createModules</i> internally splits up the provided
      modules object into the different types of modules. However, if you want
      to split them up by yourself you can use the method{" "}
      <i>createModulesSeperately</i> which takes four different objects for the
      different types of modules. The following example shows the usage of this
      method.
    </Text>
    <Code language="ts" title="Example usage of createModulesSeperately">
      {`const frameworkStoreModules = {
  [MandatoryModuleNames.Authentication]: new AWSAuthenticator({
    configureAmplify: configureAmplify,
    failOnNoLegalGroup: true,
    legalGroups: ["ADMIN", "SHOWCASE"],
  }),
};

const userStoreModules = {
  userModule: new UserModule({
    // ...
  }),
};

const frameworkNonStoreModules = {
  // ...
};

const userNonStoreModules = {
  userTest: { text: "text"},
};

export const modules = createModulesSeperately({
  frameworkStoreModules,
  userStoreModules,
  frameworkNonStoreModules,
  userNonStoreModules,
});

export const store = new StoreBuilder(modules.storeModules).build();`}
    </Code>
    <SubTitle>StoreBuilder</SubTitle>
    <Text>
      The StoreBuilder allows you to adapt the way framework modules and user
      modules are processed for addition tom the store. To modify this behaviour
      you can define so called processors and add them for specific modules. The
      following example shows you how to add a processor for a framework module.
    </Text>
    <Code
      language="ts"
      title="Example for adding a processor for a framework module"
    >
      {`export const store = new StoreBuilder(modules.storeModules)
  .setFrameworkModuleProcessor(
    MandatoryModuleNames.Authentication,
    (module, storeConfigBuilder) => {
      storeConfigBuilder.setReducer(
        MandatoryModuleNames.Authentication,
        module.slice.reducer
      );
    }
  ).build();`}
    </Code>
    <Text>
      As you can see, a processor method gets two parameters. The first one is
      the specific module for the given key. This is the module you provide a
      processor for. The second parameter is an instance of StoreConfigBuilder.
      This instance gets passed to all processors and allows to add information
      which will later be added to the store. The method definitions of
      StoreConfigBuilder are included in a later section. You can add custom
      processors for user modules in the same way, but using the method{" "}
      <i>setUserModuleProcessor</i>. However, in most use cases the default
      processing of modules may be sufficient.
    </Text>
    <Text>
      Fruthermore, you can adapt the way the store is build. You do this by
      defining a so called storeBuilder method. The storeBuilder method gets the
      StoreConfig which contains all information of the modules. Besides this,
      the method has to return an instance of a Redux Store. The following code
      snippet shows you an example.
    </Text>
    <Code
      language="ts"
      title="Example for defining a custom storeBuilder method"
    >
      {`export const store = new StoreBuilder(modules.storeModules)
  .setStoreBuilder((storeConfig) => {
    const store = configureStore({
      reducer: storeConfig.reducers,
      middleware: (getDefaultMiddleware: Function) =>
        getDefaultMiddleware().concat(storeConfig.middleware),
      enhancers: (getDefaultEnhancers: Function) =>
        getDefaultEnhancers().concat(storeConfig.enhancers),
    });
    return store;
  })
  .build();`}
    </Code>
    <Text>
      If you want to add additional information to the later build StoreConfig
      in your processors you can add it using the <i>setExtas</i> method of the
      StoreConfigBuilder instance. You can then process these extras inside a
      custom storeBuilder. You may also want to define an own storeBuilder when
      you want to use the Redux Store for other purposes too.
    </Text>

    <SubSubTitle>Methods of StoreConfigBuilder</SubSubTitle>
    <Text>
      The following code snippet shows the method definitions of
      StoreConfigBuilder which you can use to incrementally add information for
      the store.
    </Text>
    <Code language="ts" title="Method definitions of StoreConfigBuilder">
      {`// Adds a reducer for a given key.
public setReducer<K extends keyof TModulesState>(key: K, reducer: Reducer<TModulesState[K]>)

// Overrides the middleware array.
public setMiddleware(middleware: Middleware[]): this

// Overrides the enhancers array.
public setEnhancers(enhancers: StoreEnhancer[]): this

// Sets value into the extras object for the given key.
public setExtras(key: string, value: unknown): this`}
    </Code>
    <SubTitle>The useModuleLifecycle Hook</SubTitle>
    <Text>
      If you develop a custom module you may wonder how you can integrate the
      module into the applications lifecycle. For example this may be necessary
      to run some initialization logic. For this purpose modules can provide a
      Hook called <i>useModuleLifecycle</i> as an attribute of the module
      object. The Framework will detect the Hook and run it. The Hook has to be
      of the following type.
    </Text>
    <Code language="ts">{`() => {renderChildren: boolean} & Record<string, unknown>`}</Code>
    <Text>
      You can see that <i>useModuleLifecycle</i> has to return an object which
      contains an attribute called <i>renderChildren</i>. By passing{" "}
      <i>false</i> as it's value you can prevent that all other UI components
      get rendered. This may be necessary if you have to make sure that before
      rendering certain initialization logic has to be finished.
    </Text>

    <SubTitle>Framework module keys & default modules</SubTitle>
    <Text>
      The following table shows which module keys are defined by the Framework
      itself. The corresponding default modules are listed too. You can override
      the keys with other modules. However, you have to provide every state
      value and Thunk method which is provided by the default modules since the
      Framework relies on them.
    </Text>
    <Text>
      The default modules are contained inside the <i>shared</i> package of the
      Framework's monorepo at GitHub. For more detailed information consult this
      package.
    </Text>
    <Table
      columns={[
        { key: "key", title: "Key" },
        { key: "type_of_module", title: "Type of module" },
        { key: "default_module", title: "Default module" },
        { key: "ts_type", title: "TS type", centerContent: true },
      ]}
      data={[
        {
          key: "auth",
          type_of_module: "Framework Store Module",
          default_module: "DummyAuthenticationProvider",
          ts_type: CodeAuthModuleType,
        },
        {
          key: "router",
          type_of_module: "Framework Non Store Module",
          default_module: "ReactRouterRouter",
          ts_type: CodeRouterModuleType,
        },
      ]}
    />
    <SubTitle>Other relevant interfaces</SubTitle>
    <Text>
      The following interfaces describe the general structure of modules.
      FFModule describes the abstraction of a non store module. FFStoreModule
      extends FFModule and describes the required structure of a store module.
    </Text>
    <Code language="ts">{`export type ModuleLifecycleHook = () => {renderChildren: boolean} & Record<string, unknown>;

export type FFModule = {
  useModuleLifecycle?: ModuleLifecycleHook;
};

export type FFStoreModule<TState> = {
  slice: Slice<TState>;
  middleware?: Middleware[];
  enhancers?: StoreEnhancer[];
  extras?: object;
} & FFModule;
`}</Code>
  </Page>
);

const CodeAuthModuleType = (
  <Code
    center
    language="ts"
  >{`export type AuthModule<TAuthState extends AuthState> = {
  fetchAuthed: AsyncThunk<Response, FetchAuthedFunctionArgs, any>;
  login: AsyncThunk<void, {credentials: Credentials}, any>;
  logout: AsyncThunk<void, {error?: unknown} | undefined, any>;
} & FFStoreModule<TAuthState>;`}</Code>
);

const CodeRouterModuleType = (
  <Code center language="ts">{`export type RouterModule = {
  UiLayerRouter: React.ComponentType<UILayerRouterProps>;
  MainViewRouter: React.ComponentType<MainViewRouterProps>;
  Link: React.ComponentType<LinkProps>;
  useLocation: useLocationType;
  useIsTabActive: useIsTabActiveType;
} & FFModule;
`}</Code>
);
