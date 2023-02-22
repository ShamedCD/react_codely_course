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
import { useEffect, useState } from "react";

import { config } from "../../config/devdash";
import ApiGithubRepository from "../../interfaces/ApiGithubRepository";
import { GithubRepository } from "../../interfaces/GithubRepository";
import styles from "./Dashboard.module.scss";

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

export function Dashboard({ repository }: { repository: ApiGithubRepository }) {
	const title = "DevDash_";
	const [githubApiResponse, setGithubApiResponse] = useState<GithubRepository[]>([]);

	useEffect(() => {
		repository
			.search(config.widgets.map((widget) => widget.repository_url))
			.then((response) => {
				setGithubApiResponse(response);
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<h1 className={styles.app__brand}>{title}</h1>
				</section>
			</header>
			<section className={styles.container}>
				{githubApiResponse.map((widget) => (
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
				))}
			</section>
		</>
	);
}
