import React from "react";

import { config } from "../../config/devdash";
import { GithubApiRepository } from "../../services/GithubApiRepository";
import { Dashboard } from "./Dashboard";

const repository = new GithubApiRepository(config.github_access_token);

export class DashboardFactory {
	static create(): React.ReactElement {
		return <Dashboard repository={repository} />;
	}
}
