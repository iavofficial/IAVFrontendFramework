import React from "react";
import Component from React;

class Navbar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        <div id = "navbarContainer">
            {this.props.children}
        </div>
    }
}

export default Navbar;