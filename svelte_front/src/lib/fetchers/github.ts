import type { GithubIssue } from '@lib/utils/types';

export async function importIssues(owner, repo) {
	const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues?state=all`);
	console.log("github responded issues with ", response)
	const issues = await response.json().then(resp => console.log("here", resp));
	return []
	// Parse the JSON response and return the list of issues and backlog tickets
	//return issues.map(issue => {
	//  return {
	//	id: issue.id,
	//	number: issue.number,
	//	title: issue.title,
	//	state: issue.state,
	//	labels: issue.labels
	//  };
	//});
};

export const filterPosts = (issues: GithubIssue[], label: string) => {
	return issues
		.filter((post) => label in post.labels)
		.sort((a, b) =>
			new Date(a.updated_at).getTime() > new Date(b.updated_at).getTime()
				? -1
				: new Date(a.updated_at).getTime() < new Date(b.updated_at).getTime()
				? 1
				: 0
		)
};


async function getProjectNodeId(owner, repo) {
	const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/projects`, {
		headers: {Authentication: 'Bearer {token}'}
	}).then(resp => resp.json())
  .then(json => console.log(JSON.stringify(json)))
  console.log("github responded projects with ", response)
}