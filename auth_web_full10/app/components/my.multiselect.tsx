import React from "react";
import type { Role } from "~/models";

interface MyMultiSelectProps {
  title: string;
  options: Role[];
  selectedValues: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const MyMultiSelect: React.FC<MyMultiSelectProps> = ({
  title,
  options,
  selectedValues,
  onChange,
}) => {
  return (
    <div className="div-input">
      <span>{title}:</span>
      <select
        multiple
        value={selectedValues}
        onChange={onChange}
        style={{ height: "150px" }}
      >
        {options.map((role) => (
          <option key={role.id} value={role.name}>
            {role.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MyMultiSelect;
