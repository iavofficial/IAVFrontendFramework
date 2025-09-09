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
import { UICookieBannerProps } from "@iavofficial/frontend-framework-shared/cookieBannerModuleInterfaces";

const CustomCookieBanner = (props: UICookieBannerProps) => {
  const { header, message, acceptButtonLabel, visible, onAccept, styles } =
    props;

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        padding: 12,
        background: styles?.backgroundColor ?? "#111",
        color: "#fff",
        borderRadius: 8,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        zIndex: 9999,
      }}
      role="region"
      aria-label={header ?? "Cookie Hinweis"}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <strong>{header ?? "Cookies"}</strong>
        <span>{message ?? "Wir verwenden Cookies."}</span>
      </div>

      <button
        onClick={onAccept}
        style={{
          padding: "8px 12px",
          background: "#fff",
          color: "#111",
          border: 0,
          borderRadius: 6,
          cursor: "pointer",
          fontWeight: 600,
        }}
        aria-label={acceptButtonLabel ?? "Cookies akzeptieren"}
      >
        {acceptButtonLabel ?? "OK"}
      </button>
    </div>
  );
};

export default CustomCookieBanner;
