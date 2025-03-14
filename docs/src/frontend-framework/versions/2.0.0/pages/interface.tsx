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

import React from "react";
import Page from "../../../common/page/page.tsx";
import Title from "../../../common/page/text/title.tsx";
import SubTitle from "../../../common/page/text/subTitle.tsx";
import Code from "../../../common/page/utils/code.tsx";
import Text from "../../../common/page/text/text.tsx";
import BulletList from "../../../common/page/text/bulletList.tsx";
import SubSubTitle from "../../../common/page/text/subSubTitle.tsx";

const Interface: React.FC = () => {
    return (
        <Page>
            <Title>Interface & Module System</Title>
            <SubTitle>Main React Components</SubTitle>
            <Text>
                The framework's main interfaces are the components{" "}
                <code>GlobalDataLayer</code> and <code>UILayer</code>.
                <code>GlobalDataLayer</code> contains all React contexts of the
                framework to share data across the whole component tree. The
                <code>UILayer</code> component contains the components which actually
                render the UI.
            </Text>
            <Text>
                The reason for the separation into two layers can be understood by the
                following example: Imagine developing a React context which needs the
                information of a Framework's context X. The information of X is stored
                inside the <code>GlobalDataLayer</code>. Where to put your React
                context's provider? To pass your context to the <code>UILayer</code> and
                then rendering the Provider seems inappropriate. Instead, you put the
                Provider between the <code>GlobalDataLayer</code> and
                <code>UILayer</code> yourself. By doing this, your React context has
                access to all the framework's contexts, and the <code>UILayer</code>
                additionally has access to your context.
            </Text>
            <SubTitle>An example for this situation</SubTitle>
            <Code language={"typescript"}>
                {`return (
// If you don't want to use the default authentication provider, you would have to render another authentication provider at this position. Authentication providers will be explained later on.
    <GlobalDataLayer ...properties...>
    // Your react contexts go here.
        <UILayer ...properties... />
    </GlobalDataLayer>
);
`}
            </Code>
            <Title>Module System</Title>
            <Text>
                To configure which modules should be used the Framework provides some
                essential interfaces. However, before you are able to use them you have
                to understand that there are multiple categories of modules.
            </Text>
            <Text>
                At first you have to differentiate between so called mandatory modules
                and user modules. Mandatory modules are modules for which a default
                implementation is given, for example for authentication. The Framework
                relies on the given basic functionality. The second category are user
                modules. The Framework allows to add modules which aren't of use for the
                Framework.
            </Text>
            <Text>
                To understand the purpose of user modules you have to know that the
                Framework uses Redux as it's global state management library to allow
                for communication between the modules, the core Framework and your React
                components. You may want to define modules which add something to the
                store which isn't core Framework functionality. For this you can define
                user modules and pass them to the Framework.
            </Text>
            <Text>
                You, or the Framework itself, may define moduls which don't make
                The second differentiation is based on whether
            </Text>
            <BulletList
                bulletType="bullet"
                items={[
                    `Store-Modules: These modules are modules which have to share statefull values across the
            Framework. An example for this is the AWSAuthenticator which to share different statefull
            values like the hasAuthenticated flag.`,
                    `Non-Store-Modules: These modules do not have to change statefull values across the Framework.
            Because of this they are irrelevant for the Redux store.`,
                ]}
            />
            <Text>
                Furthermore, you have to differentiate between mandatory modules and
                user modules. Mandatory modules are modules for which default modules
                exist. They are mandatory as the framework cannot do it's job without
                this basic functionality.
            </Text>
            <Text>
                The Framework expects you to provide an array of modules at two
                locations:
            </Text>
            <BulletList
                bulletType="bullet"
                items={[
                    `StoreBuilder: This Builder creates the Redux store based on passed modules.`,
                    `GlobalDataLayer: The GlobalDataLayer expects the store and the modules as
            properties. It creates the context for the Redux store and shared the modules
            across the Framework application using the Module context.`,
                ]}
            />
            <Text>
                Altough you could build the module array on your own, this is not
                recommended. Since over time more sub systems will become self contained
                modules, minor changes can result in a breaking change in your
                application since the new default modules are not provided by your cusom
                module array.
            </Text>
            <Text>
                To fix this issue the Framework provides the factory method{" "}
                <strong>createModules</strong> to create the module array. In fact, the
                method returns multiple module arrays. <i>modules.store</i> contains all
                modules which contain values which should be shared using the Redux
                store. <i>modules.all</i> contains all modules, store and non store
                ones. The returned module arrays contain all the necessary default
                modules.
            </Text>
            <Text>
                Furthermore, you can override default modules by passing a parameter
                object. Using the key <i>storeModules</i> you can pass modules which are
                relevant for the Redux store. The key <i>nonStoreModules</i> can be used
                to add modules which are not relevant for the Redux store.
            </Text>
            <Text>
                Finally, you should pass <i>modules.store</i> to the StoreBuilder in
                order to respect the modules when building the store. You will get the
                Redux store by then calling the <i>build</i> method. The store and{" "}
                <i>modules.all</i> should then be passed to GlobalDataLayer.
            </Text>
            <SubTitle>Example for module array and store creation</SubTitle>
            <Code language="ts">
                {`customModules = {
  [MandatoryModuleNames.Authentication]: new AWSAuthenticator({
    configureAmplify: configureAmplify,
    failOnNoLegalGroup: true,
    legalGroups: ["ADMIN", "SHOWCASE"],
  }),
};

const modules = createModules({ storeModules: customModules });

const store = new StoreBuilder(modules.storeModules).build();`}
            </Code>
            <SubTitle>StoreBuilder in Detail</SubTitle>
            <Text>
                The basic functionality of the StoreBuilder is described above. However,
                the are more configuration options.
            </Text>
            <SubSubTitle>Processors</SubSubTitle>
            <Text>
                If you write custom modules you may want to process your module objects
                on your own. Furthermore, you may want to override the processing
                mechanism of default modules. To do this you can specify so called
                processors and pass them to the StoreBuilder. Processors are simple
                functions which have to take the corresponding module and the
                storeConfigBuilder as parameters. The StoreConfigBuilder is your
                interface to the default store building mechanism. It contains all
                reducers etc. which will be added to the Redux store. For a deeper
                understanding of the storeConfigBuilder consult the GitHub repository.
                The following code contains an example for adding a processor to the
                StoreBuilder.
            </Text>
            <Code language="ts">
                {`const store = new StoreBuilder(modules.storeModules)
  .setFrameworkModuleProcessor(
    "auth",
    (authModule: AWSAuthenticator, storeConfigBuilder) => {/* Processing logic */}
  )
  .build();`}
            </Code>
            <SubSubTitle>storeBuilder method</SubSubTitle>
            <Text>
                Furthermore, you may want to change how the store is getting build from
                all modules. For example this may be the case if you want to also add
                other parts to the Redux store than the contents of the modules. To
                allow you to hook into this behaviour you can define a storeBuilder
                function on the StoreBuilder object. The storeBuilder function has to
                take <i>storeConfig</i> as a parameter which contains all reducers,
                middleware etc. of the modules. The storeBuilder function then has to
                create the Redux store and return it. The following code shows an
                example.
            </Text>
            <Code language="ts">
                {`const store = new StoreBuilder(modules.storeModules)
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

            <SubTitle>Other important functionality</SubTitle>
            <SubSubTitle>useModuleContext</SubSubTitle>
            <Text>
                As already mentioned you have to pass <i>modules.all</i> to the
                GlobalDataLayer which shared all modules using the <i>ModuleContext</i>{" "}
                across the Framework application. Because of this your components can
                also use this context to access the modules. However, at coding time of
                the Framework it is not known what type your modules will have. Because
                of this the Framework provides the Hook <i>useModuleContext</i>. You can
                create a typed Hook of this so you can access your modules using the{" "}
                <i>Module Context</i> in a type safe way.
                <Code language="ts">
                    {`const useTypedModuleContext = useModuleContext<typeof modules>;`}
                </Code>
            </Text>

            <SubTitle>Best practices</SubTitle>
            <Text>
                In most cases you will know which modules you want to use at compile
                time. Because of this you should not overcomplicate things. If you know
                which modules you want to use at compile time you sould create your
                module array and the store outside of any react component. It is
                recommended to create a <i>store.ts</i> file which contains and exports
                all the described functionality.
            </Text>
        </Page>
    );
};

export default Interface;
