import axios from "axios";

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    // TODO: agregar api key de github
  }
})