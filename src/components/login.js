import { Component } from "react";

class Login extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            this.props.children
        );
    }
}

export default Login;