import { defaultModules } from "./moduleDefaults";
import { ActualMandatoryStateFromModules, FFMandatoryModules, FFMandatoryState, MergeModules } from "./moduleOrchestrationTypes";

export class ModuleSetBuilder<
  TModules extends Partial<FFMandatoryModules<TState>>,
  TState extends FFMandatoryState = ActualMandatoryStateFromModules<TModules>,
> {
  private modules: TModules;

  constructor(modules: TModules) {
    this.modules = modules;
  }

  build(): MergeModules<TModules, typeof defaultModules> {
    const mergedModules = {
      ...defaultModules,
      ...this.modules,
    };
    return mergedModules;
  }
}