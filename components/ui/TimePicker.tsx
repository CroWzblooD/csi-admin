import React from 'react';

type TimePickerProps = {
  value: string;
  onChange: (time: string) => void;
};

export function TimePicker({ value, onChange }: TimePickerProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const [hour, minute] = value ? value.split(':') : ['00', '00'];

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(`${e.target.value}:${minute}`);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(`${hour}:${e.target.value}`);
  };

  return (
    <div className="flex space-x-2">
      <select
        value={hour}
        onChange={handleHourChange}
        className="w-20 px-2 py-1 border rounded"
      >
        {hours.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>
      <select
        value={minute}
        onChange={handleMinuteChange}
        className="w-20 px-2 py-1 border rounded"
      >
        {minutes.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>
  );
}