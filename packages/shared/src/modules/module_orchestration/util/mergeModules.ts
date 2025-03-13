import { MergeModules } from "../../../types/modules/moduleOrchestrationTypes";
import {
  defaultNonStoreModules,
  DefaultNonStoreModules,
  defaultStoreModules,
  DefaultStoreModules,
} from "../moduleDefaults";

export const mergeModules = <
  TFrameworkStoreModules extends object,
  TUserStoreModules extends object,
  TNonStoreModules extends object,
>(
  frameworkStoreModules: TFrameworkStoreModules,
  userStoreModules: TUserStoreModules,
  nonStoreModules: TNonStoreModules,
) => {
  type TMergedFrameworkStoreModules = MergeModules<
    DefaultStoreModules,
    TFrameworkStoreModules
  >;
  const mergedFrameworkStoreModules = {
    ...defaultStoreModules,
    ...frameworkStoreModules,
  } as TMergedFrameworkStoreModules;

  const storeModules = {
    frameworkStoreModules: mergedFrameworkStoreModules,
    userStoreModules: userStoreModules,
  };

  type TMergedNonStoreModules = MergeModules<
    DefaultNonStoreModules,
    TNonStoreModules
  >;
  const mergedNonStoreModules = {
    ...defaultNonStoreModules,
    ...nonStoreModules,
  } as TMergedNonStoreModules;

  /*
    User store modules override modules which are not relevant
     for the store in case the user wants to implement non store modules but wants to add a state.
     This is necessary because store modules are "more specific" than other modules. For example there
     could be a Module M for Routing
     which has a default implementation inside the framework. The user may want to write a custom
     Routing Module X which should replace the default implementation. He will pass X inside the
     constructor because of which this.userStoreModules contains X. However, sinde M is a default
     implementation it is present inside defaultNonStoreModules. Because of this M is present
     in this.nonStoreModules, so the union of this.userStoreModules and this.nonStoreModules
     contains two routing modules (X and M) for the router key. Of course, the user module should
     override the default implementation.
     However, the other way around makes no sense (a user module without store replaces a default
     implementation which is included inside the store), since the state which is defined inside
     the default implementation is necessary for the framework to work correctly. So you can conclude:
     A default implementation for the store can be overridden by just custom modules for the store
     (modules.frameworkStoreModules).
     A default implementation without store can be overwritten by custom modules both for and without
     the store.
  */

  const allModules = {
    ...mergedNonStoreModules,
    ...userStoreModules,
    ...mergedFrameworkStoreModules,
  } as MergeModules<
    MergeModules<TMergedNonStoreModules, typeof userStoreModules>,
    TMergedFrameworkStoreModules
  >;

  return {
    storeModules: storeModules,
    all: allModules,
  };
};
