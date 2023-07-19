import { ReactElement } from 'react';
export interface AuthenticationViewProps {
  authOptions?: {
    backgroundImage?: string;
    companyText?: string;
    documentsLabelKey?: string;
    preventDarkmode?: boolean;
  };
  headerOptions?: {
    reactElementLeft?: ReactElement;
    reactElementRight?: ReactElement;
    hideLeft?: boolean;
    hideRight?: boolean;
  };
  hideLanguageSelection?: boolean;
  hideLegalDocuments?: boolean;
}
