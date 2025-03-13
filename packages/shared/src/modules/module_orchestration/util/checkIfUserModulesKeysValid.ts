import {genUserKeyErrorMessage} from "../../../constants/errors";
import {USER_MODULES_PREFIX} from "../../../constants/moduleNames";

export const checkIfUserModulesKeysValid = (modules: {
  userStoreModules?: object;
  userNonStoreModules?: object;
}) => {
  if (modules.userStoreModules) {
    throwErrorIfNoUserModuleKey(Object.keys(modules.userStoreModules));
  }
  if (modules.userNonStoreModules) {
    throwErrorIfNoUserModuleKey(Object.keys(modules.userNonStoreModules));
  }
};

const throwErrorIfNoUserModuleKey = (keys: string[]) => {
  keys.forEach((key) => {
    if (!key.startsWith(USER_MODULES_PREFIX)) {
      throw new Error(genUserKeyErrorMessage(key));
    }
  });
};
