import {FFModule} from "../../types/modules/generalModule";
import {
  ActualMandatoryStateFromModules,
  FFMandatoryStoreModules,
  FFMandatoryState,
  MergeModules,
} from "../../types/modules/moduleOrchestrationTypes";
import {defaultNonStoreModules, defaultStoreModules} from "./moduleDefaults";

export class ModuleSetBuilder<
  TNonStoreModules extends Record<string, FFModule>,
  TStoreModules extends Partial<FFMandatoryStoreModules<TState>>,
  TState extends
    FFMandatoryState = ActualMandatoryStateFromModules<TStoreModules>,
> {
  private nonStoreModules;
  private storeModules: MergeModules<TStoreModules, typeof defaultStoreModules>;

  constructor(params: {
    nonStoreModules: TNonStoreModules;
    storeModules: TStoreModules;
  }) {
    this.storeModules = {
      ...defaultStoreModules,
      ...params.storeModules,
    };

    this.nonStoreModules = {
      ...defaultNonStoreModules,
      ...params.nonStoreModules,
    };
  }

  build() {
    return {
      storeModules: this.storeModules,
      // Modules which are relevant for the store overwrite modules which are not relevant
      // for the store in case there is a duplicate key. This is necessary because store modules
      // are "more specific" than other modules. For example there could be a Module M for Routing
      // which has a default implementation inside the framework. The user may want to write a custom
      // Routing Module X which should replace the default implementation. He will pass X inside the
      // constructor because of which this.storeModules contains X. However, sinde M is a default
      // implementation it is presend inside defaultNonStoreModules. Because of this M is present
      // in this.nonStoreModules, so the union of this.storeModules and this.nonStoreModules
      // contains two routing modules (X and M) for the router key. Of course, the user module should
      // overwrite the default implementation.
      // However, the other way around makes no sense (a user module without store replaces a default
      // implementation which is included inside the store), since the state which is defined inside
      // the default implementation is necessary for the framework to work correctly. So you can conclude:
      // A default implementation for the store can be overwritten by just custom modules for the store.
      // A default implementation without store can be overwritten by custom modules both for and without
      // the store.
      all: {...this.nonStoreModules, ...this.storeModules},
    };
  }
}
