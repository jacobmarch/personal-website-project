import styles from "./books.module.css";

export default function BooksLayout({ children }) {
  return <div className={styles.routeShell}>{children}</div>;
}
