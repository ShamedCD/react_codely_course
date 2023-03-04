import { Outlet } from "react-router";

import { ErrorBoundary } from "../ErrorBoundary";
import styles from "./Main.module.scss";

export function Main() {
	const title = "DevDash_";

	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<h1 className={styles.app__brand}>{title}</h1>
				</section>
			</header>
			<ErrorBoundary>
				<Outlet />
			</ErrorBoundary>
		</>
	);
}
