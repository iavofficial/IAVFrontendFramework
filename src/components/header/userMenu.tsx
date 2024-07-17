import React, { useContext } from "react";
import { ContextMenu } from "primereact/contextmenu";
import { AuthContext } from "../../contexts/auth";
import { MenuItem } from "./settingsMenu";

export interface Props {
  hideMenu: (e: React.KeyboardEvent) => void;
  userMenuOptions?: UserMenuOptions;
}

export interface UserMenuOptions {
  hideLogoutButton?: boolean;
  additionalItems?: MenuItem[];
}

export const UserMenu = React.forwardRef<ContextMenu, Props>((props, ref) => {
  const authContext = useContext(AuthContext);
  const basicOptions: MenuItem[] = [];

  if (!props.userMenuOptions?.hideLogoutButton) {
    basicOptions.push({
      label: "Logout",
      icon: "pi pi-sign-out",
      command: () => {
        authContext?.logout();
      },
    });
  }
  
  const model = props.userMenuOptions?.additionalItems
  ? [...props.userMenuOptions.additionalItems, ...basicOptions]
  : basicOptions;

  return basicOptions.length > 0 ? (
    <div onKeyDown={(e) => props.hideMenu(e)}>
      <ContextMenu ref={ref} model={model} />
    </div>
  ) : (
    <React.Fragment />
  );
});
