import { useEffect, useState } from "react";
import { getUser } from "../../../services/UserInfo";
import styles from "./styles.module.scss";

const HeroDefault = () => {
  const [user, setUser] = useState(null);

  const paramsIdRaw = new URLSearchParams(window.location.search).get("id");
  const paramsId = paramsIdRaw ? paramsIdRaw : 12;

  useEffect(() => {
    getUser({ id: paramsId }).then(setUser).catch(console.error);
  }, [paramsId]);

  return (
    <section className={styles.hero_default}>
      <h1 className={styles.heading}>
        Bonjour{" "}
        <span className={styles.heading_highlight}>
          {user?.data?.userInfos?.firstName}
        </span>
      </h1>
      <p className={styles.text}>
        Félicitation ! Vous avez explosé vos objectifs hier 👏
      </p>
    </section>
  );
};

export default HeroDefault;
