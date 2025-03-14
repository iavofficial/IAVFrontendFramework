import { ReactElement } from "react";

export type RouteDefinition = {
    path: string;
    label: string;
    element: ReactElement;
}