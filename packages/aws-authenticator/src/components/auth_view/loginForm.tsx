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

import React, {FormEvent} from "react";
import {LoginButtonWithSpinner} from "@iavofficial/frontend-framework-shared/loginButtonWithSpinner";
import {TranslationFunctionParams} from "@iavofficial/frontend-framework-shared/internationalizerModule";
import makeStyles from "@iavofficial/frontend-framework-shared/makeStyles";

const useStyles = makeStyles(({props}: {props: Props}) => ({
  container: {
    width: "100%",
    height: "100%",
  },
  inputLabel: {
    fontWeight: "normal",
    marginBottom: "2px",
    fontSize: "12px",
    color: props.inputFieldDescriptionTextColor,
  },
  input: {
    marginBottom: "40px",
    backgroundColor: props.inputFieldBackgroundColor,
    color: props.inputFieldTextColor,
  },
  invalid: {
    marginTop: "20px",
  },
}));

interface Props {
  submit: (event: FormEvent<HTMLFormElement>) => void;
  inputFieldDescriptionTextColor: string;
  email: string;
  setEmail: (value: string) => void;
  t: (params: TranslationFunctionParams) => string;
  inputFieldBackgroundColor: string;
  inputFieldTextColor: string;
  password: string;
  setPassword: (value: string) => void;
  isLoading: boolean;
  loginError: string;
}

export const LoginForm = (props: Props) => {
  const {
    submit,
    email,
    setEmail,
    t,
    password,
    setPassword,
    isLoading,
    loginError,
  } = props;

  const {classes, cx} = useStyles({props});

  return (
    <form className={classes.container} onSubmit={submit}>
      <div
        style={{margin: "40px 24px 0px 24px"}}
        className={"flex flex-column"}
      >
        <label className={cx("inputLabel", classes.inputLabel)}>
          {t({key: "Email_address"})}
        </label>
        <input
          className={cx("p-inputtext", classes.input)}
          value={email.valueOf()}
          onChange={(ev) => setEmail(ev.target.value)}
          name="email"
          type="email"
          required
          autoFocus
        />
        <label className={cx("inputLabel", classes.inputLabel)}>
          {t({key: "Password"})}
        </label>
        <input
          className={cx("p-inputtext", classes.input)}
          value={password.valueOf()}
          onChange={(ev) => setPassword(ev.target.value)}
          name="password"
          type="password"
        />
        <div>
          <LoginButtonWithSpinner isLoading={isLoading} />
        </div>
        <div className={cx("invalid", classes.invalid)}>
          {t({key: loginError})}
        </div>
      </div>
    </form>
  );
};
