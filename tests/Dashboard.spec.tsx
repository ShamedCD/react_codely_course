import { render } from "@testing-library/react";

import { githubApiResponses } from "../src/github_api_responses";
import { Dashboard } from "../src/sections/dashboard/Dashboard";
import { ApiGithubRepository } from "../src/services/ApiGithubRepository";

jest.mock("../src/services/ApiGithubRepository");

const mockGithubRepository = ApiGithubRepository as jest.Mock<ApiGithubRepository>;

describe("Dashboard section", () => {
	it("Shows all widgets", async () => {
		mockGithubRepository.mockImplementationOnce(() => {
			return {
				search: () => Promise.resolve(githubApiResponses),
			} as unknown as ApiGithubRepository;
		});

		render(<Dashboard />);
	});
});
