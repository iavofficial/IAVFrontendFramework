import {
  ContentBarProps,
  CookieBannerModule,
  HeaderProps,
  NavbarProps,
} from "./uiModuleInterfaces";

/**
 * Base interface for all UI modules
 */
export interface UIComponent<TProps> {
  render: (props: TProps) => JSX.Element;
}

// Navbar example extending the base
export interface NavbarComponent extends UIComponent<NavbarProps> {}
export interface HeaderComponent extends UIComponent<HeaderProps> {}
export interface ContentBarComponent extends UIComponent<ContentBarProps> {}
export interface CookieBannerComponent
  extends UIComponent<CookieBannerModule> {}
