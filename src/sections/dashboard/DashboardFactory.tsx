import React from "react";

import { config } from "../../config/devdash";
import { ApiGithubRepository } from "../../services/ApiGithubRepository";
import { Dashboard } from "./Dashboard";

const repository = new ApiGithubRepository(config.github_access_token);

export class DashboardFactory {
	static create(): React.ReactElement {
		return <Dashboard repository={repository} />;
	}
}
