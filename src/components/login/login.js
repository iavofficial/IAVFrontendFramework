import { Component } from 'react';
import StandardLoginView from './standardLoginView.js';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StandardLoginView />
            //            this.props.children
        );
    }
}

export default Login;