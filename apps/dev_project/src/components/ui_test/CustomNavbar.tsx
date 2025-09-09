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

import React from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useModule } from "@iavofficial/frontend-framework-shared/moduleContext";
import { MandatoryModuleNames } from "@iavofficial/frontend-framework-shared/moduleNames";
import { UINavbarProps } from "@iavofficial/frontend-framework-shared/navbarModuleInterfaces";

const CustomNavbar = (props: UINavbarProps) => {
  const ui = useModule(MandatoryModuleNames.UI);
  const router = useModule(MandatoryModuleNames.Router);
  const Link = router?.Link;

  const useTypedSelector: TypedUseSelectorHook<any> = useSelector;
  const collapsed = useTypedSelector(
    (s) => s[MandatoryModuleNames.UI]?.navbarCollapsed,
  );
  const dispatch = useDispatch();

  const onToggle = () =>
    ui?.extras?.toggleNavbar && dispatch(ui.extras.toggleNavbar());

  return (
    <div
      style={{
        width: collapsed ? 72 : 260,
        borderRight: "1px solid #eee",
        padding: collapsed ? 4 : 8,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <button
        onClick={onToggle}
        style={{
          padding: 8,
          border: "1px solid #ddd",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        {collapsed ? ">" : "<"}
      </button>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {props.tabAndContentWrappers.map((w, i) => (
          <div key={i}>
            {w.getNavbarComponent({ navbarCollapsed: !!collapsed })}
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {(props.legalDocuments ?? [])
          .filter((d) => !d.isHidden)
          .map((d) =>
            Link ? (
              <Link
                key={d.path}
                to={d.path}
                style={{ textDecoration: "none", fontSize: 13 }}
              >
                {d.titleTranslationKey}
              </Link>
            ) : (
              <a
                key={d.path}
                href={d.path}
                style={{ textDecoration: "none", fontSize: 13 }}
              >
                {d.titleTranslationKey}
              </a>
            ),
          )}
      </div>
    </div>
  );
};

export default CustomNavbar;
