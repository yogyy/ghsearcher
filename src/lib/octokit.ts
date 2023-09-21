import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: import.meta.env.VITE_gh_token,
});

export default octokit