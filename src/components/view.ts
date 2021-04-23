import React from "react";

export class View {
    constructor(private _selectedIcon: String, private _deselectedIcon: String, private _to: String,
        private _name: String, private _disabled: boolean, private _component: React.ComponentType) {
    }

    get selectedIcon() {
        return this._selectedIcon;
    }

    get deselectedIcon() {
        return this._deselectedIcon;
    }

    get to() {
        return this._to;
    }

    get name() {
        return this._name;
    }

    get disabled() {
        return this._disabled;
    }

    get component() {
        return this._component;
    }
}