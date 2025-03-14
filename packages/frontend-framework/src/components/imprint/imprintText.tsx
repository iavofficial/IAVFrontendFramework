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

import React, {useContext} from "react";
import {useTranslator} from "../internationalization/translators";
import {ColorSettingsContext} from "@iavofficial/frontend-framework-shared/colorSettingsContext";

export const ImprintText = () => {
  const t = useTranslator();
  const colorSettingsContext = useContext(ColorSettingsContext);

  return (
    <div
      className={
        colorSettingsContext?.darkmode
          ? "bg-grey-6 color-white"
          : "bg-white-1 color-black"
      }
    >
      <p className={"font-bold"}>{t("Imprint")}</p>
      <span>Max Mustermann, Musterunternehmen</span>
      <br />
      <span>Musterstraße 1</span>
      <br />
      <span>12345 Musterstadt</span> <br />
      <span>{t("Germany")}</span> <br />
      <br />
      <span>Tel.: +49 123 456789</span> <br />
      <span>Fax: +49 123 456789-99</span> <br />
      <span lang="EN-GB">E-Mail: kontakt[at]musterunternehmen.com</span> <br />
      <span>
        {t("Internet")}:{" "}
        <a
          href="http://www.musterunternehmen.com"
          className={colorSettingsContext?.darkmode ? "color-blue-3" : ""}
        >
          www.musterunternehmen.com
        </a>
      </span>{" "}
      <br /> <br />
      <span>{t("Headquarter")}: Musterstadt</span> <br />
      <span>{t("Register_court")}: Amtsgericht Musterstadt</span> <br />
      <span>{t("Registration_number")}: HRB 123456</span> <br />
      <span>{t("USt_Ident_Number")}: DE 123456789</span> <br /> <br />
      <span>{t("Managing_directors")}</span> <br />
      <span>Max Mustermann ({t("Chairman")})</span> <br />
      <span>Erika Mustermann</span> <br />
      <span>Hans Beispiel</span> <br />
      <span>{t("Chairman_supervisory_board")}</span> <br />
      <span>Dr. Johann Muster</span> <br />
    </div>
  );
};
