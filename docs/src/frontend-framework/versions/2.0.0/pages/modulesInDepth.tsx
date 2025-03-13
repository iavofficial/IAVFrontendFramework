import Page from "../../../common/page/page";
import BulletList from "../../../common/page/text/bulletList";
import SubSubTitle from "../../../common/page/text/subSubTitle";
import SubTitle from "../../../common/page/text/subTitle";
import Text from "../../../common/page/text/text";
import Title from "../../../common/page/text/title";
import Code from "../../../common/page/utils/code";

export const ModulesInDepth = () => (
  <Page>
    <Title>Modules in Depth</Title>
    <Text>
      This page describes advanced functionalities of the module orchestration
      system.
    </Text>
    <SubTitle>
      The different kinds of modules and createModulesSeperately
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
  </Page>
);
