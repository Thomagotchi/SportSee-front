// ----- Styles -----
import "./App.scss";

// ----- Components -----
import Navigation from "./components/navigation/navigation";

// ----- Data -----
import NavbarData from "./data/navbar.json";
import AsideData from "./data/aside.json";

function App() {
  return (
    <>
      <Navigation
        type={"NavbarDefault"}
        logo={NavbarData.logo}
        links={NavbarData.links}
      />
      <Navigation type={"AsideDefault"} links={AsideData.links} />
    </>
  );
}

export default App;
