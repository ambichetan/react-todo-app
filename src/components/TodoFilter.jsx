function TodoFilter({ filter, setFilter }) {
  return (
    <div className="flex justify-center p-1 mb-6 bg-[#F2F2F7] dark:bg-[#1C1C1E] rounded-lg">
      <button
        className={`flex-1 px-4 py-1.5 text-[15px] rounded-lg transition-all duration-200 ${
          filter === "all"
            ? "bg-white dark:bg-[#2C2C2E] text-[#007AFF] dark:text-[#0A84FF] shadow-sm"
            : "text-[#8E8E93] dark:text-[#98989D] hover:text-[#007AFF] dark:hover:text-[#0A84FF]"
        }`}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={`flex-1 px-4 py-1.5 text-[15px] rounded-lg transition-all duration-200 ${
          filter === "active"
            ? "bg-white dark:bg-[#2C2C2E] text-[#007AFF] dark:text-[#0A84FF] shadow-sm"
            : "text-[#8E8E93] dark:text-[#98989D] hover:text-[#007AFF] dark:hover:text-[#0A84FF]"
        }`}
        onClick={() => setFilter("active")}
      >
        Active
      </button>
      <button
        className={`flex-1 px-4 py-1.5 text-[15px] rounded-lg transition-all duration-200 ${
          filter === "completed"
            ? "bg-white dark:bg-[#2C2C2E] text-[#007AFF] dark:text-[#0A84FF] shadow-sm"
            : "text-[#8E8E93] dark:text-[#98989D] hover:text-[#007AFF] dark:hover:text-[#0A84FF]"
        }`}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
}

export default TodoFilter;
