import { Component } from 'react';
import { SecondContext } from '../contexts/SecondContext';
import Content from '../../components/content/content.js';

class Test1Component extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Content contentElements={this.context.contentTabs}>
                <div>Test</div>
            </Content>
        );
    }
}

Test1Component.contextType = SecondContext;

export default Test1Component;