function TodoFilter({ filter, setFilter }) {
  return (
    <div className="flex justify-center gap-1 p-1 mb-6 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
      <button
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
          filter === 'all'
            ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
        }`}
        onClick={() => setFilter('all')}
      >
        All
      </button>
      <button
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
          filter === 'active'
            ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
        }`}
        onClick={() => setFilter('active')}
      >
        Active
      </button>
      <button
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
          filter === 'completed'
            ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
        }`}
        onClick={() => setFilter('completed')}
      >
        Completed
      </button>
    </div>
  )
}

export default TodoFilter
