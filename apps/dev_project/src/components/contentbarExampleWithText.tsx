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

import { CellPaddings, ContentCell } from "@iavofficial/frontend-framework/contentCell";
import { Button } from "primereact/button";
import { useState } from "react";

export interface Props {
  exampleText: string;
}

export const ContentbarExampleWithText = (props: Props) => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <div className="col-8 grid grid-nogutter">
        <ContentCell colWidth={6} paddings={CellPaddings.FULL}>
          <span>First row left</span>
          <h2>{props.exampleText}</h2>
          <h3>Contentbar with default tabelements</h3>
          <h3>Advanced useCase</h3>
          <div></div>
        </ContentCell>
        <ContentCell colWidth={6} paddings={CellPaddings.VERT_RIGHT}>
          <span>First row center</span>
          <div style={{ marginTop: "80px" }}>{counter}</div>
          <div style={{ marginTop: "40px" }}>
            <Button
              label={"Increment counter"}
              onClick={() => {
                setCounter((prevCounter) => prevCounter + 1);
              }}
            />
          </div>
        </ContentCell>
        <ContentCell paddings={CellPaddings.BOT_HOR}>
          <span>Second row left</span>
        </ContentCell>
        <ContentCell paddings={CellPaddings.BOT_RIGHT}>
          <span>Second row center left</span>
        </ContentCell>
        <ContentCell paddings={CellPaddings.BOT_RIGHT}>
          <span>Second row center</span>
        </ContentCell>
        <ContentCell paddings={CellPaddings.BOT_RIGHT}>
          <span>Second row center right</span>
        </ContentCell>
        <ContentCell paddings={CellPaddings.BOT_RIGHT}>
          <span>Second row right</span>
        </ContentCell>
        <ContentCell colWidth={12} paddings={CellPaddings.BOT_HOR}>
          <span>Third row</span>
        </ContentCell>
      </div>

      <ContentCell
        paddings={CellPaddings.VERT_RIGHT}
        colWidth={4}
        clearStyle={true}
      >
        <span>Right with cleared style</span>
      </ContentCell>
    </>
  );
};
