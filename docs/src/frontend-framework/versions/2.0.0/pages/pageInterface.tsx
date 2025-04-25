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
import Page from "../../../common/page/page.tsx";
import Title from "../../../common/page/text/title.tsx";
import SubTitle from "../../../common/page/text/subTitle.tsx";
import Code from "../../../common/page/utils/code.tsx";
import Text from "../../../common/page/text/text.tsx";

const PageInterface: React.FC = () => {
  return (
    <Page>
      <Title>Programming interfaces</Title>
      <SubTitle>Main React Components</SubTitle>
      <Text>
        The framework's main interfaces are the components{" "}
        <code>GlobalDataLayer</code> and <code>UILayer</code>.{" "}
        <code>GlobalDataLayer</code> contains all React contexts of the
        framework to share special data across the whole component tree. The{" "}
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
        Provider between the <code>GlobalDataLayer</code> and{" "}
        <code>UILayer</code> yourself. By doing this, your React context has
        access to all the framework's contexts, and the <code>UILayer</code>{" "}
        additionally has access to your context.
      </Text>
      <SubTitle>An example for this situation</SubTitle>
      <Code language={"typescript"}>
        {`return (
    <GlobalDataLayer ...properties...>
    // Your react contexts go here.
        <UILayer ...properties... />
    </GlobalDataLayer>
);
`}
      </Code>
      <Title>Module System</Title>
      <Text>
        With version 2.0.0 we began modularizing the Framework. This means that
        several sub systems are getting outsourced into separate packages. These
        modules are simple objects {"(generally implemented with classes)"} and
        managed by a central module orchestration system. An important aspect of
        this system is the supply of a global state to which modules can add
        their own values. The global state is implemented using a Redux Store.
        Because we use Redux, a basic understanding of this library is
        necessary.
      </Text>
      <Text>
        To facilitate the use of the module system the Framework provides two
        main programming interfaces. The first one is the method{" "}
        <i>createModules</i>. This method allows you to pass an object
        containing multiple modules to configure which modules should be used.
        The method takes your modules and adds the default modules if necessary.
        It returns a map which contains all relevant objects, meaning a union of
        your custom modules and default modules. If you just want to use the
        default implementation, just call <i>createModules</i> without any
        parameters.
      </Text>
      <Text>
        The described object contains all your modules. These are modules which
        override default modules, but also custom user modules which have no
        default module counterpart. However, over time more sub systems will be
        created, resulting in more keys for default modules. Because of this a
        convention is necessary to prevent key collisions. It is required that
        keys for every custom user module have to begin with the prefix{" "}
        <strong>"user"</strong>.
      </Text>
      <Text>
        The following code snippet shows an example for the use of{" "}
        <i>createModule</i>.
      </Text>
      <Code language="typescript" title="Example for creating the modules map">
        {`const customModules = {
  [MandatoryModuleNames.Authenticator]: new AWSAuthenticator({
    configureAmplify: configureAmplify,
    failOnNoLegalGroup: true,
    legalGroups: ["ADMIN", "SHOWCASE"],
  }),
  userModule: new UserModule({
    // ...
  })
};

const modules = createModules(customModules);`}
      </Code>
      <Text>
        After creating the module map you have to create the Redux Store. For
        this purpose the Framework provides the <i>StoreBuilder</i> class. The{" "}
        <i>StoreBuilder</i> class expects you to pass <strong>all</strong>{" "}
        necessary store modules and <strong>all</strong> user store modules
        inside the constructor. The required map is created by{" "}
        <i>createModules</i> for you. The following example shows you the
        recommended way to pass the modules.
      </Text>
      <Code language="typescript" title="Example for the use of StoreBuilder">
        {`const store = new StoreBuilder(modules.storeModules).build();`}
      </Code>
      <Text>
        The StoreBuilder returns the Redux store which contains all state values
        of the modules. After creating the Redux store you will have to pass the
        store and <strong>all</strong> modules to the GlobalDataLayer component.
      </Text>
      <Code language="tsx" title="Example for passing store and modules">
        {`<GlobalDataLayer
      store={store}
      modules={modules.all}
      // ...
    >
      // ...
</GlobalDataLayer>`}
      </Code>

      <SubTitle>Best practice</SubTitle>
      <Text>
        In most cases you will know which modules you want to use at compile
        time. Because of this you should not overcomplicate things. If you know
        which modules you want to use at compile time you sould create your
        module array and the store outside of any react component. It is
        recommended to create a <i>store.ts</i> file which contains and exports
        all the described functionality.The following example shows such a
        store.ts with the given examples.
      </Text>
      <Code language="tsx" title="Example for store.ts">
        {`const customModules = {
  [MandatoryModuleNames.Authenticator]: new AWSAuthenticator({
    configureAmplify: configureAmplify,
    failOnNoLegalGroup: true,
    legalGroups: ["ADMIN", "SHOWCASE"],
  }),
  userModule: new UserModule({
    // ...
  })
};

export const modules = createModules(customModules);

export const store = new StoreBuilder(modules.storeModules).build();`}
      </Code>

      <SubTitle>useModuleContext and useModule</SubTitle>
      <Text>
        If you want to access the modules, for example to get the translation
        function of the internationalization module, you have two options. Since
        you have all your modules statically in your store.ts file, you can just
        export these and import them where needed. This is the recommended way
        if your use case allows for static definition like described above. The
        second option is to use the <i>ModuleContext</i> which is created by the
        Framework and used for sharing the modules across the whole application.
        However, since the <i>ModuleContext</i> is created by the Framework
        itself the correct type of your modules is not known at creation time of
        the Context. To allow for correct typing the Framework provides some
        generic Hooks. The <i>createModules</i> function creates correctly typed
        versions of these Hooks and returns them inside the returned object. If
        you want to use the <i>ModuleContext</i> you should export them from
        your store.ts file. The following code snippet shows an example.
      </Text>
      <Code
        language="typescript"
        title="Example for creating a typed useModuleContext Hook"
      >{`export const useModuleContextTyped = modules.useModuleContextTyped;
export const useModuleTyped = modules.useModuleTyped;`}</Code>
      <Text>
        You can also create correctly typed versions of these Hooks yourself.
        The following code snippet shows you how to do this.
      </Text>
      <Code language="typescript">{`export const useModuleContextTyped = useModuleContext<typeof modules.all>;
export const useModuleTyped = createTypedUseModule<typeof modules.all>()`}</Code>

      <SubTitle>Important: Configuration of Modules</SubTitle>
      <Text>
        If you need to configure modules, you will have to create them as a
        custom module and pass it to the createModules function. This is
        especially the case for the default internationalizer module as you will
        want to provide translations. The following code snippet shows this for
        some provided modules which should be / have to be configured.
      </Text>
      <Code language="typescript">{`const customModules = {
  [MandatoryModuleNames.Authenticator]: new AwsAuthenticator({
    configureAmplify: configureAmplify,
    failOnNoLegalGroup: true,
    legalGroups: ["ADMIN", "SHOWCASE"],
  }),
  [MandatoryModuleNames.Internationalizer]: new I18NextInternationalizer({
    translationResources: translations,
  })
};

export const modules = createModules(customModules);`}</Code>
      <Text>
        We highly recommend to read the modules in depth chapter. Furthermore
        you can consult the <strong>Modules</strong> section of the
        documentation to get more information about the modules.
      </Text>
    </Page>
  );
};

export default PageInterface;
