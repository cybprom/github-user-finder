"use client";

import { useState, useCallback, useEffect } from "react";
import { GitHubUser, UserSearchError } from "../types/GitHubUser";

export function useGitHubUserSearch() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<UserSearchError | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Use effect to handle localStorage on client-side after mount
  useEffect(() => {
    // Retrieve search history from localStorage
    const storedHistory = localStorage.getItem("githubSearchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  const searchUser = useCallback(
    async (username: string) => {
      if (!username) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        if (!response.ok) {
          // Provide more specific error messages based on status
          switch (response.status) {
            case 404:
              throw new Error(
                `Username "${username}" not found. Please check the spelling or try a different username.`
              );
            case 403:
              throw new Error(
                "API rate limit exceeded. Please try again later."
              );
            case 500:
              throw new Error("GitHub server error. Please try again later.");
            default:
              throw new Error(
                `Unable to fetch user data. Status code: ${response.status}`
              );
          }
        }

        const userData: GitHubUser = await response.json();

        setUser(userData);

        // Update search history
        const updatedHistory = [
          username,
          ...searchHistory.filter((u) => u !== username),
        ].slice(0, 5);

        setSearchHistory(updatedHistory);

        // Save to localStorage
        localStorage.setItem(
          "githubSearchHistory",
          JSON.stringify(updatedHistory)
        );
      } catch (err) {
        setUser(null);
        setError({
          message:
            err instanceof Error
              ? err.message
              : "An unexpected error occurred while searching for the user.",
        });
      } finally {
        setLoading(false);
      }
    },
    [searchHistory]
  );

  const clearSearch = useCallback(() => {
    setUser(null);
    setError(null);
  }, []);

  return {
    user,
    loading,
    error,
    searchUser,
    clearSearch,
    searchHistory,
  };
}
