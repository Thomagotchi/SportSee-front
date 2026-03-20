import AsideDefault from "./aside";
import NavbarDefault from "./navbar";

const Navigation = ({ type, links, logo }) => {
  switch (type) {
    case "NavbarDefault":
      return <NavbarDefault logo={logo} links={links} />;
    case "AsideDefault":
      return <AsideDefault links={links} />;
    default:
      return <></>;
  }
};

export default Navigation;
