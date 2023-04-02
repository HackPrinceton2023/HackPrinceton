import React from 'react';
import Select, { components } from 'react-select';

const { Option } = components;

const DropdownOption = (props) => (
  <Option {...props}>
    {props.isSelected && <span>&#10003; </span>}
    {props.label}
  </Option>
);

const options = [
  { value: 'option-1', label: 'Type it out' },
  { value: 'option-2', label: 'Write it out' },
];

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = React.useState(null);

  const handleChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        className="dropdown"
        components={{ Option: DropdownOption }}
      />
    </>
  );
};

export default Dropdown;
