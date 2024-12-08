/**
 * Copyright © 2024 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
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

import React, {PropsWithChildren} from "react";
import makeStyles from "../content/style_options/makeStyles";
import {classNames} from "primereact/utils";

const useStyles = makeStyles(() => ({
  wrapper: {
    cursor: "pointer",
  },
}));

/**
 * Props for the HeaderIcon component.
 */
interface Props {
  /**
   * Callback triggered when the element is clicked.
   */
  onClick?: (event: React.SyntheticEvent) => void;

  /**
   * Callback triggered when a key is pressed.
   */
  onKeyDown?: (event: React.KeyboardEvent) => void;

  /**
   * Inline styles to customize the component.
   */
  style?: React.CSSProperties;
}

/**
 * HeaderIcon Component
 *
 * A flexible component for rendering an icon or any content that responds to click
 * or keyboard events. It supports custom styling and provides a standardized structure
 * for icon-based headers.
 */
const HeaderIcon: React.FC<PropsWithChildren<Props>> = (props) => {
  const {onClick, onKeyDown, style, children} = props;

  const {classes} = useStyles();

  return (
    <div
      className={classNames(
        "flex align-items-center justify-content-end",
        classes.wrapper,
      )}
      style={style}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {children}
    </div>
  );
};

export default HeaderIcon;
