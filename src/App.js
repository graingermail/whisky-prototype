import React, { useState } from "react";
import Data from "./Data";
import Categories from "./Categories";

// A custom component that renders a table row for each product
const ProductRow = ({ product }) => {
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.categories.map((c) => c.name).join(", ")}</td>
    </tr>
  );
};

// A custom component that renders a checkbox for each category
const CategoryCheckbox = ({ category, checked, onChange }) => {
  return (
    <div className="checkbox-wrapper">
      <label>
        <input
          type="checkbox"
          value={category.id}
          checked={checked}
          onChange={onChange}
        />
        <span>{category.name}</span>
      </label>
    </div>
  );
};

// The main component that renders the search box, the check boxes and the results table
const SearchBar = () => {
  // A state variable that stores the search input value
  const [search, setSearch] = useState("");

  // A state variable that stores the checked categories as an array of ids
  const [checkedCategories, setCheckedCategories] = useState([]);

  // A function that handles the change of the search input
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // A function that handles the change of the check boxes
  const handleCheck = (e) => {
    const value = parseInt(e.target.value); // get the category id from the value attribute
    const checked = e.target.checked; // get the checked status from the checked attribute
    if (checked) {
      // if the check box is checked, add the category id to the state array
      setCheckedCategories([...checkedCategories, value]);
    } else {
      // if the check box is unchecked, remove the category id from the state array
      setCheckedCategories(checkedCategories.filter((id) => id !== value));
    }
  };

  // A function that filters the data array based on the search input value and the checked categories
  const filterData = () => {
    return Data.filter((product) => {
      // check if the product name matches the search input value
      const matchName = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      // check if the product categories include all of the checked categories
      const matchCategories = checkedCategories.every((id) =>
        product.categories.some((c) => c.id === id)
      );
      // return true if both conditions are met, or if there are no checked categories
      return matchName && (matchCategories || checkedCategories.length === 0);
    });
  };

  return (
    <div className="container">
      <h1>Search Bar</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={handleChange}
      />
      <div className="checkbox-container">
        {Categories.map((category) => (
          <CategoryCheckbox
            key={category.id}
            category={category}
            checked={checkedCategories.includes(category.id)}
            onChange={handleCheck}
          />
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Categories</th>
          </tr>
        </thead>
        <tbody>
          {filterData().map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchBar;
