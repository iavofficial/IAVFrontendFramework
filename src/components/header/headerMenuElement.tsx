/**
 * Copyright © 2025 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {useRef} from "react";
import {ContextMenu, ContextMenuProps} from "primereact/contextmenu";
import {IconWithContext} from "./iconWithContext";

interface Props extends ContextMenuProps {
  icon: string;
  iconClassName?: string;
  iconstyle?: React.CSSProperties;
  menuClassName?: string;
}

export const HeaderMenuElement: React.FC<Props> = (props) => {
  const {icon, iconClassName, iconstyle, menuClassName} = props;

  const ref = useRef<ContextMenu>(null);

  return (
    <>
      <IconWithContext
        icon={icon}
        iconClassName={iconClassName}
        style={iconstyle}
        onClick={(event) => ref.current?.show(event)}
      >
        <ContextMenu
          {...props}
          className={menuClassName}
          ref={ref}
        ></ContextMenu>
      </IconWithContext>
    </>
  );
};
