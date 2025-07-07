/**
 * Interfaces for UI Module Components
 * These interfaces are meant to be implemented by UI components to ensure flexibility and modularity.
 */

import {FFModule} from "../generalModule";

// Navbar Module Interface
export interface NavbarComponent {
  render: (props: NavbarProps) => JSX.Element;
}

export interface NavbarProps {
  tabs: NavbarTab[];
  collapsed: boolean;
  legalDocumentLinks?: LegalDocumentLink[];
}

export interface NavbarTab {
  label: string;
  path: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface LegalDocumentLink {
  label: string;
  path: string;
}

// Header Module Interface
export interface HeaderComponent {
  render: (props: HeaderProps) => JSX.Element;
}

export interface HeaderProps {
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  userIcon?: React.ReactNode;
  onSettingsClick?: () => void;
  onUserIconClick?: () => void;
}

// Content Bar Module Interface
export interface ContentBarComponent {
  render: (props: ContentBarProps) => JSX.Element;
}

export interface ContentBarProps {
  items: ContentBarItem[];
  onAddClick?: () => void;
}

export interface ContentBarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface UICookieBannerProps {
  header: React.ReactNode;
  message: React.ReactNode;
  visible: boolean;
  acceptButtonLabel: string;
  onAccept: () => void;
  styles?: Record<string, any>;
  darkMode: boolean;
}

export type CookieBannerModule = {
  UiLayerCookieBanner: React.ComponentType;
} & FFModule;
