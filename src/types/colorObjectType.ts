import { AuthenticationColorType } from '../components/authentication/authenticationColorType';
import {
  ContentColorType,
  ContentbarColorType,
  ContentbarTabColorType,
} from '../components/content/contentColorType';
import { HeaderColorType } from '../components/header/appHeaderColor';
import { NavbarColorType } from '../components/navbar/navbarColorType';
export interface ColorObject {
  headerColorOptions?: HeaderColorType;
  navbarColorOptions?: NavbarColorType;
  contentColorOptions?: ContentColorType;
  contentbarColorOptions?: ContentbarColorType;
  contentbarTabColorOptions?: ContentbarTabColorType;
  authenticationColorOptions?: AuthenticationColorType;
}
