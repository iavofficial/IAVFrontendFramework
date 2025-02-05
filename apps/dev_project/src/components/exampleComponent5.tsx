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

import { useTranslator } from "@iavofficial/core/translators";
import { BLUE3, WHITE } from "@iavofficial/core/constants";
import { CellPaddings, ContentCell } from "@iavofficial/core/contentCell";
import {
  ContentLayout,
  LayoutBehaviour,
} from "@iavofficial/core/contentLayout";
import { Button } from "primereact/button";
import { useState } from "react";
import { ContentStyleTemplates } from "@iavofficial/core/contentStyle";

export const ExampleComponent5 = () => {
  const [translationString, setTranslationString] = useState("");
  const t = useTranslator();

  return (
    <ContentLayout layoutBehaviour={LayoutBehaviour.FLEX} contentStyle={{appliedStyles: ContentStyleTemplates.CONTENT_CELLS}}>
      <ContentCell colWidth={6} paddings={CellPaddings.FULL}>
        <h1>{t("translation_and_colormode_example")}</h1>
        <h3>{t("with_applied_dark_and_lightMode")}</h3>
        <div className="flex align-items-center">
          <h5 className="m-4">
            {translationString === ""
              ? "i am not translated"
              : t(translationString)}
          </h5>
          <Button
            onClick={
              translationString === ""
                ? () => setTranslationString("i_am_translated")
                : () => setTranslationString("")
            }
            label={translationString === "" ? t("translate") : t("reset")}
            style={{
              width: "150px",
              height: "40px",
              float: "right",
              border: "none",
              borderRadius: "8px",
              color: WHITE,
              backgroundColor: BLUE3,
            }}
          />
        </div>
      </ContentCell>

      <ContentCell colWidth={6} paddings={CellPaddings.NONE}>
        <div
          className="mr-3 mt-3 h-full w-full"
          style={{ backgroundColor: "white", width: "100%" }}
        >
          <h3>{t("without_applied_dark_and_lightMode")}</h3>
        </div>
      </ContentCell>
    </ContentLayout>
  );
};
