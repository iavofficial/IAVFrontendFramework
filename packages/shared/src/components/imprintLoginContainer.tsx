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

import React from "react";
import {Link} from "react-router-dom";
import {TranslationFunctionParams} from "../types/modules/internationalization/internationalizerModule";

interface Props {
  hideImprint: boolean | undefined;
  legalLinkColor: string;
  hidePrivacyPolicy: boolean | undefined;
  t: (params: TranslationFunctionParams) => string;
}

export const ImprintLoginContainer = (props: Props) => {
  const {hideImprint, legalLinkColor, hidePrivacyPolicy, t} = props;

  return (
    <>
      <span style={{color: "var(--grey-2)"}}>|</span>
      <div
        className="flex"
        style={{
          alignItems: "center",
          gap: "4px",
        }}
      >
        {!hideImprint && (
          <Link
            className="legal-doc-link"
            style={{color: legalLinkColor, fontSize: "12px"}}
            to="/imprint"
            target="_blank"
          >
            {t({key: "Imprint"})}
          </Link>
        )}
        {!hideImprint && !hidePrivacyPolicy && (
          <span style={{color: legalLinkColor, fontSize: "12px"}}>&</span>
        )}
        {!props.hidePrivacyPolicy && (
          <Link
            className="legal-doc-link"
            style={{color: legalLinkColor, fontSize: "12px"}}
            to="/privacy-policy"
            target="_blank"
          >
            {t({key: "Privacy_Policy"})}
          </Link>
        )}
      </div>
    </>
  );
};
