import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useGithubRepository } from "../../hooks/useGithubRepository";
import { useInViewport } from "../../hooks/useInViewPort";
import { ApiGithubRepository } from "../../interfaces/ApiGithubRepository";
import { GithubPullRequestRepository } from "../../interfaces/GithubPullRequestRepository";
import { PullRequests } from "../PullRequests/PullRequests";
import styles from "./WidgetDetail.module.scss";

export function WidgetDetail({
	githubRepository,
	githubPullRequestRepository,
}: {
	githubRepository: ApiGithubRepository;
	githubPullRequestRepository: GithubPullRequestRepository;
}) {
	const { isInViewport, ref } = useInViewport();
	const { organization, name } = useParams() as { organization: string; name: string };
	const repositoryId = useMemo(() => ({ name, organization }), [name, organization]);
	const { repositoryData } = useGithubRepository(githubRepository, repositoryId);

	if (!repositoryData) {
		return <></>;
	}

	return (
		<section className={styles["repository-detail"]}>
			<header className={styles.header}>
				<a href={repositoryData.url} target="_blank" rel="noreferrer">
					<h2 className={styles.header__title}>
						{repositoryData.id.organization}/{repositoryData.id.name}
					</h2>
				</a>
				{repositoryData.private ? (
					<FontAwesomeIcon icon={faLock} className={styles.icon} />
				) : (
					<FontAwesomeIcon icon={faUnlock} className={styles.icon} />
				)}
			</header>

			<p>{3 / 0}</p>
			<p>{repositoryData.description}</p>

			<h3>Repository stats</h3>
			<table className={styles.detail__table}>
				<thead>
					<tr>
						<th>Stars</th>
						<th>Watchers</th>
						<th>Forks</th>
						<th>Issues</th>
						<th>Pull Requests</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td>{repositoryData.stars}</td>
						<td>{repositoryData.watchers}</td>
						<td>{repositoryData.forks}</td>
						<td>{repositoryData.issues}</td>
						<td>{repositoryData.pullRequests}</td>
					</tr>
				</tbody>
			</table>

			<h3>Workflow runs status</h3>

			{repositoryData.workflowRunsStatus.length > 0 ? (
				<>
					<p>
						⏱️ Last workflow run:{" "}
						{repositoryData.workflowRunsStatus[0].createdAt.toLocaleDateString("es-ES")}
					</p>
					<table className={styles.detail__table}>
						<thead>
							<tr>
								<th>Name</th>
								<th>Title</th>
								<th>Date</th>
								<th>Status</th>
								<th>Conclusion</th>
							</tr>
						</thead>
						<tbody>
							{repositoryData.workflowRunsStatus.map((run) => (
								<tr key={run.id}>
									<td>{run.name}</td>
									<td>
										<a href={run.url} target="_blank" rel="noreferrer">
											{run.title}
										</a>
									</td>
									<td>{run.createdAt.toLocaleDateString("es-ES")}</td>
									<td>{run.status}</td>
									<td>{run.conclusion}</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			) : (
				<p>There are no workflow runs</p>
			)}

			<section ref={ref}>
				{isInViewport && (
					<PullRequests repository={githubPullRequestRepository} repositoryId={repositoryId} />
				)}
			</section>
		</section>
	);
}
