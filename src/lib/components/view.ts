import React from "react";

export class View {
    constructor(private _navbarTab: React.ReactElement, private _component: React.ComponentType<any>, private _path: string) {
    }

    get navbarTab() {
        return this._navbarTab;
    }

    get component() {
        return this._component;
    }

    get path() {
        return this._path;
    }
}