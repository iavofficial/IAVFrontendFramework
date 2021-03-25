import { Component } from 'react';
import BaseContent from '../baseContent.js'

class Test1Component extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BaseContent>
                <div>
                    <button onClick={console.log("test")}>Test for callback</button>
                </div>
            </BaseContent>
        );
    }
}

export default Test1Component;