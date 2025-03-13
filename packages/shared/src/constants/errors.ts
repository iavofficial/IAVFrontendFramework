import {USER_MODULES_PREFIX} from "./moduleNames";

export const genUserKeyErrorMessage = (key: string) =>
  `Every key for a user module has to start with ${USER_MODULES_PREFIX}. This is not the case for ${key}.`;
