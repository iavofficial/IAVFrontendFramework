import React, { Component, FormEvent } from "react";
import { Link } from "react-router-dom";

import { BLUE4 } from "../constants";
import AppLogo from "../../assets/app_logo.png";
import { AuthContext } from "../../contexts/auth";
import { LoginButtonWithSpinner } from "./loginButtonWithSpinner";

export interface State {
    email: string;
    password: string
}

export class AWSLoginView extends Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    // These two functions life on the class instance not on the prototype thanks to @babel/plugin-proposal-class-properties.
    submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (this.context.isNewPasswordRequired) {
            this.context.completePassword(this.state.password);
        } else {
            this.context.login({ email: this.state.email, password: this.state.password });
        }
    }

    handleChange = ({ target: { name, value } }: { target: { name: string, value: any } }) => {
        let newState = { [name]: value } as Pick<State, keyof State>;
        this.setState(newState);
    }

    getErrorTextFromCode(code: string) {
        if (code) {
            if (code === "UserGroupError") {
                return "invalid access configuration";                      // user was not added to a group
            } else if (code === "NotAuthorizedException") {
                return "invalid username or password";                      // invalid user credentials
            } else if (code === "InvalidPasswordException") {
                return "password did not meet the requirements";            // set password does not conform to password policy
            } else {
                return "server error";
            }
        }
        return "";
    }

    NewPasswordForm = () => {
        return (
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
                <form autoComplete="off">
                    <div>
                        <label className={"inputLabel " + (this.context.loginError.code ? "invalid" : "")}>New password</label>
                        <input name="password" type="password" id="inputPassword" style={{ width: "100%", marginTop: "5px", marginBottom: "10px" }}
                            className={"form-control p-inputtext " + (this.context.loginError.code ? "invalid" : "")} placeholder="New password"
                            onChange={this.handleChange} required autoFocus />
                        <LoginButtonWithSpinner isLoading={this.context.isLoading} />
                        <div className="invalid">{this.getErrorTextFromCode(this.context.loginError.code)}</div>
                    </div>
                </form>
            </div>
        )
    }

    LoginForm = () => {
        return (
            <form style={{ width: "85%", height: "100%" }} className="p-mr-4 p-mt-4" onSubmit={this.submit}>
                <div className={"p-d-flex p-flex-column"}>
                    <label className="inputLabel">Email address</label>
                    <input value={this.state.email.valueOf()} onChange={this.handleChange} name="email" type="email"
                        className={"p-inputtext"} placeholder="Email address" required autoFocus style={{ marginBottom: "1rem" }} />
                    <label className="inputLabel" >Password</label>
                    <input value={this.state.password.valueOf()} onChange={this.handleChange} name="password" type="password"
                        className={"p-inputtext"} placeholder="Password" required style={{ marginBottom: "1rem" }} />
                    <div>
                        <LoginButtonWithSpinner isLoading={this.context.isLoading} />
                    </div>
                    <div className="invalid">{this.getErrorTextFromCode(this.context.loginError.code)}</div>
                </div>
            </form>
        )
    }

    render() {
        return (
            <div className="p-d-flex" style={{ height: "100%" }}>
                <div className="p-d-flex p-flex-column p-shadow-10" style={{ width: "500px", margin: "auto" }}>
                    <div className={"p-d-flex"} style={{ backgroundColor: BLUE4, color: "white", alignItems: "center" }}>
                        <img src={AppLogo} alt={""} />
                        <span style={{ fontSize: "xx-large", marginLeft: "auto", marginRight: "20px" }}>LOGIN</span>
                    </div>
                    <div className="p-d-flex" style={{ justifyContent: "center", marginBottom: "30px" }}>
                        {this.context.isNewPasswordRequired ? <this.NewPasswordForm /> : <this.LoginForm />}
                    </div>
                    <Link style={{ alignSelf: "center", fontWeight: "bolder", color: "black" }} to="/imprint">Imprint</Link>
                    <span style={{ padding: "10px", alignSelf: "center" }}>&copy; IAV GmbH 2020</span>
                </div>
            </div >
        );
    }
}

AWSLoginView.contextType = AuthContext;