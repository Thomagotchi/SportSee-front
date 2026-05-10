import styles from "./styles.module.scss";

const ErrorPage = ({ message }) => {
  return (
    <div className={styles.error_wrapper}>
      <h1 className={styles.error_code}>404</h1>
      <p className={styles.error_message}>{message}</p>
    </div>
  );
};

export default ErrorPage;
