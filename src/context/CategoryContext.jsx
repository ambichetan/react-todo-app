import { createContext, useContext, useReducer, useEffect } from "react";

const CategoryContext = createContext();

// Predefined categories with colors
const defaultCategories = [
  { id: "personal", name: "Personal", color: "#3b82f6" }, // blue
  { id: "work", name: "Work", color: "#10b981" }, // emerald
  { id: "shopping", name: "Shopping", color: "#f59e0b" }, // amber
  { id: "health", name: "Health", color: "#ef4444" }, // red
  { id: "education", name: "Education", color: "#8b5cf6" }, // violet
];

// Initial state
const initialState = {
  categories: JSON.parse(localStorage.getItem("categories")) || defaultCategories,
  selectedCategory: null,
};

// Action types
const ADD_CATEGORY = "ADD_CATEGORY";
const EDIT_CATEGORY = "EDIT_CATEGORY";
const DELETE_CATEGORY = "DELETE_CATEGORY";
const SET_SELECTED_CATEGORY = "SET_SELECTED_CATEGORY";

// Reducer function
function categoryReducer(state, action) {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case EDIT_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.id ? action.payload : category
        ),
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
        selectedCategory:
          state.selectedCategory?.id === action.payload
            ? null
            : state.selectedCategory,
      };
    case SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
      };
    default:
      return state;
  }
}

export function CategoryProvider({ children }) {
  const [state, dispatch] = useReducer(categoryReducer, initialState);

  // Save to localStorage whenever categories change
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(state.categories));
  }, [state.categories]);

  // Action creators
  const addCategory = (name, color) => {
    const id = name.toLowerCase().replace(/\s+/g, "-");
    dispatch({
      type: ADD_CATEGORY,
      payload: { id, name, color },
    });
  };

  const editCategory = (id, name, color) => {
    dispatch({
      type: EDIT_CATEGORY,
      payload: { id, name, color },
    });
  };

  const deleteCategory = (id) => {
    dispatch({ type: DELETE_CATEGORY, payload: id });
  };

  const setSelectedCategory = (category) => {
    dispatch({ type: SET_SELECTED_CATEGORY, payload: category });
  };

  return (
    <CategoryContext.Provider
      value={{
        categories: state.categories,
        selectedCategory: state.selectedCategory,
        addCategory,
        editCategory,
        deleteCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

// Custom hook to use the category context
export function useCategoryContext() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategoryContext must be used within a CategoryProvider");
  }
  return context;
}
