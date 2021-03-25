import { Component } from 'react';

class RootComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>This is the root. Example data: {this.props.test1}</div>
        );
    }
}

export default RootComponent;