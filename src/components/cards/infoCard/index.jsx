import styles from "./styles.module.scss";

const InfoCardDefault = ({ img, alt, text, caption }) => {
  return (
    <div className={styles.info_card_default}>
      <img src={img} alt={alt} className={styles.info_card_default_media} />
      <div className={styles.info_card_default_body}>
        <span className={styles.info_card_default_title}>{text}</span>
        <span className={styles.info_card_default_caption}>{caption}</span>
      </div>
    </div>
  );
};

export default InfoCardDefault;
