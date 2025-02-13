import { AuthenticationProvider, UserDataBasic } from "@iavofficial/frontend-framework-shared-types/authenticationProvider";
import { JWT } from "aws-amplify/auth";

export interface AWSUserData extends UserDataBasic {
  idToken: JWT;
  accessToken: JWT;
  groups: string[];
}

export interface AWSAuthenticationProviderType extends AuthenticationProvider {
  getUserData(): AWSUserData | undefined;
}