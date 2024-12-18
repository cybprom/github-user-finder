import Image from "next/image";
import styles from "./page.module.css";
import GitHubUserSearch from "@/components/GitHubUserSearch";

export default function Home() {
  return (
    <main>
      <div className="container">
        <h1>GitHub User Finder</h1>
        <GitHubUserSearch />
      </div>
    </main>
  );
}
