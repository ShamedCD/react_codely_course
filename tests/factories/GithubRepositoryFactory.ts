import { faker } from "@faker-js/faker";

import { GithubRepository } from "../../src/interfaces/GithubRepository";

export class GithubRepositoryFactory {
	static create(params?: Partial<GithubRepository>): GithubRepository {
		const defaultParams: GithubRepository = {
			id: {
				organization: faker.company.name(),
				name: faker.random.word(),
			},
			description: faker.random.words(10),
			url: faker.internet.url(),
			private: faker.datatype.boolean(),
			forks: faker.datatype.number(),
			hasWorkflows: faker.datatype.boolean(),
			isLastWorkflowSuccess: faker.datatype.boolean(),
			stars: faker.datatype.number(),
			issues: faker.datatype.number(),
			pullRequests: faker.datatype.number(),
			updatedAt: faker.datatype.datetime(),
			watchers: faker.datatype.number(),
			...params,
		};

		return defaultParams;
	}
}
