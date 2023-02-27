import { GithubRepositoryWidget } from "../../components/GithubRepositoryWidget/GithubRepositoryWidget";
import { config } from "../../config/devdash";
import { useGithubRepositories } from "../../hooks/useGithubRepositories";
import ApiGithubRepository from "../../interfaces/ApiGithubRepository";
import styles from "./Dashboard.module.scss";

const githubRepositoryUrls = config.widgets.map((widget) => widget.repository_url);

export function Dashboard({ repository }: { repository: ApiGithubRepository }) {
	const { repositoryData } = useGithubRepositories(repository, githubRepositoryUrls);

	return (
		<>
			{repositoryData.length === 0 ? (
				<div className={styles.empty}>
					<span>No hay widgets configurados</span>
				</div>
			) : (
				<section className={styles.container}>
					{repositoryData.map((repository) => (
						<GithubRepositoryWidget
							key={`${repository.id.organization}/${repository.id.name}`}
							widget={repository}
						/>
					))}
				</section>
			)}
		</>
	);
}
