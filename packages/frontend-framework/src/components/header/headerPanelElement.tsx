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

import React, {PropsWithChildren, useRef} from "react";
import {OverlayPanel, OverlayPanelProps} from "primereact/overlaypanel";
import {IconWithContext} from "./iconWithContext";

interface Props extends OverlayPanelProps {
  icon: string;
  iconClassName?: string;
  iconstyle?: React.CSSProperties;
  panelClassName?: string;
}

export const HeaderPanelElement: React.FC<PropsWithChildren<Props>> = (
  props,
) => {
  const {icon, iconClassName, iconstyle, panelClassName, children} = props;

  const ref = useRef<OverlayPanel>(null);

  return (
    <>
      <IconWithContext
        icon={icon}
        style={iconstyle}
        iconClassName={iconClassName}
        onClick={(event) => ref.current?.toggle(event)}
      >
        <OverlayPanel {...props} className={panelClassName} ref={ref}>
          {children}
        </OverlayPanel>
      </IconWithContext>
    </>
  );
};
