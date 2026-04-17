import { useEffect, useState } from "react";
import { getUser } from "../../../services/userInfo";
import styles from "./styles.module.scss";

const HeroDefault = ({ userId, isMock }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser({ id: userId, isMock }).then(setUser).catch(console.error);
  }, [userId, isMock]);

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
