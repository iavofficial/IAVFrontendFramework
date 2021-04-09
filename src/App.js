// TODO: Problem mit Content: Kein React.cloneElement(...) möglich. Normaler Methodenaufruf notwendig.
import { Component } from "react";
import "./App.css";
import RootComponent from "./develop/components/rootComponent"
import Test1Component from "./develop/components/test1Component"
import Test2Component from "./develop/components/test2Component"
import Test3Component from "./develop/components/test3Component"
import navFleetSelected from "./develop/assets/nav_fleet_selected.png";
import navFleetDeselected from "./develop/assets/nav_fleet_deselected.png";
import navFleetDetailSelected from "./develop/assets/nav_fleet_detail_selected.png";
import navFleetDetailDeselected from "./develop/assets/nav_fleet_detail_deselected.png";
import DisaPage from "./components/disaPage";
import FirstContextClass from "./develop/contexts/FirstContext";
import SecondContextClass from "./develop/contexts/SecondContext";
import AWSLoginProvider from "./components/login/awsLoginProvider"

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
          <DisaPage views={views} startingPoint="/" loginProvider={AWSLoginProvider} />
        </SecondContextClass>
      </FirstContextClass>
    );
  }
}

export default App;