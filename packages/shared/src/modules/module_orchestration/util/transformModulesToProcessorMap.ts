import {
  FFMandatoryState,
  ModuleAndProcessorMap,
} from "../../../types/modules/moduleOrchestrationTypes";

// Type assertion has to be used until there is a type safe way to
// map the modules to a module and processor map.
export const transformModulesToProcessorMap = <
  TModules extends object,
  TFrameworkModulesState extends FFMandatoryState,
>(
  modules: TModules,
) => {
  const modulesArray = Object.entries(modules).map(([key, value]) => ({
    [key]: {
      module: value,
    },
  }));

  const processorMap = (
    modulesArray.length > 0
      ? modulesArray.reduce((prev, current) => ({
          ...prev,
          ...current,
        }))
      : {}
  ) as ModuleAndProcessorMap<TModules, TFrameworkModulesState>;

  return processorMap;
};
