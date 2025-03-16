import { createContext, useContext, useReducer, useEffect } from "react";
import { generateSummary } from "./SummaryGenerator";

const TodoContext = createContext();

// Initial state
const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
  summary: "",
  loadingSummary: false,
};

// Action types
const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const DELETE_TODO = "DELETE_TODO";
const EDIT_TODO = "EDIT_TODO";
const SET_SUMMARY = "SET_SUMMARY";
const SET_LOADING_SUMMARY = "SET_LOADING_SUMMARY";

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
          },
        ],
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
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
  const addTodo = (text, datetime) => {
    if (text.trim()) {
      dispatch({ type: ADD_TODO, payload: { text, datetime } });
    }
  };

  const toggleTodo = (id) => {
    dispatch({ type: TOGGLE_TODO, payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: DELETE_TODO, payload: id });
  };

  const editTodo = (id, text, datetime) => {
    if (text.trim()) {
      dispatch({ type: EDIT_TODO, payload: { id, text, datetime } });
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        summary: state.summary,
        loadingSummary: state.loadingSummary,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
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
