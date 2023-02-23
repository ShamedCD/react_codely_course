import { GithubRepositoryWidget } from "../../components/GithubRepositoryWidget/GithubRepositoryWidget";
import { config } from "../../config/devdash";
import { useGithubRepositories } from "../../hooks/useGithubRepositories";
import ApiGithubRepository from "../../interfaces/ApiGithubRepository";
import styles from "./Dashboard.module.scss";

const githubRepositoryUrls = config.widgets.map((widget) => widget.repository_url);

export function Dashboard({ repository }: { repository: ApiGithubRepository }) {
	const title = "DevDash_";
	const { repositoryData } = useGithubRepositories(repository, githubRepositoryUrls);

	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<h1 className={styles.app__brand}>{title}</h1>
				</section>
			</header>
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
