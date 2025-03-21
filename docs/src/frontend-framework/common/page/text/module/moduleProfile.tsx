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

type Profile = {
  moduleKey: string;
  isDefaultModule: boolean;
  shortDescription: string;
  installCmd?: string;
};

export const ModuleProfile = (props: Profile) => {
  const Key = (props: { text: string }) => (
    <div style={{ color: "#041e96", marginBottom: "5px", fontSize: "1.2em" }}>
      <strong>{props.text}</strong>
    </div>
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "fit-content",
          marginBottom: "50px",
        }}
      >
        <div>
          <Key text="Key" /> {props.moduleKey}
        </div>
        <div>
          <Key text="Default module" /> {props.isDefaultModule ? "Yes" : "No"}
        </div>
        {props.installCmd && (
          <div>
            <Key text="Install with" /> {props.installCmd}
          </div>
        )}
        <div>
          <Key text="Description" /> {props.shortDescription}
        </div>
      </div>
    </>
  );
};
