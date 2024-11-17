import { sleep } from "../../helpers";
import { githubApi } from "../../api/github.api";
import { GithubIssue } from "../interfaces";

export const getIssueComments = async (issueNumber: number): Promise<GithubIssue[]> => {
  await sleep(1500);

  const { data } = await githubApi.get<GithubIssue[]>(`/issues/${issueNumber}/comments`)
  return data;
}
