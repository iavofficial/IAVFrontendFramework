import { Component } from 'react';
import RootComponent from './testComponents/rootComponent.js'
import Test1Component from './testComponents/test1Component.js'
import Test2Component from './testComponents/test2Component.js'
import Test3Component from './testComponents/test3Component.js'
import navFleetSelected from '../assets/nav_fleet_selected.png';
import navFleetDeselected from '../assets/nav_fleet_deselected.png';
import navFleetDetailSelected from '../assets/nav_fleet_detail_selected.png';
import navFleetDetailDeselected from '../assets/nav_fleet_detail_deselected.png';
import DisaPage from './disaPage.js';

class Contentmanager extends Component {
    constructor(props) {
        super(props);
        this.testCallback1 = this.testCallback1.bind(this);
        this.state = {
            contentTabs1: [
                {
                    uiElement: <div style={{ backgroundColor: "grey", padding: "4px", marginRight: "10px" }}>Test Button</div>,
                    refreshOnClick: true,
                    data: function () { return { test1: "test1", test2: "test2" } },
                },
                {
                    uiElement: <div style={{ backgroundColor: "grey", padding: "4px", marginRight: "10px" }}>Test Button 2</div>,
                    refreshOnClick: false,
                    data: function () { return { test1: "test3", test2: "test4" } },
                }
            ],
            contentTabs2: [
                {
                    uiElement: <div style={{ backgroundColor: "grey", padding: "4px", marginRight: "10px" }}>Another element</div>,
                    refreshOnClick: false,
                    data: function () { return { test1: "test3", test2: "test4" } },
                }
            ]
        }
    }

    testCallback1() {
        let newTab = {
            uiElement: <div style={{ backgroundColor: "grey", padding: "4px", marginRight: "10px" }}>Test Button 3</div>,
            refreshOnClick: true,
            data: function () { return { test1: "test5", test2: "test6" } },
        };
        this.exampleContentTabs1.push(newTab);
    }

    render() {
        let views = [
            {
                selectedIcon: navFleetSelected,
                deselectedIcon: navFleetDeselected,
                to: "/",
                name: "Root",
                disabled: false,
                component: (props) => <RootComponent {...props} />,
                contentTabs: this.state.contentTabs1
            },
            {
                selectedIcon: navFleetSelected,
                deselectedIcon: navFleetDeselected,
                to: "/test1",
                name: "Test1",
                disabled: false,
                component: (props) => <Test1Component {...props} />,
                contentTabs: this.state.contentTabs2
            },
            {
                selectedIcon: navFleetSelected,
                deselectedIcon: navFleetDeselected,
                to: "/test2",
                name: "Test2",
                disabled: false,
                component: (props) => <Test2Component {...props} />,
                contentTabs: this.state.contentTabs1
            },
            {
                selectedIcon: navFleetDetailSelected,
                deselectedIcon: navFleetDetailDeselected,
                to: "/test3",
                name: "Test3",
                disabled: true,
                component: (props) => <Test3Component {...props} />,
                contentTabs: this.state.contentTabs1
            }
        ]
        return (
            <DisaPage views={views} />
        );
    }
}

export default Contentmanager;