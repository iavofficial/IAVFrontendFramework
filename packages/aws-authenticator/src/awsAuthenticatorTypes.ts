import {
  UserData,
} from "@iavofficial/frontend-framework-shared/authenticationProvider";
import {AsyncThunk} from "@reduxjs/toolkit";
import {JWT} from "@aws-amplify/auth";

export interface JWTPojo {
  payload: JWT["payload"];
}

// The Redux store demands that objects in action payloads are POJOs
// (for example they cannot have functions).
export interface AWSUserData extends UserData {
  extras: {
    idToken: JWTPojo;
    accessToken: JWTPojo;
    groups: string[];
  };
}

export type AWSAuthenticatorExtras = {
  checkIsAuthenticated: AsyncThunk<void, void, {}>;
  completePassword: AsyncThunk<void, {newPassword: string}, {}>;
  refreshSession: AsyncThunk<void, void, {}>;
};