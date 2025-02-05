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

import { useState } from 'react';
import { BLUE3, GREY2, WHITE } from 'iav-core/constants';

interface Props {
  selected: boolean;
  title: string;
  identifier: string;
  onSelect: (identifier: string) => void;
}

/**
 * Element used for elements to enable selection in the content bar
 * @param props
 */
export const ContentSelectionElement = (props: Props) => {
  const [hovering, setHovering] = useState(false);

  const tabStyle = {
    cursor: props.selected ? 'default' : 'pointer',
    backgroundColor: props.selected || hovering ? BLUE3 : GREY2,
    color: WHITE,
    height: '40px',
    width: '280px',
    alignItems: 'center',
    borderRight: '1px solid ' + WHITE,
  };

  const title = props.title;

  return (
    <div
      className={'flex align-items-center justify-content-center'}
      style={tabStyle}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => {
        if (!props.selected) {
          props.onSelect(props.identifier);
        }
      }}
    >
      <i className="pi pi-bell" />
      <div className={'p-m-auto p-text-bold'}>{title}</div>
    </div>
  );
};
