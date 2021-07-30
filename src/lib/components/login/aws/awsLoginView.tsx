import React, { FormEvent } from "react";
import { Link } from "react-router-dom";

import { BLUE4 } from "../../../constants";
import AppLogo from "../../../assets/app_logo.png";
import { AuthContext } from "../../../contexts/auth";
import { LoginButtonWithSpinner } from "../loginButtonWithSpinner";
import { useState } from "react";
import { useContext } from "react";
import { useTranslator } from "../../internationalization/internationalization_hooks";

export const AWSLoginView = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const authContext = useContext(AuthContext);
    const t = useTranslator();

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (authContext?.isNewPasswordRequired) {
            authContext?.completePassword(password);
        } else {
            authContext?.login({ email: email, password: password });
        }
    }

    const getErrorText = (error: any) => {
        if (error) {
            if (error.code) {
                if (error.code === "UserGroupError") {
                    return t("invalid_access_configuration");                      // user was not added to a group
                } else if (error.code === "NotAuthorizedException") {
                    return t("invalid_username_or_password");                      // invalid user credentials
                } else if (error.code === "InvalidPasswordException") {
                    return t("password_requirements_not_met");            // set password does not conform to password policy
                } else {
                    return t("server_error");
                }
            } else {
                return error.message ? error.message : "";
            }
        }
        return "";
    }

    const NewPasswordForm = (
        <div style={{ width: "85%" }}>
            <div>
                <p>Please replace your temporary password with a new one. Your new password has to meet the following requirements:</p>
                <ul>
                    <li>At least 8 characters</li>
                    <li>Upper & lower cases letters</li>
                    <li>At least one special character</li>
                    <li>At least one digit</li>
                </ul>
            </div>
            <form autoComplete="off" onSubmit={submit}>
                <div>
                    <label className={"inputLabel " + (authContext?.loginError.code ? "invalid" : "")}>New password</label>
                    <input name="password" type="password" id="inputPassword" style={{ width: "100%", marginTop: "5px", marginBottom: "10px" }}
                        className={"form-control p-inputtext " + (authContext?.loginError.code ? "invalid" : "")} placeholder="New password"
                        onChange={(ev) => setPassword(ev.target.value)} required autoFocus />
                    <LoginButtonWithSpinner isLoading={authContext?.isLoading} />
                    <div className="invalid">{getErrorText(authContext?.loginError)}</div>
                </div>
            </form>
        </div>
    )

    const LoginForm = (
        <form style={{ width: "85%", height: "100%" }} className="p-mr-4 p-mt-4" onSubmit={submit}>
            <div className={"p-d-flex p-flex-column"}>
                <label className="inputLabel">Email address</label>
                <input value={email.valueOf()} onChange={(ev) => setEmail(ev.target.value)} name="email" type="email"
                    className={"p-inputtext"} placeholder="Email address" required style={{ marginBottom: "1rem" }} autoFocus />
                <label className="inputLabel" >Password</label>
                <input value={password.valueOf()} onChange={(ev) => setPassword(ev.target.value)} name="password" type="password"
                    className={"p-inputtext"} placeholder="Password" required style={{ marginBottom: "1rem" }} />
                <div>
                    <LoginButtonWithSpinner isLoading={authContext?.isLoading} />
                </div>
                <div style={{ marginTop: "20px" }} className="invalid">{getErrorText(authContext?.loginError)}</div>
            </div>
        </form>
    );

    return (
        <div className="p-d-flex" style={{ height: "100%" }}>
            <div className="p-d-flex p-flex-column p-shadow-10" style={{ width: "500px", margin: "auto" }}>
                <div className={"p-d-flex"} style={{ backgroundColor: BLUE4, color: "white", alignItems: "center" }}>
                    <img src={AppLogo} alt={""} />
                    <span style={{ fontSize: "xx-large", marginLeft: "auto", marginRight: "20px" }}>LOGIN</span>
                </div>
                <div className="p-d-flex" style={{ justifyContent: "center", marginBottom: "30px" }}>
                    {authContext?.isNewPasswordRequired ? NewPasswordForm : LoginForm}
                </div>
                <Link style={{ alignSelf: "center", fontWeight: "bolder", color: "black" }} to="/imprint">Imprint</Link>
                <span style={{ padding: "10px", alignSelf: "center" }}>&copy; IAV GmbH 2020</span>
            </div>
        </div >
    );
}