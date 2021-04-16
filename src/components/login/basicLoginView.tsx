import { Component } from "react";
import { Link } from "react-router-dom";

import { BLUE4 } from "../constants";
import AppLogo from "../../assets/app_logo.png";
import AuthContext from "../../contexts/auth";
import LoginButtonAndSpinner from "./loginButtonWithSpinner";

interface State {
    email: String;
    password: String;
}

class BasicLoginView extends Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submit = (event) => {
        event.preventDefault();
        this.context.login({ email: this.state.email, password: this.state.password });
    }

    handleChange({ target: { name, value } }) {
        let newState = { [name]: value } as Pick<State, keyof State>;
        this.setState(newState);
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
                        <form style={{ width: "85%", height: "100%" }} className="p-mr-4 p-mt-4" onSubmit={this.submit}>
                            <div className={"p-d-flex p-flex-column"}>
                                <label className="inputLabel">Email address</label>
                                <input value={this.state.email.valueOf()} onChange={this.handleChange} name="email" type="email"
                                    className={"p-inputtext"} placeholder="Email address" required autoFocus style={{ marginBottom: "1rem" }} />
                                <label className="inputLabel">Password</label>
                                <input value={this.state.password.valueOf()} onChange={this.handleChange} name="password" type="password"
                                    className={"p-inputtext"} placeholder="Password" required style={{ marginBottom: "1rem" }} />
                                <div>
                                    <LoginButtonAndSpinner isLoading={this.context.isLoading} />
                                </div>
                            </div>
                        </form>
                    </div>
                    <Link style={{ alignSelf: "center", fontWeight: "bolder", color: "black" }} to="/imprint">Imprint</Link>
                    <span style={{ padding: "10px", alignSelf: "center" }}>&copy; IAV GmbH 2020</span>
                </div>
            </div >
        );
    }
};

BasicLoginView.contextType = AuthContext;

export default BasicLoginView;