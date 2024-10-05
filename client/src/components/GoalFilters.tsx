import React from 'react';
import TimeFrameSelector from './TimeFrameSelector';

export type FilterType = 'current' | 'completed' | 'all' | 'byDate';

interface GoalFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  timeFrame: string;
  onTimeFrameChange: (timeFrame: string) => void;
}

const GoalFilters: React.FC<GoalFiltersProps> = ({ 
  activeFilter, 
  onFilterChange, 
  timeFrame, 
  onTimeFrameChange 
}) => {
  return (
    <div className="space-y-4">
    <div className="flex flex-wrap justify-center gap-2">
      {(['current', 'completed', 'all', 'byDate'] as FilterType[]).map((filter) => (
        <button
          key={filter}
          className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${
            activeFilter === filter
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => onFilterChange(filter)}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
    {activeFilter === 'byDate' && (
      <div className="flex items-center justify-center">
        <TimeFrameSelector value={timeFrame} onChange={onTimeFrameChange} />
      </div>
    )}
  </div>
  );
};

export default GoalFilters;