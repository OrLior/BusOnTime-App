import React from "react";

const Select = ({ setSelected, selection, id, name, additionalOption }) => {
  const selectHandler = (event) => {
    setSelected(event.target.value);
  };
  return selection ? (
    <select onChange={selectHandler} id={id}>
      <option>{name}</option>
      {additionalOption && (
        <option key={additionalOption.key} value={additionalOption.value}>
          {additionalOption.name}
        </option>
      )}
      {selection.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        );
      })}
    </select>
  ) : (
    <></>
  );
};

export default Select;
