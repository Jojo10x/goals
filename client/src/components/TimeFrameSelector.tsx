import React from 'react';

interface TimeFrameSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const TimeFrameSelector: React.FC<TimeFrameSelectorProps> = ({ value, onChange }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
       className="block w-full pl-3 pr-10 py-2 text-sm  border-1 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
  >
    <option value="1w">1 Week</option>
    <option value="1m">1 Month</option>
    <option value="3m">3 Months</option>
    <option value="6m">6 Months</option>
    <option value="1y">1 Year</option>
    <option value="5y">5 Years</option>
    <option value="10y">10 Years</option>
  </select>
);

export default TimeFrameSelector;