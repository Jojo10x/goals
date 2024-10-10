import React, { useState } from 'react';

interface TimeFrameSelectorProps {
  onChange: (frame: string) => void;
}

const TimeFrameSelector: React.FC<TimeFrameSelectorProps> = ({ onChange }) => {
  const [amount, setAmount] = useState<number>(1);
  const [unit, setUnit] = useState<string>('w');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > 0) {
      setAmount(value);
      onChange(`${value}${unit}`);
    }
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setUnit(value);
    onChange(`${amount}${value}`);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        className="w-16 p-2 border border-gray-300 rounded"
        min="1"
      />
      <select
        value={unit}
        onChange={handleUnitChange}
        className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
      >
        <option value="d">Days</option>
        <option value="w">Weeks</option>
        <option value="m">Months</option>
        <option value="y">Years</option>
      </select>
    </div>
  );
};

export default TimeFrameSelector;
