import { AuthModule, AuthState, UserData} from "@iavofficial/frontend-framework-shared-types/authenticationProvider";
import { AsyncThunk } from "@reduxjs/toolkit";
import { JWT } from "@aws-amplify/auth";

export interface AWSUserData extends UserData {
  idToken: JWT;
  accessToken: JWT;
  groups: string[];
}

export type AWSAuthenticatorModule<TState extends AuthState> = {
  completePassword: AsyncThunk<void, {newPassword: string}, {}>;
} & AuthModule<TState>;