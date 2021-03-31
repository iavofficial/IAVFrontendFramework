import { Component } from 'react';
import Content from '../../components/content/content.js';

class Test3Component extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Content contentElements={this.context.contentTabs}>
                <div>"This is the third test."</div>
            </Content>
        );
    }
}

export default Test3Component;