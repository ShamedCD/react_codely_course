import { useEffect, useState } from "react";

import { ReactComponent as Brand } from "../../assets/icons/brand.svg";
import { ReactComponent as Check } from "../../assets/icons/check.svg";
import { ReactComponent as Error } from "../../assets/icons/error.svg";
import { ReactComponent as IssueOpened } from "../../assets/icons/github-issue-opened.svg";
import { ReactComponent as PullRequests } from "../../assets/icons/github-pull-request.svg";
import { ReactComponent as Forks } from "../../assets/icons/github-repository-forked.svg";
import { ReactComponent as Lock } from "../../assets/icons/lock.svg";
import { ReactComponent as Star } from "../../assets/icons/star.svg";
import { ReactComponent as Unlock } from "../../assets/icons/unlock.svg";
import { ReactComponent as Watchers } from "../../assets/icons/watchers.svg";
import { config } from "../../config/devdash";
import { GithubRepository } from "../../interfaces/GithubRepository";
import { ApiGithubRepository } from "../../services/ApiGithubRepository";
import { GitHubApiResponses } from "../../services/GithubApiResponse";
import styles from "./Dashboard.module.scss";

const isoToReadableDate = (lastUpdate: string): string => {
	const lastUpdateDate = new Date(lastUpdate);
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

export function Dashboard() {
	const title = "DevDash_";
	const repository = new ApiGithubRepository();
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
					<Brand />
					<h1 className={styles.app__brand}>{title}</h1>
				</section>
			</header>
			<section className={styles.container}>
				{githubApiResponse.map((widget) => (
					<article className={styles.widget} key={widget.repositoryData.id}>
						<header className={styles.widget__header}>
							<a
								className={styles.widget__title}
								href={widget.repositoryData.html_url}
								target="_blank"
								title={`${widget.repositoryData.owner.login}/${widget.repositoryData.name}`}
								rel="noreferrer"
							>
								{widget.repositoryData.owner.login}/{widget.repositoryData.name}
							</a>
							{widget.repositoryData.private ? <Lock /> : <Unlock />}
						</header>
						<div className={styles.widget__body}>
							<div className={styles.widget__status}>
								<p>Last update {isoToReadableDate(widget.repositoryData.updated_at)}</p>
								{widget.ciStatus.workflow_runs.length > 0 && (
									<div>
										{widget.ciStatus.workflow_runs[0].status === "completed" ? (
											<Check />
										) : (
											<Error />
										)}
									</div>
								)}
							</div>
							<p className={styles.widget__description}>{widget.repositoryData.description}</p>
						</div>
						<footer className={styles.widget__footer}>
							<div className={styles.widget__stat}>
								<Star />
								<span>{widget.repositoryData.stargazers_count}</span>
							</div>

							<div className={styles.widget__stat}>
								<Watchers />
								<span>{widget.repositoryData.watchers_count}</span>
							</div>

							<div className={styles.widget__stat}>
								<Forks />
								<span>{widget.repositoryData.forks_count}</span>
							</div>

							<div className={styles.widget__stat}>
								<IssueOpened />
								<span>{widget.repositoryData.open_issues_count}</span>
							</div>

							<div className={styles.widget__stat}>
								<PullRequests />
								<span>{widget.pullRequests.length}</span>
							</div>
						</footer>
					</article>
				))}
			</section>
		</>
	);
}
