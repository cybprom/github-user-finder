"use client";

import { useState, FormEvent, useEffect } from "react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useGitHubUserSearch } from "@/lib/hooks/useGitHubUserSearch";
import UserProfile from "./UserProfile";
import LoadingSpinner from "./LoadingSpinner";
import styles from "@/styles/GitHubUserSearch.module.scss";

export default function GitHubUserSearch() {
  const [username, setUsername] = useState("");
  const debouncedUsername = useDebounce(username, 1000);
  const { user, loading, error, searchUser, clearSearch, searchHistory } =
    useGitHubUserSearch();

  // Use effect to trigger search when debounced username changes
  useEffect(() => {
    searchUser(debouncedUsername.trim());
  }, [debouncedUsername]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.trim()) {
      searchUser(username.trim());
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.searchForm} role="search">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          aria-label="GitHub username search"
          className={styles.searchInput}
          required
          autoFocus
        />
        <button
          type="submit"
          className={styles.searchButton}
          aria-label="Search GitHub user"
        >
          Search
        </button>
        {username && (
          <button
            type="button"
            onClick={() => {
              setUsername("");
              clearSearch();
            }}
            className={styles.clearButton}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </form>

      {/* Search History */}
      {searchHistory.length > 0 && (
        <div className={styles.searchHistory} aria-label="Recent searches">
          <p>Recent Searches:</p>
          {searchHistory.map((hist) => (
            <button
              key={hist}
              onClick={() => {
                setUsername(hist);
                searchUser(hist);
              }}
              className={styles.historyItem}
            >
              {hist}
            </button>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className={styles.errorMessage} role="alert" aria-live="assertive">
          {error.message}
        </div>
      )}

      {/* Loading and User Profile */}
      {loading ? <LoadingSpinner /> : user && <UserProfile user={user} />}
    </div>
  );
}
