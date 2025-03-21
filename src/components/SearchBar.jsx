import React, { useState, useEffect } from "react";
import { Input, AutoComplete } from "antd";

const { Search } = Input;

const SearchBar = ({ handleSearch, options, initialValue, onSearch }) => {
  const [value, setValue] = useState(initialValue || "");

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (data) => {
    setValue(data);
    handleSearch(data);
  };

  const handleSelect = (data) => {
    setValue(data);
    if (onSearch) {
      onSearch(data);
    }
  };

  const handlePressEnter = () => {
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <AutoComplete
      options={options}
      value={value}
      onChange={handleChange}
      onSelect={handleSelect}
      className="search-bar"
    >
      <Search
        enterButton="Search"
        allowClear
        size="large"
        placeholder="Search for doctors, clinics, specializations..."
        onPressEnter={handlePressEnter}
      />
    </AutoComplete>
  );
};

export default SearchBar;
