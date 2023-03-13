import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/Menu.module.css";

const menuItems = [
  "placeholder-1",
  "/",
  "/calculator",
  "/intensity",
  "placeholder-2",
];

export default function Menu() {
  const router = useRouter();

  const liClass = (index: number) => {
    const current = menuItems.indexOf(router.pathname);
    const href = menuItems[index];

    if (current === index + 1) return styles.previous;
    return router.pathname === href ? styles.active : undefined;
  };
  return (
    <aside className={styles.aside}>
      <ul className={styles.ul}>
        <li className={liClass(0)}></li>
        <li className={liClass(1)}>
          <Link href={menuItems[1]}>Home</Link>
        </li>
        <li className={liClass(2)}>
          <Link href={menuItems[2]}>Calculator</Link>
        </li>
        <li className={liClass(3)}>
          <Link href={menuItems[3]}>C02 Intensity</Link>
        </li>
        <li className={liClass(4)}></li>
      </ul>
    </aside>
  );
}
