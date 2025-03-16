# System Patterns

## Architecture Overview
The React Todo application follows a modular architecture, leveraging React components and context for state management. The application is built using Vite as the build tool and Tailwind CSS for styling.

## Key Technical Decisions
- **React Components**: The application is composed of reusable React components, each responsible for a specific part of the UI.
- **Context API**: The Context API is used to manage global state, such as the list of tasks and the current theme.
- **Vite**: Vite is chosen for its fast development server and efficient build process.
- **Tailwind CSS**: Tailwind CSS is used for styling due to its utility-first approach, which allows for rapid development and consistent styling.

## Design Patterns
- **Component-Based Design**: The application is designed using a component-based approach, where each component is responsible for a specific part of the UI.
- **State Management**: The Context API is used for state management to avoid prop drilling and ensure that state is easily accessible across the application.
- **Responsive Design**: Media queries and Tailwind CSS utilities are used to ensure the application is responsive and works well on various devices.

## Component Relationships
- **App.jsx**: The root component that renders the main layout and provides context to child components.
- **TodoList.jsx**: Displays the list of tasks and handles task-related operations.
- **TodoItem.jsx**: Represents a single task and provides options to edit, delete, and mark tasks as completed.
- **AddTodo.jsx**: Provides a form to add new tasks.
- **TodoFilter.jsx**: Allows users to filter tasks by status.
- **ThemeToggle.jsx**: Provides a button to toggle between light and dark themes.
- **TodoSummary.jsx**: Displays a summary of tasks, such as the total number of tasks and the number of completed tasks.
