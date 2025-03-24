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
import {TranslationFunctionParams} from "@iavofficial/frontend-framework-shared/internationalizerModule";
import {LoginButtonWithSpinner} from "@iavofficial/frontend-framework-shared/loginButtonWithSpinner";
import makeStyles from "@iavofficial/frontend-framework-shared/makeStyles";

const useStyles = makeStyles(({props}: { props: Props }) => ({
    container: {
        width: "100%",
        height: "100%"
    },
    formWrapper: {
        margin: "0px 24px 0px 24px"
    },
    requirements: {
        color: props.passwortRequirementsTextColor
    },
    inputLabel: {
        fontWeight: "normal",
        marginBottom: "2px",
        fontSize: "12px",
        color: props.inputFieldDescriptionTextColor,
    },
    input: {
        marginBottom: "40px",
        width: "100%",
        backgroundColor: props.inputFieldBackgroundColor,
        color: props.inputFieldTextColor,
    }
}));

interface Props {
    passwortRequirementsTextColor: string;
    inputFieldDescriptionTextColor: string;
    t: (params: TranslationFunctionParams) => string;
    submit: (event: FormEvent<HTMLFormElement>) => void;
    loginError: string;
    inputFieldBackgroundColor: string;
    inputFieldTextColor: string;
    setPassword: (value: string) => void;
    isLoading: boolean;
}

export const NewPasswordForm = (props: Props) => {

    const {
        t,
        submit,
        loginError,
        setPassword,
        isLoading
    } = props;

    const {classes, cx} = useStyles({props});

    return (
        <div className={classes.container}>
            <div className={cx("flex", "flex-column", classes.formWrapper)}>
                <div className={classes.requirements}>
                    <p>{t({key: "replace_temporary_password"})}</p>
                    <ul>
                        <li>{t({key: "password_req_8_characters"})}</li>
                        <li>{t({key: "password_req_upper_lower_case"})}</li>
                        <li>{t({key: "password_req_special_character"})}</li>
                        <li>{t({key: "password_req_one_digit"})}</li>
                    </ul>
                </div>
                <form autoComplete="off" onSubmit={submit}>
                    <div>
                        <label className={cx("inputLabel " + (loginError ? "invalid" : ""), classes.inputLabel)}>
                            {t({key: "New_password"})}
                        </label>
                        <input
                            className={cx("form-control p-inputtext " + (loginError ? "invalid" : ""), classes.input)}
                            name="password"
                            type="password"
                            id="inputPassword"
                            onChange={(ev) => setPassword(ev.target.value)}
                            required
                            autoFocus
                        />

                        <LoginButtonWithSpinner isLoading={isLoading}/>
                        <div className="invalid">{t({key: loginError})}</div>
                    </div>
                </form>
            </div>
        </div>
    );
}