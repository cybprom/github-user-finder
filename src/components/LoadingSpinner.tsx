import styles from "@/styles/LoadingSpinner.module.scss";

export default function LoadingSpinner() {
  return (
    <div
      className={styles.spinner}
      role="status"
      aria-label="Loading user data"
    >
      <div className={styles.spinnerCircle}></div>
    </div>
  );
}
