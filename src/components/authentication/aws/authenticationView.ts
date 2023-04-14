import { ReactElement } from 'react';
export interface AuthenticationViewProps {
  authOptions?: {
    backgroundImage?: string;
    companyText?: string;
    documentsLabelKey?: string;
    preventDarkmode?: string;
  };

  headerOptions?: {
    reactElementLeft?: ReactElement;
    reactElementRight?: ReactElement;
    hideLeft?: boolean;
    hideRight?: boolean;
  };
}
