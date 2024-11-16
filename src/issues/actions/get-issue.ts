import { sleep } from "../../helpers";
import { githubApi } from "../../api/github.api";
import { GithubIssue } from "../interfaces";

export const getIssue = async (isseuNumber: number): Promise<GithubIssue> => {
  await sleep(1500);

  const { data } = await githubApi.get<GithubIssue>(`/issues/${isseuNumber}`)
  return data;
}
