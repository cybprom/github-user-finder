export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  location: string | null;
  bio: string | null;
  followers: number;
  html_url: string;
}

export interface UserSearchError {
  message: string;
}
