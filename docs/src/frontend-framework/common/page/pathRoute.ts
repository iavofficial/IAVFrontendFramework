import {ReactElement} from "react";

export type PathRoute = {
    path: string;
    label: string;
    element: ReactElement;
}

export type GroupRoute = {
    title: string;
    routes: PathRoute[];
}