import { Loader } from "../../components/Loader/Loader";
import { useGithubRepositoryPullRequests } from "../../hooks/useGithubRepositoryPullRequests";
import { GithubPullRequestRepository } from "../../interfaces/GithubPullRequestRepository";
import { RepositoryId } from "../../interfaces/GithubRepository";
import styles from "../detail/WidgetDetail.module.scss";

export function PullRequests({
	repository,
	repositoryId,
}: {
	repositoryId: RepositoryId;
	repository: GithubPullRequestRepository;
}) {
	const { isLoading, pullRequests } = useGithubRepositoryPullRequests(repository, repositoryId);

	return (
		<>
			<h3>Pull requests</h3>
			<table className={styles.detail__table}>
				<thead>
					<tr>
						<th>Título</th>
						<th>Fecha</th>
					</tr>
				</thead>
				<tbody>
					{!isLoading &&
						pullRequests.map((pullRequest) => (
							<tr key={pullRequest.id}>
								<td>
									<a target="_blank" href={pullRequest.url} rel="noreferrer">
										{pullRequest.title}
									</a>
								</td>
								<td>{pullRequest.createdAt.toLocaleDateString("es-ES")}</td>
							</tr>
						))}
				</tbody>
			</table>
			{isLoading && <Loader />}
		</>
	);
}
