// TODO: Problem mit Content: Kein React.cloneElement(...) möglich. Normaler Methodenaufruf notwendig.
import { Component } from 'react';
import './App.css';
import RootComponent from './develop/components/rootComponent.js'
import Test1Component from './develop/components/test1Component.js'
import Test2Component from './develop/components/test2Component.js'
import Test3Component from './develop/components/test3Component.js'
import navFleetSelected from './develop/assets/nav_fleet_selected.png';
import navFleetDeselected from './develop/assets/nav_fleet_deselected.png';
import navFleetDetailSelected from './develop/assets/nav_fleet_detail_selected.png';
import navFleetDetailDeselected from './develop/assets/nav_fleet_detail_deselected.png';
import DisaPage from './components/disaPage.js';
import FirstContextClass from './develop/contexts/FirstContext.js';
import SecondContextClass from './develop/contexts/SecondContext.js';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let views = [
      {
        selectedIcon: navFleetSelected,
        deselectedIcon: navFleetDeselected,
        to: "/",
        name: "Root",
        disabled: false,
        component: RootComponent,
      },
      {
        selectedIcon: navFleetSelected,
        deselectedIcon: navFleetDeselected,
        to: "/test1",
        name: "Test1",
        disabled: false,
        component: Test1Component,
      },
      {
        selectedIcon: navFleetSelected,
        deselectedIcon: navFleetDeselected,
        to: "/test2",
        name: "Test2",
        disabled: false,
        component: Test2Component,
      },
      {
        selectedIcon: navFleetDetailSelected,
        deselectedIcon: navFleetDetailDeselected,
        to: "/test3",
        name: "Test3",
        disabled: true,
        component: Test3Component,
      }
    ]
    return (
      <FirstContextClass>
        <SecondContextClass>
          <DisaPage views={views} />
        </SecondContextClass>
      </FirstContextClass>
    );
  }
}

export default App;