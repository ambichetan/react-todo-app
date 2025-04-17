import { createContext, useContext, useReducer, useEffect } from "react";
import { generateSummary } from "./SummaryGenerator";

const TodoContext = createContext();

// Migrate existing todos to include subtasks array if missing
const migrateExistingTodos = (todos) => {
  return todos.map(todo => ({
    ...todo,
    subtasks: todo.subtasks || [] // Add empty subtasks array if it doesn't exist
  }));
};

// Initial state
const initialState = {
  todos: migrateExistingTodos(JSON.parse(localStorage.getItem("todos")) || []),
  summary: "",
  loadingSummary: false,
  filter: {
    category: null,
    tags: [],
    status: "all", // all, active, completed
    priority: null, // null, high, medium, low
  },
};

// Action types
const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const DELETE_TODO = "DELETE_TODO";
const EDIT_TODO = "EDIT_TODO";
const SET_SUMMARY = "SET_SUMMARY";
const SET_LOADING_SUMMARY = "SET_LOADING_SUMMARY";
const ADD_SUBTASK = "ADD_SUBTASK";
const TOGGLE_SUBTASK = "TOGGLE_SUBTASK";
const DELETE_SUBTASK = "DELETE_SUBTASK";
const EDIT_SUBTASK = "EDIT_SUBTASK";

// Reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload.text,
            datetime: action.payload.datetime || "",
            completed: false,
            category: action.payload.category || null,
            tags: action.payload.tags || [],
            priority: action.payload.priority || "medium",
            recurrence: action.payload.recurrence || "none",
            originalDueDate: action.payload.datetime || "",
            subtasks: [], // Initialize empty subtasks array
          },
        ],
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { 
                ...todo, 
                completed: !todo.completed,
                // When marking a todo complete, mark all subtasks complete
                subtasks: todo.subtasks.map(subtask => ({
                  ...subtask,
                  completed: !todo.completed
                }))
              }
            : todo
        ),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                text: action.payload.text,
                datetime: action.payload.datetime,
                category: action.payload.category,
                tags: action.payload.tags,
                priority: action.payload.priority || todo.priority,
                recurrence: action.payload.recurrence || todo.recurrence,
              }
            : todo
        ),
      };
    case ADD_SUBTASK:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.todoId
            ? {
                ...todo,
                subtasks: [
                  ...todo.subtasks,
                  {
                    id: Date.now(),
                    text: action.payload.text,
                    completed: false,
                  },
                ],
              }
            : todo
        ),
      };
    case TOGGLE_SUBTASK:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.todoId
            ? {
                ...todo,
                subtasks: todo.subtasks.map((subtask) =>
                  subtask.id === action.payload.subtaskId
                    ? { ...subtask, completed: !subtask.completed }
                    : subtask
                ),
              }
            : todo
        ),
      };
    case DELETE_SUBTASK:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.todoId
            ? {
                ...todo,
                subtasks: todo.subtasks.filter(
                  (subtask) => subtask.id !== action.payload.subtaskId
                ),
              }
            : todo
        ),
      };
    case EDIT_SUBTASK:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.todoId
            ? {
                ...todo,
                subtasks: todo.subtasks.map((subtask) =>
                  subtask.id === action.payload.subtaskId
                    ? { ...subtask, text: action.payload.text }
                    : subtask
                ),
              }
            : todo
        ),
      };
    case SET_SUMMARY:
      return {
        ...state,
        summary: action.payload,
      };
    case SET_LOADING_SUMMARY:
      return {
        ...state,
        loadingSummary: action.payload,
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}

// Provider component
export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  // Action creators
  const addTodo = (text, datetime, category = null, tags = [], priority = "medium", recurrence = "none") => {
    if (text.trim()) {
      dispatch({ type: ADD_TODO, payload: { text, datetime, category, tags, priority, recurrence } });
    }
  };

  const toggleTodo = (id) => {
    dispatch({ type: TOGGLE_TODO, payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: DELETE_TODO, payload: id });
  };

  const editTodo = (id, text, datetime, category = null, tags = [], priority, recurrence) => {
    if (text.trim()) {
      dispatch({
        type: EDIT_TODO,
        payload: { id, text, datetime, category, tags, priority, recurrence },
      });
    }
  };

  // Subtask actions
  const addSubtask = (todoId, text) => {
    if (text.trim()) {
      dispatch({ type: ADD_SUBTASK, payload: { todoId, text } });
    }
  };

  const toggleSubtask = (todoId, subtaskId) => {
    dispatch({ type: TOGGLE_SUBTASK, payload: { todoId, subtaskId } });
  };

  const deleteSubtask = (todoId, subtaskId) => {
    dispatch({ type: DELETE_SUBTASK, payload: { todoId, subtaskId } });
  };

  const editSubtask = (todoId, subtaskId, text) => {
    if (text.trim()) {
      dispatch({ type: EDIT_SUBTASK, payload: { todoId, subtaskId, text } });
    }
  };

  // Helper function to calculate next occurrence
  const getNextOccurrence = (date, recurrence) => {
    if (!date || recurrence === "none") return null;
    
    const nextDate = new Date(date);
    
    switch (recurrence) {
      case "daily":
        nextDate.setDate(nextDate.getDate() + 1);
        break;
      case "weekly":
        nextDate.setDate(nextDate.getDate() + 7);
        break;
      case "monthly":
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;
      case "yearly":
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        break;
      default:
        return null;
    }
    
    return nextDate.toISOString();
  };

  // Effect to handle recurring todos
  useEffect(() => {
    const now = new Date();
    state.todos.forEach(todo => {
      if (todo.recurrence !== "none" && todo.datetime && !todo.completed) {
        const dueDate = new Date(todo.datetime);
        if (dueDate < now) {
          // Create next occurrence
          const nextDate = getNextOccurrence(todo.datetime, todo.recurrence);
          if (nextDate) {
            editTodo(
              todo.id,
              todo.text,
              nextDate,
              todo.category,
              todo.tags,
              todo.priority,
              todo.recurrence
            );
          }
        }
      }
    });
  }, [state.todos]);

  const setFilter = (filter) => {
    dispatch({ type: "SET_FILTER", payload: filter });
  };

  const getFilteredTodos = () => {
    return state.todos.filter((todo) => {
      // Filter by status
      if (state.filter.status === "active" && todo.completed) return false;
      if (state.filter.status === "completed" && !todo.completed) return false;

      // Filter by category
      if (
        state.filter.category &&
        todo.category?.id !== state.filter.category.id
      )
        return false;

      // Filter by tags
      if (state.filter.tags.length > 0) {
        const todoTags = new Set(todo.tags);
        if (!state.filter.tags.every((tag) => todoTags.has(tag))) return false;
      }

      // Filter by priority
      if (state.filter.priority && todo.priority !== state.filter.priority) return false;

      return true;
    });
  };

  // Sort todos by priority
  const getSortedTodos = () => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return getFilteredTodos().sort((a, b) => {
      return priorityOrder[a.priority || "medium"] - priorityOrder[b.priority || "medium"];
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todos: getSortedTodos(),
        allTodos: state.todos,
        filter: state.filter,
        summary: state.summary,
        loadingSummary: state.loadingSummary,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
        addSubtask,
        toggleSubtask,
        deleteSubtask,
        editSubtask,
        setFilter,
        generateSummary,
        dispatch,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

// Custom hook to use the todo context
export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
}