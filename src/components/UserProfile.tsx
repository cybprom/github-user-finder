import Image from "next/image";
import styles from "@/styles/UserProfile.module.scss";
// import { GitHubUser } from "../../lib/types/GitHubUser";
import { GitHubUser } from "@/lib/types/GitHubUser";

interface UserProfileProps {
  user: GitHubUser;
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div className={styles.userProfile} aria-labelledby="user-profile-title">
      <div className={styles.avatarContainer}>
        <Image
          src={user.avatar_url}
          alt={`${user.name || user.login}'s avatar`}
          width={200}
          height={200}
          className={styles.avatar}
          priority
        />
      </div>

      <div className={styles.userDetails}>
        <h2 id="user-profile-title" className={styles.name}>
          {user.name || user.login}
        </h2>

        {user.bio && (
          <p className={styles.bio} aria-label="User Biography">
            {user.bio}
          </p>
        )}

        <div className={styles.metadata}>
          {user.location && (
            <p aria-label="User Location">
              <strong>Location:</strong> {user.location}
            </p>
          )}

          <p aria-label="Followers Count">
            <strong>Followers:</strong> {user.followers}
          </p>
        </div>

        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.profileLink}
          aria-label="View GitHub Profile"
        >
          View GitHub Profile
        </a>
      </div>
    </div>
  );
}
