import { Logo } from "@/shared/components/Logo/Logo";
import { ThemeToggle } from "@/shared/components/Header/components/ThemeToggle/ThemeToggle";
import styles from "./page.module.css";
import { Header } from "@/shared/components/Header/Header";

export default function Home() {
  return (
    <main className={styles.hero}>
      <Header />
      {/* <Logo className={styles.logo} />
      <h1 className={styles.name}>Enzo Castro</h1>
      <ThemeToggle /> */}
    </main>
  );
}
