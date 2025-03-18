import {MandatoryModuleNames} from "../../constants/moduleNames";
import {useModule} from "../../contexts/moduleContext";

export const useModuleTranslation = () => {
  const intModule = useModule(MandatoryModuleNames.Internationalization);
  return intModule.useTranslation();
};
