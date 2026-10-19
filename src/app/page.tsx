import { Logo } from "@/components/Logo/Logo";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.hero}>
      <Logo className={styles.logo} />
      <h1 className={styles.name}>Enzo Castro</h1>
      <ThemeToggle />
    </main>
  );
}
