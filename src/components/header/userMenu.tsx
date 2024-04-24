import React, { useContext } from "react";
import { ContextMenu } from "primereact/contextmenu";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import { MenuItem } from "./settingsMenu";

export interface Props {
  hideMenu: (e: React.KeyboardEvent) => void;
  userMenuOptions?: UserMenuOptions;
}

export interface UserMenuOptions {
  hideLogoutButton?: boolean;
}

export const UserMenu = React.forwardRef<ContextMenu, Props>((props, ref) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const basicOptions: MenuItem[] = [];

  if (!props.userMenuOptions?.hideLogoutButton) {
    basicOptions.push({
      label: "Logout",
      icon: "pi pi-sign-out",
      command: () => {
        navigate("/login");
        authContext?.logout();
      },
    });
  }

  return basicOptions.length > 0 ? (
    <div onKeyDown={(e) => props.hideMenu(e)}>
      <ContextMenu ref={ref} model={basicOptions} />
    </div>
  ) : (
    <React.Fragment />
  );
});
