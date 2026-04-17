// ----- Styles -----
import styles from "./styles.module.scss";

// ----- Components -----
import Navigation from "./components/navigation/navigation";
import InfoCardDefault from "./components/cards/infoCard";

// ----- Functions -----
import { useEffect, useState } from "react";
import { getUser } from "./services/userInfo";
import { userKeyInfo } from "./utils/transformers/userInfoTransformer";
// ----- Data -----
import NavbarData from "./data/navbar.json";
import AsideData from "./data/aside.json";
import HeroDefault from "./sections/heros/hero";
import BarGraphSectionDefault from "./sections/body/barGraph";
import LineGraphSectionDefault from "./sections/body/lineGraph";
import RadarGraphSectionDefault from "./sections/body/radarGraph";
import ScoreGraphSectionDefault from "./sections/body/scoreGraph";

// ----- Assets -----
import caloriesIcon from "../public/assets/illustrations/calories-icon.png";
import proteinIcon from "../public/assets/illustrations/protein-icon.png";
import fatIcon from "../public/assets/illustrations/fat-icon.png";
import carbsIcon from "../public/assets/illustrations/carbs-icon.png";

const USER_ID = 12;

function App() {
  const [keyData, setKeyData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getUser({ id: USER_ID });
        const transformed = userKeyInfo(response);
        setKeyData(transformed);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Navigation
        type={"NavbarDefault"}
        logo={NavbarData.logo}
        links={NavbarData.links}
      />
      <Navigation type={"AsideDefault"} links={AsideData.links} />
      <div className={styles.page_wrapper}>
        <HeroDefault />
        <div className={styles.body_wrapper}>
          <div className={styles.charts_wrapper}>
            <BarGraphSectionDefault />
            <LineGraphSectionDefault />
            <RadarGraphSectionDefault />
            <ScoreGraphSectionDefault />
          </div>
          <div className={styles.cards_wrapper}>
            <InfoCardDefault
              img={caloriesIcon}
              alt={"Calories icon"}
              text={keyData?.calorie}
              caption={"Calories"}
            />
            <InfoCardDefault
              img={proteinIcon}
              alt={"Protein icon"}
              text={keyData?.protein}
              caption={"Proteines"}
            />
            <InfoCardDefault
              img={carbsIcon}
              alt={"Glucides icon"}
              text={keyData?.carbohydrate}
              caption={"Glucides"}
            />
            <InfoCardDefault
              img={fatIcon}
              alt={"Lipides icon"}
              text={keyData?.lipid}
              caption={"Lipides"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
