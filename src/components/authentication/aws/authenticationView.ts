import { ReactElement } from "react";
export interface AuthenticationViewProps {
    documentsLabelKey?: string;
    companyText?: string;
    headerOptions?: {
        reactElementLeft?: ReactElement;
        reactElementFullAuthenticationHeader?: ReactElement;
        letteringElementLeft?: string;
        hideLeft?: boolean;
    }
    colorOptions?:{
        authViewColorSettings?:{
        headerBackground?: string;
        fullBackground?: string;
        loginFormBackground?: string;
        loginButtonBackground?: string;
        letteringElementLeftColor?: string;
        letteringElementRightColor?: string;
        companyTextColor?: string;
        legalDocumentsColor?: string;   
        }
    }
}