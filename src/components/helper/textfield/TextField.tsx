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

import React, {
  CSSProperties,
  HTMLInputTypeAttribute,
  useContext,
  useMemo,
} from "react";
import {InputText} from "primereact/inputtext";
import {ColorSettingsContext} from "../../../contexts/colorsettings";
import {RED} from "../../../constants";

interface Props {
  className?: string | undefined;
  style?: CSSProperties | undefined;
  label?: string;
  id?: string;
  type?: HTMLInputTypeAttribute | undefined;
  name?: string;
  required?: boolean;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: boolean;
  helperText?: string;
  autoFocus?: boolean;
}

const TextField: React.FC<Props> = (props) => {
  const {
    className,
    style,
    label,
    id,
    type,
    name,
    required,
    value,
    onChange,
    error,
    helperText,
    autoFocus,
  } = props;

  const errorMessage = useMemo(() => {
    return error ? helperText : " ";
  }, [error, helperText]);

  const colorSettingsContext = useContext(ColorSettingsContext);

  const inputFieldDescriptionTextColor = useMemo(() => {
    return colorSettingsContext.currentColors.authenticationView
      .inputFieldDescriptionTextColor;
  }, [colorSettingsContext]);

  const autoComplete = type === "password" ? "current-password" : "";

  return (
    <div className={`${className} flex flex-column`} style={style}>
      <label
        htmlFor={id}
        style={{
          fontWeight: "normal",
          marginBottom: "2px",
          fontSize: "12px",
          color: inputFieldDescriptionTextColor,
        }}
      >
        {label}
      </label>
      <InputText
        id={id}
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
      />
      <small id={`${id}-help`} style={{height: "17px", color: RED}}>
        {errorMessage}
      </small>
    </div>
  );
};

export default TextField;
