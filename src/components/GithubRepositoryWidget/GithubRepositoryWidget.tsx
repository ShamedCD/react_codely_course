import { faCircleXmark, faEye, faStar } from "@fortawesome/free-regular-svg-icons";
import {
	faCheck,
	faCodeFork,
	faCodePullRequest,
	faLock,
	faUnlock,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { GithubRepository } from "../../interfaces/GithubRepository";
import styles from "./GithubRepositoryWidget.module.scss";

const isoToReadableDate = (lastUpdateDate: Date): string => {
	const currentDate = new Date();
	const diffTime = currentDate.getTime() - lastUpdateDate.getTime();
	const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

	if (diffDays === 0) {
		return "today";
	}

	if (diffDays > 30) {
		return "more than a month ago";
	}

	return `${diffDays} days ago`;
};

export function GithubRepositoryWidget({ widget }: { widget: GithubRepository }) {
	return (
		<article className={styles.widget} key={`${widget.id.organization}/${widget.id.name}`}>
			<header className={styles.widget__header}>
				<a
					className={styles.widget__title}
					href={widget.url}
					target="_blank"
					title={`${widget.id.organization}/${widget.id.name}`}
					rel="noreferrer"
				>
					{widget.id.organization}/{widget.id.name}
				</a>
				{widget.private ? (
					<FontAwesomeIcon icon={faLock} className={styles.widget__icon} />
				) : (
					<FontAwesomeIcon icon={faUnlock} className={styles.widget__icon} />
				)}
			</header>
			<div className={styles.widget__body}>
				<div className={styles.widget__status}>
					<p>Last update {isoToReadableDate(widget.updatedAt)}</p>
					{widget.hasWorkflows && (
						<div>
							{widget.isLastWorkflowSuccess ? (
								<FontAwesomeIcon icon={faCheck} className={styles.widget__icon__success} />
							) : (
								<FontAwesomeIcon icon={faXmark} className={styles.widget__icon_error} />
							)}
						</div>
					)}
				</div>
				<p className={styles.widget__description}>{widget.description}</p>
			</div>
			<footer className={styles.widget__footer}>
				<div className={styles.widget__stat}>
					<FontAwesomeIcon icon={faStar} />
					<span>{widget.stars}</span>
				</div>

				<div className={styles.widget__stat}>
					<FontAwesomeIcon icon={faEye} />
					<span>{widget.watchers}</span>
				</div>

				<div className={styles.widget__stat}>
					<FontAwesomeIcon icon={faCodeFork} />
					<span>{widget.forks}</span>
				</div>

				<div className={styles.widget__stat}>
					<FontAwesomeIcon icon={faCircleXmark} />
					<span>{widget.issues}</span>
				</div>

				<div className={styles.widget__stat}>
					<FontAwesomeIcon icon={faCodePullRequest} />
					<span>{widget.pullRequests}</span>
				</div>
			</footer>
		</article>
	);
}
