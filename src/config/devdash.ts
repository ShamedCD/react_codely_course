export interface DevDashConfig {
	github_access_token: string;
	widgets: {
		id: string;
		repository_url: string;
	}[];
}

export const config: DevDashConfig = {
	github_access_token: process.env.REACT_APP_GB_PERSONAL_ACCESS_TOKEN as string,
	widgets: [
		{
			id: "c4fb5134-52fa-4c69-8fb0-ffe3fb8d7e7c",
			repository_url: "https://github.com/ShamedCD/2022React-Bootcamp-CapstoneProject",
		},
		{
			id: "4fbe19c6-0933-4080-b8c2-33edaf4ac0d2",
			repository_url: "https://github.com/jaymody/picoGPT",
		},
		{
			id: "5d48bb51-2672-4f29-bdf2-bb17b9af0b80",
			repository_url: "https://github.com/pedroslopez/whatsapp-web.js",
		},
	],
};
