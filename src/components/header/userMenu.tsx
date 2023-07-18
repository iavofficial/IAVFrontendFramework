import React, { useContext, useState } from 'react';
import { ContextMenu } from 'primereact/contextmenu';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import { MenuItem } from 'primereact/menuitem';

export interface Props {
  hideMenu: (e: React.KeyboardEvent) => void;
}

export const UserMenu = React.forwardRef<ContextMenu, Props>((props, ref) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const basicOptions: MenuItem[] = [
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => {
        navigate('/login');
        authContext?.logout();
      },
    },
  ];

  return (
    <div onKeyDown={(e) => props.hideMenu(e)}>
      <ContextMenu ref={ref} model={basicOptions} />
    </div>
  );
});
