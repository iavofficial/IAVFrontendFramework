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

export const mergeRoutes = (...routeGroups: (PathRoute[] | GroupRoute[])[]): PathRoute[] => {
    return routeGroups.flatMap(group =>
        group.flatMap(route => isGroupRoute(route) ? route.routes : [route])
    );
};

const isGroupRoute = (route: PathRoute | GroupRoute): route is GroupRoute => {
    return (route as GroupRoute).routes !== undefined;
};