import { Outlet } from "react-router";
import TopBarProgress from "react-topbar-progress-indicator";

import TopBarProgressIndicator from "../../components/TopBarProgressIndicator/TopBarProgressIndicator";
import { ErrorBoundary } from "../ErrorBoundary";
import styles from "./Main.module.scss";

TopBarProgress.config({
	barColors: {
		"0": "#fff",
		"1.0": "#3cff64",
	},
	shadowBlur: 5,
});

export function Main() {
	const title = "DevDash_";

	return (
		<>
			<TopBarProgressIndicator />
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
