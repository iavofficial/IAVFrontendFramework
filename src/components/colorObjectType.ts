import { AuthenticationColorType } from './authentication/authenticationColorType';
import {
  ContentColorType,
  ContentbarColorType,
  ContentbarTabColorType,
} from './content/contentColorType';
import { HeaderColorType } from './header/appHeaderColor';
import { NavbarColorType } from './navbar/navbarColorType';
export interface ColorObject {
  headerColorOptions?: HeaderColorType;
  navbarColorOptions?: NavbarColorType;
  contentColorOptions?: ContentColorType;
  contentbarColorOptions?: ContentbarColorType;
  contentbarTabColorOptions?: ContentbarTabColorType;
  authenticationColorOptions?: AuthenticationColorType;
}
