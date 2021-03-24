// TODO: Problem mit Content: Kein React.cloneElement(...) möglich. Normaler Methodenaufruf notwendig.
import { Component } from 'react';
import './App.css';
import 'primeflex/primeflex.css';
import navFleetSelected from './assets/nav_fleet_selected.png';
import navFleetDeselected from './assets/nav_fleet_deselected.png';
import navFleetDetailSelected from './assets/nav_fleet_detail_selected.png';
import navFleetDetailDeselected from './assets/nav_fleet_detail_deselected.png';
import DisaPage from './components/disaPage.js';
import BaseContent from './components/baseContent.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.testCallback = this.testCallback.bind(this);
    this.state = {
      contentTabs: [
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
      ]
    };
    this.views = [
      {
        selectedIcon: navFleetSelected,
        deselectedIcon: navFleetDeselected,
        to: "/",
        name: "Root",
        disabled: false,
        component: (props) => <div>This is the root. Example data: {props.test1}</div>,
        contentTabs: this.state.contentTabs
      },
      {
        selectedIcon: navFleetSelected,
        deselectedIcon: navFleetDeselected,
        to: "/test1",
        name: "Test1",
        disabled: false,
        component: () => (
          <BaseContent>
            <div>
              <button onClick={this.testCallback}>Test for callback</button>
            </div>
          </BaseContent>
        ),
        contentTabs: this.state.contentTabs
      },
      {
        selectedIcon: navFleetDetailSelected,
        deselectedIcon: navFleetDetailDeselected,
        to: "/test2",
        name: "Test2",
        disabled: true,
        component: () => "This is the second test",
        contentTabs: this.state.contentTabs
      }
    ]
  }

  testCallback() {
    let newTab = {
      uiElement: <div style={{ backgroundColor: "grey", padding: "4px", marginRight: "10px" }}>Test Button 3</div>,
      refreshOnClick: true,
      data: function () { return { test1: "test5", test2: "test6" } },
    };
    this.setState({ contentTabs: [...this.state.contentTabs, newTab] });
  }

  render() {
    return (
      <DisaPage views={this.views} />
    );
  }
}

export default App;