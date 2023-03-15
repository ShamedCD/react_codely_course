import {
	faCircleXmark,
	faCodeFork,
	faCodePullRequest,
	faEye,
	faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import styles from "./GithubRepositoryWidget.module.scss";

function WidgetSkeleton() {
	return (
		<article className={styles.widget}>
			<header
				className={styles.widget__header}
				style={{ display: "block", paddingTop: "1.15rem", paddingBottom: "1.15rem" }}
			>
				<Skeleton baseColor="#3CFF64" highlightColor="#D1FDA" width="70%" />
			</header>
			<div className={styles.widget__body}>
				<p style={{ marginTop: "1rem", marginBottom: "2rem" }}>
					Last update <Skeleton inline={true} width="20%" />
				</p>
				<p className={styles.widget__description} style={{ paddingBottom: "0.65rem" }}>
					<Skeleton height={45} />
				</p>
			</div>
			<footer className={styles.widget__footer}>
				<div className={styles.widget__stat}>
					<FontAwesomeIcon icon={faStar} />
					<span>
						<Skeleton width={35} />
					</span>
				</div>

				<div className={styles.widget__stat}>
					<FontAwesomeIcon icon={faEye} />
					<span>
						<Skeleton width={25} />
					</span>
				</div>

				<div className={styles.widget__stat}>
					<FontAwesomeIcon icon={faCodeFork} />
					<span>
						<Skeleton width={15} />
					</span>
				</div>

				<div className={styles.widget__stat}>
					<FontAwesomeIcon icon={faCircleXmark} />
					<span>
						<Skeleton width={15} />
					</span>
				</div>

				<div className={styles.widget__stat}>
					<FontAwesomeIcon icon={faCodePullRequest} />
					<span>
						<Skeleton width={15} />
					</span>
				</div>
			</footer>
		</article>
	);
}

export function GithubRepositoryWidgetSkeleton({ numberOfWidgets }: { numberOfWidgets: number }) {
	return (
		<SkeletonTheme baseColor="#1A2233" highlightColor="#535966">
			{Array.from({ length: numberOfWidgets }, (value, index) => index).map((_, i) => (
				<WidgetSkeleton key={i} />
			))}
		</SkeletonTheme>
	);
}
