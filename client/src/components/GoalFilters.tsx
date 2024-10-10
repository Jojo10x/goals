import React from "react";
import TimeFrameSelector from "./TimeFrameSelector";

export type FilterType = "current" | "completed" | "all" | "byDate";

interface GoalFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  timeFrame: string;
  onTimeFrameChange: (timeFrame: string) => void;
}

const GoalFilters: React.FC<GoalFiltersProps> = ({
  activeFilter,
  onFilterChange,
  onTimeFrameChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-4">
        {(["current", "completed", "all", "byDate"] as FilterType[]).map(
          (filter) => (
            <button
              key={filter}
              className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-md ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-gray-300 hover:to-gray-400"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
              onClick={() => onFilterChange(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
              <span
                className={`absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 ${
                  activeFilter !== filter ? "hover:opacity-30" : ""
                }`}
              ></span>
            </button>
          )
        )}
      </div>

      {activeFilter === "byDate" && (
        <div className="flex items-center justify-center">
          <TimeFrameSelector  onChange={onTimeFrameChange} />
        </div>
      )}
    </div>
  );
};

export default GoalFilters;
