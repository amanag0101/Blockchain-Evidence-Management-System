import Footer from "../footer/Footer";
import Header from "../header/Header";
import styles from "./layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles["layout"]}>
      <div className={styles["header"]}>
        {<Header />}
      </div>

      <div className={styles["children"]}>
        {children}
      </div>

      {/* <div className={styles["footer"]}>
        {<Footer/>}
      </div> */}
    </div>
  );
}
