import { ReactElement } from "react";
export interface AuthenticationViewProps {
    documentsLabelKey?: string;
    headerOptions?: {
        reactElementLeft?: ReactElement;
        letteringElementLeft?: string;
        hideLeft?: boolean;
    }
}