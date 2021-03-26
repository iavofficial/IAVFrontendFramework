import { Component } from 'react';
import Content from '../../components/content.js';

class Test3Component extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Content contentTabs={this.context.contentTabs}>
                <div>"This is the third test."</div>
            </Content>
        );
    }
}

export default Test3Component;