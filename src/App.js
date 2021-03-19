import './App.css';
import 'primeflex/primeflex.css';
import navFleetSelected from './assets/nav_fleet_selected.png';
import navFleetDeselected from './assets/nav_fleet_deselected.png';
import navFleetDetailSelected from './assets/nav_fleet_detail_selected.png';
import navFleetDetailDeselected from './assets/nav_fleet_detail_deselected.png';
import DisaPage from './components/disaPage.js';
import BaseContent from './components/baseContent.js'

function App() {
  let tabs = [
    {
      selectedIcon: navFleetSelected,
      deselectedIcon: navFleetDeselected,
      to: "/",
      name: "Root",
      disabled: false,
      component: () => "This is the root"
    },
    {
      selectedIcon: navFleetSelected,
      deselectedIcon: navFleetDeselected,
      to: "/test1",
      name: "Test1",
      disabled: false,
      component: BaseContent
    },
    {
      selectedIcon: navFleetDetailSelected,
      deselectedIcon: navFleetDetailDeselected,
      to: "/test2",
      name: "Test2",
      disabled: true,
      component: () => "This is the second test"
    }
  ]

  return (
    <DisaPage tabs={tabs} />
  );
}

export default App;