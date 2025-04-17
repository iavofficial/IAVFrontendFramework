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
 **/

import { useContext, useState } from "react";
import { Button } from "primereact/button";
import { useTranslator } from "@iavofficial/frontend-framework/translators";
import { ColorSettingsContext } from "@iavofficial/frontend-framework/colorSettingsContext";

export const AdvancedExampleHeader = () => {
  const t = useTranslator();
  const { darkmode, setDarkmode } = useContext(ColorSettingsContext);

  const [clicked, setClicked] = useState(false);

  const darkModeSwitchHandler = () => {
    setDarkmode(!darkmode);
  };

  const uselessButtonHandler = () => {
    setClicked(!clicked);
    console.log("This button does absolutely nothing!");
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: darkmode ? "#222" : "#f5f5f5",
        color: darkmode ? "#fff" : "#000",
        fontSize: "1.2rem",
        transition: "background-color 0.3s, color 0.3s",
        borderRadius: "8px",
      }}
    >
      <h1 style={{ margin: 0 }}>{t("Click to Toggle Dark Mode")}</h1>
      <div>
        <Button
          label={t("Useless Button 1")}
          onClick={uselessButtonHandler}
          style={{ marginRight: "0.5rem" }}
        />
        <Button
          label={t("Useless Button 2")}
          onClick={uselessButtonHandler}
          style={{ marginRight: "0.5rem" }}
        />
        <Button
          label={t("Useless Button 3")}
          onClick={uselessButtonHandler}
          style={{ marginRight: "0.5rem" }}
        />
        <Button label={t("Toggle Dark Mode")} onClick={darkModeSwitchHandler} />
      </div>
    </header>
  );
};
