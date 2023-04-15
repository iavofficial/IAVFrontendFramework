import { AuthenticationColorType } from './../components/authentication/authenticationColorType';
import {
  ContentColorType,
  ContentbarColorType,
  ContentbarTabColorType,
} from './../components/content/contentColorType';
import { HeaderColorType } from './../components/header/appHeaderColor';
import React from 'react';
import { NavbarColorType } from '../components/navbar/navbarColorType';
export interface ColorsettingsType {
  darkmode: boolean;
  setDarkmode: (darkmode: boolean) => void;
  headerColorOptions?: HeaderColorType;
  navbarColorOptions?: NavbarColorType;
  contentColorOptions?: ContentColorType;
  contentbarColorOptions?: ContentbarColorType;
  contentbarTabColorOptions?: ContentbarTabColorType;
  authenticationColorOptions?: AuthenticationColorType;
}

export const ColorSettingsContext = React.createContext<
  ColorsettingsType | undefined
>(undefined);
