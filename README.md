# GitHub User Search Application

This is a responsive and accessible frontend application that allows users to search for GitHub profiles using the GitHub API. The app fetches user information dynamically and displays it in a structured and user-friendly interface.

---

## Features

- **GitHub User Search**: Fetch details of any GitHub user by entering their username in the search bar.
- **Responsive Design**: Optimized layout for various screen sizes, ensuring a seamless experience across devices.
- **Loading States**: Displays a loading indicator while fetching data from the API.
- **Error Handling**: Shows user-friendly error messages for invalid or non-existent usernames.
- **User Profile Details**: Displays the following information for each user:
  - Name
  - Profile avatar
  - Location
  - Bio
  - Number of followers
  - Link to the user’s GitHub profile
- **Accessible Interface**: Built following ARIA guidelines with keyboard navigation and screen reader support.
- **Interactive Feedback**: Visual feedback for interactive elements, including focus and hover states.

---

## Bonus Features

- **Debounce Functionality**: Reduces excessive API calls by implementing a debounce mechanism for the search input.
- **Search History**: Saves previously searched usernames and allows quick access to their profiles.

---

## Technologies Used

- **Next.js**: Framework for building the application.
- **TypeScript**: Provides static typing for maintainable and scalable code.
- **SCSS (SASS)**: Used for styling, offering flexibility and modularity.
- **GitHub API**: Fetches data about GitHub users.

---

## Installation

Follow these steps to run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/github-user-search.git
   ```

## API Reference

The application uses the GitHub API to fetch user information.

**End Point** `https://api.github.com/users/[username]`
